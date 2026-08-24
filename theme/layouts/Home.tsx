/** @jsxImportSource @ox-content/vite-plugin */
import { each, usePageProps, useSiteConfig } from '@ox-content/vite-plugin';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../src/config.ts';
import { BaseHead } from '../components/BaseHead.tsx';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';
import { TcyDate } from '../components/TcyDate.tsx';
import { formatDate, pageHref, sortArchives } from '../lib/pages.ts';

export function HomeLayout(_props?: { children?: unknown }) {
  const page = usePageProps();
  const site = useSiteConfig();
  const posts = sortArchives(site.pages);

  return (
    <html lang="ja">
      <head>
        <BaseHead
          page={page}
          title={SITE_TITLE}
          description={SITE_DESCRIPTION}
        />
      </head>
      <body>
        <Header />
        <main>
          <h1>アーカイブ</h1>
          <p>
            このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。
          </p>
          <p>
            移行時にリンク切れなど修正しましたが、内容自体は特にアップデートしておりませんので参照する際はその点ご注意ください。
          </p>
          <h2>アーカイブ一覧</h2>
          <p>現在のアーカイブ記事は{String(posts.length)}件あります。</p>
          <button type="button" id="openModalButton">
            記事検索モーダルを開く
          </button>
          <dialog id="dialog">
            <button type="button" id="closeModalButton">
              記事検索モーダルを閉じる
            </button>
            <form id="archive-search-form">
              <label>
                記事を検索
                <input
                  id="archive-search-input"
                  type="search"
                  name="q"
                  autocomplete="off"
                />
              </label>
              <button type="submit">検索</button>
            </form>
            <div id="archive-search-results"></div>
          </dialog>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>記事タイトル</th>
              </tr>
            </thead>
            <tbody>
              {each(posts, (post) => {
                const date = formatDate(post.frontmatter.date);
                return (
                  <tr>
                    <td>
                      <time class="nowrap" datetime={date}>
                        <TcyDate value={date} />
                      </time>
                    </td>
                    <td>
                      <a href={pageHref(post)}>{post.title}</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>LLMsテキスト</h2>
          <p>
            LLM（大規模言語モデル）にarchives.yamanoku.netのコンテンツを提供するため、
            <a href="https://llmstxt.org/">llms.txt</a>
            規約に則ったデータをサポートしています。
          </p>
          <ul>
            <li>
              <a href="/llms.txt">/llms.txt</a> ...
              アーカイブ一覧のリストとリンク
            </li>
            <li>
              <a href="/llms-full.txt">/llms-full.txt</a> ...
              アーカイブ一覧のすべてのコンテンツ内容を含む
            </li>
          </ul>
          <h2>yamanoku.net関連ページ</h2>
          <ul>
            <li>
              <a href="https://yamanoku.net">ポータルサイト</a>
            </li>
            <li>
              <a href="https://records.yamanoku.net">Records</a>
            </li>
          </ul>
        </main>
        <Footer />
        <script defer src="/search.js"></script>
      </body>
    </html>
  );
}
