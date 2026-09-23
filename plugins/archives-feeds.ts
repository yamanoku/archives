import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../src/config.ts';
import {
  Temporal,
  formatRfc822Utc,
  parsePlainDate,
} from '../src/lib/temporal.ts';

export { isSearchableUrl, prettySearchUrl } from '../src/lib/search-urls.ts';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const archivesDir = join(rootDir, 'src/archives');

export type ArchiveEntry = {
  slug: string;
  title: string;
  description?: string;
  date: Temporal.PlainDate;
  body: string;
  noindex?: boolean;
};

export function loadArchives(): ArchiveEntry[] {
  return readdirSync(archivesDir)
    .filter(
      (name) =>
        name.endsWith('.md') && name !== 'index.md' && name !== '404.md',
    )
    .map((name) => {
      const raw = readFileSync(join(archivesDir, name), 'utf8');
      const parsed = matter(raw);
      return {
        slug: name.replace(/\.md$/, ''),
        title: String(parsed.data.title ?? name),
        description:
          typeof parsed.data.description === 'string'
            ? parsed.data.description
            : undefined,
        date: parsePlainDate(parsed.data.date),
        body: parsed.content,
        noindex: Boolean(parsed.data.noindex),
      };
    })
    .filter(
      (entry): entry is ArchiveEntry => entry.date instanceof Temporal.PlainDate,
    )
    .sort((a, b) => Temporal.PlainDate.compare(b.date, a.date));
}

function formatRssDate(date: Temporal.PlainDate): string {
  return formatRfc822Utc(date);
}

function isoDate(date: Temporal.PlainDate): string {
  return date.toString();
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildRss(archives: ArchiveEntry[]): string {
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

export function buildLlms(archives: ArchiveEntry[]): string {
  const items = archives
    .map(
      (entry) =>
        `- [${entry.title}](${SITE_URL}/${entry.slug}/)${entry.description ? ': ' + entry.description : ''}`,
    )
    .join('\n');
  return `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n## アーカイブ一覧\n\n${items}\n`;
}

export function buildLlmsFull(archives: ArchiveEntry[]): string {
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

export function buildSitemap(archives: ArchiveEntry[]): string {
  const urls = [
    `  <url>
    <loc>${SITE_URL}/</loc>
  </url>`,
    ...archives.map(
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

export function buildSitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE_URL}/sitemap-0.xml</loc></sitemap></sitemapindex>
`;
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
