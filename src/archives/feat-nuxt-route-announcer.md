---
title: SPAのアクセシビリティを強化するNuxtのRoute Announcer機能
description: Nuxt 3.12より導入されたRoute Announcer機能について紹介します
date: 2024-07-10
author: yamanoku
source: zenn.dev
noindex: true
---

## SPAにおけるアクセシビリティ課題について

シングルページアプリケーション（SPA）は、1つのHTMLファイルに対してJavaScriptとWeb APIを活用して、ユーザーに素早いページ切り替えの体験を提供するウェブアプリケーションの一形態です。

しかし、SPAにはアクセシビリティの課題があります。例えば、視覚障害のあるユーザーが使うスクリーンリーダーという支援技術ではページが遷移したことを認識できないことがあります。これは、JavaScriptを使ってページを切り替える際に発生する問題です。

具体的には、ユーザーがあるページから別のページへ移動した際、スクリーンリーダーが新しいページに移動したことを認識しないことがあります。

この問題を解決するために、JavaScriptとWAI-ARIAという技術を使って、Route Announcerという方法があります。これを活用することでページ遷移時にスクリーンリーダーへ新しいページの情報を伝えることができます[^1]。

[^1]: 実装の詳細については[令和最新Route Announcer事情](https://2023.yamanoku.net/2023-12-15/)より参照ください。

多くのフレームワーク（GatsbyJS、Next.js、SvelteKit、Astroなど）ではこの方法が実装されていますが、Nuxtではこれまで未実装でした。

この問題点をNuxtにてどのように解消するかについてを昨年の[Vue Fes Japan 2023のやまのく](https://vuefes.jp/2023/sessions/yamanoku)よりRoute Announcer相応のコンポーネントを作る方法を発表しました[^2]。

[^2]: 発表資料は[画面遷移から考えるNuxtアプリケーションをアクセシブルにする方法](https://yamanoku.net/vuefes-japan-2023/ja/)を参照ください。

ですが、この度Nuxt 3.12より[アクセシビリティの向上](https://nuxt.com/blog/v3-12#built-in-accessibility-improvements)の項目で `<NuxtRouteAnnouncer>` コンポーネントと `useRouteAnnouncer` composables関数が導入されました。

- [`<NuxtRouteAnnouncer>` · Nuxt Components](https://nuxt.com/docs/api/components/nuxt-route-announcer)
- [useRouteAnnouncer · Nuxt Composables](https://nuxt.com/docs/api/composables/use-route-announcer)

## どのような挙動をしてくれるのか

初期インストールされたデフォルトの状態のままだと特に変化は見られないのですが、各ページにて `useHead` で `title` を指定することでその真価が発揮されます。

[![リンクをクリックしてページが切り替わっているがスクリーンリーダーにはなにも通知されていない](https://i.gyazo.com/bd67f964f7a2d4cdd7c577257aa74538.gif)](https://gyazo.com/bd67f964f7a2d4cdd7c577257aa74538)

`title` がない状態だとページが切り替わっても特に変化がみられません。

[![aboutへのリンクをクリックして「About」、indexへのリンクをクリックして「Home」とスクリーンリーダーへ通知が届いている](https://i.gyazo.com/a21b5a1b491e64758219d44d3fbf1cfb.gif)](https://gyazo.com/a21b5a1b491e64758219d44d3fbf1cfb)

ですが `title` を設定することで、ページが切り替わったあとにその内容が読み上げられるようになっています。

## Route Announcerを構成するコンポーネントと関数

次にNuxt上で動くRoute Announcerを構成するコンポーネントとcomposables関数のそれぞれについてを紹介していきます。

### `<NuxtRouteAnnouncer>`

スクリーンリーダーのために、ページタイトル要素を取得して通知するためのコンポーネントです。

Route Announcerコンポーネントです。Nuxt 3.12で初期インストールすると以下のように `app.vue` に導入されます。

```html
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
```

全体のレイアウトコンポーネントか、ページコンポーネントに設置して使います。

具体的な説明は [@splendente](https://zenn.dev/splendente) さんが紹介していますのでそちらをご参照ください。

[Nuxt v3.12 からは NuxtRouteAnnouncer でアクセシビリティ改善に取り組もう](https://zenn.dev/splendente/articles/nuxt-route-announcer-verification)

### `useRouteAnnouncer`

ページタイトルの変更を監視し、それに応じてアナウンサーメッセージを更新するcomposables関数です。`<NuxtRouteAnnouncer>` はこの関数を活用して組み立てられています。[Unhead](https://unhead.unjs.io/)の `dom:rendered` にフックして、ページのタイトルを読み取り、スクリーンリーダーへの通知される仕組みになっています。

3.12時点では `useRouteAnnouncer` がexportされておらず使えなかったのですが、[3.12.2](https://github.com/nuxt/nuxt/releases/tag/v3.12.2)でexportされる[修正](https://github.com/nuxt/nuxt/pull/27562)が入ったため、使用する際は3.12.2以降のNuxtを使用するようにしてください。

```html
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer();
</script>
```

`useRouteAnnouncer` は引数に `politeness` を受取り、`off`（通知を切る）、`polite`（すべての通知が終わった後に通知する）、`assertive`（即座に通知する）のいずれかを設定できます。デフォルトの値は `polite` になっています。

`useRouteAnnouncer` からは以下プロパティやメソッドが利用できるようになります。

- `message` ... 読み上げられるメッセージ部分
- `politeness` ... スクリーンリーダーの読み上げ方法。`off`, `polite`, `assertive` が設定できます
- `set(message, politeness = "polite")` ... messageとpolitenessを設定するメソッド
- `polite(message)` ... politenessを `polite` に設定して `set()` を実行するメソッド
- `assertive(message)` ... politenessを `assertive` に設定して `set()` を実行するメソッド

すでにページコンポーネントにて `useHead` の `title` が設定されている場合、`set` メソッドや `message` 自体で上書きできないようになっているため、注意が必要です。動的な変更をする場合は `useHead` の `title` 側から変更してください。

## Nuxtのアクセシビリティ向上への取り組み

今回導入された `<NuxtRouteAnnouncer>` の取り組み以外にもアクセシビリティに関する機能を充実させるものが進められています。

ロードマップから、Nuxt内部にaxe-coreというアクセシビリティチェックツールのビルトインやナビゲーションにおけるフォーカス管理、スキップリンクの生成なども予定されています。

[Accessibility roadmap · Issue #23255 · nuxt/nuxt](https://github.com/nuxt/nuxt/issues/23255)

## まとめ

この記事では、Nuxtのクライアントサイドルーティング時のアクセシビリティ課題を解消するための `<NuxtRouteAnnouncer>` について紹介しました。

アクセシビリティ向上における開発者への負担軽減が期待されるので、ぜひ3.12.2以降にアップデートして使ってみてください。
