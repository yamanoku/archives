---
title: フロントエンド技術周辺のアップデートから振り返る2025年
description: フロントエンド技術周辺のアップデートをもとに2025年を振り返ってみました
date: 2025-12-01
author: yamanoku
source: qiita.com
noindex: true
---

この記事は[Schoo Advent Calendar 2025](https://qiita.com/advent-calendar/2025/schoo)の1日目の記事になります。

こんにちは。技術戦略部門に所属するエンジニアの [@okuto_oyama](https://qiita.com/okuto_oyama) です。

Schooアドベントカレンダー最初の記事では、[昨年も実施](https://qiita.com/okuto_oyama/items/12d119671f4b350042e4)した、フロントエンド開発にまつわる周辺技術が今年どれだけアップデートされたかを見つつ、2025年を振り返ってみる内容をお送りいたします。

昨年に引き続き、以下のジャンルで括ろうと思っております。

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

ここに加え今年は「AIエージェントフレームワーク」についても触れていきます。

できる限り主要なものは収集していますが、あのライブラリ・フレームワークが入ってないじゃん！となった場合はすみません。

バージョン比較のレギュレーションは以下の通りです。

**レギュレーション**

- CHANGELOGやリリースノートを参考にしたバージョン表記
- α、β、RCやCanaryなどのプレリリースバージョンは含めない
- 今年一年でプレリリースを除くバージョンアップがなかったものは除く
- メジャーバージョンが上がったものは**太字**で表記する

それでは、いってみましょう。

## フロントエンドフレームワーク
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [React](https://github.com/facebook/React/releases) | v18.3.1 | **v19.2.0** |
| [Vue.js](https://github.com/vuejs/core/releases) | v3.5.13 | v3.5.25 |
| [Angular](https://github.com/angular/angular/releases) | v19.0.1 | **v21.0.2** |
| [Svelte](https://github.com/sveltejs/svelte/releases) | v5.3.0 | v5.45.3 |
| [Preact](https://github.com/preactjs/preact/releases) | v10.25.0 | v10.28.0 |
| [Alpine.js](https://github.com/alpinejs/alpine/releases) | v3.14.5 | v3.15.2 |
| [Qwik](https://github.com/QwikDev/qwik/releases) | v1.11.0 | v1.17.2 |
| [htmx](https://github.com/bigskysoftware/htmx/releases) | v2.0.3 | v2.0.7 |
| [Lit](https://github.com/lit/lit/releases) | v3.2.1 | v3.3.1 |
| [Stencil](https://github.com/ionic-team/stencil/releases) | v4.22.3 | v4.38.3 |

フロントエンドフレームワークでメジャーアップデートがあったものはReact、Angularになります。

Reactは昨年の12/5にv19へアップデートされました。今年リリースされたv19.2までの間で、アクションという非同期関数概念が追加、新たなHooks APIや`<Activity>`などの機能が追加されています。
Reactの最適化コンパイラでもある[React Compiler](https://ja.react.dev/learn/react-compiler)のv1もリリースされました。

Angularはこれまで状態の変更検知に使用していたZone.jsを使用しないZonelessアーキテクチャを提供できるようになりました。v21からはSignalベースのフォーム機構、ヘッドレスでアクセシブルなコンポーネント「[Angular Aria](https://angular.dev/guide/aria/overview)」が登場しました。

Vue.jsはVue Vapor Modeを搭載したv3.6が開発中です。

Svelteは非同期処理の制御ができるようになる[Asynchronous Svelte](https://github.com/sveltejs/svelte/discussions/15845)が実験的機能として発表されました。

## メタフレームワーク
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Next.js](https://github.com/vercel/next.js/releases) | v15.0.3 | **v16.0.6** |
| [React Router](https://github.com/remix-run/react-router/blob/main/packages/react-router/CHANGELOG.md) | v7.0.1 | v7.9.6 |
| [Gatsby](https://github.com/gatsbyjs/gatsby/releases) | v5.14.0 | v5.15.0 |
| [Nuxt](https://github.com/nuxt/nuxt/releases) | v3.14.1592 | **v4.2.1** |
| [SvelteKit](https://github.com/sveltejs/kit/releases) | v2.9.0 | v2.49.0 |
| [SolidStart](https://github.com/solidjs/solid-start/tags) | v1.0.10 | v1.2.0 |
| [QwikCity](https://github.com/QwikDev/qwik/releases) | v1.11.0 | v1.17.2 |
| [Redwood](https://github.com/redwoodjs/redwood/releases) | v8.4.1 | v8.9.0 |
| [Astro](https://github.com/withastro/astro/releases) | v4.16.16 | **v5.16.3** |
| [Docusaurus](https://github.com/facebook/docusaurus/releases) | v3.6.3 | v3.9.2 |
| [VitePress](https://github.com/vuejs/vitepress/releases) | v1.5.0 | v1.6.3 |
| [Lume](https://github.com/lumeland/lume/releases) | v2.4.2 | **v3.1.2** |
| [Analog](https://github.com/analogjs/analog/releases) | v1.9.4 | **v2.1.2** |

メタフレームワークでメジャーアップデートがあったものはNext.js、Nuxt、Astro、Lume、Analogになります。

Next.jsはv19より`use cache`ディレクティブを用いたキャッシュコンポーネント機能やDevTools MCPを搭載し、Turbopackがデフォルトのバンドラーとして採用されるようになりました。

Nuxtはv4よりディレクトリ構成を一新、`useAsyncData`と`useFetch`の動作改善、Import maps機能の導入、Rolldownの実験的導入などがされるようになりました。

SvelteKitはv2.27より[Remote functions](https://svelte.dev/docs/kit/remote-functions)というコンポーネントからサーバサイド上の関数を呼べる機能が追加されました。

Astroは昨年12/3にv5がリリースされました。アイランドアーキテクチャを実現するServer Islands、Content Collectionsより汎用的でビルドパフォーマンスの優れたContent Layer APIが導入されました。

VitePressは現在v2に向けての開発を進めています。

Lumeはv2から約1年半ぶりのメジャーアップデートがされました。JSXサポートはReact/Preactベースのプラグインを廃止し、[SSX](https://github.com/oscarotero/ssx/)というライブラリに一本化されています。

Analogはv2になりAngularの新しい[Resources API](https://angular.jp/guide/signals/resource)に対応したコンテンツ一覧やファイルを扱うContent Resources機能が追加されました。

Remixは方向性を一転し、これまでのReact Router構成のアプリケーションとは決別し、独自のフレームワーク像を構築していきます。

## ランタイム
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Node.js](https://github.com/nodejs/node/releases) | v23.3.0 | **v25.2.1** |
| [Deno](https://github.com/denoland/deno/releases) | v2.1.2 | v2.5.6 |
| [Bun](https://github.com/oven-sh/bun/releases) | v1.1.38 | v1.3.3 |

ランタイムでメジャーアップデートがあったものはNode.jsになります。

今年はNode.js v24はLTS（Long Term Support）になり、最新版としてv25が公開されました。v25からは、`--allow-net`オプションでネットワークアクセスへの制限ができるようになり、Node.jsがネイティブにTypeScriptを実行できる「Type Stripping」が安定版となりました。

Bunはv1.3からフルスタック開発機能を搭載しオールインワンの開発体験を提供しています。
また、今年からsosukesuzukiさんが入社され、内部で使用されているJavaScriptCoreの改善にコミットされています。

https://x.com/jarredsumner/status/1957406750329442771

## CSS
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss/releases) | v3.14.5 | **v4.1.17** |
| [UnoCSS](https://github.com/unocss/unocss/releases) | v0.64.1 | v66.5.9[^2] |
| [Panda CSS](https://github.com/chakra-ui/panda/blob/main/CHANGELOG.md) | v0.48.0 | **v1.6.0** |
| [styled-components](https://github.com/styled-components/styled-components/releases) | v6.1.13 | v6.1.19 |
| [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract/releases) | v1.16.1 | v1.17.5 |
| [StyleX](https://github.com/facebook/stylex/tags) | v0.9.3 | v0.17.1 |

CSSでメジャーアップデートがあったものはTailwind CSS、Panda CSSになります。

Tailwind CSSはv4より大きくアーキテクチャが変更され、JavaScript（TypeScript）で管理していたものがすべてCSSで管理されるように変更されました。
公式のUIライブラリであるTailwind UIが「[Tailwind Plus](https://tailwindcss.com/plus)」に刷新されました。

Panda CSSはv1より`createStyleContext`関数が導入されました。これにより親子関係によってスタイルの変更をしやすくなりました。
v1.6.0からは`cssgen`に`--splitting`フラグがつき、単一のstyle.cssではなくレイヤー・レシピごとに分割させる機能がつきました。

styled-componentsは[メンテナンスモードへの移行が発表](https://opencollective.com/styled-components/updates/thank-you)されました。

[^2]: 大幅にバージョンが上がっているように見えますが、これは作者のAnthony Fuが独自のセマンティクスバージョン管理（[Epoch Semantic Versioning](https://antfu.me/posts/epoch-semver)）をし始めたものです。これに沿ったセマンティックバージョンとして扱っているためメジャーバージョン扱いではないと判断しています。

## UIフレームワーク
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Chakra UI](https://github.com/chakra-ui/chakra-ui/releases) | v3.2.2 | v3.30.0 |
| [Material UI](https://github.com/mui/material-ui/releases) | v6.1.9 | **v7.3.5** |
| [Ant Design](https://github.com/ant-design/ant-design/releases) | v5.22.2 | **v6.0.0** |
| [Nuxt UI](https://github.com/nuxt/ui/releases) | v2.19.1 | **v4.2.1** |
| [Angular Material](https://github.com/angular/components/releases) | v19.0.1 | **v21.0.1** |
| [daisyUI](https://daisyui.com/docs/changelog/) | v4.4.24 | **v5.5.5** |
| [Kuma UI](https://github.com/kuma-ui/kuma-ui/blob/main/packages/core/CHANGELOG.md) | v1.5.8 | v1.6.0 |
| [Yamada UI](https://github.com/yamada-ui/yamada-ui/releases) | v1.7.0 | **v2.0.5** |
| [Bootstrap](https://github.com/twbs/bootstrap/releases) | v5.3.3 | v5.3.8 |

UIフレームワークでメジャーアップデートがあったものはMaterial UI、Ant Design、Nuxt UI、Angular Material、daisyUI、Yamada UIになります。

Material UIはv7よりESM対応が進み、CJSとESMをそれぞれサポートする（デュアルモード）ようになりました。

Ant Designはv6の発表と同時に、AIアプリケーション開発に特化したUIキットの[Ant Design X 2.0のリリースも発表](https://github.com/ant-design/x/issues/1357)しました。

[NuxtLabsがVercelにジョインした](https://www.publickey1.jp/blog/25/nuxtjsnuxt_labsnextjsvercel.html)流れから、Nuxt UIはv4からNuxt UI Proも無償提供されるようになりました。

daisyUIはv5からわずかに残っていた依存関係をゼロにしてセキュリティリスクをなくしビルドサイズも削減することに成功しています。

昨年取り上げていたNextUIは[HeroUIとしてリブランディング](https://www.heroui.com/)され、テーマやコンポーネント単位で提供されるようになりました（１つのパッケージとして公開されていないため、今回は取り上げていません）。

日本人が作ったYamada UIは[VercelのOpen Source Program](https://vercel.com/open-source-program)にノミネートされました。

https://x.com/vercel/status/1993070637989216588?s=20

## パッケージマネージャ
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [npm](https://github.com/npm/cli/releases) | v10.9.1 | **v11.6.4** |
| [yarn berry](https://github.com/yarnpkg/berry/releases) | v4.5.3 | v4.12.0 |
| [pnpm](https://github.com/pnpm/pnpm/releases) | v9.14.4 | **v10.24.0** |

パッケージマネージャでメジャーアップデートがあったものはnpm、pnpmになります。

npmはv11.5からセキュアな公開フローをサポートするため、[OIDCベースの認証](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)が追加されました。

pnpmはv10より`preinstall`や`postinstall`のような依存パッケージのライフサイクルスクリプトがデフォルトで実行されなくなりました。v10.16からは`minimumReleaseAge`が実装され、指定された期間でのバージョンのインストールを遅延させる機能が追加されました。

## モバイル＆デスクトップアプリ
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [React Native](https://github.com/facebook/react-native/releases) | v0.76.3 | v0.82.1 |
| [Expo](https://github.com/expo/expo/blob/main/CHANGELOG.md) | v52.0.0 | **v54.0.0** |
| [Electron](https://github.com/electron/electron/releases/) | v33.2.1 | **v39.2.4** |
| [Capacitor](https://github.com/ionic-team/capacitor/releases) | v6.2.0 | **v7.4.4** |
| [Tauri](https://github.com/tauri-apps/tauri/releases) | v2.1.1 | v2.9.4 |
| [NativeScript](https://github.com/NativeScript/NativeScript/releases) | v8.8.6 | **v9.0.4** |

モバイル＆デスクトップアプリでメジャーアップデートがあったものはExpo、Electron、Capacitor、NativeScriptになります。

React Nativeはv0.82からはレガシーアーキテクチャが完全に無効化され、v0.76.2からの新しいアーキテクチャが正式に採用されました。Metaが開発するReact Nativeに最適化されたJavaScriptエンジンの[Hermes](https://reactnative.dev/docs/hermes)のv1が試験的に導入されました。

Expo v53では実験的にlibSQLサポートがはじまりました。v54では クロスプラットフォーム（Apple TV、macOS）対応の拡張がされています。

Capacitor v7では低コードプラットフォームの[Outsystems](https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/mobile_apps/capacitor_and_cordova_support_in_mabs/)がCapacitor基盤に採用され、[Cocoapods](https://cocoapods.org/)の公式非推奨に伴い、[Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs/)への移行を推進されるようになりました。

NativeScript v9ではESMネイティブ対応とバンドラへの選択肢としてViteの公式サポートが追加されました。

## ビルド・バンドルツール
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Vite](https://github.com/vitejs/vite/releases)| v6.0.1 | **v7.2.6** |
| [SWC](https://github.com/swc-project/swc/releases) | v1.9.3 | v1.15.3 |
| [esbuild](https://github.com/evanw/esbuild/releases) | v0.24.0 | v0.27.0 |
| [Parcel](https://github.com/parcel-bundler/parcel/releases) | v2.13.2 | v2.16.1 |
| [Rollup](https://github.com/rollup/rollup/releases) | v4.28.0 | v4.53.3 |
| [Webpack](https://github.com/webpack/webpack/releases) | v5.96.1 | v5.103.0 |
| [Rspack](https://github.com/web-infra-dev/rspack/releases) | v1.1.4 | v1.6.5 |
| [Rolldown](https://github.com/rolldown/rolldown/releases) | v0.14.0 | v0.15.1 |

ビルド・バンドルツールでメジャーアップデートがあったものはViteになります。

Vite v7からはRolldownが導入可能、ブラウザターゲット判定をBaseline Widely Availableのバージョンへ変更し、Sass legacy APIが廃止されるようになりました。
[ViteConf 2025](https://viteconf.amsterdam/)にて統合開発ツールチェーンとしての[Vite+(plus)](https://viteplus.dev/)の発表がありました。

Parcelはv2.14よりReact Server Componentsのベータ対応、MDXのファーストクラス対応をしました。v2.15からは[PostHTML](https://github.com/posthtml/posthtml)ベースから、Rust製の html5ever（[Servo](https://servo.org/)由来）のパーサーへ変更されました。

webpackはv5.100よりHMRのESMネイティブ対応、`import defer`の実験的導入がされました。

## モノレポツール
|  | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Lerna](https://github.com/lerna/lerna/releases) | v8.1.9 | **v9.0.3** |
| [Turborepo](https://github.com/vercel/turborepo/releases) | v2.3.3 | v2.6.1 |
| [Nx](https://github.com/nrwl/nx/releases) | v20.1.4 | **v22.1.3** |
| [Bazel](https://github.com/bazelbuild/bazel/releases) | v7.4.1 | v7.7.1 |
| [Rush](https://github.com/microsoft/rushstack/blob/main/apps/rush/CHANGELOG.md) | v5.141.3 | v5.163.0 |
| [moon](https://github.com/moonrepo/moon/releases) | v1.30.2 | v1.41.7 |

モノレポツールでメジャーアップデートがあったものはLerna、Nxになります。

Turbopackは設定ファイルにコメントを記述できるJSONCフォーマットをサポート、`@vercel/microfrontends`によりVercelとのmicrofrontends機能とも統合され、ローカルと本番環境との橋渡しが容易になりました。

Nxはv21より複数タスクのログを確認できるTerminal UIが導入されました。v22からはCIで失敗した内容を自動解析し、修正案を提示するSelf-Healing CI、`configure-ai-agents`でCopilotやCursorなどのAIアシスタント設定を最適化するコマンドが追加されました。

## バックエンドフレームワーク
| | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Express](https://github.com/expressjs/express/releases) | v5.0.1 | v5.2.1 |
| [Koa](https://github.com/koajs/koa/releases) | v2.15.3 | **v3.1.1** |
| [Fastify](https://github.com/fastify/fastify/releases) | v5.1.0 | v5.6.2 |
| [NestJS](https://github.com/nestjs/nest/releases) | v10.4.12 | **v11.1.9** |
| [Hono](https://github.com/honojs/hono/releases) | v4.6.12 | v4.10.7 |

バックエンドフレームワークでメジャーアップデートがあったものはKoa、NestJSになります。

KoaではWHATWG準拠のレスポンスボディ（ReadableStream、Blob、Response）がサポートされるようになりました。

NestJSはマイクロサービス化への柔軟性がより高まりました。NATS、Kafka、Redisなど公式サポートのトランスポーターが追加され、`unwrap`メソッドで基盤となるクライアントインスタンスへ直接アクセスできるようになりました。

```ts
import { NatsConnection } from 'nats';

const serviceRef = app.connectMicroservice({
  transport: Transport.NATS,
  options: {
    // NATS connection options here
  },
});
const connection = serviceRef.unwrap<NatsConnection>();
```

## テストツール
| | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [Jest](https://github.com/jestjs/jest/releases) | v29.7.0 | **v30.2.0** |
| [Vitest](https://github.com/vitest-dev/vitest/releases) | v2.1.6 | **v4.0.14** |
| [Mocha](https://github.com/mochajs/mocha/releases) | v10.8.2 | **v11.7.5** |
| [Playwright](https://github.com/microsoft/playwright/releases) | v1.49.0 | v1.57.0 |
| [WebdriverIO](https://github.com/webdriverio/webdriverio/releases) | v9.4.1 | v9.21.1 |
| [Cypress](https://github.com/cypress-io/cypress/releases) | v13.16.0 | **v15.7.0** |
| [Selenium](https://github.com/SeleniumHQ/selenium/releases) | v4.27.0 | v4.38.0 |
| [Puppeteer](https://github.com/puppeteer/puppeteer/releases) | v23.9.0 | **v24.31.0** |
| [Storybook](https://github.com/storybookjs/storybook/releases) | v8.4.6 | **v10.1.2** |
| [Mock Service Worker](https://github.com/mswjs/msw/releases) | v2.6.6 | v2.12.3 |

テストツールでメジャーアップデートがあったものはJest、Vitest、Mocha、Cypress、Puppeteer、Storybookになります。

Jestは過去最大規模の更新・変更が入りました。ESMとTypeScriptサポート強化やNode.jsのv21以下のサポート終了、`using`構文を活用する他新機能が追加されました。モジュール解決にはRust製のツール「[unrs-resolver](https://github.com/unrs/unrs-resolver)」を導入しパフォーマンスが向上しています。今後より頻繁なメジャーリリースをしていくことを目指すそうです。

Vitestはv4より実験的機能だったBrowser Modeが安定版になり、そこにVisual Regression Testing（VRT）のサポートが入るようになりました。

Cypressはv15より、アプリ操作を記録してテストを自動生成する「[Cypress Studio](https://docs.cypress.io/app/guides/cypress-studio)」の機能が強化されました。v15.4.0よりフラグなしでデフォルトで使用できるようにもなりました。

Storybookはv9よりStorybookのテスト機能が強化されました。v10からはESMオンリーの構成となり、React依存がなくなるなど依存関係も大幅に削減しています。

## リンター・フォーマッターツール

| | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [ESLint](https://github.com/eslint/eslint/releases) | v9.16.0 | v9.39.1 |
| [Stylelint](https://github.com/stylelint/stylelint/releases) | v16.11.0 | v16.26.1 |
| [Prettier](https://github.com/prettier/prettier/releases) | v3.4.1 | v3.7.3 |
| [Biome](https://github.com/biomejs/biome/blob/main/packages/@biomejs/biome/CHANGELOG.md) | v1.9.4 | **v2.3.8** |
| [oxlint](https://github.com/oxc-project/oxc/releases) | v0.14.0 | **v1.31.0** |
| [oxfmt](https://github.com/oxc-project/oxc/releases) | - | v0.16.0 |

リンター・フォーマッターツールでメジャーアップデートがあったものはBiome、oxlintになります。

Biomeはv2からGritQLというクエリ言語を使ってリンタープラグインが作れるようになりました。v2.3からはVue.js、Svelte、Astroがフルサポートされました。

Oxcプロジェクトからはoxlintがv1としてメジャーアップデート、フォーマットツールとしてoxfmtが登場しました。

Prettierはv3.6より高速化された新たなCLI機能を`--experimental-cli`フラグより開放して使用できるようになりました。

## 型ツール

| | 2024/12/1時点の最新バージョン | 2025/12/1時点の最新バージョン |
| ---- | ---- | ---- |
| [TypeScript](https://github.com/microsoft/TypeScript/tags) | v5.7.2 | v5.9.3 |
| [flowtype](https://github.com/facebook/flow/releases) | v0.255.0 | v0.291.0 |

型ツール関連でメジャーバージョンが上がったものはありませんでしたが、TypeScriptのバージョンについてはsemverで運用されていないため、マイナーバージョンアップに伴いいくつもの変更が入っています。

- [Announcing TypeScript 5.8 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/)
- [Announcing TypeScript 5.9 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)

今年はTypeScriptのネイティブ実装をGoへ移植するプロジェクトが発表されました。

https://devblogs.microsoft.com/typescript/typescript-native-port/

## AIエージェントフレームワーク

|  | 2025/12/1時点の最新バージョン |
| ---- | ---- |
| [Vercel AI SDK](https://github.com/vercel/ai/releases) | v5.0.105 |
| [LangChain.js](https://github.com/langchain-ai/langchainjs/releases) | v1.1.1 |
| [LlamaIndex.TS](https://github.com/run-llama/LlamaIndexTS/releases) | v0.12.0 |
| [VoltAgent](https://github.com/VoltAgent/voltagent/releases) | v1.2.13 |
| [Mastra](https://github.com/mastra-ai/mastra/releases) | v0.24.6 |

AIエージェントを作成するためのフレームワークとしてTypeScript製のツールがいくつか登場してきています。PythonのものよりもWebアプリケーションとしての接続として同じ技術スタックが使えることは1つの利点と言えそうです。

Vercel AI SDKはエージェント昨日の開発が非常に簡易的でわかりやすく、LlamaIndex.TSはRAG重視型のイベント駆動フローを採用、LangChain.jsはLangChainにまつわるエコシステムとしての成熟度が高く、VoltAgentはLLM可視化プラットフォームを提供しており、MastraはWeb開発者としての開発体験を重視したフレームワークとされています。
UIライブラリやメタフレームワークのように、それぞれの機能要件に合わせて向いているものを扱うのが良さそうです。

ちなみにMastraはGatsbyJSの開発者でもある2人によって作成されたAIエージェントフレームワークです[^3]。

[^3]: [【AIエージェント開発の最前線】Mastra創業者が語る「Train in Python, Ship in TypeScript」の真意【AI探求ラボ Vol.09】](https://blog.allstarsaas.com/posts/ai-lab-09)

## おわりに - 昨年の予測振り返りと来年の予測

[前回の記事](https://qiita.com/okuto_oyama/items/12d119671f4b350042e4)では以下のような2025年の展望を予想しました。

- 脱仮想DOMでの宣言的UIが主流となる（[Fine Grained Reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity)の実現）
- サーバーコンポーネントの普及に伴うクライアントとサーバーとの境界がより曖昧に
  - Next.jsのキャッシュ機能に振り回されなくなったことでのフレームワーク選択肢の多様化
  - 代わりにPages Routerがなくなるかもしれない
- VoidZeroを中心としてJavaScriptツールチェインのエコシステムが賑わう
- **パフォーマンスを重視したものが価値として優先されていく**

それぞれについてを振り返ってみましょう。

まず脱仮想DOMはVue.jsのVue Vapor Modeが次バージョンへの搭載が予定され、Reactは脱仮想DOMではないですがReact Compilerの登場によってパフォーマンスを考慮しつつコンパイラ内で隠蔽する方向へ進化しています。

クライアントとサーバーとの境界についてはNext.jsでの`use cache`ディレクティブによる指定、SvelteKitのRemote fucntions、Astro Server Islandsなど、よりシームレスにサーバー機能がコンポーネントへ統合された動きがありました。

Vite v7でのRolldown採用、oxlint v1リリースなど、Oxc/Rolldown基盤がインフラとして実用段階に入っており、さらにVite Plusの統合型ツールチェインの発表など、Viteエコシステムを中心とした活発的な動きが見られました。

昨年から引き続きRust製ツールは順調に発達し、TypeScriptはGo移植へ転換するなどJavaScript実装に寄らないパフォーマンスを意識したフロントエンドエコシステムへの参入は見られています。

いずれの予想も大きなズレはなかったかと思っていますが、これに加えて**生成AIとフロントエンドのエコシステムの融合**や、**サプライチェーン攻撃といったセキュリティにまつわる問題**がより顕著にみられる1年になったなと振り返ってみて気付かされました。

フルスタックフレームワークやUIライブラリにはMCPサーバーが導入され、マイグレーションやライブラリの使い方をそこからAIエージェントに学習させて高品質なアウトプットができるような仕組みを作っています。Honoでも[Hono CLI](https://zenn.dev/yusukebe/articles/ff69c13ccafb28)が発表され、CLIでの操作したり情報を得られるようにしたAIフレンドリーな仕組みが実装されてきています。
今後もこの流れはフロントエンドのエコシステム上で必要なことになりそうです。

npm上でのサプライチェーン攻撃も顕著な年になりました。直接的には使ってなくても依存関係の都合上で悪意のある攻撃を受けてしまう危険性については、いきなり顕在化した問題でなくかつてからあった懸念点ではありましたが、あまりの深刻さにこれまで牧歌的な開発が許されていた雰囲気を一変させてしまいました。

その影響もあってか、OIDCを活用したnpm Trusted Publishingが登場したり、pnpmでは`minimumReleaseAge`機能が追加されるなど、パッケージマネージャー側での自衛機能が強化されました。AIエージェントを活用することが当たり前になってきた中で、より安全に使うためにサンドボックスやコンテナ上で動かす必要性も出ているのでこうした安全性へシフトしていく動きも引き続き注目されそうです。

---

パフォーマンスで取り上げたTypeScriptのGo移植についても気になっている部分があります。それは内部のCompiler APIが使えなくなることです[^4]。
この影響は特に[ts-morph](https://ts-morph.com/)といったCompiler APIを活用するプラグイン側に大きな影響があるためTypeScriptのプラグインやライブラリが一部追従できなくなる可能性も考えられます。特に[Volar.js](https://volarjs.dev/)においてはTypeScriptのソースコードを動的に書き換えることで`tsc`にはない拡張機能やプラグインを注入させる仕組みを取り入れていたりします。

```ts
let tsc = (readFileSync as any)(...args) as string;

// add allow extensions
const extsText = extensions.map(ext => `"${ext}"`).join(', ');
tsc = replace(tsc, /supportedTSExtensions = .*(?=;)/, s => s + `.concat([[${extsText}]])`);
tsc = replace(tsc, /supportedJSExtensions = .*(?=;)/, s => s + `.concat([[${extsText}]])`);
tsc = replace(tsc, /allSupportedExtensions = .*(?=;)/, s => s + `.concat([[${extsText}]])`);

// proxy createProgram
tsc = replace(tsc, /function createProgram\(.+\) {/, s =>
  `var createProgram = require(${JSON.stringify(proxyApiPath)}).proxyCreateProgram(`
  + [
    `new Proxy({}, { get(_target, p, _receiver) { return eval(p); } } )`,
    `_createProgram`,
    `require(${JSON.stringify(__filename)}).getLanguagePlugins`,
  ].join(', ')
  + `);\n`
  + s.replace('createProgram', '_createProgram')
);

return tsc;
```

https://github.com/volarjs/volar.js/blob/f17c19f712651acde33cc2171a112e64db0b460e/packages/typescript/lib/quickstart/runTsc.ts#L20-L40

[^4]: 詳細は[TypeScript の Go 移植に備えて知っておくべきこと](https://zenn.dev/dinii/articles/typescript-go#compiler-api-%E3%81%8C%E4%BD%BF%E3%81%88%E3%81%AA%E3%81%8F%E3%81%AA%E3%82%8B%EF%BC%9F)の「Compiler API が使えなくなる？」を確認ください。

以上、今年の振り返りをしてみて、来年以降のフロントエンド技術動向はどうなるかを予測してみました。来年以降もフロントエンドのエコシステムに大きな変動は来ない（生成AIのようなゲームチェンジャーが登場しない限り）と思っているのでその延長線上のものになります。

- **ツールがよりAIフレンドリーに最適化され開発生産性の向上に寄与していく**
  - MCPサーバーの搭載が当たり前のものになっていく
- **依存関係を減らし人やAIが安心安全に使えるような技術選定やアーキテクチャに変化していく**
- **TypeScriptのGo移植影響による一部エコシステムの衰退の可能性**
  - もしかしたら生成AIが不足した部分をカバーしてくれるかもしれない

というわけで今日までの動向を振り返ってみましたが、今年の残りにもいくつかの変更やリリースがあるかもしれません。引き続きフロントエンド技術周辺を見守っていこうと思います。

## 参考記事

- フロントエンドフレームワーク
    - [React Blog – React](https://ja.react.dev/blog)
    - [Angular Blog](https://blog.angular.dev/)
- メタフレームワーク
    - [Next.js 16 | Next.js](https://nextjs.org/blog/next-16)
    - [Announcing Nuxt 4.0 · Nuxt Blog](https://nuxt.com/blog/v4)
    - [The Astro Blog | Astro](https://astro.build/blog/)
    - [Lume 3 was released - Adolfina Casás - 🔥 Updates](https://lume.land/blog/posts/lume-3/)
    - [Announcing AnalogJS 2.0 ⚡️ - DEV Community](https://dev.to/analogjs/announcing-analogjs-20-348d)
    - [Remix Jam 2025 - YouTube](https://www.youtube.com/live/xt_iEOn2a6Y?t=11764s)
- ランタイム
    - [Node.js v25の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2025/10/17/080000)
    - [Node.jsでネイティブにTypeScriptを実行できる「Type Stripping」機能が安定版に到達。Node.js v25.2.0 － Publickey](https://www.publickey1.jp/blog/25/nodejstypescripttype_strippingnodejs_v2520.html)
    - [Bun 1.3 | Bun Blog](https://bun.com/blog/bun-v1.3)
- CSS
    - [Blog - Tailwind CSS](https://tailwindcss.com/blog)
    - [styled-components の歴史、現在、これから](https://blog.re-taro.dev/p/01JQ4914YGQZ02Q5PW5CNRJTJT)
- UIフレームワーク
    - [Blog - MUI](https://mui.com/blog/)
    - [Nuxt UI v4 · Nuxt Blog](https://nuxt.com/blog/nuxt-ui-v4)
    - [daisyUI 5 release notes — daisyUI Tailwind CSS Component UI Library](https://daisyui.com/docs/v5/)
- パッケージマネージャ
    - [Blog | pnpm](https://pnpm.io/blog)
- モバイル＆デスクトップアプリ
    - [Blog · React Native](https://reactnative.dev/blog)
    - [Blog | The NativeScript Blog](https://blog.nativescript.org/)
- ビルド・バンドルツール
    - [Latest From the Vite Blog | Vite](https://vite.dev/blog)
    - [Parcel v2.14.0](https://parceljs.org/blog/v2-14-0/)
    - [Parcel v2.15.0](https://parceljs.org/blog/v2-15-0/)
- モノレポツール
    - [Nx Blog - Updates from the Nx & Nx Cloud team](https://nx.dev/blog)
    - [Blog | Turborepo](https://turborepo.com/blog)
- バックエンドフレームワーク
    - [Announcing NestJS 11: What’s New - Trilon Consulting](https://trilon.io/blog/announcing-nestjs-11-whats-new#more-flexible-microservices)
- テストツール
    - [Blog · Jest](https://jestjs.io/blog)
    - [Latest From the Vitest Blog | Vitest](https://vitest.dev/blog.html)
    - [Cypress Blog](https://www.cypress.io/blog/page/1)
    - [Articles | Storybook Blog](https://storybook.js.org/blog/)
- リンター・フォーマッターツール
    - [Prettier 3.6: Experimental fast CLI and new OXC and Hermes plugins! · Prettier](https://prettier.io/blog/2025/06/23/3.6.0)
    - [Biome v2—コードネーム：Biotype | Biome](https://biomejs.dev/ja/blog/biome-v2/)
    - [怖くない！GritQLでBiomeプラグインを作ろうよ - Speaker Deck](https://speakerdeck.com/pal4de/bu-kunai-gritqldebiomepuraguinwozuo-rouyo)
    - [Oxlint v1.0 Stable | The JavaScript Oxidation Compiler](https://oxc.rs/blog/2025-06-10-oxlint-stable.html)
- 型ツール
    - [TypeScriptネイティブ移植観察レポート TSKaigi 2025 - Speaker Deck](https://speakerdeck.com/berlysia/typescript-native-porting-observation-tskaigi-2025)
    - [TypeScript 6.0で非推奨化されるオプションたち - Speaker Deck](https://speakerdeck.com/uhyo/typescript-6-dot-0defei-tui-jiang-hua-sareruopusiyontati)

