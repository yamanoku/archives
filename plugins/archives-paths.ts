const SKIP_PREFIXES = ['/@', '/node_modules/', '/src/', '/assets/'];
const SKIP_EXTENSIONS = [
  '.css',
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.json',
  '.map',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.ico',
  '.xml',
  '.txt',
  '.woff',
  '.woff2',
];

export type ArchivePageRequest =
  | { kind: 'page'; slug: string; fileName: string }
  | { kind: 'notFound' }
  | { kind: 'skip' };

export function pathnameFromUrl(url = '/'): string {
  const path = url.split('?')[0] ?? '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function isArchivePageRequest(url = '/'): boolean {
  const path = pathnameFromUrl(url);
  if (SKIP_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return false;
  }
  const lower = path.toLowerCase();
  return !SKIP_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function resolveArchivePageRequest(
  url = '/',
  slugs: ReadonlySet<string>,
): ArchivePageRequest {
  if (!isArchivePageRequest(url)) {
    return { kind: 'skip' };
  }

  const path = pathnameFromUrl(url);
  const slug = path
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
    .replace(/^\//, '');

  if (slug === '' || slug === 'index') {
    return { kind: 'page', slug: 'index', fileName: 'index.md' };
  }

  if (slugs.has(slug)) {
    return { kind: 'page', slug, fileName: `${slug}.md` };
  }

  return { kind: 'notFound' };
}

export function pageUrlFromSlug(slug: string): string {
  if (slug === 'index') {
    return '/';
  }
  return `/${slug}`;
}
