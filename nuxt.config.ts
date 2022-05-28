import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  target: 'static',
  telemetry: false,
  head: {
    title: 'アーカイブ',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@yamanoku' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://unpkg.com/budoux/bundle/budoux-ja.min.js',
        type: 'module',
      },
    ],
  },
  css: ['modern-normalize', 'yama-normalize'],
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      theme: 'dark-plus'
    },
  },
  vue: {
    config: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('budoux-ja')
      }
    }
  }
});
