---
title: Vue2 から Vue3 に移行完了しました！
description: Vue2 から Vue3 に移行完了した報告です
date: 2022-03-02
author: yamanoku
noindex: true
---

![アイキャッチ：Vue2 から Vue3 に移行完了しました！](https://i.gyazo.com/f37e1f4b21bab6bd8a9d0a0f2ff09fa5.png)

## はじめに

こんにちは、クラウドワークス ジャンヌチームの[@bugfire](https://qiita.com/bugfire)、[@okuto_oyama](https://twitter.com/okuto_oyama)、[@yizknn](https://qiita.com/yizknn)です。

ジャンヌチームはクラウドワークスの負債を管理下に置くことがミッションのチームです。<br>
問題の大きさに合わせて、直接解決する場合や、他チームと連動したりこちらから依頼することもあります。

弊社のアドベントカレンダー「[crowdworks.jp のフロントエンド活動を振り返る 2021](https://qiita.com/yamanoku/items/29a74ebf3d74b3017581)」の記事で触れていた Vue 3 移行が完了したので、その報告になります。

<!-- more -->

[https://twitter.com/vuejs/status/1484160249686749191](https://twitter.com/vuejs/status/1484160249686749191)

2022 年 2 月 7 日から、Vue.js のデフォルトバージョンが ver.3 になりましたね！<br>
ver.3 になって進化した Vue.js を味わい尽くしたいです。

Vue 2 からオプションで利用できる Composition API は書いていて気持ちよく、Vue 3 化をおこなうことで `script setup` による `defineProps()`, `defineEmits()` も使うことができるようになります。よりシンプルで型付けされた Vue.js を記述できるようになり、期待は高まります！

このあたり Vue 3 に関する全体的な知識の底上げは [@t0yohei](https://qiita.com/t0yohei) による自発的な勉強会の開催などの影響が大きいです。ありがとうございました！

## 背景

クラウドワークスでは以下のように Vue.js を利用してきました。

| 年      | やったこと                  |
| ------- | --------------------------- |
| 2015 年 | Vue.js 0.12.10 の利用を開始 |
| 2016 年 | Vue.js 1.x に移行           |
| 2018 年 | Vue.js 2.x に移行           |

ちょっと間があいてしまいましたね。
Vue 3 への移行は 2021 年 7 月に検討が始まっていました。

負債解消の一部として EOL 対応することはよくありますが、変更するならより良いものに置き換えていきたいです。
Vue 3 は幸い周辺の準備も整いつつあり、新たに利用できる機能も素晴らしいものです。

## 移行方法

実際に移行をおこなった方法を説明します。<br>
クラウドワークスの実装に由来する問題にもいくつか直面しましたが、一般的ではない話なので割愛して、かいつまんでの説明になります。

### Storybook 駆動移行

![スクリーンショット：Storybook 公式サイト TOP ページ](https://i.gyazo.com/b7e0722a37dd53e5cde9f12534987379.png)

クラウドワークスでは通常の Webpacker ビルド環境と Storybook ビルド環境は分かれています。<br>
この構成を利用し、Storybook 環境と、Storybook Vue 3 環境を同時に作成してメンテすることにしました。

クラウドワークスの Production 環境は Vue 2 で実行し、Storybook 上では同じコードを Vue 2 と Vue 3 の両方で動作を確認します。

この方法は [VueDemi](https://github.com/vueuse/vue-demi) を参考にしました。

クラウドワークスでは、`@` を JavaScript のルートディレクトリに alias していますが、これに加えて `~` を移行層に alias しました。alias 先をビルド環境によって分けています。

移行層では以下のように対応して、同じコードでどちらの環境でも動作するようにしました。

- `defineComponent`, `PropType` などを以下のように実装をわけています
  - Vue 2 環境では `@vue/composition-api` から export
  - Vue 3 環境では `vue` から export
- Vue.js の mount 部分の抽象化レイヤー([Migration guide - new global mounting API](https://v3-migration.vuejs.org/breaking-changes/global-api.html#a-new-global-api-createapp))
  - 呼び出し側では DOM とレンダリングする Component, props だけ指定

### Storybook の作成

Storybook はクラウドワークスでは昨年より導入されたこともあり、定義のない Vue.js コンポーネントも大量にありました。ここで移行のために全ファイルで対応する方針を取りました。

対応すべき 250 ファイルをスプレッドシートで管理し、ひとつひとつ確認をして移行していきました。

![スクリーンショット：Vue 3 移行作業のスプレッドシート](https://i.gyazo.com/794fb3b1f890a8f1806f87855081b435.png)

少なくとも Vue 3 の Storybook でコンポーネントが表示されているなら、動作は可能という最低限の担保ができます。

![スクリーンショット：ログインページの Storybook が表示されている](https://i.gyazo.com/46a88b847feabbb8fdaa2789d13969e4.png)

### ファイルを１つずつ対応

基本的に `new Vue()` している部分を `defineComponent()` に変更するだけで Options API のまま動作します。Composition API に書き換えたくなりウズウズしますが、そこは我慢です。

ただし、いくつかの互換性のない部分があり、変更を加えていきます。

[https://github.com/vuejs/core/tree/main/packages/vue-compat#upgrade-workflow](https://github.com/vuejs/core/tree/4e028b966991937c83fb2529973fd3d41080bb61/packages/vue-compat#upgrade-workflow)

- フィルタ（パイプ演算子）の使用を廃止
- `emits` へカスタムイベントを定義
- style の `* > *` スタイル指定時の崩れの対応
  - 子要素へのスタイル指定がうまくいかない問題
- `v-bind.sync` の置き換え対応
- VueRouter の対応
  - MPA であることもあり、さほど意味のある使い方をしていなかった
  - 使わないように変更
- マウント部分の差
  - Vue 3 では下の階層に DOM を生成するので CSS に影響を与える場合の修正

Storybook や Vue 2 環境での実行を通じ、ひとつひとつ確認しながら移行しました。

### Vue 3 への変更

上の準備を全て済ませた後で、Storybook 以外の部分も Vue 3 を利用するように変更して試していきます。

主な対応部分は下記通りです。

- package.json の変更
- テスト関連
  - `@vue/test-utils` の createLocalVue から Composition API を `use()` するところ、`shallowMount()` からの localVue の削除。
  - `Vue.nextTick()` ではなく `nextTick()` の named import へ変更
  - Storyshot の差を減らすために Promise の消化を多く実施

テストは盲点で API などが切り替わったことに気がついていなかったので、慌てて対応しました。

## プロダクションリリース後の修正

Vue 3 に置き換え対応ができた！プロダクションリリースされて無事終わった！と思っていたのですが、いくつか修正が必要な箇所も発見されました。

### VueMeta

すでに [Issue](https://github.com/nuxt/vue-meta/issues/696) に取り上げられていますが、meta の name が `meta` になることがあります。<br>
これが原因で viewport に正しい値を設定できず、スマートフォンから閲覧した際に画面サイズが通常と異なる問題が起きていました。

![iPhoneからのスクリーンショット：PCをから閲覧した倍率のままスマートフォンで縮小表示されている](https://i.gyazo.com/97ef52c848de3bad53f2ceee75ebe5d4.png)

BFF を導入していない本プロダクトでは OGP に対応するため Rails でも meta をレンダリングしているため、一時対応として VueMeta によるレンダリングがなくても最低限動作するように変更しました。

その後 [vueuse/head](https://github.com/vueuse/head) で同様の対応できるということで、検証したのち差し替え対応しました。

### その他

大きな声では言えませんが、data と props に同じ Class Object の一部を共用しているケースで props の Class method を用いて更新した場合に reactivity が動作せず、data 側の Class method を使うように変更したりしました。

詳しくは聞かないでください。🙃

## おわりに

移行期間を共に戦ってくれたエンジニア、ヘルプとやらかしを温かく見守ってくれた他のチームのエンジニアのみなさん、ありがとうございました！

今回の記事では Vue 3 への移行についてをお送りしましたが、その他のフロントエンドやバックエンドの負債についても引き続きジャンヌチームが先導しつつ、エンジニアチーム全体で解消に取り組んでまいります。

ここまでご覧いただきありがとうございました！
