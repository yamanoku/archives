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
import type { Plugin } from 'vite';
import {
  buildLlms,
  buildLlmsFull,
  buildRss,
  buildSitemap,
  buildSitemapIndex,
  isSearchableUrl,
  loadArchives,
  localizeFootnotes,
  prettySearchUrl,
} from './archives-feeds.ts';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const stylesEntry = join(rootDir, 'src/styles/global.css');

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

function rewriteSearchIndex(outDir: string): void {
  const indexPath = join(outDir, 'search-index.json');
  if (!existsSync(indexPath)) {
    return;
  }
  const data = JSON.parse(readFileSync(indexPath, 'utf8')) as unknown;
  const rewriteList = (list: unknown) => {
    if (!Array.isArray(list)) {
      return list;
    }
    const next = [];
    for (const item of list) {
      if (!item || typeof item !== 'object' || !('url' in item)) {
        continue;
      }
      if (!isSearchableUrl((item as { url: unknown }).url)) {
        continue;
      }
      (item as { url: unknown }).url = prettySearchUrl(
        (item as { url: unknown }).url,
      );
      next.push(item);
    }
    return next;
  };
  if (Array.isArray(data)) {
    writeFileSync(indexPath, JSON.stringify(rewriteList(data)));
    return;
  }
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.documents)) {
      record.documents = rewriteList(record.documents);
    }
    if (Array.isArray(record.entries)) {
      record.entries = rewriteList(record.entries);
    }
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
    html = localizeFootnotes(html);
    const relative = file.slice(outDir.length).replaceAll('\\', '/');
    if (relative === '/index.html') {
      html = injectScript(html, '/search.js');
    } else if (relative !== '/404.html' && !relative.startsWith('/404/')) {
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
        const sitemap = buildSitemap(archives);
        writeFileSync(join(outDir, 'rss.xml'), buildRss(archives));
        writeFileSync(join(outDir, 'llms.txt'), buildLlms(archives));
        writeFileSync(join(outDir, 'llms-full.txt'), buildLlmsFull(archives));
        writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
        writeFileSync(join(outDir, 'sitemap-0.xml'), sitemap);
        writeFileSync(join(outDir, 'sitemap-index.xml'), buildSitemapIndex());
      },
    },
  };
}
