---
title: フロントエンドの2023年を振り返る（前編）
description: 2023年前半（1月〜6月）のフロントエンドの動向やニュースを振り返ります。
date: 2023-12-23
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

yamanokuがウォッチしてきたフロントエンドにまつわる動向やニュースを振り返ります。今回は1月から6月までの前半を振り返ってみます。

## 1月

### React NativeがTypeScriptをサポート

> [First-class Support for TypeScript · React Native](https://reactnative.dev/blog/2023/01/03/typescript-first)

React Nativeの公式ブログにて、v0.71よりTypeScriptファーストになったことが発表されました。これまではflowにて静的型チェックを行っていました。新たなるアプリテンプレートを作る場合はTypeScriptがデフォルトになります。

### `nuxt.new`が公開

> [nuxt/nuxt.new: Create a new Nuxt project from your address bar.](https://github.com/nuxt/nuxt.new)

`nuxt/nuxt.new`はNuxtプロジェクトのスターターキットでCLIにて作成できるようになりました。特定のアドレスを入力するとCodeSandboxかStackBlitzでNuxtプロジェクトが作成できます。

- https://nuxt.new/c/v3 でCodeSandbox
- https://nuxt.new/s/v3 でStackBlitz

### Remixの新規サービス採用事例

> [新規サービスにRemixを採用したぜ✌️ - Ateam Tech Blog](https://techblog.a-tm.co.jp/entry/2023/01/05/165133)

株式会社エイチームのエンジニアブログにて、新規サービスにRemixを採用したことが発表されました。この当時はNext.jsでの採用事例が多かった中でRemixを新規採用する事例はまだ見かけていなかったので印象に残っています。

### Google Chrome 109よりMathMLがサポートされる

> [New in Chrome 109: OPFS on Android, new css properties, MathML Core support - YouTube](https://www.youtube.com/watch?v=B4_vT99pBaM)

MathMLは数学的・科学的コンテンツのためのW3Cの標準規格です。これまでFirefoxとSafariのブラウザエンジンで実装されていたのですが、ChromeがBlinkへとエンジンを切り替えた際に削除されていました。

Chrome 109からはMathML CoreというMathMLのサブセットにてサポートされるようになりました。以下は数式のサンプル表示例です。

<math>
  <mfrac>
    <mn>1</mn>
    <msqrt>
      <mn>2</mn>
    </msqrt>
  </mfrac>
</math>

すべての機能が使えるわけではないですが、ブラウザの相互運用性を考えると大きな進歩だと思います。この復活に貢献したIgaliaのプロジェクトや該当記事も併せてご覧ください。

> - [MathML in Web Browsers](https://mathml.igalia.com/)
> - [Igalia Brings MathML Back to Chromium | Igalia](https://www.igalia.com/2023/01/10/Igalia-Brings-MathML-Back-to-Chromium.html)

### Nuxt.jsの2023年のビジョン

> [Nuxt: A vision for 2023 · Nuxt Blog](https://nuxt.com/blog/vision-2023)

Nuxtチームより2023年内に行いたいことをまとめた記事が公開されました。以下概要です。

- Nuxtに関連するリポジトリを統合する
- 公式サイトの更新（nuxt2のページ統合、コミュニティ・モジュール、ユースケースの追加）
- Nuxtモジュール開発の活性化
- DX&パフォーマンス改善
- リリースサイクルの刷新（フレームワークのメジャーリリースを毎年行い、パッチリリースは1週間程度、マイナーリリースは1か月程度を予定）
- Nuxt3へのマイグレーション支援に焦点を置いておく

### Astro2.0リリース

> [Astro 2.0 | Astro](https://astro.build/blog/astro-2/)

Content Collection機能、ハイブリッドレンダリング、開発中のエラー画面のリデザイン、HMRの改善、Vite 4.0のサポートが追加されました。ちなみに[Astro 1.0のリリース](https://astro.build/blog/astro-1/)は2022年8月でした。

### Vue本体よりReactive Transformが消える

> [ ⚠️ Dropped Reactivity Transform · vuejs/rfcs · Discussion #369](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-4779240)

Vue.js Nation 2023のEvan Youの発表にて、RFCとして開発していたReactive Transformがv3.4より削除されることが発表されました。

<figure>
  <img src="https://user-images.githubusercontent.com/45793869/214797069-9a245dab-99fb-4ae9-837b-4f51d94754cc.png" alt="R.I.P Reactivity Transformという見出しのスライドを発表するEvan You">
  <figcaption><a href="https://youtu.be/OrT0tHGXyqE?t=844">Vue.js Nation 2023</a>の発表</figcaption>
</figure>

これまで使用していた人向けに[Vue Macrosに機能を切り出して](https://vue-macros.sxzz.moe/features/reactivity-transform.html)互換性を保つようにしているようです。

### Dan Abramov氏がCreate React Appの今後についてを語る

> [Replace Create React App recommendation with Vite by t3dotgg · Pull Request #5487 · reactjs/react.dev](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741)

Create React App（以下CRA）は去年の4月を最後に更新されておらず、新たにReactアプリを作るにはViteを使うことを推奨してみるのはどうかという提案が出されました。色々と議論があった中、今後のCRAについてをDan Abramov氏が長文でコメントしています。今後のCRAとしての選択肢としては以下のように挙げられています。

1. フルスクラッチで作り直す→現実的ではない
1. CRAを非推奨にしてViteテンプレートを推奨する→結局ViteとReactを併せたものをメンテナンスする（新しいものをつくることになる）ことになる
1. CRAを非推奨にしてReactフレームワークを推奨する→Reactアプリを作る中立性のあるものが存在しなくなる（ガイドがそれぞれのフレームワーク頼りになる）
1. CRAから他のフレームワークでアプリを作るようにする→似通ってるものの場合解決するものを選ぶことが困難になる
1. ランチャーアプリとして運用する→これが現実解になりそう？

## 2月

### NetlifyがGatsby社を買収

> - [Gatsby is joining Netlify | Gatsby](https://www.gatsbyjs.com/blog/gatsby-is-joining-netlify/)
> - [Netlify Acquires Gatsby Inc. to Accelerate Adoption of Composable Web Architectures](https://www.netlify.com/press/netlify-acquires-gatsby-inc-to-accelerate-adoption-of-composable-web-architectures/)

ホスティングサービスとサーバーレスのバックエンドサービスを提供するNetlifyが[Gatsby](https://www.gatsbyjs.com/)を開発するGatsby Inc。を買収しました。Gatsby自体は引き続きオープンソースとして開発していき、Gatsby Cloudの機能やValhalla Content Hubという新サービスがNetlifyに統合されることが発表されました。

### Interop 2023の開始

> [Interop 2023: continuing to improve the web for developers  |  web.dev](https://web.dev/blog/interop-2023)

ブラウザベンダ間でWebの相互運用性を改善していくプロジェクトのInteropの2023年版が始まりました。CSS、JS、Web APIなどを含めた合計26箇所が重点分野として挙げられています。

### Eleveny v2.0.0リリース

> [Eleventy v2.0.0, The Stable Release — Eleventy](https://www.11ty.dev/blog/eleventy-v2/)

Eleventyのv2.0.0がリリースされました。大きな変更として依存関係の削減やビルド速度の改善が行われています。

### React.js: The Documentary

> [How A Small Team of Developers Created React at Facebook | React.js: The Documentary - YouTube](https://www.youtube.com/watch?v=8pDqJVdNa44)

現代におけるフロントエンドのライブラリとして有名となったReact.jsのドキュメンタリー動画が公開されました。関係者や献身的な開発者を交えてFacebook（現Meta）での誕生から黎明期、そして現在に至るまでを振り返る内容になっています。

### DevToolsにて複数の拡張子がシンタックスハイライトサポート

> [What's New In DevTools (Chrome 110)  |  Blog  |  Chrome for Developers](https://developer.chrome.com/blog/new-in-devtools-110/#highlight)

<figure>
  <img src="https://developer.chrome.com/static/blog/new-in-devtools-110/image/syntax-highlighting-vue-be47894e26359_1920.png" alt="Vueファイルのシンタックスハイライトが効くようになった">
  <figcaption>What's New In DevTools (Chrome 110)より引用</figcaption>
</figure>

Chrome Dev ToolsのSourceパネルにてVue、JSX、Dart、LESS、SCSS、SASS、そしてインラインCSSのシンタックスハイライトがサポートされるようになりました。

### WebContainer API

> [WebContainer API is here.](https://blog.stackblitz.com/posts/webcontainer-api-is-here/)

StackBlizで使用されているブラウザ上で動くWebAssemblyベースのコンテナAPIです。具体的には以下のようなメリットがあります。

- Webブラウザ上でNode.jsを実行・動かせる
- Webブラウザ上でIDEと同じ体験ができる
  - コードと実行結果（ブラウザ上の挙動）が見れる
  - 環境変数などの独自設定が不要になる
- [Svelteのチュートリアル](https://learn.svelte.dev/)では導入されている

また、OpenAI（ChatGPT）連携でアプリケーション作成のプロンプトを渡すとライブアプリケーション作ってくれる[サービス](https://retune.so/)も公開されています。

### core-jsのこれまでとこれからについて

> [core-js/docs/2023-02-14-so-whats-next.md at master · zloirock/core-js](https://github.com/zloirock/core-js/blob/master/docs/2023-02-14-so-whats-next.md)

core-jsのv3.28.0がリリースされたのと同時にメンテナでもあるzloirock氏によるcore-jsの歴史と自身にまつわる事件、財政的な支援について、そしてこれからのcore-jsのロードマップ語られています。

### Angularへリアクティビティプリミティブの「Signals API」

> [[Watch This Space] Angular Reactivity with Signals · angular/angular · Discussion #49090](https://github.com/angular/angular/discussions/49090)

Vue.js、Preact、SolidJSがすでに採用しているリアクティブの機能をAngularでも扱えるようにするためのAPIのプロトタイプが公開されていきました。

当時の日本語での解説は「[ついにやってくるSignals！Angularはどう変わるのか？【ng-japan OnAir #63】](https://www.youtube.com/watch?v=gCKw5OyRPiA)」を参考ください。Google公式で[Angular Signals スタートガイド](https://codelabs.developers.google.com/angular-signals?hl=ja#0)も公開されています。

### CSSコンテナクエリがクロスブラウザ対応

要素自体の幅を判定して要素のレイアウトを切り替えるようにする機能の「コンテナクエリ」がクロスブラウザ対応されました。以下のように要素の幅が560px未満の場合には非表示にするようにできます。

```css
@container (max-width: 560px) {
  .item {
    display: none;
  }
}
```

具体的な解説は[コンテナクエリ @container が全ブラウザ対応。新時代のレスポンシブ対応を完全理解する](https://zenn.dev/tonkotsuboy_com/articles/css-container-query)を参照ください。

### Web Push APIがiOS、iPadOSでもサポート

> [Web Push for Web Apps on iOS and iPadOS | WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

macOSでは16.1よりサポートされていましたが、iOSとiPadOSの16.4以降のPWAにおいてもプッシュ通知ができるようになりました。併せて[Badging API](https://developer.mozilla.org/en-US/docs/Web/API/Badging_API)もサポートされるようになりました。

実際の検証については[iOS 16.4でSafariのPWAがPush通知に対応したのでWeb Pushの動作検証する](https://zenn.dev/chocodogmagic/articles/web-push-ios)を参照ください。

## 3月

### Rspack

> [Announcing Rspack - Rspack](https://www.rspack.dev/blog/announcement.html)

TikTokの開発元で知られるByteDanceのWebインフラチームが、RustベースのWebpackにあたる「[Rspack](https://www.rspack.dev/)」をオープンソースとして公開しました。

インクリメンタルコンパイルやHMR、高速なビルドを搭載しており、Webpackと比較して5〜10倍の性能向上がされていると言われております。RspackはWebpackチームとも連携してWebpack自体の性能向上にも貢献していき、将来ある程度Rspackが成熟してきた時点で、WebpackにRspackを統合することも視野に入れているようです。

### TypeScriptのv5.0がリリース

> [Announcing TypeScript 5.0 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)

v5.0からの大きな変更点として[Decoratorがサポート](https://github.com/microsoft/TypeScript/pull/50820)されるようになったのが挙げられます。型パラメータの宣言時にconstが使えるようになったり、すべてのenumsはenumの値に定数以外の値を指定できるUnion enumsになりました。

Vite、esbuild、SWC、Webpack、Parcelなどのバンドラとの共存を改善する、`--moduleResolution bundler`というmodule bundlerオプションが導入されるなど、オプションの追加・変更も多くありました。

[Prettierのv2.8.5](https://github.com/prettier/prettier/blob/main/CHANGELOG.md#285)でもTypeScript 5.0のサポートが追加されています。

### Reactのドキュメントがリニューアル

> [Introducing react.dev – React](https://react.dev/blog/2023/03/16/introducing-react-dev)

新たに刷新されたReactドキュメントでは、ドメインも`.org`から`.dev`に変わり、これまでクラスコンポーネントのサンプルだったものを関数componentsとReact Hooksを使ったものに変更されました。

これまでのドキュメントサイトは[legacy.reactjs.org](https://legacy.reactjs.org/)に移動されました。

### Edge Functionsの利用実態調査

> [State of Edge Functions](https://state-of-edge-function.deno.dev/)

Cloudflare Workers、Fastly、Deno Deploy、Vercel Edge FunctionといったEdge Functionsの利用実態を調査したサイトが公開されました。

### `<search>`要素の追加

> [Add the `<search>` element · whatwg/html@c598ff0](https://github.com/whatwg/html/commit/c598ff023f081dd3f03b2e43177a632fb7dc92ec)

`role="search"`に相当するHTML要素である`<search>`がLiving Standardsに追加されました。下記のように`<form>`要素を`<search>`要素でラップするようにして扱うことができます。

```html
<search>
  <form action="search.php">
    <label for="query">Find an article</label>
    <input id="query" name="q" type="search" />
    <button type="submit">Go!</button>
  </form>
</search>
```

### Chakra UIに関するこれからについて

> [The future of Chakra UI - Segun Adebayo](https://www.adebayosegun.com/blog/the-future-of-chakra-ui)

Chakra UIは`@emotion/styled`に依存するランタイムCSS-in-JSを排除しReact Server Componentsで活用ができるようにしたいことや、フレームワークにとらわれない形でソリューションを提供できるようにしたい今後の展望が述べられています。

今後はモノリシックな開発を辞め、それぞれが管理しやすいようにモノレポな環境に分割して開発を進めていくことが述べられています。

- ゼロランタイムCSS-in-JSの導入（Panda CSS）
- デザイントークンプラットフォームの構築（Ultra）
- コンポーネントロジックの状態と遷移をアーキテクトするステートマシンライブラリの開発（Zag.js）
- Zag.jsをベースにしたヘッドレスコンポーネントの開発（Ark）

### SassのネストとCSS Nestingの違い

> [Sass: Sass and Native Nesting](https://sass-lang.com/blog/sass-and-native-nesting/)

CSSが独自でネスト（CSS Nesting）ができるようになってきたことに対して、Sass側でネストする利点についての記事が公開されました。

Sassのネスト自体はCSS Nestingと互換性がまったくないので影響はないのですが以下については注意が必要です。

- Sassの場合はサフィックスで書けるが、CSS Nestingでは書けない
- CSS Nestingの場合は判定が`:is()`で囲まれるため、詳細度がSassとは異なる
  - `:is()`は引数のセレクタが詳細度影響するため、中にid指定があるとその詳細度に揃う

## 4月

### Storybook v7.0リリース

> [Storybook 7.0](https://storybook.js.org/blog/storybook-7-0/)

Storybookイベントの[Storybook Day](https://storybook.js.org/day)にてv7.0が発表されました。Viteをファーストサポート、Next.jsやSvelteKitのサポート、Component Story Formatのv3、MDX2サポートなどが追加されました。

### Nuxt 3.4リリース

> [Nuxt 3.4 · Nuxt Blog](https://nuxt.com/blog/v3-4)

Nuxt 3.4からページ間をトランジション移動できるようになるWeb APIのView Transitions APIを実験的にサポートするようになりました。Nuxt内でのペイロードの扱いを切り替える`renderJsonPayloads`という実験的機能も追加されました。

### Node.js v20リリース

> [Node.js 20 is now available! | Node.js](https://nodejs.org/en/blog/announcements/v20-release-announce)

- `--experimental-permission`を有効にして、すべてのパーミッションのアクセス制限ができるようになった
- `import.meta.resolve()`の同期
- Node.jsとJavaScriptアプリを単一の実行ファイルにする「Single Executable Applications」機能を搭載
- テストランナーの安定化
- V8がv11.3、Adaがv2.0へアップデート

### Node.js 14がEOL

4月30日をもってNode.js 14がEOLとなりました。Node.js 14は2020年4月にリリースされ、LTSは2021年10月からになっていました。

## 5月

### Deno KVの発表

> [Announcing Deno KV](https://deno.com/blog/kv)

世界35箇所のリージョンにて提供されるDenoのkey-valueデータベースであるDeno KVが発表されました。

```js
const kv = await Deno.openKv();

const key = ['users', crypto.randomUUID()];
const value = { name: 'Alice', created: new Date() };
await kv.set(key, value);

const result = await kv.get(key);
console.log(result.value);
// { name: "Alice", created: 2023-05-01T09:24:07.620Z }
```

ローカル環境ではSQLiteへ保存され、Deno DeployでデプロイするとFoundationDBによってDeno社へデータが管理されるようになります。

### Qwikのv1.0リリース

> [Qwik Reaches v1.0](https://www.builder.io/blog/qwik-v1)

[builder.io](https://www.builder.io/)によって作られたフロントエンドフレームワークのQwikiがv1.0になりました。

### ChromeのURL欄のロックアイコンが差し替わる

> [Chromium Blog: An Update on the Lock Icon](https://blog.chromium.org/2023/05/an-update-on-lock-icon.html)

もともとはHTTPS通信ができているかどうかのアイコンであったが、ユーザーはそれだけを見て「信頼できるサイト」であると評価しているため（ヒートマップで検証）誤解を与えいていました。

具体的にどういった部分がセキュリティとして評価されているかを知れるようにクリックしやすいアイコンに変更するとのことです（HTTPS通信に関するアイコン自体はそのままにする形）。iOS Chromeでは鍵アイコンをタップできないので削除されるらしいです。

### `<select>`要素を`<hr>`でセパレートできるようになった

> [Allow `<hr>` to be used inside `<select>` as a separator · whatwg/html@b9c5dee](https://github.com/whatwg/html/commit/b9c5dee3f015d7f9276e7e35d4b6022993c93e64)

`<select>`の子要素に`<hr>`を含められるようにLiving Standardに追加されました。以下のように`<hr>`を挟むことで区切り線でセパレートすることができます。

<!-- prettier-ignore-start -->
```html
<label>
 Select the song to play next:
 <select required name="next">
  <option value="sr">Random
  <hr>
  <option value="s1">It Sucks to Be Me (Reprise)
  <option value="s2">There is Life Outside Your Apartment
  …
```
<!-- prettier-ignore-end -->

### Baseline

> - [Introducing Baseline: a unified view of stable web features | MDN Blog](https://developer.mozilla.org/en-US/blog/baseline-unified-view-stable-web-features/)
> - [Baseline  |  Articles  |  web.dev](https://web.dev/baseline/)

Web技術のブラウザサポートの明示をよりわかりやすくするBaselineという取り組みがスタートしました。

Browser compatibility自体はそのまま残しつつ、主要ブラウザの最新2メジャーverでどこまでサポートされているかを確認しやすくなりました。MDNドキュメントやweb.devにて展開されてるようになっています。現在は[Can I Useでも表示される](https://caniuse.com/feed/166)ようになりました。

### Vue v3.3がリリース

> [Announcing Vue 3.3 | The Vue Point](https://blog.vuejs.org/posts/vue-3-3)

v3.3になりdefinePropsにて複合の型が書ける、Generic Componentsの登場、defineEmitsをラベル付きTupple要素で記述可能、defineSlots・defineModel・defineOptionsの登場が挙げられます。コードネームは「るろうに剣心」です。

### Bunのバンドラが登場

> [The Bun Bundler | Bun Blog](https://bun.sh/blog/bun-bundler)

Bunのネイティブバンドラのベータ版が登場しました。CLIからは`bun build`、JavaScript APIからは`bun.build()`で実行できます。

<figure>
  <img src="https://bun.sh/images/bundler-speed.png" alt="Bunのビルド速度比較。速度の順番はBun（0.17秒）、esbuild（0.30秒）、rspack（4.45秒）、Percel2（26.32秒）、Rollup+Terser（32.00秒）、Webpack5（38.02秒）になっている。">
  <figcaption>ソースマップと最小化を使ってthree.jsの10個複製した分をゼロからバンドルした比較</figcaption>
</figure>

## 6月

### Starlightの公開

> [Starlight 🌟 Build documentation sites with Astro](https://starlight.astro.build/)

Astro製のドキュメントサイト作成スターターキット「Starlight」が公開されました。

### Enzoのリリース

> [Open sourcing Ezno's checker and trying out / previewing the JavaScript type checker today · kaleidawave/ezno · Discussion #21](https://github.com/kaleidawave/ezno/discussions/21)

Rustで書かれた型チェッカーであるEznoがリリースされました。Oxcで使うことにより足りていない機能を補えるようになっています。

### WAI-ARIA 1.2がW3C勧告に

> [Accessible Rich Internet Applications (WAI-ARIA) 1.2 is a W3C Recommendation | 2023 | News | W3C](https://www.w3.org/news/2023/accessible-rich-internet-applications-wai-aria-1-2-is-a-w3c-recommendation/)

[Accessible Rich Internet Applications Working Group](https://www.w3.org/groups/wg/aria/)は、Accessible Rich Internet Applications (WAI-ARIA) 1.2をW3C勧告として発表しました。これは2017年12月にWAI-ARIA1.1の勧告がとなってから約5年ぶりのアップデートになります。

### State of CSS 2023が公開

> [State of CSS 2023](https://survey.devographics.com/en-US/survey/state-of-css/2023)

毎年恒例のCSSのサーベイが開始されました。

### Svelte 4のリリース

> [Announcing Svelte 4](https://svelte.dev/blog/svelte-4)

Svelte 3から4年以上ぶりのメジャーバージョンアップになります。モダンツールの導入や古いバンドラーやレガシーバージョンの刷新を行うといったメンテナンスリリースのみに注力しており、Svelte 5への基盤となるような更新になっています。

## 2023年上期発売したフロントエンド関連の書籍

- [実践Node.js入門 ―基礎・開発・運用](https://gihyo.jp/book/2023/978-4-297-12956-9)
- [フロントエンド開発のためのセキュリティ入門 知らなかったでは済まされない脆弱性対策の必須知識](https://www.shoeisha.co.jp/book/detail/9784798169477)
- [改訂3版JavaScript本格入門 ～モダンスタイルによる基礎から現場での応用まで](https://gihyo.jp/book/2023/978-4-297-13288-0)
- [Webアプリケーションアクセシビリティ ――今日から始める現場からの改善](https://gihyo.jp/book/2023/978-4-297-13366-5)
- [Jestではじめるテスト入門](https://peaks.cc/books/testing_with_jest)
- [フロントエンド開発のためのテスト入門 今からでも知っておきたい自動テスト戦略の必須知識](https://www.shoeisha.co.jp/book/detail/9784798178189)
- [実践 Svelte入門](https://gihyo.jp/book/2023/978-4-297-13495-2)
- [JavaScript Primer 改訂2版 迷わないための入門書](https://www.kadokawa.co.jp/product/302303004295/)
- [初めてのTypeScript](https://www.oreilly.co.jp/books/9784814400362/)

## 2023年上期のフロントエンド関連のイベント

- [2023GUI新年会 - connpass](https://guiland.connpass.com/event/271316/)
- [Serverless Frontend Meetup #1 「Cloudflare Workers」 - connpass](https://serverless-frontend.connpass.com/event/271894/)
- [Vue.js v-tokyo Meetup #16 - connpass](https://vuejs-meetup.connpass.com/event/271298/)
- [Vercel Meetup #0 with CEO - connpass](https://vercel.connpass.com/event/274772/)
- [Saitama.js vol.5【埼玉県大宮開催！初心者歓迎 JavaScript LT会】 - connpass](https://saitamajs.connpass.com/event/272660/)
- [Encraft #1 フロントエンド × 設計 - connpass](https://knowledgework.connpass.com/event/277296/)
- [#edge_study - connpass](https://web-study.connpass.com/event/277480/)
- [UIT Meetup vol.19『デザインシステムのリアル』 - connpass](https://uit.connpass.com/event/276600/)
- [Front-End Deep Dive - connpass](https://anotherworks.connpass.com/event/278310/)
- [Vercel Ship](https://vercel.com/ship)
- [Web Sessions at Google I/O 2023 - YouTube](https://www.youtube.com/playlist?list=PLOU2XLYxmsIJGxIV8Lt8gF_79Z334LQ6h)
- [フロントエンドの技術的負債 みんなで学ぶ Lunch LT - connpass](https://findy.connpass.com/event/281811/)
- [Vue.js v-tokyo Meetup #17 - connpass](https://vuejs-meetup.connpass.com/event/279254/)
- [Kyoto.js 19 - connpass](https://kyotojs.connpass.com/event/282651/)
- [Web technology sessions at WWDC23 | WebKit](https://webkit.org/blog/14203/web-technology-sessions-at-wwdc23/)
- [W3Cキーマンに問うWeb標準と技術これから - とか勉#73 - connpass](https://html5j.connpass.com/event/286030/)
- [第1回 CSS福笑い - connpass](https://connpass.com/event/279663/)
- [Tailwind Connect 2023 | Tailwind CSS Live Event](https://connect.tailwindcss.com/)
- [Config 2024 | Figma](https://config.figma.com/)
- [Saitama.js vol.6【株式会社オープンロジ様オフィス(池袋)開催】 - connpass](https://saitamajs.connpass.com/event/283162/)
- [Encraft #4 React/Next.js 最前線 - connpass](https://knowledgework.connpass.com/event/285601/)
- [2023年、知っておきたいWebのこと \~フレームワーク・Web UI~ | CADC 2023](https://cadc.cyberagent.co.jp/2023/sessions/web-2023/)

## 参考情報源

- [mozaic.fm](https://mozaic.fm/)
- [JSer.info](https://jser.info/)
- [Cybozu Frontend Weeklyの記事一覧 | Zenn](https://zenn.dev/topics/cybozufrontendweek?order=latest)
- [2023年 | フロントエンドBlog | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/blog/frontend/2023/)
- [connpass](https://connpass.com/)
