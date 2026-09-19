import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { upsertFrontmatterFields } from './lib/frontmatter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const ARCHIVES_DIR = join(ROOT, 'src/archives');
const CACHE_PATH = join(__dirname, 'cache.json');
const CATEGORIES_PATH = join(__dirname, 'categories.json');

export async function applyFrontmatter(cache, slugs, enums) {
  const stats = { updated: 0, unchanged: 0, skipped: 0, missing: [] };

  for (const slug of slugs) {
    const labels = labelsFromCache(cache[slug], enums);
    if (!labels) {
      stats.skipped += 1;
      stats.missing.push(slug);
      continue;
    }

    const path = join(ARCHIVES_DIR, `${slug}.md`);
    const original = await readFile(path, 'utf8');
    const next = upsertFrontmatterFields(original, {
      category: labels.category,
      topic: labels.topic,
    });

    if (next === original) {
      stats.unchanged += 1;
      continue;
    }

    await writeFile(path, next);
    stats.updated += 1;
    console.log(`${slug}: category=${labels.category} topic=${labels.topic}`);
  }

  return stats;
}

export function labelsFromCache(entry, enums) {
  const category = entry?.form?.choice;
  const topic = entry?.topic?.choice;
  if (!category || !topic) {
    return null;
  }
  if (!enums.formIds.has(category) || !enums.topicIds.has(topic)) {
    return null;
  }
  return { category, topic };
}

export async function loadCategoryEnums() {
  const categories = JSON.parse(await readFile(CATEGORIES_PATH, 'utf8'));
  return {
    formIds: new Set(Object.keys(categories.form.criteria)),
    topicIds: new Set(Object.keys(categories.topic.criteria)),
  };
}

export async function slugsFromArchives() {
  return (await readdir(ARCHIVES_DIR))
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
    .sort();
}

async function main() {
  if (!existsSync(CACHE_PATH)) {
    console.error(
      'tools/categories/cache.json is missing. Run `node tools/categories/classify.mjs` first.',
    );
    process.exit(1);
  }

  const cache = JSON.parse(await readFile(CACHE_PATH, 'utf8'));
  const enums = await loadCategoryEnums();
  const slugs = parseSlugs(process.argv.slice(2), cache);
  const stats = await applyFrontmatter(cache, slugs, enums);

  console.log(
    `Updated ${stats.updated} articles (${stats.unchanged} already up to date, ${stats.skipped} skipped)`,
  );
  if (stats.missing.length > 0) {
    console.warn(`Missing cache entries: ${stats.missing.join(', ')}`);
  }
}

function parseSlugs(args, cache) {
  const flag = args.find((arg) => arg.startsWith('--slugs='));
  if (!flag) {
    return Object.keys(cache).sort();
  }
  return flag
    .slice('--slugs='.length)
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
}

function isMain() {
  const entry = process.argv[1] && resolve(process.argv[1]);
  return entry === fileURLToPath(import.meta.url);
}

if (isMain()) {
  await main();
}
