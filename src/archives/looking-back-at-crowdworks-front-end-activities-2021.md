---
title: クラウドワークスのフロントエンド活動を振り返る 2021
description: クラウドワークスアドベントカレンダー2021 １日目の記事です。
date: 2021-12-01
author: yamanoku
source: qiita.com
noindex: true
---

![crowdworks.jp Front-End 2021](https://i.gyazo.com/a6a059c98551b3510ce7ad3f73359dd0.png)

この記事は [クラウドワークス Advent Calendar 2021](https://qiita.com/advent-calendar/2021/crowdworks) の１日目の記事です。

crowdworks.jp でフロントエンドの可能性をやはり模索し続ける @yamanoku です。アドベントカレンダーを今年もやっていきます。去年と引き続き、初日の盛り上げ手としてやっていきます。よろしくおねがいします。

## フロントエンド活動の振り返りをしてみよう

去年もフロントエンド活動の振り返りをしてみましたが今年もやっていきます。

[クラウドワークスのフロントエンド活動を振り返る 2020 - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/crowdworks_frontend_2020)

報告ができるということは、なんらかの進捗が出ているということだと思います（解釈）。
そして、現時点ではフロントエンド専属チームは存在していませんが、徐々にその役割が見えてきたことがあるのでその報告もさせてもらえればと思います。
それでは、ご覧ください。

## 全体総括編

### `#frontend` を `#jp_frontend`に分化

![写真：Slackのチャンネル名の変更提案をしている様子](https://i.gyazo.com/28a37ef6412bda983779b2c6c0d461cf.png)

- Slack のチャンネル名を変更した話です
- もともと crowdworks.jp エンジニア有志でこっそり始めた「SPA 実験しよう」というチャンネルでした
- 抽象度を下げるために「frontend の開発効率を改善して cwv\* を爆上げしよう」に変更されて
  - _cwv = Core Web Vitals_
- もともとあった `#frontend` チャンネルをクラウドワークス総合のフロントエンド雑談チャンネルにして
- crowdworks.jp のフロントエンドに関するチャンネルを `#jp_frontend` という名前にして移動
  - jp 接頭辞なのは、社内では crowdworks.jp のことを「jp」と呼ばれていることから由来
- このチャンネル名にした結果、話題を絞りやすくなりました
  - dependabot でのセキュリティアラートの話題やフロントエンドライブラリ更新に関する質問など
    - 去年の課題にあった対応の属人性排除のためエンジニア全体で対応になりました :thumbsup:
    - 相談に来た人が日報で「フロントエンドチームに相談乗ってもらった」といってもらっておもしろかったです
    - **注）crowdworks.jp にフロントエンド専門チームは正式には存在しません** :upside_down:

### Storybook 開発

![Storybook ロゴ](https://i.gyazo.com/a8022f073f33fb2d0543eddb96ab41d4.png)

- 前年からこっそりと導入してみてました
  - 対応してくれた [@bugfire](https://qiita.com/bugfire) ありがとう
- Storybook でビルドしたものを S3 にアップロードして社内限定の URL で見れるようになりました
  - ローカル環境を立ち上げなくても社員であれば誰でも確認できます :thumbsup:
- 施策のフロントエンド開発で活用しました
  - [カンタン発注プラン診断](https://crowdworks.jp/order_plan_diagnoses)での開発
  - デザイン基盤整理（後述）
- Rails アプリケーションを立ち上げなくても画面確認ができるようになり最高になりました
- `multiSnapshotWithOptions()` を用いてスナップショットテストをストーリーごとに生成するように変更しています
- 各種 addon（action, a11y）の導入やレスポンシブ確認、背景色指定ができるようカスタマイズをしています
- API 通信のモックとして[axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) を使用してみてます
  - MSW（Mock Service Worker）に移行してテスト・Storybook 開発の両面をやれそうな期待があります
- フロントエンド開発の生産性改善の観点で大いに役立っています
  - 全社で発表した生産性改善の内容として月間 MVP をもらったりもしました
  - [2021 年９月期　通期決算説明資料（p.24）](https://contents.xj-storage.jp/xcontents/AS80447/6f3169e9/3fa6/4198/8313/6ee138e207d0/140120211115436134.pdf)でも取り上げられていました
- 後述する Vue3 移行にも絶賛役立っています

### Vue3 の勉強会・移行計画と対応方法

![Vue.js ドキュメントサイト 日本語版](https://i.gyazo.com/5f8df1e7c05fb84dd4808fe20c46029a.png)

- Vue3 が発表されてしばらく経ちますね
- プロダクトコードでは [`@vue/composition-api`](https://github.com/vuejs/composition-api) を使用するようになって１から Options API で書くこともなくなりました
- プロダクトとして触る際に、理解を深めるために [WEB+DB PRESS Vol.120](https://gihyo.jp/magazine/wdpress/archive/2021/vol120) の Vue.js 3 特集の社内輪読会を計４回実施しました
  - 勉強会の主催、書籍購入などで動いてくれた [@t0yohei](https://qiita.com/t0yohei) ありがとう！
- 社内の Vue.js も v2 から v3 にするため徐々に移行していってます
  - 最初は [@t0yohei](https://qiita.com/t0yohei) が独自でチャレンジしてみてました
- 移行する計画について（[@bugfire](https://qiita.com/bugfire) 考案）
  - migrate-vue という Vue2 のままで Vue3 同様の機能を提供するものを作成しました - [vue-demi](https://github.com/vueuse/vue-demi) からインスパイアされています - `import { defineComponent } from '~/migrate-vue';` のように使用できます
  - Storybook は Vue2 系、Vue3 系 が共存するように `storybook`, `storybook-vue3`とそれぞれ作成しました - Vue3 用の Story 定義ファイルを `*.stories3.ts` にして分離しています - Vue3 移行が完了したら一本化します
    - Storybook を活用してスナップショットテストで差分を取ります
    - これまでに Stories がなかったものも一緒に作成してます
      - **Rails の SCSS 側でスタイルを当てているものもあり完全再現できないものもあります…**
- Vue2 では問題なく動いていたものが Vue3 で動かなくなるものも発見できて Storybook 内で先にその挙動が確認できるのが安心できます
  - 例：`emits` の指定、scoped css 時の `* > *` スタイル指定時の崩れ
- まだまだ絶賛対応中です :muscle: 対応してくれる人、求む！

### デザイン基盤整理での画面リニューアル活動

![写真：ログイン画面のリニューアル前後](https://i.gyazo.com/2b6ba9a565bdcbef8f60ad4e23d7dcd3.png)

- プロダクトを長年運用する中でデザイン作業において以下問題点があがるようになりました
  - 何の意図をもってデザインされたものなのかわからない
  - 複雑な実装になっているため変更提案ができない・しづらい
  - デザインデータのメンテナンスがなく１から作る必要があり必要な作業時間がとられる
- それらの問題点を解消するためにデザイン基盤整理活動がはじまりました
  - 更なる詳細は [生まれ変わったログインページにまつわるフロントエンド開発の話 - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/renewal-login) を参考ください
- 第１弾として[ログイン画面](https://crowdworks.jp/login)のリニューアルがされました
  - リニューアル後、改善率で見て直帰率は 30% 改善されたデータがとれました :tada:
- タイムカードアプリの Web アプリ化もデザイン基盤整理の文脈で行われました
  - [時間単価制の契約にて利用できる「CW タイムカード」が新しくなります | クラウドワークス　お知らせブログ](https://blog.crowdworks.jp/?p=4515)
  - こちらは [2022 年度上期全社キックオフ](https://www.wantedly.com/companies/crowdworks2/post_articles/357929)で表彰されました
- [会員メールアドレス登録画面](https://crowdworks.jp/user/new_email) についても絶賛対応中です
  - アドベントカレンダー開催中にはなんらか良い報告できるかも…？ :eyes:
- JavaScript が読み込めない環境下での誘導も作成しています（下図参照）

![写真：ブラウザ上でJavaScriptが向こうになっている環境下でのエラー表示](https://i.gyazo.com/d12770496321df5ed9595af03d60c65b.png)

### ブラウザの IE11 推奨環境を除外

[Internet Explorer を推奨ブラウザから除外します - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/2021/02/18/120000)

- 今年の３月１５日をもって IE11 を推奨利用環境の対象外にしました
  - 参考：[Internet Explorer 11 を推奨利用環境の対象外といたします | クラウドワークス　お知らせブログ ](https://blog.crowdworks.jp/?p=4293)
- JavaScript でレガシーブラウザ向けの考慮部分はそれほど多くなかったです
  - トランスパイル結果が劇的に減る、というのはありませんでした
- 代わりに CSS においてはモダンブラウザ向けで活用できる事例が増えてきています
  - 追従ヘッダの固定に `position: sticky` を使用しました
  - 複数行の３点リーダーに [`--webkit-line-clamp`](https://developer.mozilla.org/ja/docs/Web/CSS/-webkit-line-clamp) を導入しています
    - もともと jQuery Plugin で処理していたものを Web 標準技術で対応可能になりました
- macOS、iOS の Safari で使用できるようになってきたものも触れてきて嬉しいです
  - flexbox における gap など

### Core Web Vitals 対応

![写真：LCP、FID、CLS](https://i.gyazo.com/e273317036912a9ac944f9073a2af47f.png)

- 今年の 6 月より Core Web Vitals がランキング要因に関わることが発表されました
  - Core Web Vitals に関しては[公式の記事](https://developers-jp.googleblog.com/2020/05/web-vitals.html)を参考ください
- SEO の観点においてテコ入れが必要になってきました
- 業務委託として参加してもらっている [@k-waragai](https://qiita.com/k-waragai) にいくつか対応してもらいました。
  - TOP ページのヒーロー画像の二重読み込みによる LCP の削減対応
  - コンパイルされた assets を読み込むものを必要なものだけにするための対応
- プロダクションコードにおける（Core Web Vitals 対応としての）パフォーマンスチューニングは課題になっています
  - プロダクトとは切り離された LP において WebP を使用してみて早くなるか検証するようです

## プロダクトの一部ページをアクセシビリティチェックしてもらった

[続・もしあなたが『アクセシビリティ試験』をやることになったら WP ZoomUP #71 - YouTube](https://www.youtube.com/watch?v=-SjG-2l4I4g)

- [続・もしあなたが『アクセシビリティ試験』をやることになったら WP ZoomUP #71](https://wpzoom.connpass.com/event/219967/) にて実施してもらいました
- チェックは freee 株式会社の[伊原力也さん](https://twitter.com/magi1125)にお願いしました
- crowdworks.jp の[トップページ](https://crowdworks.jp/)と[ログイン画面](https://crowdworks.jp/login)の２ページをチェックしてもらいました
- リニューアルされたログイン画面は**ほぼ悪いところはなかった判定**だったのが嬉しかったです！
- チェックいただいたトップページもアクセシビリティ改善活動の中でいくつか対応できました
  - Critical アラートのものがなくなりました :tada:

#### トップページ改善前（チェック時）

![106 Issues の報告](https://i.gyazo.com/1fad6682527b177932ab430ab61edce6.png)

#### トップページ改善後（９月９日時点）

![93 Issues の報告](https://i.gyazo.com/37658a1e3e5f2ae97c2c6c395c8da042.png)

### その他 crowdworks.jp のフロントエンド改善トピック

- [markuplint](https://github.com/markuplint/markuplint) をプロダクトに導入してみました
  - デザイン基盤のものに段階的に使用してみます（[記事](https://engineer.crowdworks.jp/entry/using-markuplint)）
- セキュリティ関連で管理画面環境下でのアセットの WAF 対応をしました
- 仕事詳細画面の OGP 画像が Twitter で見えなかった不具合を修正しました
  - 該当の画像ディレクトリが robots.txt にて制限されていました
- 会員登録の生年月日の年入力のインターフェイス改善しました
  - 1900 年から（！）選択するようになっていたものを現在から 100 年前からに変更
- 使用している Node.js を 16.13.0 にアップグレード対応しました
- Docker 開発でホストとコンテナで同期していた node_modules を Docker data volume に移動しました
- CircleCI のフロントエンドビルドの改善（予定）もあります

## 個人活動編

ここからは完全に自分語りですが、@yamanoku の 2021 年フロントエンド活動についてもご紹介します。

### Front-End Study に登壇

[Front-End Study #3「『当たり前』をつくりだす Web アクセシビリティ」 - YouTube](https://www.youtube.com/watch?v=eX8Lf20ETew)

- [potato4d](https://twitter.com/potato4d) さんからご縁があって Forkwell 社主催の [FEStudy](https://forkwell.connpass.com/event/198726/) に出演しました
- Web アクセシビリティ回でした
- [ymrl](https://twitter.com/ymrl) さんと[五十嵐](https://twitter.com/TheGodOfNeet)さんという偉大な２人に挟まれて喋ってきました。
- 特段真新しい内容を発表したわけではないですが、一番言いたいことは最後にまとめられたかなと思います
- 登壇資料は以下から閲覧できます

[これからもつづける Web アクセシビリティ - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vRIhRTjYc1yxxNRSE0-PbTHTyvSHh07pkuVapbek_-0wkYyF0scZ5XU0danIEky5YJToE0W3AwUCDXc/pub?start=false&loop=false&delayms=3000&slide=id.g84674502f3_0_7)

### オープンソース活動

![Vue A11y 日本語サイト TOPページ](https://i.gyazo.com/4469dfa5c839ae55f60b03acb55543fc.png)

- 去年から活動してみて、今年も細々と活動してみました
  - 活動履歴は [Notion](https://www.notion.so/yamanoku/2021-2c4fa51b832645f494698ebd11e069f9) に前期・後期でまとめてみています
- 主にオープンソースへのコントリビュートするのをやってみています
- ありがたいことに [haze-it](https://github.com/haze-it) さんと [kazupon](https://github.com/kazupon) さんから GitHub Sponsor されてます :bow:
- 主な活動について
  - https://github.com/yamanoku/awesome-japanese-a11y-companies
    - アクセシビリティの取り組みをする企業とその活動内容をまとめたもの
    - [Web アクセシビリティの参考資料まとめサイト](https://accrefs.jp/)で企業に絞った版があるといいなと思い個人で収集してみました
    - [awesome-a11y](https://github.com/brunopulis/awesome-a11y/pull/139) にも追加してもらいました
  - https://github.com/yamanoku/vue-visually-hidden
    - Vue3 対応の visually-hidden コンポーネント
      - visullay-hidden は視覚的にのみ情報を消す手段のもの
      - [ushiro_noko](https://twitter.com/ushiro_noko) さんの「[Vue.js ビギナーズガイド 3.x 対応](https://www.amazon.co.jp/Vue-js%E3%83%93%E3%82%AE%E3%83%8A%E3%83%BC%E3%82%BA%E3%82%AC%E3%82%A4%E3%83%89-3-0-%E5%AF%BE%E5%BF%9C-ushironoko/dp/4863543328)」を参考に作成
      - Norman のコンポーネントとしても導入済
  - [vue-a11y](https://vue-a11y.com/jp/)
    - Vue.js のアクセシビリティ布教を目的にしたグループに所属させてもらってます
    - 今年、翻訳した vue-a11y の日本語サイトがオープン
    - 記事の翻訳、レビューなど対応しました
    - ただ年始しか活動できてなかったので進捗は悪い感じでした

### 東京都新型コロナウイルス感染症対策サイトのアクセシビリティ「プレ」試験に参加

[https://twitter.com/magi1125/status/1443510024383307782](https://twitter.com/magi1125/status/1443510024383307782)

- [東京都新型コロナウイルス感染症対策サイト](https://stopcovid19.metro.tokyo.lg.jp/)の JIS 適応チェックに向け、事前に問題点がないかを洗い出す会に参加しました
- [去年問題点がありそうなところは有志で確認してみた](https://ca11y.connpass.com/event/169901/)のですが
- 構成が変わっていたりページが増えていたりで１からチェックし直してみた形です
- プレ試験でいくつか GitHub Issue が作成されました
- その後 Code for Japan の皆様などの対応により問題は対応されて
- その後本試験が実施され[レベル AA が準拠できた](https://stopcovid19.metro.tokyo.lg.jp/accessibility-results/)ことが発表されました

### 他社でアクセシビリティ対応に関する勉強会・壁打ちをしてきた

![勉強会資料の一部。コンテンツによって入れる代替テキストは異なることを説明しているもの](https://i.gyazo.com/11f7dbc9c3e33c4e2be5fe7a47a34812.png)

- ２社ほどお声がけさせていただき勉強会や壁打ちなどをしてきました
- [FEStudy](https://forkwell.connpass.com/event/198726/) の発表からつながったとしたらありがたいことです
- １社は SEO 観点でアクセシビリティは重要になるのか？というところでアクセシビリティについてを教える会に
- もう１社は社内でアクセシビリティ対応するにあたりアドバイスをしました
- 自分も人に教えるという点で非常に勉強になりました
- 日々是精進です :hand_splayed:

### PWA Night Conference 2021 にスタッフ参加

![oVice での PWA Night Conference 2021 の様子](https://i.gyazo.com/534f5b061cce02f4be2af18278e763eb.png)

- 去年はカンファレンスで LT をやってきたのですが今年はスタッフとして参加しました
- 出演打診、スタンプラリー企画、品物の発送などをしました
- オンラインはオンラインでの開催の難しさを知りました
- ただ終わってみると満足感があってとても楽しいカンファレンスになりました
- PWA については技術として疎遠がちだったのですが、発表を見て改めて PWA や Web の可能性について勉強できました
- またスタッフ枠で今年も LT もしてきました
  - 発表資料は以下から閲覧できます

[PWA 版 Twitter をスクリーンリーダー検証してみる - yamaScrapbox](https://scrapbox.io/yamanoku/PWA%E7%89%88Twitter%E3%82%92%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BC%E6%A4%9C%E8%A8%BC%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)

### JSConfJP 2021 に登壇

![JSConfJP での大山奥人の登壇情報](https://i.gyazo.com/4e92fbd9125d70ca7aac0a9c9e5f141d.png)

- １１月２７日に開催された [JSConfJP 2021](https://jsconf.jp/2021) に登壇してきました！
  - [スピーカー詳細ページ](https://jsconf.jp/2021/talk/the-past-and-future-of-accessible-front-end-development)
- ありがたいことにスタッフの CFP 投票で注目をしていただいた内容だったようです
  - スピーカーページ情報で [Thomas Steiner](https://twitter.com/tomayac) 氏と横に並ぶのが面白すぎました
- これまで自分が勉強してきたこと感じていたこと LT 発表してきたことの集大成を出せました
- みんながこれからもアクセシブルなフロントエンド開発をやっていけるといいなと思います
- 発表資料は以下から閲覧できます

[アクセシブルなフロントエンド開発のこれまでとこれから / the past and future of accessible front-end development - Speaker Deck](https://speakerdeck.com/yamanoku/the-past-and-future-of-accessible-front-end-development)

[アクセシブルなフロントエンド開発のこれまでとこれから - YouTube](https://www.youtube.com/watch?v=58TkWIsH20E)

## おわりに

ざっくりと振り返ってみましたが、去年と比べてフロントエンド開発の比重が少しずつ増えてきたかなとポジティブに捉えてみています。

その１つの形として、１０月より施策チームから技術的負債解消を推進・定着していくチームに移動して、crowdworks.jp のフロントエンド基盤整理ができるようになったのもあげられます。
（ちなみにチーム名は、協業しつつもエンジニアチーム全体とリードしていくことから「**ジャンヌ**」になりました）
今後のフロントエンド開発の方向性を定めた現状レガシーになっている箇所の改善ロードマップを提示していきます。

![写真：フロントエンド基盤整理の方針](https://i.gyazo.com/2f4dd7fd92b8079d2ed460a3fe1e831c.png)

_基盤整備に伴い提示した整理方針の一部_

前述したデザイン基盤整理でもデザイナーとエンジニアの境界を作らずに自然とお互いの領域で協業できることも目指していたりもします。Vue3 移行も引き続き行いつつ、最良のフロントエンド開発をやっていけるようにするぞ！

---

明日の記事は [@mikimhk](https://qiita.com/mikimhk) 氏による「エンジニアにオンボーディングで伝えているチーム文化」になります。
本日から 25 日まで様々な内容をお届けしていきますので、お楽しみに！
