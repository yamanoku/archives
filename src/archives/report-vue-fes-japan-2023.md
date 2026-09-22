---
title: Vue Fes Japan 2023参加レポート
description: Vue Fes Japan 2023に参加したのでそのレポートです
date: 2023-11-08
author: yamanoku
source: engineer.crowdworks.jp
category: event
topic: frontend
noindex: true
---

![アイキャッチ：Vue Fes Japan 2023参加レポート](https://i.gyazo.com/d22435033324a84104b87b39eec5d68b.png)

皆様こんにちは。クラウドソーシングサービス「[クラウドワークス](http://crowdworks.jp/)」（以下crowdworks.jp）にてエンジニアをしております[@okuto_oyama](https://twitter.com/okuto_oyama)です。今回は、10月28日に開催された[Vue Fes Japan 2023](https://vuefes.jp/2023/)の参加レポートをお届けします。

## 久々のオフライン開催

![Vue Fes Japan 2023 会場に設置されていたクリエイティブウォール。中央に Vue Fes Japan のロゴが書かれてあり、その周辺に多くの企業ロゴや個人により書き込まれている。](https://i.gyazo.com/4a310389005f11cd89d1da79eab7191b.png)

2018年以来、台風や新型コロナウイルスの影響でオフラインでの開催が叶わなかったVue Fes Japanが、今年ついに対面でのカンファレンスとして戻ってきました。昨年は完全なオンライン形式で開催されましたが、久々にオフラインのイベントに参加できたのは、感慨深いものがありました。

フロントエンドの大規模カンファレンスへの参加が久しぶりだったので、多くの人々が集まる様子、各企業のスポンサーブースでの交流、ランチセッションなど、オフラインならではの体験ができたことはとても懐かしく感じました。

## 同時通訳スポンサーの協賛

今回、株式会社クラウドワークスは「同時通訳スポンサー」として協賛しました。

<Tweet url="https://twitter.com/okuto_oyama/status/1678266941491019777" displayName="オオヤマ オクト" handle="okuto_oyama" dateLabel="July 10, 2023">弊社 @CrowdWorksjp も協賛しております！ 今年の Vue Fes Japan 盛り上げていきましょう🙌 #vuefeshttps://t.co/swmHo0imWg pic.twitter.com/fwk27a1GJB</Tweet>

Evan Youをはじめとする英語を話す登壇者の発表を、日本語と中国語にリアルタイムで通訳するサービスが提供されていました。オフラインでの登壇という形式で行われたリアルタイム発表は、英語が苦手な方々にも理解しやすいよう配慮されていたため、大変ありがたく感じました。

<Tweet url="https://twitter.com/miyaoka/status/1718246509731532879" displayName="miyaoka" handle="miyaoka" dateLabel="October 28, 2023">#vuefes おつかれさまでした。同時通訳用に各席にイヤホンが用意されてて、原語でも翻訳でも好きな方を聴けるの良かったです pic.twitter.com/WHByHEcE2G</Tweet>

## 3名の社員が発表・登壇

以前[告知ブログ](./give-a-talk-vue-fes-japan-2023)でお伝えした通り、弊社のエンジニア、[@t0yohei](https://twitter.com/t0yohei)、[@yamanoku](https://twitter.com/yamanoku)、そして@53ableがそれぞれ登壇し、発表を行いました。

[@t0yohei](https://twitter.com/t0yohei)は「**Vue.jsを使ってGrid Systemを実装した話**」というテーマで発表しました。

<SpeakerDeck url="https://speakerdeck.com/player/9da16dc65b184a7b9a06e3aca4c0e4f7" />

crowdworks.jpのデザインシステムにおけるコンポーネントライブラリではGrid Systemのアプローチを取り入れたコンポーネントを開発しており、その実装方法についてライブコーディングを交えて紹介しました。

![t0yoheiの登壇写真](https://i.gyazo.com/b0769b873a0508b768d8939a2eba8125.png)

[@yamanoku](https://twitter.com/yamanoku)は「**画面遷移から考えるNuxtアプリケーションをアクセシブルにする方法**」について発表しました。

[画面遷移から考えるNuxtアプリケーションをアクセシブルにする方法](https://yamanoku.net/vuefes-japan-2023/ja/)

クライアントサイドのルーティングで起こる画面遷移のアクセシビリティの問題点を、スクリーンリーダーを使用したデモを通じて指摘し、解決策の実装方法を紹介しました。

![yamanokuの登壇写真](https://i.gyazo.com/3f089293825ac225b9f9954e4b96e76d.png)

@53ableは「**SOLID原則に基づくSFC実装**」というテーマで登壇しました。

[SOLID 原則に基づくSFC 実装 - Slidev](https://slides-one.vercel.app/)

SOLID原則の各項目をVue.jsのSFC（Single File Components）でどう実現しているかについて解説しました。これは私たちのVue.js実装においても、原則に沿った手法を採用していることから得られる洞察でした。

![53ableの登壇写真](https://i.gyazo.com/0842bbb80bf053ea42ef96dccdcd02bb.png)

パネルディスカッションでは、[@yamanoku](https://twitter.com/yamanoku)が参加し、Vue.jsの導入がもたらした各社でのよかった点や、これからのエコシステムへの期待について話しました。

![パネルディスカッションで @yamanoku、@miyaoka、@ushiro_noko、@kazu_pon、@wattanx、@takanoripe がトークしている様子
左から @yamanoku、@miyaoka、@ushiro_noko、@kazu_pon、@wattanx、@takanoripe](https://i.gyazo.com/9bb6e5bf201eaf72abd417e617b3061d.png)

余談ではありますが、登壇者控え室でSebastien、Daniel、Anthonyといった著名な参加者たちと同席した時の緊張感も、個人的には際立った思い出でありました。

## Vue.jsコミュニティ発で広がってきた多様なセッション

Vue Fes Japan 2023では、Vue.js、Vite、Nuxt.jsなどVueコミュニティから生まれたOSSに関する発表も目立ちましたが、Vue.jsに限定されない様々なセッションが行われたことが特に印象的でした。

Vue.jsのLanguage ToolであるVolar.jsは現在、Astroのコアコミッターも参加してAstroでも使用されていること[^1]、Viteを基にしたJavaScriptのマルチスレッド処理に関する発表があったこと[^2]、デスクトップアプリケーションでのVue.jsの使用例[^3]や、SvelteでのESLintプラグインでの実装アイデアをVue.jsのESLintプラグインでも応用できないか考えられていること[^4]などの発表がされていました。

また、Viteは[SvelteKit](https://kit.svelte.dev/)や[Remix](https://remix.run/)でのサポートが広がっており、ViteのSSRプラグインプロジェクトである[Vike](https://vite-plugin-ssr.com/vike)を通じてReact.jsほか各種フレームワークのSSRにも対応しています。

Nuxt.jsにおいては、[UnJS](https://github.com/unjs)というJavaScriptユーティリティライブラリを中心に構築されており、Vue.jsやNuxt.js特有の環境でのみ動作するわけではなくなっていることが示されました[^5]。

## Vue Fes Japan 2023を終えて

アフターパーティーの後、Evan Youによる一本締めでVue Fes Japan 2023は締めくくられました。

<Tweet url="https://twitter.com/vuefes/status/1718215053038801142" displayName="Vue Fes Japan" handle="vuefes" dateLabel="October 28, 2023">Evanの一本締めでアフターパーティー終了‼️ ありがとうございました❗️#vuefes pic.twitter.com/5LZvpD19yn</Tweet>

2018年に初めてVue Fes Japanに参加して以来、2022年のオンラインカンファレンスと、今年のオフラインカンファレンスにも参加しました。発表以外においても毎年参加者が楽しめるようなコンテンツがあり、登壇者としても参加者としても、クオリティの高いカンファレンスで充実した時間を過ごせました。

そんなカンファレンスを今年も運営してくれたVue.js日本ユーザーグループとボランティアスタッフの皆さんに心から感謝を申し上げます。

![クリエイティブウォールにクラウドワークスのロゴが書かれており、当日参加した社員でそのマークを指さしながら記念撮影している様子](https://i.gyazo.com/973927111c8fd906e32466266f98b2e8.png)

今回、株式会社クラウドワークスではスポンサーと社員3名による登壇・発表でVue.jsコミュニティに貢献することができました。引き続きVue.jsとそのエコシステムを活用した開発とそこから得られた知見を通じて、コミュニティやOSSへの貢献を続けていきたいと思っています。

---

ここまでご覧頂きありがとうございました。来年のVue Fes Japanも楽しみにしています！

[^1]: [Vue Language Server から生まれた Volar.js と、それが秘める可能性 - Speaker Deck](https://speakerdeck.com/mizdra/vue-language-server-karasheng-mareta-volar-dot-js-to-soregami-meruke-neng-xing)

[^2]: [マルチスレッドフレンドリーなJavaScriptを求めて - Slidev](https://vue-fes-japan-2023-multithread-slide.sapphi.red/)

[^3]: [Vue3/Electronで自作したマークダウンエディタをVue3/Tauriにリプレイスした話 - Speaker Deck](https://speakerdeck.com/yud0uhu/tauriniripureisusitahua)

[^4]: [eslint-plugin-vue の現状と今後](https://ota-meshi.github.io/vue-fes-japan-2023-slide/)

[^5]: [Deep Dive to UnJS and Nuxt 3 - Speaker Deck](https://speakerdeck.com/nozomuikuta/deep-dive-to-unjs-and-nuxt-3)
