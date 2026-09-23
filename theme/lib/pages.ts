import type { BasePageProps } from '@ox-content/vite-plugin';
import { comparePlainDateDesc, formatIsoDate } from '../../src/lib/temporal.ts';

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
  return formatIsoDate(value);
}

export function sortArchives(pages: BasePageProps[]): BasePageProps[] {
  return pages
    .filter(isArchivePage)
    .sort((a, b) =>
      comparePlainDateDesc(a.frontmatter.date, b.frontmatter.date),
    );
}
