import { defineConfig } from 'vite';
import { oxContent } from '@ox-content/vite-plugin';
import archivesTheme from './theme/index.tsx';
import {
  archivesSitePlugin,
  rewriteMarkdownLinks,
} from './plugins/archives-site.ts';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@ox-content/vite-plugin',
  },
  plugins: [
    oxContent({
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
      },
      transformers: [rewriteMarkdownLinks()],
      ssg: {
        siteName: 'アーカイブ | yamanoku.net',
        siteUrl: 'https://archives.yamanoku.net',
        lang: 'ja',
        render: archivesTheme,
      },
    }),
    archivesSitePlugin(),
  ],
});
