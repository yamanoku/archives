---
title: フロントエンド技術周辺のアップデートから振り返る2024年
description: フロントエンド技術周辺のアップデートをもとに2024年を振り返ってみました
date: 2024-12-01
author: yamanoku
source: qiita.com
noindex: true
---

この記事は[Schoo Advent Calendar 2024](https://qiita.com/advent-calendar/2024/schoo)の1日目の記事になります。

こんにちは。今年の6月に入社したフロントエンドエンジニアの [@okuto_oyama](https://qiita.com/okuto_oyama) です。オンボーディングやキャッチアップをしながら、あれやこれやと業務をこなしている間にもう半年が経とうとしています。

11月からは技術戦略部門に所属し、会社全体の技術的なビジョンとアーキテクチャ策定や体制づくりをするミッションとなっています。
最近はフロントエンド開発指針の見直しや新環境に向けたPoC検証、デザインシステム開発のサポート、DatadogのRUM導入支援やモニタリングなどを細々とやっています。

---

Schooアドベントカレンダー最初の記事では、フロントエンド開発にまつわる周辺技術が今年どれだけアップデートされたかを見つつ2024年を振り返ってみる内容をお送りいたします。

ライブラリも無限にあるので対象とするものを明確にするため以下のジャンルで括ろうと思っております。

- フロントエンドフレームワーク
- メタフレームワーク [^1]
- ランタイム
- CSS
- UIフレームワーク
- パッケージマネージャ
- モバイル＆デスクトップアプリ
- ビルド・バンドルツール
- モノレポツール
- バックエンドフレームワーク
- テストツール
- リンター・フォーマッターツール
- 型ツール

[^1]: とあるフロントエンドフレームワークを基にアプリケーションのレンダリングと配信に重点を置いたフレームワークと定義

できる限り主要なものは収集していますが、あのライブラリ・フレームワークが入ってないじゃん！となった場合はすみません。

バージョン比較のレギュレーションについては以下で行う形になります。

**レギュレーション**

- CHANGELOGやリリースノートを参考にしたバージョン表記
- α、β、RCやCanaryなどのプレリリースバージョンは含めない
- 今年一年でプレリリースを除くバージョンアップがなかったものは除く
- メジャーバージョンが上がったものは**太字**で表記する

それでは、いってみましょう。

## フロントエンドフレームワーク

|                                                           | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| --------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [React](https://github.com/facebook/React/releases)       | v18.2.0                        | v18.3.1                       |
| [Vue.js](https://github.com/vuejs/core/releases)          | v3.4.3                         | v3.5.13                       |
| [Angular](https://github.com/angular/angular/releases)    | v17.0.8                        | **v19.0.1**                   |
| [Svelte](https://github.com/sveltejs/svelte/releases)     | v4.2.8                         | **v5.3.0**                    |
| [SolidJS](https://github.com/solidjs/solid/releases)      | v1.7.0                         | v1.9.0                        |
| [Preact](https://github.com/preactjs/preact/releases)     | v10.19.3                       | v10.25.0                      |
| [Alpine.js](https://github.com/alpinejs/alpine/releases)  | v3.13.3                        | v3.14.5                       |
| [Qwik](https://github.com/QwikDev/qwik/releases)          | v1.2.14                        | v1.11.0                       |
| [htmx](https://github.com/bigskysoftware/htmx/releases)   | v1.9.10                        | **v2.0.3**                    |
| [Lit](https://github.com/lit/lit/releases)                | v3.1.0                         | v3.2.1                        |
| [Stencil](https://github.com/ionic-team/stencil/releases) | v4.9.0                         | v4.22.3                       |

フロントエンドフレームワークでメジャーアップデートがあったものはAngular、Svelte、htmxになります。

Angularは2回のメジャーバージョンアップにおいてサーバーサイドレンダリング機能の改善・強化がされています。その他、昨年発表されたリアクティブプリミティブであるSignal APIがStable化、v18のアップデートに際してAngularの公式ドキュメントサイトが刷新されました。

Svelte v5の目玉としては[Runes API](https://svelte.jp/blog/runes)があげられます。リアクティブシステムの刷新として宣言により明確に処理がわかりやすくなりました。

ReactではReact 19に向けた更新準備が進められています。アプリケーションを最適化をするための新しいコンパイラである[React Compiler]()の発表もありました。

## メタフレームワーク

|                                                               | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Next.js](https://github.com/vercel/next.js/releases)         | v14.0.4                        | **v15.0.3**                   |
| [Remix](https://github.com/remix-run/remix/releases)          | v2.4.1                         | v2.15.0                       |
| [Gatsby](https://github.com/gatsbyjs/gatsby/releases)         | v5.13.1                        | v5.14.0                       |
| [Nuxt](https://github.com/nuxt/nuxt/releases)                 | v3.9.0                         | v3.14.1592                    |
| [SvelteKit](https://github.com/sveltejs/kit/releases)         | v2.0.6                         | v2.9.0                        |
| [SolidStart](https://github.com/solidjs/solid-start/tags)     | v0.4.2                         | **v1.0.10**                   |
| [QwikCity](https://github.com/QwikDev/qwik/releases)          | v1.2.14                        | v1.11.0                       |
| [Redwood](https://github.com/redwoodjs/redwood/releases)      | v6.6.0                         | **v8.4.1**                    |
| [Astro](https://github.com/withastro/astro/releases)          | v4.0.7                         | v4.16.16                      |
| [Docusaurus](https://github.com/facebook/docusaurus/releases) | v3.0.1                         | v3.6.3                        |
| [VitePress](https://github.com/vuejs/vitepress/releases)      | v0.22.4                        | **v1.5.0**                    |
| [Lume](https://github.com/lumeland/lume/releases)             | v2.0.1                         | v2.4.2                        |
| [Analog](https://github.com/analogjs/analog/releases)         | v0.2.29                        | **v1.9.4**                    |

メタフレームワークでメジャーアップデートがあったものはNext.js、Redwood、SolidStart、VitePress、Analogになります。
SolidStart、VitePress、Analogは今年からv1.0.0にアップデートがなされました。

Next.jsではGETルートハンドラーとクライアントルーターキャッシュをデフォルトではキャッシュしないようにするCaching Semanticsという大きな変更が入りました。その他、React 19 RCの採用やTurbopack DevのStableも含まれています。

Remixは今年のReact Summitにて[React Routerへのブランド統合](https://remix.run/blog/merging-remix-and-react-router)が発表されました。[11月22日にReact Router v7への更新があり](https://remix.run/blog/react-router-v7)、そちらへのアップデートを勧められています。

Nuxtでは次期バージョンに向けての設定からv4の機能を使えるフラグ（`compatibilityVersion`）を用意しており、アップデートの追従をしやすくしています。
ちなみに現在は変わったバージョンになっていますが、これは3.14のリリースに際して小数点のようなバージョン更新をしていくとのことです。今後hotfixがあった際は後ろの数字が増えていくそうです。

Astroではv4.12より[Server Islands](https://astro.build/blog/future-of-astro-server-islands/)という静的HTMLと動的に生成されたサーバーコンポーネントを組み合わせられる機能が実験的に導入されております。

Docusaurusでは「[Docusaurus Faster](https://github.com/facebook/docusaurus/issues/10556)」というビルド時間とメモリ消費を大幅に削減させるプロジェクトにおいて、Rustベースでのツールを使用しビルド時間の高速化ができるようなオプションを追加しました。

## ランタイム

|                                                       | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ----------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Node.js](https://github.com/nodejs/node/releases)    | v21.5.0                        | **v23.3.0**                   |
| [Deno](https://github.com/denoland/deno/releases)     | v1.39.1                        | **v2.1.2**                    |
| [Bun](https://github.com/oven-sh/bun/releases)        | v1.0.20                        | v1.1.38                       |
| [Hermes](https://github.com/facebook/hermes/releases) | v0.12.0                        | v0.13.0                       |

ランタイムでメジャーアップデートがあったものはNode.jsとDenoになります。

今年はNode.js v22がLTS（Long Term Support）になり、最新版としてv23が公開されました。大きな目玉としては`require()`でESMを読み込む機能が搭載されました。[top-level await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await#%E6%9C%80%E4%B8%8A%E4%BD%8D%E3%81%AE_await)を使用しているものはエラーとなって使えませんが、それを除けばESMのみで配布されているパッケージをCJSの環境でも使えるようになりました。
また、yarnやpnpmの管理を容易にするCorepackの[Node.js本体からの削除計画が進んでいる](https://socket.dev/blog/node-js-takes-steps-towards-removing-corepack)という話も今年ありました。

Denoはv2となり新たなパッケージ管理方法が追加され、今年発表された[JSR](https://jsr.io/)（the JavaScript Registry）のサポートも入りました。v1とは異なるものとしてDenoの標準ライブラリ「[deno_std](https://jsr.io/@std)」は本体と分離されたり、Node.js互換性を高めていくなども変更点として挙げられます。

Bunは[v1.1.28よりC言語のコンパイルとJavaScriptプログラムからの実行](https://bun.sh/blog/compile-and-run-c-in-js)ができるようになりました。

## CSS

|                                                                                      | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ------------------------------------------------------------------------------------ | ------------------------------ | ----------------------------- |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss/releases)                 | v3.4.0                         | v3.14.5                       |
| [UnoCSS](https://github.com/unocss/unocss/releases)                                  | v0.58.2                        | v0.64.1                       |
| [Panda CSS](https://github.com/chakra-ui/panda/blob/main/CHANGELOG.md)               | v0.23.0                        | v0.48.0                       |
| [styled-components](https://github.com/styled-components/styled-components/releases) | v6.1.6                         | v6.1.13                       |
| [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract/releases)   | v1.14.0                        | v1.16.1                       |
| [StyleX](https://github.com/facebook/stylex/tags)                                    | v0.3.0                         | v0.9.3                        |

取り上げているCSS関連のものでメジャーアップデートがあったものは特にありません。

Tailwind CSSについては来年リリースされる予定のv4に向けて[ベータ版が公開されています](https://tailwindcss.com/blog/tailwindcss-v4-beta)。

## UIフレームワーク

|                                                                                    | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ---------------------------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Chakra UI](https://github.com/chakra-ui/chakra-ui/releases)                       | v2.8.2                         | **v3.2.2**                    |
| [Material UI](https://github.com/mui/material-ui/releases)                         | v5.15.2                        | **v6.1.9**                    |
| [Ant Design](https://github.com/ant-design/ant-design/releases)                    | v5.12.7                        | v5.22.2                       |
| [NextUI](https://github.com/nextui-org/nextui/releases)                            | v2.2.9                         | v2.4.8                        |
| [Nuxt UI](https://github.com/nuxt/ui/releases)                                     | v2.11.1                        | v2.19.1                       |
| [Angular Material](https://github.com/angular/components/releases)                 | v17.0.4                        | **v19.0.1**                   |
| [SvelteUI](https://github.com/svelteuidev/svelteui/releases)                       | v0.15.3                        | v0.15.7                       |
| [daisyUI](https://daisyui.com/docs/changelog/)                                     | v4.4.24                        | v4.12.14                      |
| [Kuma UI](https://github.com/kuma-ui/kuma-ui/blob/main/packages/core/CHANGELOG.md) | v1.5.5                         | v1.5.8                        |
| [Yamada UI](https://github.com/yamada-ui/yamada-ui/blob/main/CHANGELOG.md)         | v1.1.1                         | v1.7.0                        |
| [Bootstrap](https://github.com/twbs/bootstrap/releases)                            | v5.3.2                         | v5.3.3                        |

UIフレームワークでメジャーアップデートがあったものはCharkra UI、Material UI、Angular Materialです。

Chakra UIのv3では、パフォーマンス・速度・コンポーネントの一貫性を向上させるために新たな設計で書き直されるようになりました。

MUIのv6では試験的に[Pigment CSS](https://github.com/mui/pigment-css)というゼロランタイムのスタイリングライブラリが導入されるようになりました。

## パッケージマネージャ

|                                                         | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [npm](https://github.com/npm/cli/releases)              | v10.2.5                        | v10.9.1                       |
| [yarn](https://github.com/yarnpkg/yarn/releases)        | v1.22.21                       | v1.22.22                      |
| [yarn berry](https://github.com/yarnpkg/berry/releases) | v4.0.2                         | v4.5.3                        |
| [pnpm](https://github.com/pnpm/pnpm/releases)           | v8.13.1                        | **v9.14.4**                   |

パッケージマネージャでメジャーアップデートがあったものはpnpmになります。

pnpmはv9のバージョンアップにおいてCorepackとの互換性を維持するようになりました。

## モバイル＆デスクトップアプリ

|                                                                       | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| --------------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [React Native](https://github.com/facebook/react-native/releases)     | v0.72.8                        | v0.76.3                       |
| [Expo](https://github.com/expo/expo/blob/main/CHANGELOG.md)           | v50.0.0                        | **v52.0.0**                   |
| [Electron](https://github.com/electron/electron/releases/)            | v28.1.0                        | **v33.2.1**                   |
| [Capacitor](https://github.com/ionic-team/capacitor/releases)         | v5.6.0                         | v6.2.0                        |
| [Tauri](https://github.com/tauri-apps/tauri/releases)                 | v1.5.4                         | **v2.1.1**                    |
| [NativeScript](https://github.com/NativeScript/NativeScript/releases) | v8.6.2                         | v8.8.6                        |

モバイル＆デスクトップアプリでメジャーアップデートがあったものはExpo、Electron、Tauriになります。

React Nativeはv0.76.2より新たなアーキテクチャを採用するようになりました。コンポーネントのレンダリング方法、JavaScript 層からNativeコードを同期的に呼び出せるようになったこと、異なるスレッド間での作業のスケジューリング方法、アプリの起動速度や全体サイズの削減などの改善も行われています。

Tauriのv2では今までデスクトップOSだけが対象だったところをiOS、AndroidのスマートフォンOSにも対象を拡張しています。
Rust製の新たなブラウザエンジン「[Servo](https://github.com/servo/servo)」をTauriのWebレンダリングライブラリとして取り組むプロジェクトも始まっています。

## ビルド・バンドルツール

|                                                             | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ----------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Vite](https://github.com/vitejs/vite/releases)             | v5.0.10                        | **v6.0.1**                    |
| [SWC](https://github.com/swc-project/swc/releases)          | v1.3.102                       | v1.9.3                        |
| [esbuild](https://github.com/evanw/esbuild/releases)        | v0.19.11                       | v0.24.0                       |
| [Parcel](https://github.com/parcel-bundler/parcel/releases) | v2.11.0                        | v2.13.2                       |
| [Rollup](https://github.com/rollup/rollup/releases)         | v4.9.2                         | v4.28.0                       |
| [Webpack](https://github.com/webpack/webpack/releases)      | v5.89.0                        | v5.96.1                       |
| [Rspack](https://github.com/web-infra-dev/rspack/releases)  | v0.4.5                         | **v1.1.4**                    |
| [Rolldown](https://github.com/rolldown/rolldown/releases)   | -                              | v0.14.0                       |

ビルド・バンドルツールでメジャーアップデートがあったものはVite、Rspackになります。

ByteDance内では、Rspackの週間ダウンロード数は40万を超え、TikTokなどのいくつものアプリケーションにて使用されています。マイクロフロントエンドのアーキテクチャパターンでもある「Module Federation」のv2がサポートされています。

Viteのv6では[Environment API](https://ja.vite.dev/guide/api-environment)という異なるランタイムでの複数のバンドルを可能にする実験的機能がリリースされました。

RustのJavaScriptバンドラーツールであるRolldownも今年ついに公開となりました。まだ安定版にはなっておりませんが、来年以降でViteへの取り込まれエコシステム全体が改善していけることが期待されています。

## モノレポツール

|                                                                                 | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ------------------------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Lerna](https://github.com/lerna/lerna/releases)                                | v8.0.1                         | v8.1.9                        |
| [Turborepo](https://github.com/vercel/turborepo/releases)                       | v1.11.2                        | **v2.3.3**                    |
| [Nx](https://github.com/nrwl/nx/releases)                                       | v17.2.8                        | **v20.1.4**                   |
| [Bazel](https://github.com/bazelbuild/bazel/releases)                           | v7.0.0                         | v7.4.1                        |
| [Rush](https://github.com/microsoft/rushstack/blob/main/apps/rush/CHANGELOG.md) | v5.112.2                       | v5.141.3                      |
| [moon](https://github.com/moonrepo/moon/releases)                               | v1.18.5                        | v1.30.2                       |

モノレポツールでメジャーアップデートがあったものはTurborepo、Nxになります。

Turborepoはv2のアップデートに伴い、ライセンスをMITに変更し、LTSのポリシーが追加されました。

Nxではv18のリリースに伴いLaunch Nx Weekという発表イベントを行いました。その中で[Project Crystal](https://nx.dev/blog/what-if-nx-plugins-were-more-like-vscode-extensions)というNxプラグインの利用を簡単にして、開発者が効率的に作業を進めるためのツールについて発表されました。

## バックエンドフレームワーク

|                                                          | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| -------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Express](https://github.com/expressjs/express/releases) | v4.18.2                        | **v5.0.1**                    |
| [Koa](https://github.com/koajs/koa/tags)                 | v2.15.0                        | v2.15.3                       |
| [Fastify](https://github.com/fastify/fastify/releases)   | v4.25.2                        | **v5.1.0**                    |
| [NestJS](https://github.com/nestjs/nest/releases)        | v10.3.0                        | v10.4.12                      |
| [Hono](https://github.com/honojs/hono/releases)          | v3.11.11                       | **v4.6.12**                   |

バックエンドフレームワークでメジャーアップデートがあったものはExpress、Fastify、Honoになります。

Expressは10年もの時を経て（！）v5にアップデートされました。昨今のオープンソースのサプライチェーンセキュリティの強化のためにセキュリティ監査を実施するようになっています。ReDoS攻撃のリスクを下げるために、サブエクスプレッションの正規表現（`/:foo(\\d+)`のような形）でのサポートが削除されました。

Honoではv4より静的サイトジェネレーター、Client Components、ファイルベースルーティングなどよりフルスタックに扱えるための機能が搭載されました。

## テストツール

|                                                                    | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ------------------------------------------------------------------ | ------------------------------ | ----------------------------- |
| [Vitest](https://github.com/vitest-dev/vitest/releases)            | v1.1.1                         | **v2.1.6**                    |
| [Mocha](https://github.com/mochajs/mocha/releases)                 | v10.2.0                        | v10.8.2                       |
| [Playwright](https://github.com/microsoft/playwright/releases)     | v1.40.1                        | v1.49.0                       |
| [WebdriverIO](https://github.com/webdriverio/webdriverio/releases) | v8.27.1                        | **v9.4.1**                    |
| [Cypress](https://github.com/cypress-io/cypress/releases)          | v13.6.2                        | v13.16.0                      |
| [Selenium](https://github.com/SeleniumHQ/selenium/releases)        | v4.16.0                        | v4.27.0                       |
| [Puppeteer](https://github.com/puppeteer/puppeteer/releases)       | v21.6.1                        | **v23.9.0**                   |
| [Storybook](https://github.com/storybookjs/storybook/releases)     | v7.6.6                         | **v8.4.6**                    |
| [Mock Service Worker](https://github.com/mswjs/msw/releases)       | v2.0.11                        | v2.6.6                        |

テストツールでメジャーアップデートがあったものはVitest、WebdriverIO、Puppeteer、Storybookになります。

Vitestはv2.0より[Browser Mode](https://vitest.dev/guide/browser/)がExperimentalな機能として搭載されました。これにより実際のブラウザ上でVitestによるテストが実行できるようになりました。

クロスブラウザでのテスト自動化の次世代標準プロトコルである[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)の採用をWebdriverIOでも取り入れるようになりました。こちらはSeleniumやPuppeteerでも採用されています。

Storybookは厳密にはテストツールの分類ではないですが、今やフロントエンドテストツールとして不動の地位を築き上げつつあります。
Chromaticを取り込んだ新たなビジュアルテスト、テストの高速化ができるオプションの追加がされています。他には`react`と`react-dom`のpeer dependencyも取り除かれているためReact以外のフロントエンドフレームワークフレンドリーになっています。

## リンター・フォーマッターツール

|                                                                  | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ---------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [ESLint](https://github.com/eslint/eslint/releases)              | v8.56.0                        | **v9.16.0**                   |
| [Stylelint](https://github.com/stylelint/stylelint/releases)     | v16.1.0                        | v16.11.0                      |
| [Prettier](https://github.com/prettier/prettier/releases)        | v3.1.1                         | v3.4.1                        |
| [Biome](https://github.com/biomejs/biome/blob/main/CHANGELOG.md) | v1.4.1                         | v1.9.4                        |
| [oxlint](https://github.com/oxc-project/oxc/releases)            | v0.0.22                        | v0.14.0                       |

リンター・フォーマッターツールでメジャーアップデートがあったものはESLintになります。

ESLintではv9のバージョンアップに伴い、Flat Configがデフォルトの設定ファイル形式となりました。次のv10では過去の設定ファイルが廃止となるため、今のうちに移行を進めておくのが良さそうです。

Biomeではv1.6よりAstroとSvelteとVue.jsの部分サポート、v1.9よりCSS、GraphQL、`.editorconfig`のフォーマットサポートが入りました。

Prettierは次のv4に向けて[prettier-cli](https://github.com/prettier/prettier-cli)のパフォーマンス改善を行なっているようです。

## 型ツール

|                                                            | 2023/12/31時点の最新バージョン | 2024/12/1時点の最新バージョン |
| ---------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [TypeScript](https://github.com/microsoft/TypeScript/tags) | v5.3.3                         | v5.7.2                        |
| [flowtype](https://github.com/facebook/flow/releases)      | v0.225.0                       | v0.255.0                      |

型ツール関連でメジャーバージョンが上がったものはありませんでしたが、TypeScriptのバージョンについてはsemverで運用されていないため、マイナーバージョンアップに伴いいくつもの変更が入っています。

- [Announcing TypeScript 5.4 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/)
- [Announcing TypeScript 5.5 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/)
- [Announcing TypeScript 5.6 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/)
- [Announcing TypeScript 5.7 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/)

## おわりに - 個人的振り返りと来年以降の予測

今年はいくつかのメジャーアップデートはありましたが、個人的な感想としては、開発者にとっては目まぐるしい変化というものはそこまでなかったように思いました。
バージョンアップでの破壊的変更についてもいくつかエスケープハッチとなる対応（旧式と併用して扱えるなど）が含まれていたり、より良い方向へ改善するための変更が含まれていると感じています。

エコシステム周りのパフォーマンスを改善するイニシアチブである[e18e](https://e18e.dev/)が設立されたこともあり、Web開発者にとってより利用しやすくパフォーマンスを重視したツールが増えてくるのではないかと思っています。逆にツールチェインの開発者にとっては、Rustを中心としてこれまでとは違った技術を取り入れることが求められるかもしれません。

これまでのアップデートの変遷を振り返ってみて、来年以降のフロントエンド技術動向はどうなるかを予測してみました。あくまでも私の予測なので参考程度ということで…。

- 脱仮想DOMでの宣言的UIが主流となる（[Fine Grained Reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity)の実現）
- サーバーコンポーネントの普及に伴うクライアントとサーバーとの境界がより曖昧に
- Next.jsのキャッシュ機能に振り回されなくなったことでのフレームワーク選択肢の多様化
  - 代わりにPages Routerがなくなるかもしれない
- VoidZeroを中心としてJavaScriptツールチェインのエコシステムが賑わう
- **パフォーマンスを重視したものが価値として優先されていく**

というわけで今日までの動向を振り返ってみましたが、今年の残りにもいくつかの変更やリリースがあるかもしれません。引き続きフロントエンド技術周辺を見守っていこうと思います。

## 参考記事

- ランタイム
  - [Node.js v22の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2024/05/13/083000)
  - [Node.js v23の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2024/10/18/080000)
  - [Deno v2がリリース🎉 - Deno v1.0.0の頃からの変化と現在のプラクティスについて](https://zenn.dev/uki00a/articles/deno-v2-what-has-changed-from-v1)
  - [Honoのv4が2月9日にリリースされます](https://zenn.dev/yusukebe/articles/b20025ebda310a)
- UIフレームワーク
  - [Announcing v3 | Chakra UI](https://www.chakra-ui.com/blog/00-announcing-v3)
  - [MUI v6について内容おさらい＆最新情報を追ってみる ++ Gaji-Laboブログ](https://www.gaji.jp/blog/2024/08/07/20485/)
- モバイル＆デスクトップアプリ
  - [New Architecture is here · React Native](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here#removing-the-bridge)
  - [The Fall of React Native Bridge](https://slide-react-native-bridge.vercel.app/)
  - [iOS/Androidに対応した「Tauri 2.0」が公開 ～「Rust」が使えるアプリフレームワーク - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1628498.html)
- ビルド・バンドルツール
  - [Environment API で広げる Vite の可能性 - Slidev](https://pre-vue-fes-2024-environment-api-slide.sapphi.red/1)
- テストツール
  - [WebDriver Bidi Protocol | WebdriverIO](https://webdriver.io/docs/api/webdriverBidi/)
- [Announcing VoidZero - Next Generation Toolchain for JavaScript | VoidZero](https://voidzero.dev/posts/announcing-voidzero-inc)
- [TSKaigi 2024 Prettierの未来を考える スピーカーノート](https://zenn.dev/sosukesuzuki/articles/756e04848885bd)
