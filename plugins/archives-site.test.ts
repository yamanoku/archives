import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { join } from 'node:path';
import { Temporal } from '../src/lib/temporal.ts';
import {
  buildLlms,
  buildRss,
  buildSitemap,
  buildSitemapIndex,
  isSearchableUrl,
  loadArchives,
  prettySearchUrl,
  rewriteMarkdownLinks,
} from './archives-feeds.ts';

describe('archive feeds', () => {
  const archives = loadArchives();

  it('loads every archive markdown file except index and 404', () => {
    assert.ok(archives.length > 0);
    assert.ok(
      archives.every(
        (entry) =>
          entry.slug &&
          entry.title &&
          entry.date instanceof Temporal.PlainDate,
      ),
    );
  });

  it('builds RSS with trailing-slash article links', () => {
    const rss = buildRss(archives);
    assert.match(rss, /<rss version="2.0">/);
    assert.equal([...rss.matchAll(/<item>/g)].length, archives.length);
    assert.match(
      rss,
      /<link>https:\/\/archives\.yamanoku\.net\/report-tskaigi-2026\/<\/link>/,
    );
    assert.match(
      rss,
      /<guid>https:\/\/archives\.yamanoku\.net\/ios-double-tap-bug\/<\/guid>\s*<pubDate>Thu, 27 Jul 2017 00:00:00 GMT<\/pubDate>/,
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
    assert.equal([...sitemap.matchAll(/<url>/g)].length, archives.length + 1);
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

describe(
  'built search index',
  { skip: !existsSync(join(process.cwd(), 'dist/search-index.json')) },
  () => {
    it('keeps BM25 document indices aligned after pretty-URL rewrite', () => {
      const index = JSON.parse(
        readFileSync(join(process.cwd(), 'dist/search-index.json'), 'utf8'),
      ) as {
        documents: Array<{ url: string }>;
        doc_count: number;
      };
      assert.equal(index.documents.length, index.doc_count);
      const articles = index.documents.filter((doc) =>
        isSearchableUrl(doc.url),
      );
      assert.ok(articles.length > 0);
      assert.ok(articles.every((doc) => doc.url.endsWith('/')));
    });
  },
);

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
        'assets/search.js',
        'styles.css',
      ]) {
        assert.equal(existsSync(join(distDir, name)), true, name);
      }
    });

    it('marks the 404 page noindex', () => {
      const notFound = readFileSync(join(distDir, '404.html'), 'utf8');
      assert.match(notFound, /name="robots" content="noindex"/);
    });

    it('keeps tategaki state inside the article layout', () => {
      const article = readFileSync(
        join(distDir, 'ios-double-tap-bug/index.html'),
        'utf8',
      );
      assert.match(article, /id="tategaki-toggle"/);
      assert.match(article, /localStorage\.getItem\('tategaki-mode'\)/);
      assert.doesNotMatch(article, /src="\/tategaki\.js"/);
      assert.equal(existsSync(join(distDir, 'tategaki.js')), false);
    });

    it('omits third-party widget scripts from embed pages', () => {
      const tweetArticle = readFileSync(
        join(distDir, 'vuejs-2024-year-in-review/index.html'),
        'utf8',
      );
      assert.doesNotMatch(
        tweetArticle,
        /platform\.(twitter|x)\.com\/widgets\.js/,
      );

      const speakerArticle = readFileSync(
        join(distDir, 'why-schoo-choose-vue-nuxt/index.html'),
        'utf8',
      );
      assert.doesNotMatch(
        speakerArticle,
        /speakerdeck\.com\/assets\/embed\.js/,
      );
    });
  },
);

describe('archive embed sources', () => {
  it('keeps only ox-content tags for former widget embeds', () => {
    const archivesDir = join(process.cwd(), 'src/archives');
    for (const name of readdirSync(archivesDir).filter((file) =>
      file.endsWith('.md'),
    )) {
      const source = readFileSync(join(archivesDir, name), 'utf8');
      assert.doesNotMatch(source, /class="twitter-tweet"/, name);
      assert.doesNotMatch(source, /speakerdeck-embed/, name);
      assert.doesNotMatch(source, /class="codepen"/, name);
      assert.doesNotMatch(source, /<iframe[^>]+youtube\.com\/embed/, name);
      if (name !== 'colorbox-youtube-tips.md') {
        assert.doesNotMatch(
          source,
          /<iframe[^>]+docs\.google\.com\/presentation/,
          name,
        );
      }
    }
  });
});
