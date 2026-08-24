/** @jsxImportSource @ox-content/vite-plugin */
import { usePageProps } from '@ox-content/vite-plugin';
import { SITE_DESCRIPTION } from '../../src/config.ts';
import { BaseHead } from '../components/BaseHead.tsx';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';

export function NotFoundLayout(_props?: { children?: unknown }) {
  const page = usePageProps();
  return (
    <html lang="ja">
      <head>
        <BaseHead
          page={page}
          title="ページが見つかりませんでした | yamanoku.net"
          description={SITE_DESCRIPTION}
        />
      </head>
      <body>
        <Header />
        <main>
          <h1>ページが見つかりませんでした</h1>
          <p>
            申し訳ありません。お探しのページが見つかりませんでした。
            <br />
            お手数をおかけしますが、<a href="/">トップページ</a>
            にお戻りください。
          </p>
        </main>
        <Footer />
      </body>
    </html>
  );
}
