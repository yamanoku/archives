import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rehypeTcy } from './src/plugins/rehype-tcy.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://archives.yamanoku.net',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'prism',
    gfm: true,
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る',
    },
    rehypePlugins: [rehypeTcy],
  },
});
