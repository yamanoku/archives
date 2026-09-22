import type { OxContentOptions } from '@ox-content/vite-plugin';
import archivesTheme from '../theme/index.tsx';
import { SITE_TITLE, SITE_URL } from '../src/config.ts';
import { rewriteMarkdownLinks } from './archives-feeds.ts';

export function oxContentPluginOptions(): OxContentOptions {
  return {
    srcDir: 'src/archives',
    outDir: 'dist',
    gfm: true,
    footnotes: true,
    tables: true,
    highlight: true,
    cjkEmphasis: true,
    docs: false,
    ogImage: false,
    search: {
      placeholder: '記事を検索',
      limit: 20,
      hotkey: '/',
    },
    transformers: [rewriteMarkdownLinks()],
    ssg: {
      siteName: SITE_TITLE,
      siteUrl: SITE_URL,
      lang: 'ja',
      render: archivesTheme,
    },
  };
}
