import {
  readFileSync,
  readdirSync,
  mkdirSync,
  renameSync,
  writeFileSync,
  existsSync,
  cpSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import type { Plugin } from 'vite';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../src/config.ts';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const archivesDir = join(rootDir, 'src/archives');
const stylesEntry = join(rootDir, 'src/styles/global.css');

type ArchiveEntry = {
  slug: string;
  title: string;
  description?: string;
  date: Date;
  body: string;
  noindex?: boolean;
};

function loadArchives(): ArchiveEntry[] {
  return readdirSync(archivesDir)
    .filter(
      (name) =>
        name.endsWith('.md') && name !== 'index.md' && name !== '404.md',
    )
    .map((name) => {
      const raw = readFileSync(join(archivesDir, name), 'utf8');
      const parsed = matter(raw);
      const dateValue = parsed.data.date;
      const date =
        dateValue instanceof Date
          ? dateValue
          : new Date(String(dateValue ?? ''));
      return {
        slug: name.replace(/\.md$/, ''),
        title: String(parsed.data.title ?? name),
        description:
          typeof parsed.data.description === 'string'
            ? parsed.data.description
            : undefined,
        date,
        body: parsed.content,
        noindex: Boolean(parsed.data.noindex),
      };
    })
    .filter((entry) => !Number.isNaN(entry.date.valueOf()))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

function formatRssDate(date: Date): string {
  return date.toUTCString();
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildRss(archives: ArchiveEntry[]): string {
  const items = archives
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${SITE_URL}/${entry.slug}/</link>
      <guid>${SITE_URL}/${entry.slug}/</guid>
      <pubDate>${formatRssDate(entry.date)}</pubDate>
    </item>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
${items}
  </channel>
</rss>
`;
}

function buildLlms(archives: ArchiveEntry[]): string {
  const items = archives
    .map(
      (entry) =>
        `- [${entry.title}](${SITE_URL}/${entry.slug}/)${entry.description ? ': ' + entry.description : ''}`,
    )
    .join('\n');
  return `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n## アーカイブ一覧\n\n${items}\n`;
}

function buildLlmsFull(archives: ArchiveEntry[]): string {
  const items = archives
    .map(
      (entry) =>
        `## ${entry.title}\n\n${SITE_URL}/${entry.slug}/\n
<ArchiveContent>
${entry.body}
</ArchiveContent>\n\n---\n`,
    )
    .join('\n');
  return `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n---\n\n
  ${items}`;
}

function buildSitemap(archives: ArchiveEntry[]): string {
  const urls = [
    `  <url>
    <loc>${SITE_URL}/</loc>
  </url>`,
    ...archives
      .filter((entry) => !entry.noindex)
      .map(
        (entry) => `  <url>
    <loc>${SITE_URL}/${entry.slug}/</loc>
    <lastmod>${isoDate(entry.date)}</lastmod>
  </url>`,
      ),
  ].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function resolveCss(filePath: string, seen = new Set<string>()): string {
  const resolved = filePath;
  if (seen.has(resolved)) {
    return '';
  }
  seen.add(resolved);
  const source = readFileSync(resolved, 'utf8');
  return source.replace(
    /@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;/g,
    (_match, spec: string) => {
      const importedPath = spec.startsWith('.')
        ? join(dirname(resolved), spec)
        : join(rootDir, 'node_modules', spec);
      if (!existsSync(importedPath)) {
        return `/* unresolved import: ${spec} */`;
      }
      return resolveCss(importedPath, seen);
    },
  );
}

function rewritePrettyUrls(outDir: string): void {
  const skip = new Set(['index.html']);
  const entries = readdirSync(outDir, { withFileTypes: true });
  for (const entry of entries) {
    if (
      !entry.isFile() ||
      !entry.name.endsWith('.html') ||
      skip.has(entry.name)
    ) {
      continue;
    }
    const slug = entry.name.replace(/\.html$/, '');
    const targetDir = join(outDir, slug);
    mkdirSync(targetDir, { recursive: true });
    renameSync(join(outDir, entry.name), join(targetDir, 'index.html'));
  }
}

function prettySearchUrl(url: unknown): unknown {
  if (typeof url !== 'string' || url === '/') {
    return url;
  }
  let next = url.replace(/\.html$/, '');
  if (!next.startsWith('/')) {
    next = `/${next}`;
  }
  if (!next.endsWith('/')) {
    next = `${next}/`;
  }
  return next;
}

function rewriteSearchIndex(outDir: string): void {
  const indexPath = join(outDir, 'search-index.json');
  if (!existsSync(indexPath)) {
    return;
  }
  const data = JSON.parse(readFileSync(indexPath, 'utf8')) as unknown;
  const rewriteList = (list: unknown) => {
    if (!Array.isArray(list)) {
      return;
    }
    for (const item of list) {
      if (item && typeof item === 'object' && 'url' in item) {
        (item as { url: unknown }).url = prettySearchUrl(
          (item as { url: unknown }).url,
        );
      }
    }
  };
  if (Array.isArray(data)) {
    rewriteList(data);
    writeFileSync(indexPath, JSON.stringify(data));
    return;
  }
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    rewriteList(record.documents);
    rewriteList(record.entries);
    writeFileSync(indexPath, JSON.stringify(data));
  }
}

function collectHtmlFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'og-images') {
        continue;
      }
      collectHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function rewriteHtmlContent(html: string): string {
  return html.replace(
    /href="\.\/([^"#?]+?)(?:\.md)?"/g,
    (_match, slug: string) => `href="/${slug}/"`,
  );
}

function injectScript(html: string, src: string): string {
  if (html.includes(`src="${src}"`)) {
    return html;
  }
  return html.replace('</body>', `<script defer src="${src}"></script></body>`);
}

function postprocessHtml(outDir: string): void {
  for (const file of collectHtmlFiles(outDir)) {
    let html = readFileSync(file, 'utf8');
    html = rewriteHtmlContent(html);
    const relative = file.slice(outDir.length).replaceAll('\\', '/');
    if (relative === '/index.html') {
      html = injectScript(html, '/search.js');
    } else if (!relative.startsWith('/404/')) {
      html = injectScript(html, '/tategaki.js');
    }
    writeFileSync(file, html);
  }
}

function copyPublicAssets(outDir: string): void {
  const publicDir = join(rootDir, 'public');
  if (existsSync(publicDir)) {
    cpSync(publicDir, outDir, { recursive: true });
  }
  writeFileSync(join(outDir, 'styles.css'), resolveCss(stylesEntry));
  const notFound = join(outDir, '404/index.html');
  if (existsSync(notFound)) {
    writeFileSync(join(outDir, '404.html'), readFileSync(notFound));
  }
}

export function archivesSitePlugin(): Plugin {
  const virtualCssId = '/styles.css';
  return {
    name: 'archives-site',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.url === virtualCssId ||
          req.url?.startsWith(`${virtualCssId}?`)
        ) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
          res.end(resolveCss(stylesEntry));
          return;
        }
        next();
      });
    },
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        const outDir = join(rootDir, 'dist');
        if (!existsSync(outDir)) {
          return;
        }
        rewritePrettyUrls(outDir);
        copyPublicAssets(outDir);
        postprocessHtml(outDir);
        rewriteSearchIndex(outDir);
        const archives = loadArchives();
        writeFileSync(join(outDir, 'rss.xml'), buildRss(archives));
        writeFileSync(join(outDir, 'llms.txt'), buildLlms(archives));
        writeFileSync(join(outDir, 'llms-full.txt'), buildLlmsFull(archives));
        writeFileSync(join(outDir, 'sitemap.xml'), buildSitemap(archives));
      },
    },
  };
}

export function rewriteMarkdownLinks() {
  return {
    name: 'rewrite-archive-links',
    transform(ast: { type: string; url?: string; children?: unknown[] }) {
      const walk = (node: {
        type: string;
        url?: string;
        children?: unknown[];
      }) => {
        if (
          (node.type === 'link' || node.type === 'Link') &&
          typeof node.url === 'string'
        ) {
          const match = node.url.match(
            /^\.\/([^/#?]+?)(?:\.md)?\/?(?:([#?].*))?$/,
          );
          if (match) {
            node.url = `/${match[1]}/${match[2] ?? ''}`;
          }
        }
        for (const child of node.children ?? []) {
          if (child && typeof child === 'object') {
            walk(child as { type: string; url?: string; children?: unknown[] });
          }
        }
      };
      walk(ast);
      return ast;
    },
  };
}
