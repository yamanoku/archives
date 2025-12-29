---
title: Vue Fes Japan 2025 After Talk参加レポート #vuefes_aftertalk
description: Vue Fes Japan 2025 After Talk参加レポート
author: yamanoku
date: 2025-11-13
source: qiita.com
noindex: true
---

こんにちは。[株式会社Schoo](https://corp.schoo.jp/)の技術戦略部門に所属しております[@okuto_oyama](https://qiita.com/okuto_oyama)です。

突然ですが、皆さんは10/25に開催されたVueエコシステムにまつわる日本最大規模のカンファレンス「[Vue Fes Japan 2025](https://vuefes.jp/2025/)」をご存知でしょうか。

![Vue Fes Japan 2025のアイキャッチ。中央にリブランディングされたVue Fes Japanロゴが載っている。](https://vuefes.jp/2025/og-image.png)

2018年にVue.jsやNuxtの開発者向けイベントとしてスタートしたこのカンファレンスですが、2025年の今年は、ReactとSvelteのコアコントリビューターとEvan You氏がパネルディスカッションを行う豪華なイベントも開催され、Vueのエコシステムの進化や広がりを体感できるカンファレンスとなりました。

今回はそのVue Fes Japan 2025のスポンサー企業７社で共催するアフターイベント「Vue Fes Japan 2025 After Talk」に参加し、個人的に学びとして得られた発表について共有します。

https://yappli.connpass.com/event/368396/

## SaaS内製UIライブラリ設計のコツ1選

こちらは弁護士ドットコム株式会社の[かみくず](https://x.com/p_craft)さんによる発表です。
SaaSでの内製UIライブラリを設計する際にどのように進めていくと良いのかを実体験をもとに共有いただけました。

この発表の結論はずばり「**自由度を下げる**」でした。

たとえば以下のようなメニューコンポーネントを提供していると想定します。

```html
<VMenu>
  <VMenuTrigger>
    <VBtn>メニュー</VBtn>
  </VMenuTrigger>
  <VMenuContent>
    <VMenuItem @click="onItemClick('項目1')">項目1</VMenuItem>
    <VMenuItem @click="onItemClick('項目2')">項目2</VMenuItem>
    <VMenuItem @click="onItemClick('項目3')">項目3</VMenuItem>
  </VMenuContent>
</VMenu>
```

親子関係が決まった組み合わせを提供する場合の弊害として「組み合わせが分かりづらい」「使えるイベントハンドリングがバラバラになる」「想定外の組み合わせが発生する」といった課題があったそうです。

こうした親子関係のあるコンポーネント群から自由度を下げるために以下の2点の要素を取り入れた変更を行いました。

- Propsで渡すようにする
- 1コンポーネントにまとめる

```html
<VMenu
  trigger-text="メニュー"
  :items="[
    { label: '項目1', onClick: () => onItemClick('項目1') },
    { label: '項目2', onClick: () => onItemClick('項目2') },
    { label: '項目3', onClick: () => onItemClick('項目3') },
  ]"
/>
```

これによりコンポーネント自体の自由度は下がりますが、限定された用途として提供することで、機能開発側の認知負荷を低減させ「**迷わせない**」設計を実現できたとのことです。

弊社もデザインシステム構築を進める中でコンポーネント設計を現在進めています。サービスの特性上、同じような形でコンポーネント設計となるかはまだ分かりませんが大変参考になる内容だと思いました。

ちなみに発表スライドは[高橋メソッド](https://ja.wikipedia.org/wiki/%E9%AB%98%E6%A9%8B%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89)のお手本のような、端的に伝えるスライドで非常に分かりやすいと感じました。

### 発表資料

https://ef81sp.github.io/how-to-make-saas-ui-library/

## 複数チーム並行開発下でのコード移行戦略：手動 Codemod から『生成 AI 活用』への進化

こちらは株式会社アンドパッドの[すねこすり](https://x.com/sunecosuri)さんによる発表です。
既存の技術スタックとして使用していたNuxt 2がEoL（End of Life：サポート終了）を迎えたためNuxt 3への移行を進めることになりました。どのように移行していくかの手法の中でCodemodの仕組みを取り入れてみた事例を紹介していただきました。

Codemodとは特定のコードをスムーズに新しいものへ移行するための変換スクリプトのようなものです。ライブラリやフレームワークによっては[公式からCodemodが提供されている](https://codemod.com/)ものもあります。

アンドパッドさんでは[ts-morph](https://github.com/dsherret/ts-morph)というTypeScriptのコンパイラAPIを用いてAST（Abstract Syntax Tree：抽象構文木。コードの構造を木構造で表現したもの）操作[^1]を行い、コードを置換するCodemodエンジンを作成した内容を紹介していただきました。

[^1]: AST、ts-morphについては[AST の基礎を理解：TypeScript でコードを解析し操作する🔰 - 弁護士ドットコム株式会社 Creators’ blog](https://creators.bengo4.com/entry/2024/12/16/000000)をご参照ください

Codemodを作る利点の1つに、**Codemod自体のテストが書けるという点**があります。スナップショットテストを用いてDOM出力の結果を比較することができるほか、テストコード自体も増やして堅牢性を高められるため、より安全なCodemodを作れると挙げていました。

また、変換するCodemodエンジンのテストが保証されているおかげで、変換についての認識齟齬が減るうえ、仮にデグレが起きてもすぐに差し戻せるという、デリバリー観点での利点も挙げていました。

さらにアンドパッドさんではここから発展して、生成AIにCodemodエンジンを作ってもらうことを検討しているようです。

LLM（大規模言語モデル）の進化によって生成AIによる変換処理は正確性が増してきたものの、大量のコードであるとまだ完全に安心して依頼できるものではありません。これはLLMの非決定性によるものです。

そこで、変換そのものを生成AIに任せるのではなく、Codemodエンジン自体を作成させることで、テストによる動作保証とスクリプト実行という決定論的な動作だけを担わせ、安全性を保つ手法が紹介されていました。

今回の発表に関連する記事も公開されています。こちらも併せてご覧になってみてください。

[複数の開発チームの機能開発を止めずに Nuxt3 へアップデートしました - ANDPAD Tech Blog](https://tech.andpad.co.jp/entry/2024/07/12/100000)

### 発表資料

https://speakerdeck.com/andpad/scaling-code-migration-from-manual-codemods-to-generative-ai

## Nuxt 5

こちらはSTORES株式会社の[wattanx](https://x.com/pontaxx)さんによる発表です。
Nuxt 4がリリースされましたが、2025年内には次のバージョンであるNuxt 5のリリースが予定されています。今回はそのNuxt 5のアップデートに関する最新情報を共有していただきました。

大きな変更点として、内部で使用されるNitroがv3になる点と、[Vite Environment API](https://ja.vite.dev/guide/api-environment)を使用するようになる点を挙げていました。
今回はVite Environment APIについて解説していただきました。

元々、Viteではブラウザ用のバンドルとNode.jsランタイム上でのSSRのバンドルしか扱えませんでしたが、このAPIによって、モバイルアプリ用のバンドルや異なるランタイムでのバンドルも扱えるようになり、Viteでのバンドルの幅を広げるために開発されたのがVite Environment APIです[^2]。

[^2]: 詳細については[Environment API で広げる Vite の可能性 ](https://pre-vue-fes-2024-environment-api-slide.sapphi.red/)をご参照ください

NuxtにてこのAPIを使用することで、これまでクライアントとサーバーでViteを2つ起動していたところを1本化できるようになります。これによりDev Serverのログが簡潔になることが利点として挙げられていました。

![experimental.viteEnvironmentApiがfalseかtrueの違いによるDevServer起動のログの違い。falseは旧来通りclientとserverそれぞれのビルド・事前ウォームアップが表示されているがtrueにするとclientとserverそれぞれのログが削除され１本化されている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/0e51cd9f-7745-47ae-bea5-d056a76996a2.png)

さらにDev Serverのインスタンスが1本化されたことにより、NuxtをViteプラグインとして扱えるようになるのではないか、とも言われております。

```js
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [nuxt()], // NuxtをViteプラグインとして呼び出せるかもしれない
});
```

後述するNitroの件も含め、Viteが統一されたツールチェインとして活用できる期待があるからこその進化だな、と感じました。

### 発表資料

https://talks.wattanx.dev/2025/vue-fes-after-talk/

## お試しで oxlint を導入してみる

こちらは弁護士ドットコム株式会社の[Nobuaki kamba](https://qiita.com/nobuaki0331)さんによる発表です。
Vue Fes Japan 2025ではRust製のJavaScript関連ツール群を扱うOSSである「[OXC](https://oxc.rs/)」へのコントリビューションを経て[Void Zero](https://voidzero.dev/)へ入社することになった[OXCコアチームメンバーの方の発表](https://vuefes.jp/2025/speaker/leaysgur)がありました。

そのOXCのツールではParser（構文解析器）やLinter（静的コード解析）、Transpiler（コード変換器）、Formatter（コード整形）などが開発されています。今回はLinterのoxlintについて、試しに導入してみた内容を共有していただきました。

[Linter | The JavaScript Oxidation Compiler](https://oxc.rs/docs/guide/usage/linter.html)

oxlintはESLintよりも高速に実行ができ、すでに600以上のルールが策定されています。マイグレーションしてoxlintのみを使う方法もありますが、プロダクトに適応しているルールでまだoxlintでは未対応なものもあったため今回はeslint-plugin-oxlintを使う方法で試されたようです。

導入によるLinter実行時間の削減は1秒程度でしたが、oxlintを先に実行することでフィードバックを即座に受けられ、エラー結果もより視覚的にわかりやすいものとなったため開発体験自体は向上できたとのことでした。

弊社では新しいフロントエンドアーキテクチャにおいて、LinterとしてBiomeを検討したことがありますが、Vue.js / Nuxt環境下であったことや、対応するルール、ルールの変更容易性を加味してESLintを採用しています。今回の発表のように徐々にoxlintを使用してみる形も検討してみてもよいかなと感じました。

### 発表資料

https://speakerdeck.com/bengo4com/20251111-cloudsign-vuefes-after-talk

## 最近の Storybook

こちらはユニークビジョン株式会社の[Ryutaro Yako](https://github.com/RyutaroYako)さんによる発表です。
最近[Storybook v10がリリースされESMオンリーとなったこと](https://storybook.js.org/blog/storybook-10/)が話題となっていましたが、弊社ではStorybookを導入していないこともあり最近疎遠になっていました。今回、Vue.js環境下でStorybookを活用しているユニークビジョンさんから、直近で利便性が向上した変更点について共有していただきました。

これまでPropsに応じたControl定義やモジュールのモック作成に手間のかかる部分がありましたが、[v8.0.0](https://github.com/storybookjs/storybook/releases/tag/v8.0.0)より`vue-component-meta`によるControl定義の自動化、[v9.1.0](https://github.com/storybookjs/storybook/releases/tag/v9.1.0)よりモジュールの自動モック機能が追加されるなどの改善が行われていたことを知りました。

ESMオンリー化もそうですが、依存関係の削減やStorybook自体がReact依存を解消したことで、React以外のUIライブラリでもだいぶ使いやすくなってきたのかなという印象を受けました。公式のMCPサーバーが[AIエージェントに使いやすいように改良していく話](https://zenn.dev/cybozu_frontend/articles/e17267112d7816)もあり、Storybookからは疎遠になりつつも、まだまだStorybook自体の進化は続いているなと体感できました。

### 発表資料

https://speakerdeck.com/ryutaro_yako/zui-jin-no-storybook-number-vuefes-aftertalk

## Nitro v3

こちらは株式会社プレイドの[kazupon](https://x.com/kazu_pon)さんによる発表です。
wattanxさんの発表でもあったようにNuxt 5からは[Nitro](https://nitro.build/)のバージョンが3にアップデートされます。それに伴うv3の変更点について共有いただきました。

NitroはWebサーバーのツールキットでNuxt内部でも使用されているライブラリです。Nuxt以外だと[Solid Start](https://start.solidjs.com/)、[TanStack Start](https://tanstack.com/start/latest)[^3]、[Analog](https://analogjs.org/)といったフルスタックフレームワークのサーバー部分で使用されています。

[^3]: TanStack StartはViteがベースとなっており、[NitroはVite Pluginとして使用し、さまざまなホスティング環境で動作させる](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro)ことができます。

v3から注目したい点として、サーバーフレームワークの[h3](https://github.com/h3js/h3)以外の[Elysia](https://elysiajs.com/)や[Hono](https://hono.dev/)などが扱えるようになる点が挙げられます。これによりフレームワークの選択肢が増え、使用するアプリケーションや環境に沿った広い技術選定が可能となっていきそうです。

また、NitroがViteプラグインになることで、より簡易的にSSR対応したアプリケーションをViteで構築できるようになります。NitroとReactといったこれまででは考えられなかった組み合わせも可能になるかもしれません（要件によっては使えないこともあるかもしれませんが…）。

今回の発表でデモとなったリポジトリも公開されています。ぜひお手元で試してみてください。

https://github.com/kazupon/nitro-v3-demo

### 発表資料

https://speakerdeck.com/kazupon/nitro-v3

---

以上が個人的に学びとして得られた発表の紹介でした。アンドパッドさんの事例発表が特に印象に残りましたし、他発表も各プロジェクトの技術課題に適応できそうなものだと感じました。

今回ここでは紹介しきれなかった発表（[Vue Fes Japan 2025グラフィックチームの苦悩](https://speakerdeck.com/sasagar/gurahuitukutimukarajian-tavue-fes-japan-2025-sabutaitoru-damezetutai)、[Vueのリアクティブな仕組みから学ぶデータ構造の話](https://speakerdeck.com/konkarin/vue-data-structures-linked-lists-and-queues-for-reactivity)、[VueコミュニティとVue Fes Japan運営スタッフに参加した感想](https://speakerdeck.com/lmi/vue-fes-japan-2025-aftertalk)）も大変興味深いものでした。

改めてVue Fes Japan2025、そしてこのアフターイベントへ参加した皆さん、お疲れさまでした！
