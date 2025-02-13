---
title: Vue Fes Japan Online 2022 参加レポート
description: Vue Fes Japan Online 2022に参加したのでそのレポートです
date: 2022-10-25
author: yamanoku
source: engineer.crowdworks.jp
noindex: true
---

![アイキャッチ：Vue Fes Japan Online 2022 参加レポート](https://i.gyazo.com/9838392af5f4017764ce61f51887b161.png)

皆様こんにちは、クラウドワークスのジャンヌチーム所属の [@okuto_oyama](https://twitter.com/okuto_oyama) です。最近飼い始めた大型犬と一緒に散歩できるようになり最高に幸せな日々を送っております。

10/16（日）に Vue.js 日本ユーザーグループが主催する日本最大の Vue.js カンファレンス、[Vue Fes Japan Online 2022](https://vuefes.jp/2022/) が開催されました。

[Vue Fes Japan Onlilne 2022 Opening - YouTube](https://www.youtube.com/watch?v=KesJq1tcq8M)

各セッションのアーカイブも閲覧できるようになっていますので、まだ見ていない方もぜひご覧になってみてください。

- [メドピアトラック](https://www.youtube.com/watch?v=HsBTx36c_kA)
- [FUTUREトラック](https://www.youtube.com/watch?v=dtD4p89ogKM)
- [クラウドサイントラック](https://www.youtube.com/watch?v=eOJZ_3W4kaQ)

参加したブログを出すまでカンファレンスということなので、今回は視聴していて興味深かったセッションのレポートを書いていこうと思います。

## キーノート - Evan You

我らが Evan You によるキーノートの発表です。これまでの Vue.js とこれからの進化についてを語ってくれました。

SFC の仕組みの元祖でもある vueify 、ハッカーニュースを Vue2.0 で動かすデモ、`v-repeat` といった今では見かけることのなくなったライブラリや機能を懐かしく振り返っていました。

Vue3 から内部実装として搭載された Composition API の RFC は 2019年8月に公開されていた、ということも思い出させてくれました。

あとは日本の漫画・アニメの影響を受けたコードネームもそういえばあったなーというのがありました。Volar の v1.0 であるコードネームの [Nika](https://blog.vuejs.org/posts/volar-1.0.html) も ONE PIECE が由来なのでしょうかね。

現在開発中の Vapor モードや Resumable hydration については Solid.js、Qwik の実装を参考にしているとのことです。各 OSS フロントエンドライブラリが影響しあい、現在のフロントエンド開発の問題点を解決していっているのは進化における良い相互作用だなと思います。

[https://twitter.com/\_jessicasachs/status/1532283507145420801](https://twitter.com/_jessicasachs/status/1532283507145420801)

## Evan You に聞こう

Kia King さんが Twitter で募集された質問を読み上げて、それを Evan がリアルタイムで答えてくれるコーナーです。

Vue.js に関してほかフレームワークより優れている点、今後のこと、今の開発体制について等、様々な質問内容について答えてくれていました。

個人的には、興味があった「仕事とOSSの両立」に対する回答が印象に残りました。

[https://twitter.com/kannkyoshi/status/1581455290393690112](https://twitter.com/kannkyoshi/status/1581455290393690112)

自分のワークライフバランスを大事にしたいなら趣味でやるべきで、本格的に OSS フルコミットをしていくのであれば取り組む目的をしっかりと明確にし、時にはワークライフバランスを犠牲にする必要もある、とのことでした。

その他プライベートなこととして最近は呪術廻戦を見ているということも知れました。

## 気になったセッション感想

Evan の登壇したセッション以外で気になったものの感想を書いていきます。

### メドピアのサービスにおけるテスト戦略の過去と未来

メドピア株式会社さんによる [kakari](https://kakari.medpeer.jp/) というプロダクトにおけるテスト戦略について。

クラウドワークスはフロントエンド開発において絶賛 Storybook を活用しているため、維持できなくなったことから破棄するという判断をされたことはインパクトが有りました。

まとめとして「_テストツールを導入することにおいてはゴール設定が必要である_」という、この部分が固まっていないと運用できず・頓挫してしまう可能性が高い、という学びが話されていました。

これは技術的負債を管理下に置いていくチームに所属する身として非常に刺さるものでした。

### プロダクト開発を止めずに Composition API と TypeScript に最速で移行するための戦い

[Speaker Deck](https://speakerdeck.com/wattanx/purodakutokai-fa-wozhi-mezuni-composition-api-to-typescript-ni-zui-su-deyi-xing-surutamenozhan-i)

STORES株式会社さんによる Vue.js の Composition API と TypeScript への移行に関して。

[Vue Mixins Converter](https://vue-mixins-converter.vercel.app/) と [Vue composition converter](https://vue-composition-converter.vercel.app/) を用いて自動化を用いての移行対応でしたが、プロダクト開発を止めずにたった２人で進捗を出しているのはすごいことだと思いました。

また Datadog で移行の進捗を見れるようにしており、クラウドワークスでも同監視ツールに導入しているので設定方法が気になりました。

### 不確実性のある将来に対応するためのデザイン戦略

株式会社イエソド所属の腹筋ローラーの力を信じろさんによる、[EveryLayout](https://every-layout.dev/) でも活用されるコンポジションの考え方でデザインを分解して不確実性へと向き合う戦略についての発表です。

それぞれの責務をレイアウトコンポーネント・UIコンポーネント、デザイントークンという枠組みに分解し、直接まとめて実装していくことを避けていくのはメンテナンス性を上げていくことに繋がるので有用に感じられました。

ちなみにクラウドワークスのデザインシステムにおいて、EveryLayout の [Stack](https://every-layout.dev/layouts/stack/) というレイアウトコンポーネントを活用しています。

[生まれ変わったログインページにまつわるフロントエンド開発の話 - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/renewal-login)

### レガシーなMPAアプリケーションをwebpackからviteに移行する話

[Speaker Deck](https://speakerdeck.com/oreo2990/regasinampaapurikesiyonwowebpackkaraviteniyi-xing-suruhua)

株式会社iCAREさんで現在も取り組まれている webpack を Vite へ移行していく発表です。

クラウドワークスも Rails の MPA として動いており、Webpacker を廃止して開発ツールのモダン化への取り組みを続けているので、興味深く拝見しました。また、新規ではなく大きなアプリケーションでのツール移行についてのつらみは共感できるところがありました。

### 十数万レコードに耐えうるVue.jsプロジェクトを実現するためのパフォーマンスチューニング

[Speaker Deck](https://speakerdeck.com/tbashiyy/shi-shu-mo-rekodoninai-euruvue-dot-jspuroziekutowoshi-xian-surutamenopahuomansutiyuningu)

株式会社イエソドさんのプロダクトでの事例を元にした Vue.js でのパフォーマンスチューニングについての発表です。

今のところは Vue.js 上で巨大なデータを一気に表示したり扱うことはないのですが、どういった点をチェックしてどういう解決をしていけばいいのかという点で学びがありました。

そして [Intersection Observer](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) は現代のパフォーマンスチューニングに一役買ってくれる最高の API です。

### eslint-plugin-vueを使用して継続的にVue3移行する

[https://ota-meshi.github.io/vue-fes-japan-online-2022-slide/](https://ota-meshi.github.io/vue-fes-japan-online-2022-slide/)

各種 eslint-plugin のメンテナーでもある太田さんによる [eslint-plugin-vue](https://eslint.vuejs.org/) を使用した Vue3 移行についての発表です。Vue3 にただ移行するだけではなく、継続的な開発をしていく上で eslint を用いることの有用性を説いてくれました。

クラウドワークスでも Vue3 移行後に新たに vue ファイルを書く際には `vue/component-api-style` に準じて Composition API で書くように促すルールを導入しています。

### From Zero to One

[NuxtLabs](https://nuxtlabs.com/) の CEO である Sebastien による Nuxt.js の最新動向についての発表です。

Nuxt2 と Nuxt3 の内部機能比較や、エッジコンピューティングの仕組みを活用した新たな機能「Edge Side Rendering」についてを紹介してくれました。ユーザー体験と開発者体験の向上が期待されます。

しかし Nuxt3 の正式リリースの時期に関する情報が特になかったのは気になったところです…。

### Patterns of VueUse

OSS 開発者の Anthony による VueUse についての発表です。

VueUse は非常にシンプルな形でリアクティブな状態を提供してくれるツール群です。内部の仕組みとして `ref` にまつわる説明をわかりやすくしてくれました。

２年もの間に VueUse に関する機能は続々と増えてきており、クラウドワークスでもその中の１つでもある [@vueuse/head](https://github.com/vueuse/head) を活用した開発をしております。

### Peephole

Vue Router のメンテナによる「[unplugin-vue-router](https://github.com/posva/unplugin-vue-router)」、NuxtLabs でのリード開発者による「[pinceau](https://github.com/Tahul/pinceau)」、Anthony によるコード変更の再生ツール「[retypewriter](https://github.com/antfu/retypewriter)」それぞれ製作中のプロダクトに関する内容を Kia King さん作者にインタビューをしてみるコーナーです。

特に pinceau での `<style lang="ts">` 記述には衝撃が走りました。props を受けてディレクティブに CSS を変更できる・型安全にしていくところからの CSS in TS としてのアウトプットは凄すぎました…。

```html
<style lang="ts">
  css({
    div: {
      color: '{colors.primary}',
      backgroundColor: '{colors.orange.50}',
    },
  });
</style>
```

## Vue Fes Japan Online 2022 を終えて

全体のカンファレンスの構成として Vue2 から Vue3 への次期バージョンに追従していくための取り組みや、フロントエンド開発戦略や Tips、Vue.js にまつわるライブラリ群の紹介と、これからの Vue.js 開発のキャッチアップのセッションたちだったなと思いました。

クラウドワークスでは [Vue2 から Vue3 の移行を終えている](/migration-from-vue2-to-vue3)のですが、コンポーネント数が多かったりや実装難易度が高いものがあった可能性を考えると、各社での移行作業も他人事のことのようには思えないと感じながら拝見していました。

今回の Vue Fes Japan は全編オンラインにて開催ということで、オフラインとはまた違った難しさがあったと思われますが、滞りなく進行いたのも素晴らしかったです。運営スタッフの皆様、ありがとうございました。
弊社からも参加していたエンジニアも学びがあったようで、開発のモチベーションが上がっていました。

11/2（水）には今回のカンファレンスで不採択となってしまったセッションを聴講できる [Reject Conference](https://vuejs-meetup.connpass.com/event/259621/) もあるとのことで、こちらも楽しみにしています。

---

また、[過去のブログ記事](https://engineer.crowdworks.jp/entry/give-a-talk-vue-fes-japan-online-2022)でもお伝えしておりましたが、弊社からは２名がセッションにて発表することができました。

現在の技術的負債解消の取り組みやアクセシビリティへの取り組みなど、皆さまの開発の参考になれれば幸いです。それぞれの発表資料は以下よりご覧になれます。

**負債が溜まったレガシーフロントエンド画面を Vue.js でリプレイスした話**

[Speaker Deck](https://speakerdeck.com/t0yohei/fu-zhai-galiu-matutaregasihurontoendohua-mian-wo-vue-dot-js-deripureisusitahua)

**Vue.js でアクセシブルなコンポーネントをつくるために**

[Speaker Deck](https://speakerdeck.com/yamanoku/to-make-accessible-components-in-vuejs)

ここまでご覧頂きありがとうございました。来年の Vue Fes Japan も楽しみにしています！
