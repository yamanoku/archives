import type { BasePageProps } from '@ox-content/vite-plugin';

export function layoutName(page: BasePageProps): string {
  return String(page.layout ?? page.frontmatter.layout ?? 'default');
}

export function normalizeUrl(url: string): string {
  if (
    !url ||
    url === '/index.html' ||
    url === '/index' ||
    url === 'index.html'
  ) {
    return '/';
  }
  const stripped = url.replace(/\.html$/, '').replace(/\/index$/, '');
  if (stripped === '' || stripped === '/') {
    return '/';
  }
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function pageHref(page: BasePageProps): string {
  const url = normalizeUrl(page.url);
  if (url === '/') {
    return '/';
  }
  return `${url}/`;
}

export function slugFromPage(page: BasePageProps): string {
  return normalizeUrl(page.url).replace(/^\//, '');
}

export function isArchivePage(page: BasePageProps): boolean {
  const layout = layoutName(page);
  if (layout === 'home' || layout === 'notFound') {
    return false;
  }
  const url = normalizeUrl(page.url);
  if (url === '/' || url === '/404') {
    return false;
  }
  return page.frontmatter.date != null;
}

export function formatDate(value: unknown): string {
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
      return match[1];
    }
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.valueOf())) {
      return formatUtcDate(parsed);
    }
    return '';
  }
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return formatUtcDate(value);
  }
  if (typeof value === 'number') {
    return formatUtcDate(new Date(value));
  }
  return '';
}

function formatUtcDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function sortArchives(pages: BasePageProps[]): BasePageProps[] {
  return pages
    .filter(isArchivePage)
    .sort(
      (a, b) =>
        new Date(String(b.frontmatter.date)).valueOf() -
        new Date(String(a.frontmatter.date)).valueOf(),
    );
}
