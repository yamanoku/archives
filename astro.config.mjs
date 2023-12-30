import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import resolveLayoutShiftPlugin from 'rehype-plugin-auto-resolve-layout-shift'
import lazyloadPlugin from 'rehype-plugin-image-native-lazy-loading';

// https://astro.build/config
export default defineConfig({
  site: 'https://archives.yamanoku.net',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'prism',
    gfm: true,
    rehypePlugins: [
      [resolveLayoutShiftPlugin, { type: 'maxWidth', maxWidth: 900 }],
      lazyloadPlugin,
    ],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る',
    },
  },
});
