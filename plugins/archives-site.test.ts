import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { join } from 'node:path';
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
          entry.slug && entry.title && /^\d{4}-\d{2}-\d{2}$/.test(entry.date),
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
      assert.match(article, /addEventListener\(\s*'wheel'/);
      assert.match(article, /scrollLeft\s*-=\s*e\.deltaY/);
      assert.doesNotMatch(article, /src="\/tategaki\.js"/);
      assert.equal(existsSync(join(distDir, 'tategaki.js')), false);
    });

    it('copies article images into the site output', () => {
      assert.equal(
        existsSync(
          join(
            distDir,
            'src/images/why-schoo-choose-vue-nuxt/06985046cec45d688883fdaf876f34c3.png',
          ),
        ),
        true,
      );
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

describe('local article images', () => {
  const archivesDir = join(process.cwd(), 'src/archives');
  const gyazoImageUrl =
    /https:\/\/i\.gyazo\.com\/([a-f0-9]{32})|https:\/\/gyazo\.com\/([a-f0-9]{32})/g;
  const localImageUrl = /\/src\/images\/[^\s)"'\]]+/g;
  // Gyazo returns 503 and a null file size for these IDs, so the bytes cannot be stored yet.
  const unavailableGyazoIds = new Set([
    '0a683b30754e8e77285eb23fd5230cb0', // markup-engineer-think-nuxtjs.md
    '12753c13ba022e6e4fe5504fc17ac2d2', // vuejs-add-codeclimate.md
    '29bd23845de49831e1bb29fd968c9cc7', // sort-order-css-property.md
    '330388a9f5d6d18640bd029b0bf20a0e', // playback-tech-2018.md
    '3695db66547ec47ceeec0ede67462be2', // playback-tech-2018.md
    '3a2a2919e156d721277ae29ebc7a9eae', // playback-tech-2017.md
    '3b6d92ed3d572446412316149a671855', // vuejs-add-codeclimate.md
    '51aadb806dbaa3de145e4d367e7a34dc', // me-and-scrapbox-2019.md
    '5b259b752521774d0bf69f778c38d2fa', // me-and-scrapbox-2019.md
    '5d0e20c2072216fbda4757339a7e8211', // playback-tech-2018.md
    '5f93e65a3b979ae5333aca4f32600611', // playback-tech-2018.md, yamanoku-advent-calendar-2023-12-08.md
    '62de914247a206399a0a67f7f60589a3', // accessibility-advent-calender-2018.md
    '67eb7ad4b9fec816dd50c31544bcbc01', // me-and-scrapbox-2019.md
    '69af6f1b89ec88b2af36e7988f45af44', // playback-tech-2017.md
    '723ddf55036630f0a108a0d11d155e5e', // vuejs-add-codeclimate.md
    '759e8f1ee7e2841f29df75b6b84180d8', // yamanoku-advent-calendar-2023-12-19.md
    '8eaefa123b187ebcb3ef3e03f469b67d', // playback-tech-2017.md
    '9d641538309060936bb229f45d64eeff', // me-and-scrapbox-2019.md
    '9e358448e053d1f1998bd045d413562b', // playback-tech-2018.md
    'ad0755fc9babcc4f48c7080944f04ac4', // playback-tech-2017.md
    'b765e53468af449c647ee78431270049', // get-multiple-data-attributes.md
    'bebf722e1e507c4b4a1fe9b5c01dd81b', // intersection-observer.md
    'c5174a5a6a99b4d7570ca7c5e8080ecf', // set-image-storybook-css.md
    'c6e057f43e4dc45e6a30fa051d61d668', // playback-tech-2018.md
    'cc2cc731deccdd699f8f16437702945f', // velocityjs-pause_and_resume-functions.md
    'd4b4fad35f4449b38284acf64b523a43', // static-site-to-organize-my-surroundings.md
    'd7b3f4fefe8bd36f1728c77524f5ad18', // vuejs-add-codeclimate.md
    'e4ff99807a7e6917ee9f5dfa0be8f5fc', // velocityjs-pause_and_resume-functions.md
    'e8336990759c1b762050251c0c7fe510', // set-image-storybook-css.md
    'e91df68c9bb73a2637ad2fb09da78d64', // nuxt-starter-template-v2-migration.md
    'eb0aa95ee51f245a875b1843fe94c668', // playback-tech-2018.md
    'ee74bcf4c342acdbd50e4ba6f25dcac0', // me-and-scrapbox-2019.md
    'f17c1d5c17a0110f02b1fe6040ab4dd8', // playback-tech-2018.md
    'f70f6b62962682d57cefdfb1779e5ce0', // get-multiple-data-attributes.md
    'fa84c40a62daed27489f55a0c5548823', // me-and-scrapbox-2019.md
  ]);

  it('keeps Gyazo image URLs only when the file cannot be downloaded', () => {
    const seen = new Set<string>();
    for (const name of readdirSync(archivesDir).filter((file) =>
      file.endsWith('.md'),
    )) {
      const source = readFileSync(join(archivesDir, name), 'utf8');
      for (const match of source.matchAll(gyazoImageUrl)) {
        const id = match[1] ?? match[2];
        assert.equal(
          unavailableGyazoIds.has(id),
          true,
          `${name} still links to Gyazo image ${id}`,
        );
        seen.add(id);
      }
    }
    assert.deepEqual([...seen].sort(), [...unavailableGyazoIds].sort());
  });

  it('stores referenced images under src/images', () => {
    for (const name of readdirSync(archivesDir).filter((file) =>
      file.endsWith('.md'),
    )) {
      const source = readFileSync(join(archivesDir, name), 'utf8');
      for (const match of source.matchAll(localImageUrl)) {
        const relativePath = match[0].replace(/^\//, '');
        assert.equal(
          existsSync(join(process.cwd(), relativePath)),
          true,
          `${name} -> ${match[0]}`,
        );
      }
    }
  });
});

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
