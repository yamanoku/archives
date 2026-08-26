/** @jsxImportSource @ox-content/vite-plugin */
import type { BasePageProps } from '@ox-content/vite-plugin';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../../src/config.ts';
import { normalizeUrl, slugFromPage } from '../lib/pages.ts';

type HeadProps = {
  page: BasePageProps;
  title?: string;
  description?: string;
};

function ogImageUrl(page: BasePageProps): string {
  const url = normalizeUrl(page.url);
  if (url === '/') {
    return `${SITE_URL}/ogp-image.png`;
  }
  const slug = slugFromPage(page);
  if (slug === '404') {
    return `${SITE_URL}/ogp-image.png`;
  }
  return `${SITE_URL}/og-images/${slug}.png`;
}

function canonicalUrl(page: BasePageProps): string {
  const url = normalizeUrl(page.url);
  if (url === '/') {
    return `${SITE_URL}/`;
  }
  if (url === '/404') {
    return `${SITE_URL}/404/`;
  }
  return `${SITE_URL}${url}/`;
}

export function BaseHead({ page, title, description }: HeadProps) {
  const resolvedTitle = title ?? page.title ?? SITE_TITLE;
  const resolvedDescription =
    description ?? page.description ?? SITE_DESCRIPTION;
  const canonical = canonicalUrl(page);
  const image = ogImageUrl(page);
  const noindex = Boolean(page.frontmatter.noindex);

  return (
    <>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <title>{resolvedTitle}</title>
      <meta name="title" content={resolvedTitle} />
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={canonical} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={SITE_TITLE}
        href="/rss.xml"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={resolvedTitle} />
      <meta property="twitter:description" content={resolvedDescription} />
      <meta property="twitter:image" content={image} />
      <meta name="fediverse:creator" content="@yamanoku@mastodon.social" />
      {noindex ? <meta name="robots" content="noindex" /> : null}
      <link rel="stylesheet" href="/styles.css" />
    </>
  );
}
