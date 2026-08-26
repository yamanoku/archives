/** @jsxImportSource @ox-content/vite-plugin */
import { raw, usePageProps } from '@ox-content/vite-plugin';
import { loadDefaultJapaneseParser } from 'budoux';
import { SITE_DESCRIPTION } from '../../src/config.ts';
import { BaseHead } from '../components/BaseHead.tsx';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';
import { OldArticleNote } from '../components/OldArticleNote.tsx';
import { TcyDate } from '../components/TcyDate.tsx';
import { formatDate, slugFromPage } from '../lib/pages.ts';

const parser = loadDefaultJapaneseParser();

function wrapDigitRuns(text: string): string {
  return text.replace(/(\d+)/g, '<span class="tcy">$1</span>');
}

export function ArticleLayout(_props?: { children?: unknown }) {
  const page = usePageProps();
  const date = formatDate(page.frontmatter.date);
  const source = String(page.frontmatter.source ?? '');
  const slug = slugFromPage(page);
  const titleHtml = parser.translateHTMLString(wrapDigitRuns(page.title));
  const gitHubLink = `https://github.com/yamanoku/archives/issues/new?title=アーカイブのドキュメントにまつわる修正依頼&labels=feedback&body=URL：https://archives.yamanoku.net/${slug}%0A修正依頼内容：%0A`;
  const xLink = `https://x.com/share?url=https://archives.yamanoku.net/${slug}&text=@yamanoku`;

  return (
    <html lang="ja">
      <head>
        <BaseHead
          page={page}
          title={`${page.title} | yamanoku.net`}
          description={page.description || SITE_DESCRIPTION}
        />
      </head>
      <body>
        <div id="tategaki-scroll-container">
          <Header
            actions={
              <label>
                <input type="checkbox" id="tategaki-toggle" />
                縦書きモード
              </label>
            }
          />
          <main>
            <article>
              <h1>{raw(titleHtml)}</h1>
              <div class="article-meta">
                {date ? (
                  <time datetime={date}>
                    created at: <TcyDate value={date} />
                  </time>
                ) : null}
                {source ? (
                  <p>
                    出典元: <span class="article-source">{source}</span>
                  </p>
                ) : null}
              </div>
              <OldArticleNote date={page.frontmatter.date} />
              {raw(page.html)}
            </article>
            <p>
              アーカイブ記事のため、内容に関する更新依頼は受け付けておりませんが、誤字や脱字などありましたらご連絡ください。
            </p>
            <details>
              <summary>この記事に関する修正依頼</summary>
              <ul>
                <li>
                  <a href={gitHubLink} target="_blank">
                    GitHub Issue を作成する
                  </a>
                </li>
                <li>
                  <a href={xLink} target="_blank">
                    著者にポストする
                  </a>
                </li>
              </ul>
            </details>
            <a href="/">トップへ戻る</a>
          </main>
          <Footer />
        </div>
        <script defer src="/tategaki.js"></script>
      </body>
    </html>
  );
}
