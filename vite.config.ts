import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { oxContent } from '@ox-content/vite-plugin';
import archivesTheme from './theme/index.tsx';
import { rewriteMarkdownLinks } from './plugins/archives-feeds.ts';
import { archivesSitePlugin } from './plugins/archives-site.ts';

const searchClientEntry = fileURLToPath(
  new URL('./src/search-client.ts', import.meta.url),
);

export default defineConfig({
  appType: 'mpa',
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@ox-content/vite-plugin',
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        search: searchClientEntry,
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'search'
            ? 'assets/search.js'
            : 'assets/[name]-[hash].js',
      },
    },
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
        limit: 20,
        hotkey: '/',
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
