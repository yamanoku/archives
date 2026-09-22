import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { oxContent } from '@ox-content/vite-plugin';
import { archivesSitePlugin } from './plugins/archives-site.ts';
import { oxContentPluginOptions } from './plugins/ox-content-options.ts';

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
  plugins: [archivesSitePlugin(), oxContent(oxContentPluginOptions())],
});
