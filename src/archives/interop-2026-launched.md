---
title: Interop 2026のプロポーザル投票が始まりました！
description: Interop 2026のプロポーザル投票が始まったことのお知らせ記事です
date: 2026-02-13
author: yamanoku
source: zenn.dev
noindex: true
---

2/13（日本時間）、ブラウザ間でのWeb標準の相互運用性を向上するプロジェクト「Interop」の2026年プロジェクトが始まりした。

この記事では、昨年のInterop 2025の振り返りと、新たにInterop 2026でどのAPIが重点対象として選出されたのかについて触れていきます。

前提知識として、Interopそのものの取り組みについての解説については、以前書いた[Interop 2025のプロポーザル投票が始まりました！](https://zenn.dev/yamanoku/articles/interop-2025-opens-for-proposals)をご覧ください。

## Interop 2025の振り返り

2026年のInteropプロジェクトについて触れる前に、まずは昨年のInterop 2025プロジェクトについて振り返ってみましょう。

| Stable                                                                                                                                                                                                        | Experimental                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![2026/2/13時点のInterop2025のStable版WPTダッシュボード。重点対象全体が95点、調査対象が36点、Chromeが99点、Edgeが98点、Firefoxが99点、Safariが98点](https://i.gyazo.com/527744f7898001027b93b1d1a49db480.png) | ![2026/2/13時点のInterop2025のExperimental版WPTダッシュボード。重点対象全体が97点、調査対象が36点、Chromeが99点、Edgeが99点、Firefoxが99点、Safariが99点](https://i.gyazo.com/1abac29f03caeb8badc4c26a1344ed7b.png) |

最新の安定版ブラウザでのリリースにおいては全体で95点まで達成されており、プレリリース版においては97点まで網羅されていました。安定版でのテスト網羅率ではFirefoxが一歩リードしている形となっています。この結果はInterop 2024でも同様の結果となっています。

スコア自体は昨年同様高い数値をキープしており、安定版においてはChromeとEdgeでは昨年よりも1点スコアが高まっています。一方で調査対象は36点と昨年と比較して低い結果となっています。特に[Privacy Testing](https://github.com/web-platform-tests/interop-privacy)はまったく着手されていない結果となっています。

<details>
<summary>2025年の重点対象リスト（完了・継続含む）</summary>

- CSS Anchor positioning
- `backdrop-filter` - **完了**
- Core Web Vitals (LCP, INP)
- `<details>` element - **完了**
- Layout (Flexbox/Grid/Subgrid)
- Modules (JSON modules)
- Navigation API
- Pointer and Mouse events
- `@scope`
- `scrollend` event - **完了**
- Storage Access API
- `text-decoration` - **完了**
- URLPattern
- View Transition API (SPA)
- WebAssembly (JS String Builtins) - **完了**
- WebRTC
- Writing modes - **完了**
- Mutation Eventの削除 - **完了**
</details>

<details>
<summary>2025年の調査対象リスト</summary>

- Accessibility testing
- Gamepad API testing
- Mobile testing
- Privacy testing
- WebVTT
</details>

ちなみに、2/13時点でのInterop 2025と2026のダッシュボードをスコアを比較すると、Interop 2026ではChromeとEdgeのスコアは下がるもののFirefoxとSafariのスコアは高めになっており、全体のスコアも高い結果となっております。

| Interop 2025 - 2025/2/13時点のスコア                                                                                                                                                                                                                                  | Interop 2026 - 2026/2/13時点のスコア                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Interop 2025のダッシュボード。Interop全体が33点、Investigationが0の指標が上部にあり、Chrome Canaryが91点、Edge Devが88点、Firefox Nightlyが52点、Safari Technology Previewが55点と下部に表示されている。](https://i.gyazo.com/f583b06ea7463c92450c72e5e367cfd1.png) | ![Interop 2026のダッシュボード。Interop全体が43点、Investigationが0の指標が上部にあり、Chrome Canaryが87点、Edge Devが82点、Firefox Nightlyが63点、Safari Technology Previewが64点と下部に表示されている。](https://i.gyazo.com/19d94f2a2b666262e9de100a217179d6.png) |

## Interop 2026での重点対象について

ここからは、Interop 2026で新しく重点対象として追加されたもの、および重要なアップデートがあった機能について見ていきます。2026年は20の重点対象と4つの調査領域で構成され、2025年からの継続された課題も存在します。

### Container style queries

Container style queriesは、`@container` アットルールと1つ以上の `style()` 関数と組み合わせて使用し、コンテナのカスタムプロパティの計算値に基づいて要素にスタイルを適用するCSSです。

```css
@container style(--theme: dark) {
  .card {
    background: #1a1a1a;
    color: #fff;
  }
}
```

> - [Tests dashboard](https://wpt.fyi/results/css/css-conditional/container-queries?label=experimental&label=master&aligned&view=interop&q=label%3Ainterop-2026-container-style-queries)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@container#container_style_queries)

### CSS anchor Positioning

これは2025年からの継続項目です。CSS Anchor positioningは、アンカーと呼ばれる要素を基準として特定の要素を、常に画面の特定の位置に固定できるCSSプロパティです。

> - [Tests dashboard](https://wpt.fyi/results/css/css-anchor-position?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2025-anchor-positioning)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/Guides/Anchor_positioning)

### The `attr()` CSS function

`attr()` は、HTML要素の属性値を返します。これまではcontentプロパティでしか使えませんでしたが現在の仕様では、色・長さ・角度など、あらゆるCSSプロパティで使えるようになり、必要に応じて型変換も行われます。つまり、HTMLの属性値をそのままスタイルの一部として扱えるようになりました。

```css
.element {
  color: attr(data-value color);
}
```

> - [Tests dashboard](https://wpt.fyi/results/css/css-values?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-attr&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr)

### The `contrast-color()` CSS function

`contrast-color()` は、指定された前景色または背景色に対して、コントラストが保証された色を選択できるCSS機能です。

> - [Tests dashboard](https://wpt.fyi/results/css/css-color?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-contrast-color&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/contrast-color)

### Custom Highlights

Custom highlightsは、DOMに余分な要素を追加することなく、任意のテキスト範囲にハイライトのスタイルを設定するCSS機能です。

> - [Tests dashboard](https://wpt.fyi/results/css/css-highlight-api?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-custom-highlights&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/API/CSS_Custom_Highlight_API)

### Dialog and popover additions

`<dialog>` HTML要素は、確認プロンプトやデータ入力用のサブウィンドウなど、モーダルまたはモードレスなダイアログボックスを表します。`popover` HTML属性は、他のページコンテンツの上にコンテンツを表示するオーバーレイを作成します。ポップオーバーは、HTMLを使用して宣言的に表示することも、`showPopover()` メソッドを使用して表示できます。今年の作業は以下に焦点を当てます。

- `closedby` 属性
  - ダイアログを閉じるユーザー操作を設定します
  - `<dialog closedby="any">` は、ダイアログの外側をクリックして閉じることを許可できます
- `:open` CSS擬似クラス
  - `<dialog>` のような開いた状態を持つ要素にマッチできます
- `popover="hint"` グローバル属性:
  - `popover="auto"` 属性を持つ他のポップオーバーに従属するポップオーバーを作成します
  - これを使用すると、例えば自動ポップオーバーを閉じないツールチップを作成できます

> - [Tests dashboard](https://wpt.fyi/results/?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-dialogs-and-popovers&label=master&label=experimental)
> - MDN docs:
>   - [`<dialog closedby>` attribute](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/dialog#closedby)
>   - [`:open` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:open)
>   - [`popover="hint"` attribute](https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/popover#hint)

### Fetch uploads and ranges

`fetch()` メソッドは、非同期HTTPリクエストを行うAPIです。今年の作業は以下に焦点を当てます。

- `Body` 内の `ReadableStream`: サーバーにデータをストリーミングできるようにします
- リクエストとレスポンスにおける `FormData` と `mime-type` をサポートします
- `Range` ヘッダーのサポートをします

> - [Tests dashboard](https://wpt.fyi/results/fetch?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-fetch&label=master&label=experimental)
> - MDN Docs
>   - [ReadableStream in body](https://developer.mozilla.org/docs/Web/API/ReadableStream)
>   - [FormData](https://developer.mozilla.org/docs/Web/API/FormData)
>   - [Range header](https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Range)

### IndexedDB

IndexedDB APIは、ローカルストレージのトランザクション型オブジェクトデータベースです。

IndexedDBストアまたはインデックスからレコードとその主キーを返す `IDBObjectStore` および `IDBIndex` の `getAllRecords()` メソッドに焦点を当てます。レコードはバッチ処理や逆順で読み取ることができます。`getAllRecords()` メソッドは、大規模なデータセットでの読み取り操作を高速化します。

```js
const records = await objectStore.getAllRecords({
  query: IDBKeyRange.bound('A', 'M'),
  count: 100,
  direction: 'prev',
});
```

> - [Tests dashboard](https://wpt.fyi/results/IndexedDB?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-indexeddb&label=master&label=experimental)
> - MDN Docs
>   - [`IDBObjectStore.getAllRecords()`](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/getAllRecords)
>   - [`IDBIndex.getAllRecords()`](https://developer.mozilla.org/docs/Web/API/IDBIndex/getAllRecords)

### JSPI for WASM

Wasm（WebAssembly）は、ポータブルなバイナリ命令形式です。JavaScript Promise Integration API (JSPI) を使用すると、外部機能への同期アクセスを前提として記述されたWasmアプリケーションが、その機能が実際には非同期である環境でもスムーズに動作できるようになります。

> - [Tests dashboard](https://wpt.fyi/results/wasm/jsapi/jspi?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-jspi-for-wasm&label=master&label=experimental)
> - [Introducing the WebAssembly JavaScript Promise Integration API](https://v8.dev/blog/jspi)

### Media pseudo-classes

`:playing`、`:paused`、`:seeking`、`:buffering`、`:stalled`、`:muted`、および `:volume-locked` CSS擬似クラスは、その状態に基づいて `<audio>` および `<video>` 要素にマッチします。

- `:playing` — 現在再生中のとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:playing)）
- `:paused` — 停止中のとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:paused)）
- `:seeking` — 新しい位置にシークしているとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:seeking)）
- `:buffering` — バッファリング中のとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:buffering)）
- `:stalled` — 再生が停止したとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:stalled)）
- `:muted` — ミュートのとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:muted)）
- `:volume-locked` — 音量を変更できないとき（[MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:volume-locked)）

> - [Tests dashboard](https://wpt.fyi/results/css/selectors/media?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-media-pseudo-classes&label=master&label=experimental)

### Navigation API

これは2025年からの継続項目です。Navigation APIはHistory APIに代わる、ブラウザのナビゲーション操作を開始・傍受・変更するためのAPIです。

今年は、Navigation APIの相互運用性の継続的な向上と、ハンドラが解決されるまでコミットを遅延させる `MapsEvent.intercept()` の `precommitHandler` オプションへの相互運用性向上を目指します。

```js
navigation.addEventListener('navigate', (e) => {
  e.intercept({
    async precommitHandler() {
      await loadCriticalData();
    },
    async handler() {
      renderPage();
    },
  });
});
```

> - [Tests dashboard](https://wpt.fyi/results/navigation-api?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-navigation&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/API/Navigation_API)

### Scoped custom element registries

`CustomElementRegistry()` コンストラクタは、グローバルな `window.customElements` レジストリとは別の、新しいカスタム要素レジストリを作成するAPIです。複数のレジストリを作成することは、同じタグ名を持つ複数のカスタム要素を共存させる場合に便利です。

```js
const registry = new CustomElementRegistry();
registry.define('my-button', MyButtonV2);
shadowRoot.registry = registry;
```

> - [Tests dashboard](https://wpt.fyi/results/custom-elements/registries?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-scoped-custom-element-registries&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry)

### Scroll-driven Animations

スクロール量に応じてアニメーションを制御するCSS機能です。`animation-timeline`、`scroll-timeline`、および `view-timeline` CSSプロパティは、ユーザーのスクロール位置に基づいてアニメーションを進行させます。

```css
.reveal {
  animation: fade-in linear forwards;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

> - [Tests dashboard](https://wpt.fyi/results/scroll-animations?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-scroll-driven-animations&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/CSS_scroll-driven_animations)

### Scroll snap

Scroll snapは、スクロールコンテナ内のパンとスクロールの動作を制御するCSS機能です。モダンブラウザではもうサポートされているのですが、ブラウザが初期実装を出したあとに仕様が何度も書き換えられたため、ブラウザ間で動作が揃わないという問題が深く残ってしまいました。仕様も成熟してきたので、改めてこの機能の互換性を整えるタイミングとして選出されました。

```css
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}
.carousel > * {
  scroll-snap-align: center;
}
```

> - [Tests dashboard](https://wpt.fyi/results/css/css-scroll-snap?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2026-scroll-snap)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/Guides/Scroll_snap)

### The `shape()` CSS function

CSSの `shape()` 関数は、line（線）、move（移動）、curve（曲線）などの一連のコマンドを使用して形状を作成します。これは `clip-path` や `shape-outside` と共に使用できます。

```css
.element {
  clip-path: shape(
    from 0% 0%,
    line to 100% 0%,
    line to 100% 100%,
    curve to 0% 100% via 50% 150%,
    close
  );
}
```

> - [Tests dashboard](https://wpt.fyi/results/css/css-shapes/shape-functions?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2026-shape)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/basic-shape/shape)

### View Transitions API

ウェブサイト上でのさまざまなビュー間をシームレスな視覚的遷移を作成するためのAPIです。ドキュメントの異なる状態間、またはマルチページアプリケーションの異なるドキュメント間で、アニメーション化された視覚的な遷移を作成できるようになります。今年の作業は以下に焦点を当てます。

- 同一ドキュメント（same-document）のView Transitionsの相互運用性の継続的な向上
- `<link>`、`<script>`、`<style>` 要素の `blocking="render"` 属性
  - 外部スクリプトやスタイルシートが読み込まれるまで、または特定の要素がDOMに存在するまでレンダリングをブロックします
- `<link rel="expect">` 属性
  - `href` 値を参照する要素がドキュメントに接続され、完全に解析されるまでレンダリングをブロックするようブラウザにヒントを与えます
- `:active-view-transition-type()` CSS擬似クラス
  - 指定されたタイプでアクティブなView Transitionsが開始された場合にのみマッチします
- クロスドキュメント（cross-document）View Transitions

> - [Tests dashboard](https://wpt.fyi/results/css/css-view-transitions?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-view-transitions&label=master&label=experimental)
> - [MDN: View Transition API](https://developer.mozilla.org/docs/Web/API/View_Transition_API)

### Web Compat

Web Compatは特定の技術ではなく、すでにリリースされているAPIであるもののバグやWeb標準からの逸脱によって問題が起きているものたちのグループになります。今年は以下の互換性の問題に焦点を当てます。

- ESM module loading（[プロポーザル](https://github.com/web-platform-tests/interop/issues/1105)）
- Timing of scroll events relative to animation events（[プロポーザル](https://github.com/web-platform-tests/interop/issues/1126)）
- `user-select`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/1000)）

### WebRTC

これは2025年からの継続項目です。WebRTC APIは、ブラウザ間で直接リアルタイム通信チャネルを確立します。ビデオ会議アプリケーションで一般的に使用されます。今年の作業は以下に焦点を当てます。

- WebRTCの相互運用性の継続的な向上
- Interop 2025重点分野からの残りの失敗テストの修正

> - [Tests dashboard](https://wpt.fyi/results/?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-webrtc&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/API/WebRTC_API)

### WebTransport

WebTransport APIは、HTTP/3プロトコルを使用してクライアントとサーバー間でデータを送信できます。

```js
const transport = new WebTransport('https://example.com/endpoint');
await transport.ready;
const stream = await transport.createBidirectionalStream();
// Stream data efficiently
```

> - [Tests dashboard](https://wpt.fyi/results/webtransport?product=chrome&product=edge&product=firefox&product=safari&aligned=&view=interop&q=label%3Ainterop-2026-webtransport&label=master&label=experimental)
> - [MDN](https://developer.mozilla.org/docs/Web/API/WebTransport_API)

### The `zoom` CSS property

要素のサイズを拡大縮小するCSSプロパティ `zoom` は、昨年はWeb Compatの一部として対象となっていましたが、今年は単体の重点項対象として選ばれました。

`transform` プロパティとは異なり、ズームされた要素はページのレイアウトに影響を与えるものとなっています。

> - [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2026-zoom)
> - [MDN](https://developer.mozilla.org/docs/Web/CSS/zoom)

## Interop 2026での調査対象について

Interopでは重点対象だけでなく、テスト合格率では進捗を測定できない分野の長期的な相互運用性向上を目的とした調査も実施されています。新しいテスト機能の追加や、プラットフォーム機能のテストカバレッジの拡大などを検討されています。今年は以下が調査対象となります。

- Accessibility testing
- JPEG XL
- Mobile testing
- WebVTT

今回注目したい点として「[JPEG XL](https://jpegxl.info/)」が調査対象に入ったことがあげられます。JPEG XLはアニメーション、アルファ透過、そしてロッシー（不可逆）およびロスレス（可逆）圧縮の両方をサポートするラスター画像ファイル形式です。

長らくInteropのプロポーザルとして挙げられつつも重点対象として選ばれることはなかったのですが、機能をテスト可能とするため今回から調査対象として選ばれました。

## 参加企業によるInterop 2026プロジェクト開始にまつわる記事

### Apple

https://webkit.org/blog/17818/announcing-interop-2026/

### Google

https://web.dev/blog/interop-2026?hl=en

### Igalia

https://www.igalia.com/news/interop-2026.html

### Microsoft

https://blogs.windows.com/msedgedev/2026/02/12/microsoft-edge-and-interop-2026/

### Mozilla

https://hacks.mozilla.org/2026/02/launching-interop-2026/

## おわりに

今回の記事ではInterop 2025の振り返りと、Interop 2026の重点対象・調査対象について紹介しました。Interop 2026では前回からの継続対象も含めて140件ものプロポーザルが提出されておりました。

昨年選出されたNavigation APIは主要なブラウザでのテストを通過し、今年1月より晴れて[Baseline Newly Available](https://web-platform-dx.github.io/web-features-explorer/features/navigation)となりました。これもInteropでのWeb標準の相互運用性を高めてくれた成果の1つと言えるでしょう。ちなみに私は、Navigation APIの理解を深めるために昨年[ひとりアドベントカレンダー](https://scrapbox.io/yamanoku/%E3%81%B2%E3%81%A8%E3%82%8ANavigation_API_Advent_Calendar)を実施していました。

今年はCSS anchor Positioning、View Transitions API、`popover` 属性、Scroll snapsの相互運用性向上を期待しています。特にView Transitions APIでは静的なWebサイト（MPA）でも使えることへの大きな期待を寄せています。これにより、モダンなUIフレームワークを使わないサイトでも、ネイティブアプリのような遷移表現が可能となることでしょう。

また、長らく期待されていたJPEG XLが今年は調査対象として選出されました。かつてChromeではサポートを撤回する[^1]といったこともありましたが、昨今のサポート状況の変化により[2025/11/25に再度Chromeでもサポートすることが発表](https://groups.google.com/a/chromium.org/g/blink-dev/c/WjCKcBw219k/m/NmOyvMCCBAAJ?pli=1)されました。Chrome 145ではオリジントライアルで、Rust製のJPEG XLデコーダーが搭載されるようになりました[^2]。

一度はChromeで止まってしまったサポートですが、相互運用テストが可能になり、クロスブラウザでのJPEG XLの相互運用性向上につなげられることを期待しています。

[^1]: [次世代画像形式 JPEG XL が Chrome から削除された話のまとめ｜ろったり](https://note.com/rottary/n/n4939d745c639)

[^2]: [Chrome 145  |  Release notes  |  Chrome for Developers](https://developer.chrome.com/release-notes/145?hl=ja)

今後のInterop 2026の進捗に注目していきましょう。
