---
title: クラウドワークスのフロントエンド活動を振り返る 2022
description: クラウドワークスアドベントカレンダー2022 １日目の記事です。
date: 2022-12-01
author: yamanoku
source: engineer.crowdworks.jp
noindex: true
---

![アイキャッチ：crowdworks.jp のフロントエンド活動を振り返る 2022](https://i.gyazo.com/86e6df2800df4963c772c41ceb1b5eb8.png)

この記事は [クラウドワークス Advent Calendar 2022](https://qiita.com/advent-calendar/2022/crowdworks) の１日目の記事です。

クラウドソーシングサービス「[クラウドワークス](https://crowdworks.jp/)」（以下 crowdworks.jp）にてエンジニアをしております、フロントエンドの可能性をしつこく信じ続ける [@okuto_oyama](https://twitter.com/okuto_oyama) です。

一昨年・去年と引き続き、今年もアドベントカレンダー初日の盛り上げ手としてやっていきます。よろしくお願いします。

## フロントエンド活動の振り返りをしてみよう

一昨年・去年もフロントエンド活動の振り返りをしてみましたが、今年もやっていきます。

- [クラウドワークスのフロントエンド活動を振り返る 2021](./looking-back-at-crowdworks-front-end-activities-2021)
- [クラウドワークスのフロントエンド活動を振り返る 2020](./looking-back-at-crowdworks-front-end-activities-2020)

去年と変わらず crowdworks.jp にはフロントエンド専属チームというものは存在しておりません。ですが、今年は去年よりも重要なフロントエンドにまつわる活動をしてこれたと思っています。

それでは、ご覧ください。

## 全体総括編

まずは crowdworks.jp の全体のフロントエンド活動を総括していきます。

### Vue2 から Vue3 へ移行完了

今年の大きな成果は Vue2 から Vue3 への移行完了、これに尽きると思っています。

合計 250 もの Vue.js ファイル（当時）がありましたが Storybook 駆動開発にて徐々に Vue3 へ移行していきました。erb の中で複雑に実装されていたり、内部で jQuery を使用している箇所もあったりするなど、容易なものばかりではなかったですがチーム内で分担・協力してすべて移行しきりました。

Vue3 への移行により Composition API を使用したり、より安定した型開発ができるようになりました。現在では新しい Vue コンポーネントを作成するときは `<script setup>` で書き、defineProps や defineEmits といった API を活用して開発しております。

詳細は以下エンジニアブログをご覧ください。

[Vue2 から Vue3 に移行完了しました！](/migration-from-vue2-to-vue3)

### Visual Regression Testing の導入

Vue3 移行の際には Storybook にてスナップショットテストをして DOM の変更を検知していました。しかし見た目（CSS）の変更についてのビジュアルテストは担保されていなかったため、Visual Regression Testing（以下 VRT）導入することになりました。

各種 VRT ツールを調査して、[Storycap](https://github.com/reg-viz/storycap) + [reg-suit](https://github.com/reg-viz/reg-suit) の構成を採用することにしました。運用しはじめの頃は不安定な部分もありましたが、都度細かな調整をして検知を安定させていきました。

新規で Vue コンポーネントを作る以外にも内部のリファクタリングや CSS の修正にてどこが変わったか・変わっていないかを理解しやすくなり、今や VRT はフロントエンド開発ではなくてはならない存在になっております。

詳細は以下エンジニアブログをご覧ください。

[フロントエンド開発体験向上のために VRT を導入してみた - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/vrt_with_regsuit)

### 型チェッカーを導入

Vue3 化によって安定した型開発ができるようになったのですが、肝心の Vue.js の型チェック自体はされておりませんでした。これでは手元で型エラーを無視してしまう可能性も出てしまいます。そこで Vue.js の型チェッカーツールである [vue-tsc](https://www.npmjs.com/package/vue-tsc) を CI 上で導入するようにしました。

vue-tsc を導入したことにより `<script lang="ts">` 内の型チェックはもちろんのこと、`<template>` 内の HTML タグの属性値も厳密にチェックしてくれるようになりマークアップの正しさが保証されるようになりました。以下は移行時に修正した一例です。

```diff
-  <form action="/login" accept-charset="UTF-8" method="post" novalidate="novalidate">
+  <form action="/login" accept-charset="UTF-8" method="post" novalidate="true">
```

最初は一部のコンポーネントの型チェックからはじめて、excludes などで範囲を絞りつつ、徐々に TypeScript ファイルも含めた対象範囲を広げていきました。

### CoffeeScript を JavaScript に機械的に変更

crowdworks.jp におけるフロントエンドの技術的負債としても名高かった CoffeeScript。こちらを [decaffeinate](https://github.com/decaffeinate/decaffeinate) にて手動で１つずつ置換していましたが、総 411 ファイルもあり非常に時間がかかっていました。それを Sprockets の変換コードを借用して、ほとんどを機械的に置き換えるという対応をしました。

変換したファイルは依然として `app/asstes` 配下にあるためこれを webpack 側に移行したり TypeScript 化するなどの対応はまだ残っていますが、大量にあったレガシーコードを一括で変更できたことにより、コードリーディングしやすくなりました。

詳細は以下エンジニアブログをご覧ください。

[CoffeeScript 辞めました - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/goodbye_coffeescript)

### Webpacker から Simpacker + webpack 構成へ

長らく crowdworks.jp のモダンフロントエンド開発に尽力してくれていた [Webpacker](https://github.com/rails/webpacker) ですが、今年の 1 月に[メンテナンス終了することが発表](https://twitter.com/rails/status/1483772667756957699)され、EOL 対応をどうしようかとなっていました。

後続の [Shakapacker](https://github.com/shakacode/shakapacker) ほか Rails 公式のフロントエンドライブラリを使用する選択肢もありますが、フロントエンドのリソースと Rails との密結合は断ち切りたいと思っていたのと、各社での Webpacker を廃止する事例もいくつか見受けられたので、脱 Webpacker 作業に取り組みました。

まずは Vue3 移行が終わった 4 月より各社の事例を集めたり、Webpacker 内部の webpack.config.js について調査していきました。その後は調査結果をもとに crowdworks.jp の Webpacker でバンドルされるソースを webpack 単体でビルドできるかを検証、最後はローカル開発ができるように設定したり CI が問題なく通るかを検証しながらリリースまでたどり着きました。

途中別の対応もあったので継続してやっていたのではないですが、半年以上かかった調査と移行対応でした。こちらに関しての詳細は後日エンジニアブログにて公開する予定です。お楽しみに！

**2022/12/13 追記**

記事が公開されました。

[ありがとう Webpacker さようなら Webpacker - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/thanks_webpacker_goodbye_webpacker)

### erb の Vue.js 化活動

[@okuto_oyama](https://twitter.com/okuto_oyama) は昨年の 10 月より技術的負債の解消をリードしていくチーム「ジャンヌ」に所属しています。活動の一環としてフロントエンドとバックエンドの密結合をなくしていくことにも取り組んでいっています。

フロントエンドとバックエンドの分離において優先されることとして、erb で記述された表示にまつわる部分を Vue.js 化していき、必要に応じてバックエンドも API 化する対応をしていました。最初にやったことは shared partials にて多くの画面で使用されているものを Vue.js 化し、それを使用しているページの erb を Vue.js 化していきました。

Vue.js 化においてはチームのフロントエンドのレベル感もバラバラだったので、モブプログラミング会を実施して不明点などを補いながら対応していくことができました。

現在は Rails の Controller においてアクセスが多いページを参考に、どの画面を Vue.js 化するかという計画を立てています。

![クラウドワークス QiitaTeam に載ってある jp フロントエンド開発概要ページのスクリーンショット](https://i.gyazo.com/791d9fa6db3ae0f73f6780b52ee45be1.png)

フロントエンド開発におけるドキュメントも随時整備しており、他チームでも Vue.js 化を前提にした開発しやすいような土壌を作っていっております。

crowdworks.jp における施策・機能開発をする際に他チームにて Vue.js 化できる箇所は新規作成したり erb から置き換え対応をしていただいています。非常に心強いです！

**2022/12/26 追記**

ユーザー向け機能開発チームの取り組みについての記事が公開されました。

[ユーザー向け機能開発チームで行っている施策駆動レガシーフロントエンド改善](https://zenn.dev/d4te74/articles/edfa10b5d15db9)

### コンポーネントへのデザイントークンの反映

昨年の取り組みでも紹介しましたが、デザインにおける負債解消に取り組むデザイン基盤チームは現在デザインシステム「norman」の開発を進めています。今年は norman におけるデザイントークンを定義していくことに注力し、カラーやフォント、余白、シャドウといったものを決めていきました。

![カラーパレットやテーマカラーに関する Figma データのスクリーンショット](https://i.gyazo.com/046b79d30b40359eebb87a7e46770f4f.png)

![タイポグラフィに関する Figma データのスクリーンショット](https://i.gyazo.com/6e94f50601ceeb47401ae31c9236978e.png)

![シャドウ、ボーダー、角丸に関する Figma データのスクリーンショット](https://i.gyazo.com/75caa8d3893f6a756d4b8e58e74522d7.png)

ベーストークンとセマンティクストークンでのそれぞれ定義したものを既存の norman コンポーネントに変更していっております。デザイントークンに関しての説明については過去の取り組みをご覧ください。

[生まれ変わったログインページにまつわるフロントエンド開発の話](./renewal-crowdworks-login-page)

その他 [Figma Tokens](https://www.figmatokens.com/) の導入検証や新たに定義したグリッドレイアウトの適応なども進めていく予定です。

### Vue Fes Japan Online 2022 登壇

今年 4 年ぶりに復活となった日本最大の Vue.js カンファレンス「Vue Fes Japan」。今回は全編オンラインでの開催となりました。

[Vue Fes Japan Online 2022](https://vuefes.jp/2022)

昨年より Vite や Vue3 が公開され、今年 11 月には Nuxt3 もリリースされるなど、Vue.js を取り巻く開発環境が変化してきました。Vue.js クリエイターでもある Evan You もカンファレンスに登壇し、いままでの歴史を振り返りつつこれからの展望についてを語ってくれました。その他各社での Vue3 への移行や新たなる OSS エコシステムに関連する発表もあるなど、とても実りがあるカンファレンスとなりました。

カンファレンスの参加レポートは以下エンジニアブログをご覧ください。

[Vue Fes Japan Online 2022 参加レポート](./report-vue-fes-japan-online-2022)

弊社からは [@t0yohei](https://qiita.com/t0yohei) と [@yamanoku](https://twitter.com/yamanoku) それぞれの CFP が採択され登壇できました。上述した Vue.js 化におけるフロントエンドの負債解消と Vue.js コンポーネントをアクセシブルにする方法についてを発表しました。

また [@yamanoku](https://twitter.com/yamanoku) は「なるほど Vue コンポーネント」にて各社の Vue.js によるコンポーネント開発やデザインシステム、アクセシビリティへの対応についての座談会に参加してきました。

発表資料・動画は以下リンクからご覧ください。

#### 負債が溜まったレガシーフロントエンド画面を Vue.js でリプレイスした話

- [発表資料](https://speakerdeck.com/t0yohei/fu-zhai-galiu-matutaregasihurontoendohua-mian-wo-vue-dot-js-deripureisusitahua)
- [YouTube](https://www.youtube.com/watch?v=HsBTx36c_kA&t=14423s)

#### Vue.js でアクセシブルなコンポーネントをつくるために

- [発表資料](https://speakerdeck.com/yamanoku/to-make-accessible-components-in-vuejs)
- [YouTube](https://www.youtube.com/watch?v=dtD4p89ogKM&t=15915s)

#### なるほど Vue コンポーネント

- [YouTube](https://youtu.be/HsBTx36c_kA?t=20413)

### その他フロントエンド改善ピックアップ

- フロントエンドに関する CI を GitHub Actions へ移行
- [markuplint](https://markuplint.dev/) ルールの拡充
  - [permitted-contents](https://github.com/markuplint/markuplint/blob/90f7a432cee9b807a81448990487239615492536/packages/%40markuplint/rules/src/permitted-contents/README.ja.md) ルールの導入
  - `target="_blank"` 時の `rel="noopener"` を付与するルール
  - [wai-aria](https://github.com/markuplint/markuplint/blob/90f7a432cee9b807a81448990487239615492536/packages/%40markuplint/rules/src/wai-aria/README.ja.md) ルールの導入
  - `<button>` の `type` 指定を必須化するルール
- Vue コンポーネントのスナップショットテストに markuplint を実施
- node_modules アップデート・不要モジュール剪定
  - moment.js から date-fns へ置き換え
  - Jest を最新バージョンに追従
- レガシーなレイアウト CSS ハックをやめる
  - `display: inline-block` で横並びしていたレイアウトを `display: flex` に変更
    - 割とよく目にする重要な画面でずっと使用されていました

## 個人活動編

一昨年、昨年と引き続きの自分語りですが、[@okuto_oyama](https://twitter.com/okuto_oyama) （[@yamanoku](https://twitter.com/yamanoku)）の 2021 年フロントエンド活動についても紹介させてください。

#### HTML 解体新書レビュー・座談会参加

今年発売された [HTML 解体新書](https://www.borndigital.co.jp/book/25999.html)ですが、著者である太田さんよりお声がけをいただき本書のレビュアーとして参加させてもらっていました。さらに僭越ながら[出版記念イベント](https://connpass.com/event/242592/)での座談会にも参加させていただきました。終了後の Twitter Spaces での雑談会も含めてとても楽しかったイベントになりました。

HTML 解体新書が発売されてよかったことの１つに社内での HTML にまつわるレビューについて自信がもてるようになったことです。

これまでは HTML の使い方について現行の仕様を参照するしかなかったのですが、その橋がけとして HTML タグの具体的な用法を知ることができ、アクセシビリティ上の注意点も確認できるのでとてもありがたいです。

書評についても以下エンジニアブログにて公開しております。[リフロー版の電子書籍](https://twitter.com/bd_publishing/status/1581843012904452096)も販売開始されておりますので気になった方は是非購入してみてください。

[「HTML解体新書」HTMLのこれからと向き合うための本](./review-html-anatomische-tabell-book)

#### OSS へのコントリビュート

今年は[去年の活動](https://zenn.dev/yamanoku/articles/bd8d86ee79459b)と比較してそこまで活動できていませんでしたが、フロントエンドにまつわる OSS の翻訳やドキュメントの修正などを行っておりました。

[trasnlate: a11y-no-redundant-roles by yamanoku · Pull Request #523 · svelte-jp/svelte-site-jp](https://github.com/svelte-jp/svelte-site-jp/pull/523)

[「Guide > Extra Topics > Vue and Web Components」の翻訳 by yamanoku · Pull Request #330 · vuejs-translations/docs-ja](https://github.com/vuejs-translations/docs-ja/pull/330)

[「Guide > Built-in Components > Teleport」の翻訳 by yamanoku · Pull Request #396 · vuejs-translations/docs-ja](https://github.com/vuejs-translations/docs-ja/pull/396)

個人的に嬉しかったことの１つに、昨年ドキュメント変更の提案をしていたものに助け舟を出してくれた方がおり、最終的に変更まで繋がったことがあります。こうして見ず知らずの方に助けてもらえるのも OSS ならではだなと感じる出来事でした。

[Suggest: Moving the Accessibility (A11y) item in Advanced Usage to Get Started. · react-hook-form · Discussion #5444](https://github.com/react-hook-form/react-hook-form/discussions/5444#discussioncomment-3715850)

#### 社内・社外での LT 発表

今年は社内と社外それぞれで LT 発表させてもらいました。

PWA Night でのアクセシビリティをテーマとした勉強会では、PWA をアクセシブルにする方法と Vue.js とアクセシビリティに関する内容を発表しました。

[PWA Night vol.35 yamanoku 登壇資料 - Google スライド](https://docs.google.com/presentation/d/1zbE5YH6xuYZysHAvJ0GdWkO5y4h9E_9gUZPD1x6a-io/edit?usp=sharing)

社内のエンジニア LT 会では上述した HTML 解体新書の書評記事では語りきれなかったことを発表しました。

[Deepest HTML Anatomische Tabellen - yamaScrapbox](https://scrapbox.io/yamanoku/Deepest_HTML_Anatomische_Tabellen)

Saitama.js にて Stroybook を活用したフロントエンドの負債解消に関する取り組みの発表をしてきました。

[Storybook でフロントエンド開発の治安を良くしていく話 - yamaScrapbox](https://scrapbox.io/yamanoku/Storybook_%E3%81%A7%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E9%96%8B%E7%99%BA%E3%81%AE%E6%B2%BB%E5%AE%89%E3%82%92%E8%89%AF%E3%81%8F%E3%81%97%E3%81%A6%E3%81%84%E3%81%8F%E8%A9%B1)

#### WEB+DB PRESS 連載記事の査読協力

[https://twitter.com/takepepe/status/1583428778331901953](https://twitter.com/takepepe/status/1583428778331901953)

吉井さん（[@takepepe](https://twitter.com/takepepe)）が WEB+DB PRESS にて連載している「フロントエンド コンポーネント駆動開発」のアクセシビリティ改善記事に査読協力いたしました。知人も寄稿していた WEB+DB PRESS ですが、生原稿が見られたのは貴重な体験でした。フロントエンド開発での意識し忘れがちな部分でもあるので是非読んでもらいたいです。

## おわりに

改めて振り返ってみると今年も色々とやってきたな…となりました。昨年よりも crowdworks.jp 組織ごととしてのフロントエンド活動ができたように思えます。

もちろんフロントエンドに関する課題はまだまだ残っており、これから対応していきたいことも含めてざっくりと書き出してみました。

- フロントエンド・バックエンドの密結合分離
- SSG, SSR の機構を検討していく
  - SEO のために静的な HTML を返せるようにする
  - Nuxt.js ？ Astro ？
  - BFF 層の開発
- webpack チューニング
  - v4 → v5 へのアップデート
  - 不要モジュール剪定
  - 他バンドルツールの検討（Vite, Rollup 等）
- フロントエンドテストの充実
  - Storybook バージョンアップ対応し [Play function](https://storybook.js.org/docs/vue/writing-stories/play-function) を使用したい
- フロントエンド開発における参考となる Vue.js の実装パターンをつくる
- フロントエンドに関するディレクトリを Rails 依存の構成から変更していく取り組み
- デザインシステムの実装にまつわる参加者を増やす

色々とありますね。

---

ここまでご覧いただきありがとうございました。

明日の記事は SRE チームの高橋さんによる「2022 年 crowdworks.jp の SRE チームでやったこと」になります。

本日から 25 日まで様々な内容をお届けしていきますので、お楽しみに！

[クラウドワークスのカレンダー | Advent Calendar 2022 - Qiita](https://qiita.com/advent-calendar/2022/crowdworks)
