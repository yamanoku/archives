import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import tcy from '@love-rox/tcy-astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://archives.yamanoku.net',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), tcy({ target: 'digit' })],
  markdown: {
    syntaxHighlight: 'prism',
    gfm: true,
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る',
    },
  },
});
