import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { applyFrontmatter, loadCategoryEnums } from './apply-frontmatter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const ARCHIVES_DIR = join(ROOT, 'src/archives');
const CATEGORIES_PATH = join(__dirname, 'categories.json');
const CACHE_PATH = join(__dirname, 'cache.json');
const RESULTS_PATH = join(__dirname, 'results.json');
const ENV_PATH = join(ROOT, '.env');

const API_URL = 'https://api.typesafe.ai/v1/systemone';
const MODEL = 'jev-latest';
const EXCERPT_CHARS = 3000;
const LOW_CONFIDENCE = 0.6;
const MAX_RETRIES = 5;

loadDotEnv(ENV_PATH);

const apiKey = process.env.TYPESAFE_API_KEY;
if (!apiKey) {
  console.error(
    'TYPESAFE_API_KEY is not set. Export it or put it in .env at the repo root.',
  );
  process.exit(1);
}

const limit = parseLimit(process.argv.slice(2));
const categories = JSON.parse(await readFile(CATEGORIES_PATH, 'utf8'));
const cache = await readJson(CACHE_PATH, {});
const files = (await readdir(ARCHIVES_DIR))
  .filter((name) => name.endsWith('.md'))
  .sort();
const targets = limit ? files.slice(0, limit) : files;

const results = [];
let fetched = 0;
let fromCache = 0;

for (const filename of targets) {
  const slug = filename.replace(/\.md$/, '');
  const article = await readArticle(join(ARCHIVES_DIR, filename), slug);
  const cached = cache[slug];

  if (cached && cached.form && cached.topic) {
    results.push(toResult(article, cached));
    fromCache += 1;
    continue;
  }

  const answers = await classifyArticle(article, categories, apiKey);
  cache[slug] = answers;
  results.push(toResult(article, answers));
  fetched += 1;
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n');
  console.log(
    `${slug}: form=${answers.form.choice} (${answers.form.confidence.toFixed(2)}) ` +
      `topic=${answers.topic.choice} (${answers.topic.confidence.toFixed(2)})`,
  );
}

const output = {
  generatedAt: new Date().toISOString(),
  model: MODEL,
  articleCount: results.length,
  articles: results,
};

await writeFile(RESULTS_PATH, JSON.stringify(output, null, 2) + '\n');
printSummary(results, { fetched, fromCache, limit: targets.length });

const enums = await loadCategoryEnums();
const applied = await applyFrontmatter(
  cache,
  results.map((article) => article.slug),
  enums,
);
console.log(
  `Frontmatter: updated ${applied.updated}, unchanged ${applied.unchanged}, skipped ${applied.skipped}`,
);

function loadDotEnv(path) {
  if (!existsSync(path)) {
    return;
  }
  const text = readFileSync(path, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function parseLimit(args) {
  const flag = args.find((arg) => arg.startsWith('--limit='));
  if (!flag) {
    return 0;
  }
  const value = Number(flag.slice('--limit='.length));
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('--limit must be a positive integer');
  }
  return value;
}

async function readJson(path, fallback) {
  if (!existsSync(path)) {
    return fallback;
  }
  return JSON.parse(await readFile(path, 'utf8'));
}

async function readArticle(path, slug) {
  const fileContents = await readFile(path, 'utf8');
  const { data, content } = matter(fileContents);
  if (!data.title) {
    throw new Error(`${slug} has no title`);
  }
  const excerpt = String(content || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, EXCERPT_CHARS);
  return {
    slug,
    title: data.title,
    description: data.description || '',
    date: formatDate(data.date),
    excerpt,
  };
}

function formatDate(value) {
  if (!value) {
    return '';
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

async function classifyArticle(article, defs, key) {
  const body = {
    state: {
      title: article.title,
      description: article.description,
      date: article.date,
      excerpt: article.excerpt,
    },
    model: MODEL,
    questions: {
      form: {
        type: 'choice',
        instructions: defs.form.instructions,
        criteria: defs.form.criteria,
      },
      topic: {
        type: 'choice',
        instructions: defs.topic.instructions,
        criteria: defs.topic.criteria,
      },
    },
  };

  const response = await postSystemOne(body, key);
  const form = response.answers?.form;
  const topic = response.answers?.topic;
  if (form?.type !== 'choice' || topic?.type !== 'choice') {
    throw new Error(`Unexpected TypeSafe response for ${article.slug}`);
  }
  return { form, topic };
}

async function postSystemOne(body, key) {
  let delayMs = 1000;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return res.json();
    }

    const retryable = res.status === 429 || res.status === 529;
    const detail = await res.text();
    if (!retryable || attempt === MAX_RETRIES) {
      throw new Error(`TypeSafe API ${res.status}: ${detail}`);
    }
    console.warn(
      `TypeSafe API ${res.status}, retry ${attempt}/${MAX_RETRIES} in ${delayMs}ms`,
    );
    await sleep(delayMs);
    delayMs *= 2;
  }
}

function toResult(article, answers) {
  return {
    slug: article.slug,
    title: article.title,
    form: answers.form.choice,
    topic: answers.topic.choice,
    formConfidence: answers.form.confidence,
    topicConfidence: answers.topic.confidence,
    probabilities: {
      form: answers.form.probabilities,
      topic: answers.topic.probabilities,
    },
  };
}

function printSummary(articles, stats) {
  const formCounts = countBy(articles, 'form');
  const topicCounts = countBy(articles, 'topic');
  const low = articles.filter(
    (item) =>
      item.formConfidence < LOW_CONFIDENCE ||
      item.topicConfidence < LOW_CONFIDENCE,
  );

  console.log('');
  console.log(
    `Classified ${articles.length} articles (${stats.fetched} fetched, ${stats.fromCache} from cache)`,
  );
  console.log('form:', formatCounts(formCounts));
  console.log('topic:', formatCounts(topicCounts));

  if (low.length === 0) {
    console.log(`No articles below confidence ${LOW_CONFIDENCE}`);
    return;
  }

  console.log(`Low confidence (< ${LOW_CONFIDENCE}):`);
  for (const item of low) {
    console.log(
      `  ${item.slug}: form=${item.form} (${item.formConfidence.toFixed(2)}) ` +
        `topic=${item.topic} (${item.topicConfidence.toFixed(2)})`,
    );
  }
}

function countBy(articles, key) {
  const counts = {};
  for (const article of articles) {
    const value = article[key];
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

function formatCounts(counts) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => `${name}=${count}`)
    .join(' ');
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
