const baseName = process.env.BASE_NAME || 'アーカイブ'
const baseDesc =
  process.env.BASE_DISC ||
  'このページはyamanokuこと大山奥人が書いてきた過去の記事やログを収集したページです。'
const baseUrl = process.env.BASE_URL || 'https://yamanaoku.net/archive'

const rehypePlugins = [
  'rehype-plugin-auto-resolve-layout-shift',
  'rehype-plugin-image-native-lazy-loading',
]

if (process.env.NODE_ENV === 'production') {
  rehypePlugins.push([
    'rehype-plugin-auto-resolve-layout-shift',
    { type: 'maxWidth', maxWidth: 720 },
  ])
}

export default {
  target: 'static',
  telemetry: false,
  env: {
    baseName,
    baseDesc,
    baseUrl,
  },
  head: {
    title: 'アーカイブ',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: baseDesc,
      },
      { name: 'og:title', content: baseName },
      { name: 'og:description', content: baseDesc },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@yamanoku' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['modern-normalize', 'yama-normalize'],
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxt/content'],
  content: {
    markdown: {
      remarkExternalLinks: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      prism: {
        theme: 'prism-themes/themes/prism-a11y-dark.css',
      },
      rehypePlugins,
    },
  },
}
