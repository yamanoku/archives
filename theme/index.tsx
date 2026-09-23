/** @jsxImportSource @ox-content/vite-plugin */
import { usePageProps } from '@ox-content/vite-plugin';
import { ArticleLayout } from './layouts/Article.tsx';
import { HomeLayout } from './layouts/Home.tsx';
import { NotFoundLayout } from './layouts/NotFound.tsx';
import { layoutName, normalizeUrl } from './lib/pages.ts';

export default function ArchivesTheme(props: { children?: unknown }) {
  const page = usePageProps();
  const url = normalizeUrl(page.url);
  const layout = layoutName(page);

  if (layout === 'home' || url === '/') {
    return HomeLayout(props);
  }
  if (layout === 'notFound' || url === '/404') {
    return NotFoundLayout(props);
  }
  return ArticleLayout(props);
}
