---
title: Vue.jsと周辺エコシステムで振り返る2024年
description: 2024年のVue.jsと周辺エコシステムについてを振り返る記事です
date: 2024-12-09
author: yamanoku
source: zenn.dev
category: retrospective
topic: frontend
noindex: true
---

[Vue Advent Calendar 2024](https://qiita.com/advent-calendar/2024/vue)の9日目の記事です。

この記事では2024年のVue.js、そしてそれらにまつわる周辺エコシステムについてを振り返っていきます。関連する大きな出来事や変更があったものについてを中心にまとめています（この内容も取り上げてほしい！というものがあった際は、[GitHubから編集提案](https://github.com/yamanoku/zenn-content/edit/main/articles/vuejs-2024-year-in-review.md)をください）。

## Vue.js

### 公開10周年

<Tweet url="https://twitter.com/vuejs/status/1753678155444101385" displayName="Vue" handle="vuejs" dateLabel="February 3, 2024">10 years ago today, Vue was introduced to the public for the very first time on HackerNews: 10 years later, it is now one of the mostly widely used frontend projects, with a diverse community all over the world.</Tweet>

2024年はVue.jsがHacker Newsで公開されてから10周年目を迎える年でした。Vue.jsの進化の歴史については以下の通りになります。

- 2015年10月: Vue 1リリース
- 2016年10月: Vue 2リリース
- 2018年9月: Vue 3の開発が開始
- 2020年9月: Vue 3リリース
- 2022年1月: Vue 3がデフォルトになる、ドキュメントもVue 3がメインに
- 2023年12月: Vue 2がEoLを迎える

また、今年の9月の時点でnpmからの総ダウンロード数が10億を突破しました。

<Tweet url="https://twitter.com/vuejs/status/1840300340383756759" displayName="Vue" handle="vuejs" dateLabel="September 29, 2024">We just passed 1 billion total downloads on NPM a few days ago :)</Tweet>

### Vue 3.5

[Announcing Vue 3.5 | The Vue Point](https://blog.vuejs.org/posts/vue-3-5)

9月にVue 3.5がリリースされました。コードネームは「Tengen Toppa Gurren Lagann」です。このリリースでは以下の変更が含まれています。

- **リアクティブシステムの最適化**: パフォーマンスが向上し、メモリ使用量が大幅に削減されました
- **リアクティブプロップのデストラクチャリング**: `defineProps` からデストラクチャリングされた変数がリアクティブになりました
- **SSRの改善**: 遅延ハイドレーションや `useId()` などの新機能が追加されました
- **カスタムエレメントの改善**: `defineCustomElement` APIに新機能が追加されました
- **新しいAPI追加**
  - `useTemplateRef()`
  - `Deferred Teleport`
  - `onWatcherCleanup()`

### Vapor Mode

Vapor Modeは[Fine Grained Reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity)の概念を取り入れた仮想DOMを使用しない新たなVue.jsのコンパイル戦略です。Vaporを実装しているVue.jsは現在本体とは[別リポジトリ](https://github.com/vuejs/vue-vapor)で運用されております。

[コンポーネントに関する実装のTODO](https://github.com/vuejs/vue-vapor/issues/4)はほぼ完了となりクローズされております。[ロードマップも](https://github.com/vuejs/vue-vapor/issues/233)公開されており、今年末までにはVitePressコードをVaporで差し替え、ベータ版を公開する予定とのことです。

<Tweet url="https://twitter.com/sanxiaozhizi/status/1857155901532320202" displayName="Kevin Deng 🦋 @sxzz.dev" handle="sanxiaozhizi" dateLabel="November 14, 2024">🎉 Now Vapor can power VitePress with a 💯% identical UI and interaction on homepage.</Tweet>

VitePress内にVaporを組み込むのは現在進行中で、[Issue](https://github.com/vuejs/vue-vapor/issues/289)と[リポジトリ](https://github.com/sxzz/vitepress-vapor)にて進捗が確認できます。

## Vue Router

https://router.vuejs.org/

Vue RouterはVue.jsの公式ルーターライブラリです。

v4.4.0より `RouteNamedMap` による型付きルートのネイティブ・サポートが導入されました。unplugin-vue-routerなしでマップを定義し、型を自動的に推論させることができるようになりました。

v4.5.0よりRouterLinkに `view-transition` Propが追加されました。

## Vitepress

[Announcing VitePress 1.0 | The Vue Point](https://blog.vuejs.org/posts/vitepress-1.0)

VitePressは、Vite製の静的サイトジェネレータ（SSG）です。今年よりv1.0がリリースされました。

## Pinia

https://pinia.vuejs.org/

PiniaはVue.jsの状態管理ライブラリです。

[12月4日にリリースされたv2.3.0](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md#230-2024-12-04)によるとVue 2.7が必要になるのと、2025年1月に登場するPinia 3.0では、Vue 2のサポートを終了する予定とのことです。

## Vue DevTools

<Tweet url="https://twitter.com/vuejs/status/1850796839295176969" displayName="Vue" handle="vuejs" dateLabel="October 28, 2024">📢 Important Update The much improved Vue Devtools v7 has been submitted for review on the Chrome web store under the stable channel, and we are flipping the switch tomorrow. Things to note: - The latest v7 only supports Vue 3. We have separate listings for legacy versions…</Tweet>

Vue DevtoolsはVue.jsのデバッグがブラウザ上でできるChrome拡張機能です。v7からはVue3のみをサポートするようになりました。そのためVue2でデバッグする際はv5やv6を別途使用する必要があります。

## eslint-plugin-vue

https://eslint.vuejs.org/

Vue.jsのESLint pluginであるeslint-plugin-vueでは、以下の新たなルールが追加されました。

- [`vue/enforce-style-attribute`](https://eslint.vuejs.org/rules/enforce-style-attribute.html)
- [`vue/max-props`](https://eslint.vuejs.org/rules/max-props.html)
- [`vue/require-default-export`](https://eslint.vuejs.org/rules/require-default-export.html)
- [`vue/max-template-depth`](https://eslint.vuejs.org/rules/max-template-depth.html)
- [`vue/no-deprecated-delete-set`](https://eslint.vuejs.org/rules/no-deprecated-delete-set.html)

そのほかVue3.4からの `v-bind` same-name shorthandと `defineModel` のサポートが追加されたり、Flat ConfigサポートやESLint v9をpeer dependencyとして追加するなどの変更も行われました。

## Vue Language Tools

https://github.com/vuejs/language-tools

Vue Language ToolsはVSCodeでのVue関連の開発支援する拡張機能、VueファイルのTypeCheckをしてくれるツールなどを提供しているリポジトリです。

Vue Language Toolsの基盤となっているVolarの[v2.0.0](https://gist.github.com/johnsoncodehk/62580d04cb86e576e0e8d6bf1cb44e73)が今年リリースされました。Takeover Modeは廃止され、Vueファイルに対するすべてのTS機能を引き継ぐHybrid Modeが導入され、vue-tscを書き換えてメモリ使用量を大幅に削減するなどの変更が加えられました。

## VueUse

VueUseはVue.jsのComposition APIを用いて作られたユーティリティライブラリです。

https://vueuse.org/

今年はv11、v12のメジャーバージョンアップがありました。[v12](https://github.com/vueuse/vueuse/releases/tag/v12.0.0)よりVue2のサポートを終了し、Vue3のみをサポートするようになりました。

## Vue I18n

Vue I18nはVue.jsの国際化（i18n）ライブラリです。

https://github.com/intlify/vue-i18n/releases/tag/v10.0.0

v10.0.0では軽量版のpetite-vue-i18n、JITコンパイルの有効化がデフォルトに、設定されたLocaleに合わせた型生成、レガシー APIモードの `$t` と `t` のオーバーロードシグネチャの変更などがされました。

次期バージョンのv11からはLegacy API modeの非推奨化や、v10から非推奨としていた `$tc` と `tc` のAPI廃止が計画されています。

## UIフレームワーク

Vue.jsにまつわるUIフレームワークやコンポーネントライブラリで大きな変更があったものについてを取り上げます。

### PrimeVue

PrimeVueはPrimeFacesというカスタマイズ可能なUIコンポーネントライブラリを提供するプロジェクトのVue.js版です。

<Tweet url="https://twitter.com/primevue/status/1833504714908176650" displayName="PrimeVue" handle="primevue" dateLabel="September 10, 2024">PrimeVue has reach 1 million downloads per month on npm. Thank you 💚 #vuejs p.s. Just getting started, job is not done yet...</Tweet>

2024年9月時点でnpmでの月間100万ダウンロードを突破しました。

今年はフォームを構築できる[Form ライブラリ](https://primevue.org/forms/)、[Figma UI Kit](https://primevue.org/uikit/)、コピーペーストで使用できるUI群の[Prime Blocks](https://primeblocks.org/)のVue.js版が公開されました。

### Vuetify

https://vuetifyjs.com/en/blog/state-of-the-union-2024/

Vue.jsのコンポーネントライブラリとして有名なVuetifyが、認証と状態管理のためのツールである[Vuetify One](https://one.vuetifyjs.com/)、コード共有ツールである[Vuetify Bin](https://bin.vuetifyjs.com/)、プレグラウンドツールである[Vuetify Playground](https://play.vuetifyjs.com/)、Vuetifyを使ったUIスニペット集を公開するサイトである[Vuetify Snips](https://snips.vuetifyjs.com/)といったエコシステムツールやサイトが公開されました。

<Tweet url="https://twitter.com/vuetifyjs/status/1859672959822201020" displayName="Vuetify" handle="vuetifyjs" dateLabel="November 21, 2024">Vuetify Studio has officially opened its doors! This is more than just a space; it's a dynamic hub for creating, innovating, and mastering UI/UX design with Vuetify. Whether you’re a developer looking to streamline your workflows, a designer aiming to craft stunning interfaces,…</Tweet>

11月にはVuetifyのテーマエディターでもある[Vuetify Studio](https://studio.vuetifyjs.com/)がリリースされました。

### Oku UI

https://oku-ui.com/

Vue.js、Nuxt利用できるUIコンポーネントライブラリである[Oku Primitives](https://primitives.oku-ui.com/)を公開しているOku UIで、モーションにまつわるライブラリの[Oku Motion](https://motion.oku-ui.com/)、NuxtとNitro Kitでフルスタックアプリケーション開発ができるようになる[Pergel](https://pergel.oku-ui.com/)が今年公開されました。

### Unovue

https://unovue.com/

Vueのコンポーネントやユーティリティ集であるUnovueが公開されました。

現在、ヘッドレスコンポーネントのRadix Vueをリブランドした[Reka UI](https://reka-ui.com/)、再利用可能なVueコンポーネント群の[Inspira UI](https://inspira-ui.com/)、shadcn/ui非公式のコミュニティ主導でのVue移植版である[shadcn-vue](https://www.shadcn-vue.com/)がまとめられています。

## GovUK Vue

https://govukvue.org/

イギリス政府のデザインシステムである[GOV.UK Design System](https://design-system.service.gov.uk/)をVueコンポーネントを提供する非公式プロジェクトが公開されました。

## Storybook

https://storybook.js.org/blog/first-class-vue-support-storybook-8/

コンポーネントカタログツールのStorybookでのv8からは、Vue公式のLanguage ToolsであるVolarを活用してStorybookとVue.jsの連携が強化されました。docgenでは `vue-component-meta` を使用するようになりました。VueプロジェクトにおいてReactをpeer dependencyとしてインストールする必要もなくなりました。

## v0 for Vue

<Tweet url="https://twitter.com/v0/status/1834036748932055175" displayName="v0" handle="v0" dateLabel="September 12, 2024">v0 can now answer questions about Svelte, Vue, and Remix. To help us improve quality, please downvote responses you find unhelpful.</Tweet>

Vercelが提供するAI駆動型のUI生成ツール「V0」がVue.jsでのアプリケーション生成に対応しました。

## The State of Vue.js 2025 Survey

[The State of Vue.js Report 2025 - Developer Survey](https://docs.google.com/forms/d/e/1FAIpQLSc6QQQ14ZuE4akaTZAkqOAMUSGjXVjKS-KuVu2eZ448jzK1Nw/viewform)

Vue.jsの開発者向けサーベイが公開されました。Vue.jsやNuxtの利用状況や課題についての項目についてを回答できます。この結果を元に来年には「The State of Vue.js Report 2025」としてレポートが公開される予定です。英語での回答になりますが、日本のVue.js、Nuxt開発者もサーベイに参加してみましょう。

---

同日の[Nuxt / UnJS Advent Calendar 2024](https://qiita.com/advent-calendar/2024/nuxt-and-unjs)ではNuxtと周辺のエコシステムについての2024年を振り返っています。こちらも併せてご覧になってみてください。

[Nuxt/UnJSと周辺エコシステムで振り返る2024年](./nuxt-unjs-2024-year-in-review)
