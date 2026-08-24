import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { join } from 'node:path';
import {
  buildLlms,
  buildRss,
  buildSitemap,
  buildSitemapIndex,
  isSearchableUrl,
  loadArchives,
  localizeFootnotes,
  prettySearchUrl,
  rewriteMarkdownLinks,
} from './archives-feeds.ts';

describe('archive feeds', () => {
  const archives = loadArchives();

  it('loads every archive markdown file except index and 404', () => {
    assert.equal(archives.length, 179);
    assert.ok(
      archives.every((entry) => entry.slug && entry.title && entry.date),
    );
  });

  it('builds RSS with trailing-slash article links', () => {
    const rss = buildRss(archives);
    assert.match(rss, /<rss version="2.0">/);
    assert.equal([...rss.matchAll(/<item>/g)].length, 179);
    assert.match(
      rss,
      /<link>https:\/\/archives\.yamanoku\.net\/report-tskaigi-2026\/<\/link>/,
    );
  });

  it('builds llms.txt with titles, links, and descriptions', () => {
    const llms = buildLlms(archives);
    assert.match(llms, /^# アーカイブ \| yamanoku\.net/m);
    assert.match(
      llms,
      /\[iOSでダブルタップしないとリンク反応しないバグ対応について\]\(https:\/\/archives\.yamanoku\.net\/ios-double-tap-bug\/\)/,
    );
  });

  it('builds an Astro-compatible sitemap index and includes noindex articles', () => {
    const sitemap = buildSitemap(archives);
    const index = buildSitemapIndex();
    assert.equal([...sitemap.matchAll(/<url>/g)].length, 180);
    assert.match(
      sitemap,
      /<loc>https:\/\/archives\.yamanoku\.net\/about-alien-signals\/<\/loc>/,
    );
    assert.match(
      index,
      /<loc>https:\/\/archives\.yamanoku\.net\/sitemap-0\.xml<\/loc>/,
    );
  });
});

describe('search index helpers', () => {
  it('pretty-prints article URLs with a trailing slash', () => {
    assert.equal(
      prettySearchUrl('/ios-double-tap-bug.html'),
      '/ios-double-tap-bug/',
    );
    assert.equal(prettySearchUrl('ios-double-tap-bug'), '/ios-double-tap-bug/');
  });

  it('keeps only article documents searchable', () => {
    assert.equal(isSearchableUrl('/'), false);
    assert.equal(isSearchableUrl('/404'), false);
    assert.equal(isSearchableUrl('/404.html'), false);
    assert.equal(isSearchableUrl('/ios-double-tap-bug.html'), true);
  });
});

describe('markdown and footnote postprocess', () => {
  it('rewrites relative archive links to pretty URLs', () => {
    const ast = {
      type: 'root',
      children: [
        { type: 'link', url: './ios-double-tap-bug' },
        {
          type: 'link',
          url: './looking-back-at-crowdworks-front-end-activities-2021.md',
        },
        { type: 'link', url: 'https://example.com/foo' },
      ],
    };
    rewriteMarkdownLinks().transform(ast);
    assert.equal(ast.children[0].url, '/ios-double-tap-bug/');
    assert.equal(
      ast.children[1].url,
      '/looking-back-at-crowdworks-front-end-activities-2021/',
    );
    assert.equal(ast.children[2].url, 'https://example.com/foo');
  });

  it('wraps ox-content footnotes with Japanese labels', () => {
    const html =
      localizeFootnotes(`<p>note<sup><a href="#fn-1" id="fnref-1">1</a></sup></p>
<div id="fn-1" class="footnote">
<p>source</p>
<a href="#fnref-1">↩</a>
</div>
`);
    assert.match(html, /<section class="footnotes" data-footnotes="">/);
    assert.match(html, /<h2 id="footnote-label">脚注<\/h2>/);
    assert.match(html, /aria-label="コンテンツに戻る"/);
  });
});

describe(
  'built dist artifacts',
  { skip: !existsSync(join(process.cwd(), 'dist/rss.xml')) },
  () => {
    const distDir = join(process.cwd(), 'dist');

    it('emits RSS, llms, and Astro-compatible sitemaps', () => {
      for (const name of [
        'rss.xml',
        'llms.txt',
        'llms-full.txt',
        'sitemap.xml',
        'sitemap-0.xml',
        'sitemap-index.xml',
        '404.html',
        'search-index.json',
        'styles.css',
      ]) {
        assert.equal(existsSync(join(distDir, name)), true, name);
      }
      const rss = readFileSync(join(distDir, 'rss.xml'), 'utf8');
      assert.equal([...rss.matchAll(/<item>/g)].length, 179);
      const sitemap = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf8');
      assert.equal([...sitemap.matchAll(/<url>/g)].length, 180);
    });

    it('keeps home, article, and 404 chrome', () => {
      const home = readFileSync(join(distDir, 'index.html'), 'utf8');
      assert.match(home, /現在のアーカイブ記事は179件あります/);
      assert.match(home, /src="\/search\.js"/);
      const article = readFileSync(
        join(distDir, 'ios-double-tap-bug/index.html'),
        'utf8',
      );
      assert.match(article, /created at:/);
      assert.match(article, /出典元:/);
      assert.match(article, /src="\/tategaki\.js"/);
      assert.match(article, /<h2 id="footnote-label">脚注<\/h2>/);
      assert.match(article, /class="language-css"/);
      const notFound = readFileSync(join(distDir, '404.html'), 'utf8');
      assert.match(notFound, /ページが見つかりませんでした/);
      assert.match(notFound, /name="robots" content="noindex"/);
    });
  },
);
