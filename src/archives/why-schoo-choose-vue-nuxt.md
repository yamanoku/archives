---
title: 選んだ技術を、自分たちで正解にする。SchooがVueエコシステムと共に歩む理由 #fe_stack_choice
description: SchooがVueエコシステムと共に歩む理由について紹介します
date: 2026-02-25
author: yamanoku
source: qiita.com
noindex: true
---

こんにちは。[株式会社Schoo](https://corp.schoo.jp/)（以下Schoo）に所属しております [@okuto_oyama](https://qiita.com/okuto_oyama) です。今年1月から技術戦略部門より開発部門・Schoo開発スクワッドに異動し、プロダクト開発に従事しております。

![フロントエンドでの技術選定 —— 「みんなで」語り尽くそう！の勉強会バナー](https://i.gyazo.com/06985046cec45d688883fdaf876f34c3.png)

本日は2/12に開催された「[フロントエンドでの技術選定 —— 「みんなで」語り尽くそう！](https://codmon.connpass.com/event/379236/)」での発表内容と、当日行われたアンカンファレンス形式の座談会に社内メンバーで参加した際のレポートをお届けします。

## 今、どのフレームワークで技術選定するか？

今回の勉強会のテーマは「フロントエンドの技術選定」。各社がどのような基準で技術を選んでいるかが活発に議論されました。Schooからは、私たちがなぜVue.js/Nuxtというスタックを選択し続けているのかについてお話ししました。

### 何故、SchooはVue.js/Nuxtを選択するのか？

Schooでは私が所属する以前から、複数のプロダクトでVue.js/Nuxtが共通の技術スタックとして採用されてきました。エンジニアのスキルセットが習熟している点は、現在の開発スピードを維持する上で非常に重要な資産であると考えています。

| プロダクト             | バックエンド | フロントエンドフレームワーク              |
| ---------------------- | ------------ | ----------------------------------------- |
| **Schoo for Personal** | PHP、Golang  | Backbone.js、jQuery、**Vue.js**、**Nuxt** |
| **Schoo for Business** | Ruby         | jQuery、**Vue.js**                        |
| **Schoo Swing**        | Golang       | **Vue.js**、**Nuxt**                      |

また、昨年のAdvent Calendarにてプロダクト本部長兼開発本部長の加藤が発表した通り、現在プロダクト開発組織は「マトリクス型」への移行を進めています。

[【開発組織】線を引き直して、同じ未来を見る ——マトリクスに切り替えた話 #開発スピード - Qiita](https://qiita.com/schoo_akihiro_kato/items/453272f2542bbacb0f75)

これに伴い**スクワッドチーム化**による機能開発への集中を加速させています。チームごとに開発スタックを統一しておくことで、技術的な迷いを減らし、本来の目的である機能開発に注力できる環境を目指しました。
こうしたこれまでのプロダクト採用とチームの最適化の面においてVue.js/Nuxtを技術選定としています。

一方で**Vue.js/Nuxtは今後の技術投資として果たして最善の選択なのか？** という疑問を持つ方もいるかもしれません。

フロントエンドエンジニアの市場的にもReact/Next.jsスタックを選択する人が多く、Figma MakeといったAIと連動したサービスで吐き出されるコードもReactがベースとなっており、現時点において、最も採用の強い動機づけがされやすいものはReact/Next.jsの技術スタックで間違いありません。

それでもSchooがVue.js/Nuxtの継続採用を意思決定したのには、単なる慣れや組織の最適化だけではない、明確な理由が他にもあります。

### Vue.jsがもたらす「柔軟性」と「責務の分離」

私が考えるVue.jsの優れている点の一つに、多様な開発スタイルで導入できるという点にあると考えています。

`.vue`ファイルで開発することはもちろん、APIを提供していないMPAスタックのアーキテクチャ内部（例えばテンプレートエンジン内）にVue.jsを呼び出して使うこともできます。さらに、既存プロダクトや小さなプロダクトへの一時的な継ぎ足し程度であればNode.jsでのビルドを用いずにVue.jsを使うことも可能です。

```html
<div id="app">
  <!-- Vue.jsを使いたい部分 -->
</div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
    }
  }
</script>
<script type="module">
  import { createApp } from 'vue';
  const app = createApp({
    /* Vue.jsの各種処理 */
  });
  app.mount('#app');
</script>
```

参考：[HTMLにちょい足しでできる！ Vue.jsでサクッと動きをつける方法 - ICS MEDIA](https://ics.media/entry/210908/)

上述のとおりSchooではプロジェクトごとでバックエンドの要件はそれぞれ異なっております。今後も多様なプロダクトを開発したり機能開発していくためにこの柔軟性は強みになると感じています。

Vue.jsの特徴でもあるSFC（Single File Components）は、HTML/CSS/JavaScriptが明確に分かれているため、変更箇所の特定やどういった処理が書かれているかを判別するのが非常に容易です。

CSSについても、標準機能の「Scoped CSS」によって、ライブラリを追加せずともコンポーネント外への影響（クラス名の衝突や詳細度の問題）を抑えることができます。ReactでCSS-in-JSやCSS Modulesを選択する手間を省き、フレームワークの標準機能だけで完結できる点は大きなメリットです。

JavaScriptについてはTypeScriptとの選択肢が選べるようになっています。TypeScriptとの親和性についてもVue 3以降から大きくアップデートしており、型による恩恵を得た開発が可能となっています。詳細は、からころさんによる発表スライドをご参照ください。

<script defer class="speakerdeck-embed" data-id="e3080f866b644523802eb0d654ee33c4" data-ratio="1.7772511848341233" src="//speakerdeck.com/assets/embed.js"></script>

Vue.jsにはカスタムブロックとしてHTML/CSS/JavaScript以外の任意の名前でブロックを表現することも可能です。[ANDPADさんの事例](https://tech.andpad.co.jp/entry/2025/10/22/100000)では`<spec>`でもカスタムブロックを定義し、仕様駆動実装としてAIによる実装容易性や確実性を高める取り組みをされています。アイデア次第で付加価値を容易に提供できる点もVueならではの強みです。

```html
<spec lang="md">
  ## slot
  で囲まれた部分だけを残して、それ以外を覆って暗くするスクリーンを表示します。 -
  モーダルダイアログの背景などに利用します。 - スクリーンの背景色は
  `rgba(0,0,0,0.3)` です。 - スクリーンはその位置を囲むように teleport
  タグを通して body 直下に配置されます。 - スクリーンは svg path
  で描画されます。
</spec>
```

### Nuxtによる開発体験と安定性

Vue.jsのメタフレームワークであるNuxtについても、開発観点においてさまざまな利点が挙げられます。

- 公式が提示するシンプルな状態管理（`ref`, `useState`, Pinia等）で迷いが生じにくい
- 開発を助ける[Nuxt モジュール](https://nuxt.com/modules)群の存在。Nuxt公式から個人による開発まで幅広く存在している
- `compatibilityVersion` 設定で次バージョンの先行機能を試すことができる
- サーバーサイドエンジン「[Nitro](https://nitro.build/)」により、特定のクラウドベンダーに依存しない柔軟な運用が可能
- Nuxtの内部が「[UnJS](https://unjs.io/)」のライブラリ群で構成されており、ブラックボックスの要素が少なくエンジニアにとっての安心感がある

特にアップデート追従容易性としての `compatibilityVersion` の設定がとてもありがたい設定と感じます。[Nuxt 3.12から追加された設定](https://nuxt.com/blog/v3-12#testing-nuxt-4-changes)で、Schooの一部Nuxtプロジェクトでもこの機能を設定して開発を進めているため、アップデートの準備をしながら継続的に開発できるところが利点として大きく感じられます。

### Vue.js/Nuxtのキャッチアップとしての日本語情報源

Schooでは新卒採用に注力しており、Vue.js未経験のエンジニアも入社します。新卒研修においては基礎となる部分を座学を通じて学んでもらっているのですが、実務への解像度を高めるためにも実際にコードを書いてもらう時間も作っています。その際にVue.jsとNuxtの公式から提供されているチュートリアルを活用させてもらっています。

- [Vue.jsチュートリアル](https://ja.vuejs.org/tutorial/)
- [Nuxtチュートリアル](https://learn.nuxt.com/ja)（コンテンツ一部作業中）

ブラウザ上でガイドを読みながらコードを書き、即座にプレビューできるこれらの教材は、学習コストを大幅に下げてくれます。

また、最小のVue.jsを実装して内部構造を学べるコンテンツの[chibivue](https://book.chibivue.land/)も日本語で提供されています。こちらも今後社内での輪読コンテンツとして活用し、社内でのVue.jsの習熟に役立てていきたいです。

### Vueエコシステムの健全性・安定さ

Vue.js/Nuxtを選択する理由はフレームワークが持つ利便性や情報源以外にも、エコシステムとしての将来性においても優れていると確信があるからです。

もともとはEvan Youという個人の開発から始まったVue.jsのプロジェクトですが、現在は各個人が参加して作り上げるコミュニティ主体のエコシステムが形成されています。Vue.jsの特徴としては特定の企業によるOSSではないのもあり企業色の強くない点が挙げられます。

Vueエコシステムでの主要なライブラリは特定の個人によって私物化されているものでもなく、OSSを通じた透明性のある開発がされています。Vue Language Toolsにある組み込み言語ツールのための[Volar.js](https://volarjs.dev/)、Vue.jsの先進的なコンパイラマクロを搭載した[Vue Macros](https://vue-macros.dev/)、軽量なリアクティブシステムの[alien-signals](https://github.com/stackblitz/alien-signals)など、これらのライブラリはVue.js本体の開発に相互的に影響を与えています。

エコシステムとの繋がりで注目したい点として**Ecosystem CI**があります。これはVueやNuxtのアップデートに合わせて主要ライブラリが破壊的変更の影響を受けていないかを検知できる仕組みです[^1]。

[^1]: https://github.com/vuejs/ecosystem-ci, https://github.com/nuxt/ecosystem-ci

かつてのVue2からVue3への破壊的変更による失敗を教訓として、Ecosystem CIを使いリリースサイクルの改善に努めていることも、Vueエコシステムを安心して使うことができる良い点です。

### VoidZeroとの繋がり

Vue.js/Vite作者のEvan Youが立ち上げた[VoidZero](https://voidzero.dev/)社は、次世代のフロントエンドツールチェインを開発しています。Rust製での高速なフロントエンドツール群である[Oxc](https://oxc.rs/)や、フロントエンドの開発を行う上で必要な周辺環境を取りまとめた[Vite](https://ja.vite.dev/)の開発を進めています。

先ほども言った通りVue.jsはどこかの企業が所有するフレームワークではないためVoidZero自体がVue.jsの開発の舵をとるといったことは現時点ではありません。ですがVoidZeroの設立時の記事にもある通り、Vueとは独立しつつもファーストクラスでツールチェインの支援が受けられるようにすると書かれています。

> Vue will continue as an independent project but will receive first-class support from the new tooling developed by VoidZero.
> [Announcing VoidZero - Next Generation Toolchain for JavaScript | VoidZero](https://voidzero.dev/posts/announcing-voidzero-inc)

つまり**Vue.jsを採用することによってOxcによる高速のフロントエンドツールチェインの恩恵を享受することが期待できます**。実際にoxlintと併用して使ってみた事例[^2]も出てきており、徐々にOxcのツールに乗り換えてみてもよさそうです。

[^2]: [お試しで oxlint を導入してみる #vuefes_aftertalk - Speaker Deck](https://speakerdeck.com/bengo4com/20251111-cloudsign-vuefes-after-talk)

またViteの統合開発ツールチェインでもある[Vite +](https://viteplus.dev/)が現在開発しており、その内部ではAIとの協業できるAgent Modeの開発も進んでいるとのことで、フロントエンド開発がさらに加速してくれる期待もあります。

https://viteplus.dev/

### 国内のVueコミュニティ事情

日本とVueコミュニティの関係性を考える中で特徴的なのが**日本人としてOSSメンテナーやVue.js/Nuxtのコアチームメンバーで関わっている人がいること**です。先ほど紹介したVoidZero社にも日本人のメンバーが数名在籍しています。

日本ではVueエコシステムにまつわる国内最大規模のカンファレンスの[Vue Fes Japan](https://vuefes.jp/)が年一回のペースで開催されています。ここはEvan YouほかOSSコントリビューターの方が登壇するほか、国内のVueコミュニティのエンジニアたちが一同に集まるカンファレンスとなっています。他にも不定期に[Vue.js v-tokyo Meetup](https://vuejs-meetup.connpass.com/)という勉強会も開催されていたりします。

こうしたカンファレンスやイベントでVueエコシステムの開発に関わる人たちで日本語で会話や相談できることも国内のVueコミュニティとしての強みだと感じています。

また、日本でのVue.js/Nuxtを技術選定としている企業も多数あり、国内の採用市場としても決して小さくないことがわかります。

[Vue.jsを採用している企業 - what we use（技術スタックデータベース）](https://whatweuse.dev/tool/vuejs)

[Nuxtを採用している企業 - what we use（技術スタックデータベース）](https://whatweuse.dev/tool/nuxt)

[chibivue-land/japanese-companies-using-vuejs: 日本で Vue.js を使っている企業一覧](https://github.com/chibivue-land/japanese-companies-using-vuejs)

### 選んだ技術を「正解」にするために

Schooにとって技術選定は目的ではなく、あくまで**事業成長のためのツール**です。状況が変われば別の選択肢を検討することもあるでしょう。

しかし、現時点においてVue.js/Nuxtは、私たちの開発スピードを最大化し、かつ将来にわたって安心して投資できる合理的かつ最善の選択肢です。

この安定感に甘んじることなく、今後は以下の取り組みを通じて「この選択を正解にしていく」努力を続けていきます。

**組織としての習熟:** 内部勉強会やAIガードレールの整備など、Vue.js/Nuxtで事業を進化させていく努力を惜しまない

**コミュニティへの還元:** 今回のようなイベントでの外部発信を通じ採用のプレゼンスも強化しつつ、エコシステム全体の発展へ寄与

Schooは引き続きVue.js/Nuxtと共に歩み、この選択を正解にしていくためのフロントエンド開発をしていきたいと考えております。

### 発表資料

当日の発表資料はSpeakerdeckに掲載しております。

<script defer class="speakerdeck-embed" data-id="fbb389d6abbf45129578157117e5ec19" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

## アンカンファレンス形式でのフロントエンドトーク

今回のイベントでは最近のフロントエンド開発におけるアンカンファレンス形式の技術トークも開催されました。弊社エンジニアも参加し、様々なトークテーマに対して話し合われていました。

### 生成AIを「教育」と「設計」に組み込む

Schooの事例紹介では、Figma MCPを活用したCSS生成や、GitHub Copilot / CodeRabbitによるコードレビュー体制についてを実践しており、それについての質問をいくつかいただきました。

特に事例で注目を集めたのが、[NotebookLMを「フレームワークの先生」として活用する](https://qiita.com/schoo_tetone/items/49564cedd8d2976e2a48#notebooklm%E3%81%AB%E5%85%A5%E5%8A%9B%E3%81%99%E3%82%8Burl%E3%82%92%E5%8A%B9%E7%8E%87%E3%82%88%E3%81%8F%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)手法です。ドキュメントをAIに読み込ませて学習効率を上げるアプローチは、AI活用の新しい形として多くの共感を得ました。また、SchooでAIエージェントによる開発での活用授業を作って欲しい声もあがっていました。

### フロントエンドのテストはどのようにしているか

チーム内でTailwindCSSのトークンをルール決めすることで細かいデザインの調整をしている話やMagicPodによるE2Eを実装している話から派生し、E2Eの難しさについて話し合っていました。コドモンさんはE2E用の環境を作って、データのセットアップからも含め丁寧にやっていたのでSchooも同じように進めていきたいと感じました。

### 変化に強く「薄い」アーキテクチャについて

「薄く捨てやすい」を意識した設計思想についても深掘りしました。SchooではBFFとFE間の通信にGraphQLを採用し、インターフェースを先に確定させることで並行開発を可能にする戦略は、gRPCでの苦い経験から得た「実践知」に基づいた話がされていました。
一方でGraphQLについては、分かるエンジニアには魅力的だが、分からないエンジニアには障壁に感じられたり、バックエンドエンジニアから見ると何が良いのかは分かりづらいといった課題があることも知れました。

### AI時代のエンジニア教育、育成と格差について

「技術トレンドの変化が激しいフロントエンドで、どう経験の差を埋めるか」のテーマでは、多くの企業が頭を悩ませていました。Schooでは新卒研修やモブワークを重視していますが、AIの登場により「自力で成長できる層」と「そうでない層」の格差が広がりつつある現状についても、他参加者の皆さんと深い議論ができました。コドモンさんではXPで時間をかけて慣れていってもらっている話も出ていました。

---

今回のイベントを通じ、コドモンさんやエス・エム・エスさんの詳細な事例に触れ、各社が抱える課題と解決へのアプローチに多くの学びを得ることができました。主催・登壇の皆様、ありがとうございました！

各社の資料は以下よりご確認いただけます。

[フロントエンドでの技術選定 —— 「みんなで」語り尽くそう！ - 資料一覧 - connpass](https://codmon.connpass.com/event/379236/presentation/)
