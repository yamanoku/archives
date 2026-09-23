import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Connect, ViteDevServer } from 'vite';
import {
  createMarkdownProcessor,
  renderPage,
  type PageData,
} from '@ox-content/vite-plugin';
import matter from 'gray-matter';
import archivesTheme from '../theme/index.tsx';
import { SITE_TITLE } from '../src/config.ts';
import {
  pageUrlFromSlug,
  resolveArchivePageRequest,
} from './archives-paths.ts';
import { oxContentPluginOptions } from './ox-content-options.ts';

const archivesDir = join(process.cwd(), 'src/archives');

function rewriteHtmlContent(html: string): string {
  return html.replace(
    /href="\.\/([^"#?]+?)(?:\.md)?"/g,
    (_match, slug: string) => `href="/${slug}/"`,
  );
}

function injectViteClient(html: string): string {
  if (html.includes('/@vite/client')) {
    return html;
  }
  return html.replace(
    '</head>',
    '<script type="module" src="/@vite/client"></script></head>',
  );
}

function listArchiveSlugs(): Set<string> {
  return new Set(
    readdirSync(archivesDir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, '')),
  );
}

function loadPageSummaries(): PageData[] {
  return readdirSync(archivesDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fileName = name;
      const slug = name.replace(/\.md$/, '');
      const parsed = matter(readFileSync(join(archivesDir, fileName), 'utf8'));
      const title = String(parsed.data.title ?? slug);
      const description =
        typeof parsed.data.description === 'string'
          ? parsed.data.description
          : undefined;
      const layout =
        typeof parsed.data.layout === 'string' ? parsed.data.layout : undefined;
      return {
        title,
        description,
        html: '',
        toc: [],
        path: join(archivesDir, fileName),
        url: pageUrlFromSlug(slug),
        frontmatter: parsed.data,
        layout,
      };
    });
}

function postprocessDevHtml(html: string): string {
  return injectViteClient(rewriteHtmlContent(html));
}

export function createArchivesDevMiddleware(
  server: ViteDevServer,
): Connect.NextHandleFunction {
  const processor = createMarkdownProcessor(oxContentPluginOptions());
  let summaries: PageData[] | null = null;
  const htmlCache = new Map<string, string>();

  const invalidate = (file: string) => {
    if (!file.endsWith('.md') || !file.includes(`${join('src', 'archives')}`)) {
      return;
    }
    summaries = null;
    htmlCache.clear();
    server.ws.send({ type: 'full-reload' });
  };

  server.watcher.on('change', invalidate);
  server.watcher.on('add', invalidate);
  server.watcher.on('unlink', invalidate);

  return async (req, res, next) => {
    try {
      const slugs = listArchiveSlugs();
      const request = resolveArchivePageRequest(req.url, slugs);
      if (request.kind === 'skip') {
        next();
        return;
      }

      const slug = request.kind === 'page' ? request.slug : '404';
      const fileName = `${slug}.md`;
      const filePath = join(archivesDir, fileName);
      if (!existsSync(filePath)) {
        next();
        return;
      }

      summaries ??= loadPageSummaries();
      const pages = summaries.map((page) => ({ ...page }));
      let current = pages.find((page) => page.url === pageUrlFromSlug(slug));
      if (!current) {
        next();
        return;
      }

      let bodyHtml = htmlCache.get(filePath);
      if (bodyHtml === undefined) {
        const rendered = await processor.render(
          readFileSync(filePath, 'utf8'),
          filePath,
        );
        bodyHtml = rendered.html;
        htmlCache.set(filePath, bodyHtml);
        current = {
          ...current,
          html: bodyHtml,
          title: String(rendered.frontmatter.title ?? current.title),
          description:
            typeof rendered.frontmatter.description === 'string'
              ? rendered.frontmatter.description
              : current.description,
          toc: rendered.toc ?? [],
          frontmatter: rendered.frontmatter,
          layout:
            typeof rendered.frontmatter.layout === 'string'
              ? rendered.frontmatter.layout
              : current.layout,
        };
        const index = pages.findIndex((page) => page.url === current?.url);
        if (index >= 0) {
          pages[index] = current;
        }
      } else {
        current = { ...current, html: bodyHtml };
      }

      const html = postprocessDevHtml(
        renderPage(current, {
          theme: archivesTheme,
          siteName: SITE_TITLE,
          base: '/',
          nav: [],
          pages,
        }),
      );

      res.statusCode = request.kind === 'notFound' ? 404 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.end(html);
    } catch (error) {
      console.error('[archives-dev] Failed to render page:', error);
      next(error);
    }
  };
}
