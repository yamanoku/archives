export function isSearchableUrl(url: unknown): boolean {
  if (typeof url !== 'string') {
    return false;
  }
  const normalized = url.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  return normalized !== '/' && normalized !== '/404' && normalized !== '/index';
}

export function prettySearchUrl(url: unknown): unknown {
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
