---
title: クラウドワークスのフロントエンド活動を振り返る 2023
description: クラウドワークスアドベントカレンダー2023 １日目の記事です。
date: 2023-12-01
author: yamanoku
source: engineer.crowdworks.jp
noindex: true
---

![アイキャッチ：crowdworks.jp のフロントエンド活動を振り返る 2023](https://i.gyazo.com/4f59a785ee61d1a601d789a27294f9a9.png)

この記事は[クラウドワークス Advent Calendar 2023](https://qiita.com/advent-calendar/2023/crowdworks)シリーズ 1の1日目の記事です。

クラウドソーシングサービス「[クラウドワークス](https://crowdworks.jp/)」（以下 crowdworks.jp ）にてエンジニアをしております、フロントエンドの可能性をしつこく信じ続ける[@okuto_oyama](https://x.com/okuto_oyama)です。

一昨年・去年と引き続き、今年もアドベントカレンダー初日の盛り上げ手としてやっていきます。よろしくお願いします。

## フロントエンド活動の振り返りをしてみよう

一昨年・去年もフロントエンド活動の振り返りをしてみましたが、今年もやっていきます。

- [クラウドワークスのフロントエンド活動を振り返る 2021](./looking-back-at-crowdworks-front-end-activities-2021)
- [クラウドワークスのフロントエンド活動を振り返る 2022](./looking-back-at-crowdworks-front-end-activities-2022)

## 全体総括編

まずは crowdworks.jp の全体のフロントエンド活動を総括していきます。

### erbのVue.js化活動が拡大

昨年から続けているフロントエンドとバックエンドの分離作業についてお話しします。Railsのテンプレートエンジンであるerbを用いた表示部分をVue.jsへと移行し、同時にバックエンドのAPI化も進めています。このVue.js化の作業は1チームに限定せず、多くのチームが参加し、活動が広がっています。

Vue.jsへの移行に伴うスタイルの移植作業もスムーズに行えるよう、わかりやすいガイドラインを策定しました。

![Vue化におけるCSS対応ガイドラインのスクリーンショット。どういう目的で制定されたのか、いくつかのチェック観点についてまとめている。](https://i.gyazo.com/866de21d5c628b7f50f1c1604e6adbfb.png)

今後はVueコンポーネントの粒度やComposablesを用いたビジネスロジックの設計に関するドキュメントを作成する予定です。

今年Vue.js化された画面は以下の通りです。

- クライアントプロフィール画面
- メッセージボックス画面
- 通知一覧画面
- ユーザーブロック一覧画面
- ワーカーポートフォリオ詳細画面
- ユーザーサポート向け管理画面

現在、「[仕事を探す](https://crowdworks.jp/public/jobs)」画面のVue.js化を進めています。この作業はまだ途中段階ですが、デスクトップビューではerbからVueコンポーネントへの移行が進んでいます（ブラウザの検証ツールで確認してみてください！）。

モバイルビューに関しても、引き続きVueコンポーネントを作成して対応していきます。

### フロントエンドディレクトリの再編

昨年、私たちはモダンなフロントエンドビルドパイプラインをWebpackerからwebpackとSimpackerに変更しました。この変更を機に、フロントエンドとバックエンドの役割を明確に分けるため、従来のRailsのディレクトリ構成を見直し、新たなフロントエンド専用のディレクトリ構成へ移行しました。

新しい構成は大まかに以下のようになっています。

```
- app/assets - 従来通りSprockets管轄のリソース
- typescript - TypeScript関連全般
  - vue-app - Vue.jsによるフロントエンドアプリ
    - src (旧app/javascript)
    - storybook (旧frontend-tools/storybook-norman)
    - webpack
    - jest
- resources - 環境非依存の共有リソース
  - openapi - OpenAPI関連
```

ディレクトリ構成の決定には以下の記事を参考にしました。

- Project base or Language base の対比: [モノレポの構成](https://f110.jp/posts/how-to-organize-mono-repository/)
- [30近いリポジトリを一つのリポジトリにまとめました - HRBrain Blog](https://times.hrbrain.co.jp/entry/monorepo)
- [メルカリShops での monorepo 開発体験記 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/20210817-8f561697cc/)
- [monorepoをなぜ採用したか、及び大まかな構成： 三井物産デジタルアセットマネジメントでの事例｜Matsumoto Yuki](https://note.com/y_matsuwitter/n/nf878a2aa229a)
- [システムリニューアルに伴う monorepo 構成を考える | giftee engineer blog](https://blog.giftee.dev/2021-07-30-monorepo-setup-for-gift-wallet-renewal/)

### コンポーネントライブラリの開発

crowdworks.jp では、デザインシステム「norman」の開発を継続しています。今年は、「[Design Systems ― デジタルプロダクトのためのデザインシステム実践ガイド](https://www.amazon.co.jp/dp/4862464122)」の監修者である佐藤伸哉さんに参加していただき、デザインシステムの構築と改善に関するアドバイスを受けていました。

[デザインシステムにおける意思決定の質を上げる方法｜YUCCA](https://note.com/yucca_wi/n/nf4c0277ea25b)

現在、normanではデザイントークンを用いて再設計したコンポーネントライブラリを開発中で、画面に直接適用できるようにしています。開発中のコンポーネント群は以下の通りです。

- ButtonBackToTop
- Button
- Checkbox
- CrowdWorksLogo
- Heading
- Icon
- Input
- SocialLogo
- Tabs

画面内共通パーツとしては画面下部のフッターコンポーネント（Footer）もnorman製としてリリースされており、現在 crowdworks.jp 画面内で使用されるようになっております。ヘッダーコンポーネントの作成・適応についても現在取り組んでいる最中です。

レイアウトにはGrid Systemを採用したGrid Layoutコンポーネントを作成しており、画面のレイアウト構築に利用しています。Grid Layoutに関しては、後述するVue Fes Japanでも発表しました。

<script defer class="speakerdeck-embed" data-id="9da16dc65b184a7b9a06e3aca4c0e4f7" data-ratio="1.7772511848341233" src="//speakerdeck.com/assets/embed.js"></script>

また、細かなリアクティブな動作には[VueUse](https://vueuse.org/)を使用し、コンポーネント内に組み込んでいます。

### CSS Modulesの有効化

これまでのVue.js開発では、スタイルが外部に漏れ出ないようにScoped CSSを用いたスタイル開発を行ってきました。

```html
<style scoped>
  .cwv-hoge-component-root {
    font-family: Meiryo, 'Hiragino Kaku Gothic Pro', 'MS PGothic', sans-serif;
    font-size: 12px;
    line-height: 1.6667;
    color: #333;
  }
</style>
```

この手法により、`[class*="hoge-"] a`といったような形で指定された古いグローバルなCSSとの詳細度をうまく制御できるようになっていました。しかし、この方法ではクラス名の重複を避けるための慎重な命名設計が必要でした。

この問題を解決するため、Vue.jsでCSS Modulesを使用できるようにしました。これにより、命名がより容易になり、開発効率が向上しました。

### 静的ランディングページ（LP）のフロントエンド機構にAstroを導入した

これまで、静的なLPは単一のindex.htmlやCSSファイルで管理していました。しかし、crowdworks.jp で使用しているスナップショットやビジュアルリグレッションテスト（VRT）などの機構をLPにも活用するため、ページをVueコンポーネント化し、SSG（Static Site Generation）用にAstroを導入しました。

### Node.js v16 EOL（サポート終了）対応

crowdworks.jp で使用していたNode.jsのバージョンはv16系でしたが、今年の9月11日にサポートが終了になりました。これを受けて、より次のバージョンのv18.17.1へのアップデートを行いました。

### Storybook v7へのバージョンアップ

crowdworks.jp のフロントエンド開発、特にUI開発において重要な役割を果たしているのがStorybookです。

UIの表示パターンの網羅、MSWを用いたモック開発、CSSのリファクタリングにて結果の同一を確認するためのVRT（ビジュアルリグレッションテスト）、[スナップショット結果を活用したMarkuplintでのチェック](https://engineer.crowdworks.jp/entry/crowdworks_frontend_2023_02)やアクセシビリティチェックなど、多岐にわたる用途で活躍しています。

今年、Storybook v7が発表され、crowdworks.jp でもその恩恵を受けられるようアップデートしました。このアップデートにより、Babelの設定が簡素化され、立ち上げ速度の向上や設定における型情報の扱いも容易になりました。

[Storybook 7.0](https://storybook.js.org/blog/storybook-7-0/)

ただし、スナップショットテストの設定が複雑化しているため、現在は別ディレクトリでの運用を行っています。Storybookのファイル数も増加しており、今後は[Vitest](https://vitest.dev/)を用いた並列スナップショットテストへの切り替えを検討しています。

### フロントエンドの技術的負債 みんなで学ぶ Lunch LT発表

ファインディ株式会社主催のフロントエンドの技術的負債に関するLT会で、crowdworks.jp の事例を発表しました。

- [イベントページ](https://findy.connpass.com/event/281811/)
- [Togetterまとめ](https://togetter.com/li/2148644)

crowdworks.jp のフロントエンド開発の歴史を振り返り、私が所属するチーム「ジャンヌ」での技術的負債の継続的な解消について紹介しました。また、サイボウズ株式会社、Chatwork株式会社、株式会社スリーシェイク、ファインディ株式会社の事例も学ぶことができ、非常に有意義でした。

発表資料は公開していますので、ぜひご覧ください。

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSeyDAwaa3AfYhhQDavajOc1ijSaJLO49_hFj_kvx2KetGvb6ozzlQ3VrQFjxaVCRr44XbId7lckT1k/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" title="当事者不在でも変化してきたクラウドワークスのフロントエンド開発について" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="width: 100%; height: 100%; aspect-ratio: 760 / 569"></iframe>

### Vue Fes Japan 2023スポンサー＆登壇

日本最大級のVue.jsカンファレンス「Vue Fes Japan 2023」が今年オフラインで開催されました。今年は株式会社クラウドワークスが同時通訳スポンサーとして協賛し、社員3名が登壇しました。ボランティアスタッフと一般参加者を含めて合計6名がイベントに参加しました。

![クリエイティブウォールにクラウドワークスのロゴが書かれており、当日参加した社員でそのマークを指さしながら記念撮影している様子](https://i.gyazo.com/973927111c8fd906e32466266f98b2e8.png)

以前、2019年のカンファレンスにてスポンサー協賛していたことがありましたが、台風のため中止となりました。その後のコロナ禍という長い期間を経て、4年ぶりに再びオフラインカンファレンスにてスポンサーとして参加できたのは大変感慨深い経験でした。

当日の参加レポートは以下の記事でまとめていますので、ご覧ください。

[Vue Fes Japan 2023 参加レポート](./report-vue-fes-japan-2023)

### その他フロントエンド改善ピックアップ

- Vueコンポーネントの `<style>` 内順序整理のためにstylelint-orderの導入
- `@vueuse/head`から推奨された[`@unhead/vue`](https://github.com/unjs/unhead/tree/main/packages/vue)に変更
- tsconfigの `strict: true` を有効にする
- 未使用だったstylelint-scssを廃止
- HTMLのid属性用にUUIDを自動付与するVueプラグイン作成
  - React.jsの [`useId`](https://react.dev/reference/react/useId) のような挙動

## 個人活動編

一昨年、昨年と引き続きの自分語りですが、[@okuto_oyama](https://twitter.com/okuto_oyama)（[@yamanoku](https://twitter.com/yamanoku)）の2023年のフロントエンド活動についても紹介させてください。

### OSSへのコントリビュート

今年は大きなOSS２つにコントリビュートができた年でもありました。

１つが社内で大活躍中のStorybookへのコントリビュートです。スクリーンリーダー、キーボードユーザーへのアクセシブルな対応として本文へリンク「スキップリンク」がStorybook上でも搭載されているのですが、ロゴが縦長でサイドバーが広がった状態だとスキップリンクが常時見えた状態になる問題があったのですがそれを解消しました。こちらはStorybook v7に搭載された修正対応です。

[fix: skip to canvas link style by yamanoku · Pull Request #21021 · storybookjs/storybook](https://github.com/storybookjs/storybook/pull/21021)

Storybookの公式X（旧Twitter）にてコントリビューターとして紹介してもらったのが大変うれしかったのを記憶しております。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Shoutout to <a href="https://twitter.com/okuto_oyama?ref_src=twsrc%5Etfw">@okuto_oyama</a> for the spot-on contribution🔍. Thanks to him, we merged <a href="https://t.co/M6dZSHcEvG">https://t.co/M6dZSHcEvG</a> improving our UI.<br><br>Great job at getting your first contribution in💪. Looking forward to your next one. <a href="https://t.co/uLXquLIrI8">pic.twitter.com/uLXquLIrI8</a></p>&mdash; Storybook (@storybookjs) <a href="https://twitter.com/storybookjs/status/1631006416986165254?ref_src=twsrc%5Etfw">March 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

もう１つは社内導入をしてみて個人でも活用しているAstroへのコントリビュートです。静的なHTMLを出力する際にインラインで `<style>` が記述されるのですが、現在既に非推奨となった `type="text/css"` が付与されていました。個人でMarkuplintを活用してHTMLをチェックしている身としては不要な記述だと感じていたので修正PRを作成しました。こちらはv3.0.13にて反映されました。

[Removed `<style>` with `type="text/css"` from inline output at build time by yamanoku · Pull Request #8480 · withastro/astro](https://github.com/withastro/astro/pull/8480)

そのほか、Vue.js日本語ドキュメントへの翻訳対応や、2021年にIssueとして起票した提案が2年越しのメジャーアップデートにて修正対応してもらいました。

[3.3: defineSlots & slots option by yamanoku · Pull Request #1363 · vuejs-translations/docs-ja](https://github.com/vuejs-translations/docs-ja/pull/1363)

[ShareButton's `aria-label` is interfering with what I really want to say. · Issue #397 · nygardk/react-share](https://github.com/nygardk/react-share/issues/397)

### 社外へのLT発表

社外勉強会ではSaitama.jsにて「JavaScript開発のこれまでとこれから」と「WAI-ARIAのIDL属性について」をそれぞれ発表してきました。

[JavaScript 開発のこれまでとこれから - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vQSVfknQSQjLyX64N2e-UqJAY14DNUc6AE4glPiIRi0bEPCidFajb9yCLZ4s2gpFyV5piKL3yiWsi8y/pub?slide=id.p)

[WAI-ARIA の IDL 属性について - yamaScrapbox](https://scrapbox.io/yamanoku/WAI-ARIA_%E3%81%AE_IDL_%E5%B1%9E%E6%80%A7%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

JSConfJP 2023では現在新たに策定されているWeb APIでもあるNavigation APIがSPAにおいてアクセシビリティ観点でどう改善されそうか、について発表してきました。

[画面遷移のアクセシビリティ課題を解決しうる Navigation API への期待 - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vSosGMESLA5IiR4NPz3i2u8XF_wkHsqP80pHA1a4q-Gmk9CIFkUobNc5pMvJj6Tth0PEGmoExmalOQj/pub?slide=id.g29cfbd0e8bc_2_0)

12/1に開催されるMeguro.cssでは2020年〜2023年までのCSSの進化についてを発表してくる予定です。

[Meguro.css #9 @ oRo - connpass](https://megurocss.connpass.com/event/300400/)

## おわりに

今年は、フロントエンドの技術的負債の解消に多くのチームが取り組み、Storybookのバージョンアップや作業環境の更新など、様々な改善を行ってきました。新卒エンジニアもフロントエンド技術的負債解消にモブプログラミング等を通じて参加していただいており、頼もしい限りです！

しかし、技術的負債を解消したと思っても、新たな負債を生むこともあります。例えば、「モダンフロントエンド」の技術を採用しつつも、Vueコンポーネント内でjQueryを使っているなど、設計上の違いが残っている場合もあります。

引き続き技術的負債と向き合いながら、誰にとっても迷いのないフロントエンド開発ができるよう、ADRや開発ドキュメントを残すことやフロントエンドに不慣れな人への開発サポートを行うことも計画しています。

---

ここまでご覧いただきありがとうございました。

今年のアドベントカレンダーは参加者も増え、シーズン２まで拡大しました。今後も25日まで様々な内容をお届けしますので、お楽しみに！

[クラウドワークス - Qiita Advent Calendar 2023 - Qiita](https://qiita.com/advent-calendar/2023/crowdworks)
