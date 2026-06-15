---
title: Interop 2025が始まりました！
description: Interop 2025が始まったことを知らせる記事です
date: 2025-02-15
author: yamanoku
source: zenn.dev
noindex: true
---

2月14日（日本時間）、ブラウザ間でのWeb標準の相互運用性を向上するプロジェクト「Interop」の2025年プロジェクトが始まりました。

この記事では、Interop 2024の振り返りと、Interop 2025でどのAPIが重点対象として選出されたのかについて触れていきます。

前提知識として、Interopそのものの取り組みについての解説については、昨年書いた[Interop 2025のプロポーザル投票が始まりました！](/interop-2025-opens-for-proposals)をご覧ください。

## Interop 2024の振り返り

2025年のInteropプロジェクトについて触れる前に、2024年のInteropプロジェクトについて振り返ってみましょう。

| Stable                                                                                                                                                                                                                                                                                                                                                                                                           | Experimental                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![2025/2/15時点のInterop2024のStable版WPTダッシュボード。重点対象全体が95点、調査対象が62点、Chromeが98点、Edgeが97点、Firefoxが99点、Safariが98点](https://res.cloudinary.com/zenn/image/fetch/s--qpkgF0xq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/2050388d855631aa11d83e87.png%3Fsha%3De342448239eaef7e314e910b7154e62d770de421) | ![2025/2/15時点のInterop2024のExperimental版WPTダッシュボード。重点対象全体が97点、調査対象が62点、Chromeが99点、Edgeが99点、Firefoxが99点、Safariが99点](https://res.cloudinary.com/zenn/image/fetch/s--fkfrMa0z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/402972b0321ab531a9d749cb.png%3Fsha%3D0a3cc0f57df2535e249388c4ac7b368179636225) |

最新の安定版ブラウザでのリリースにおいては全体で95点まで網羅されており、プレリリース版においては97点まで網羅されていました。安定版でのテスト網羅率ではFirefoxが一歩リードしている形となっています。このことより、各ブラウザでのInterop 2024の重点対象がおおよそ網羅していることが示されています。

これまでのInteropプロジェクトでのスコアを比較すると、徐々にテスト網羅率が向上していることもわかります（2023年の安定版は83点、2022年では82点から上昇）。

重点対象となったものの中では、CSS Nesting、Declarative Shadow DOM、`text-wrap: balance` が100%テストカバレッジを達成しています。前年から続く重点対象個所の中ではMedia Queries 4、Motion Path、Viewport Unitsらが100％に達成しています。

<details>
<summary>2024年の重点対象リスト</summary>

- Accessibility
- CSS Nesting
- Custom Properties
- Declarative Shadow DOM
- `font-size-adjust`
- HTTPS URLs for WebSocket
- IndexedDB
- Layout
- Pointer and Mouse Events
- Popover
- Relative Color Syntax
- `requestVideoFrameCallback`
- Scrollbar Styling
- `@starting-style` & `transition-behavior`
- Text Directionality
- `text-wrap: balance`
- URL
</details>

<details>
<summary>前年から継続している重点対象のリスト</summary>

- Aspect Ratio
- Border Image
- Cascade Layers
- Color Spaces and Functions
- Container Queries
- Containment
- CSS Math Functions
- CSS Pseudo-classes
- Dialog Element
- Font Feature Detection and Palettes
- Forms
- `:has()`
- Inert
- Masking
- Media Queries 4
- Modules
- Motion Path
- Offscreen Canvas
- Scrolling
- Sticky Positioning
- Transforms
- Typography and Encodings
- Viewport Units
- Web Codecs (video)
- Web Compat 2022
- Web Compat 2023
- Web Components

</details>

比較までに2024/9/19時点のダッシュボードも掲載しておきます。

| Stable                                                                                                                                                                                                                                                                                                                                                                                                           | Experimental                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![2024/9/19時点のInterop2024のStable版WPTダッシュボード。重点対象全体が74点、調査対象が12点、Chromeが90点、Edgeが89点、Firefoxが87点、Safariが83点](https://res.cloudinary.com/zenn/image/fetch/s--da9Nvyt7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/b0d93b5832efb5ebbcca0606.png%3Fsha%3D3b6c23bc5b772a180ac4feb362101b5d678e8549) | ![2024/9/19時点のInterop2024のExperimental版WPTダッシュボード。重点対象全体が89点、調査対象が12点、Chromeが98点、Edgeが93点、Firefoxが93点、Safariが97点](https://res.cloudinary.com/zenn/image/fetch/s--Px_8M7bV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/44af20fa9954337160fe82d4.png%3Fsha%3D5f9196e4654ecfbb97ccfcedcefea37af9741f58) |

## Interop 2025での重点対象について

次にInterop 2025で重点対象となったものについて見ていきます。それぞれWPTのテストダッシュボードと対応するMDNのリンクも掲載しておりますので併せてご覧になってみてください。

### CSS Anchor positioning

CSS Anchor positioningは、アンカーと呼ばれる要素を基準として特定の要素を、常に画面の特定の位置に固定できるCSSプロパティです。

このCSSプロパティは昨年のInteropで実施されたPopover APIと組み合わせて使用されることが想定されています。

- [Tests dashboard](https://wpt.fyi/results/css/css-anchor-position?label=master&label=experimental&aligned&q=label%3Ainterop-2025-anchor-positioning)
- [MDN](https://developer.mozilla.org/docs/Web/CSS/CSS_anchor_positioning)

### `backdrop-filter`

このCSSプロパティは、要素の背後にある領域でぼかし、カラーシフトなどのグラフィック効果を適用します。例えばガラス細工のような表現をCSSで表現できるようになります。

- [Tests dashboard](https://wpt.fyi/results/css/filter-effects?label=master&label=experimental&aligned&q=label%3Ainterop-2025-backdrop-filter)
- [MDN](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter)

### Core Web Vitals

Largest Contentful Paint（LCP）については、現在Safari/Webkitが、Interaction to Next Paint（INP）はSafari/WebkitとFirefoxの両ブラウザで安定的に使用できない状態のため、Core Web Vitalsという一括りで安定化させるために提案されています。Cumulative Layout Shift（CLS）指標は対象外となります。

- [Tests](https://wpt.fyi/results/?label=master&label=experimental&aligned&q=label%3Ainterop-2025-core-web-vitals)

### `<details>` element

`<details>` 要素は展開ウィジェットであり、展開することで追加コンテンツを表示できます。閉じると、入れ子になった `<summary>` 要素だけが見えます。 今年は、最近追加された `<details>` 要素にまつわる機能をすべてのブラウザで動作させることに焦点を当てます。

- `::marker` と `::details-content` の擬似要素
- `content-visibility` を使用して、表示する代わりに内容を切り替えられるようにする
- `<details>` 要素をページ内検索で自動展開できるようにする

さらにこの重点対象には `hidden="until-found"` 属性も含まれており、ブラウザのページ内検索をするか、URLフラグメントをたどって直接移動するまでの間は要素を隠せるようなります。

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&q=label%3Ainterop-2025-details)
- [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/details)

### Layout

こちらは2024年から継続されているものです。主にflexbox、grid、subgridにまつわるレイアウトのバグについてを解消していきます。

- [Tests dashboard](https://wpt.fyi/results/css?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2021-flexbox%20or%20label%3Ainterop-2023-flexbox%20or%20label%3Ainterop-2021-grid%20or%20label%3Ainterop-2023-grid%20or%20label%3Ainterop-2022-subgrid)

### Modules

JavaScriptの `import` 文は、JavaScript modulesを読み込むことができます。 さらに `type` 属性と一緒に使うと、CSS ModulesやJSONデータを読み込むことができます。 例えば、`import ... with { type： "json" }` は、JSONデータ（JSON module scripts）をロードできます。今年はJSON module scriptsのインポート部分に注力していくそうです。

- [Tests dashboard](https://wpt.fyi/results/html/semantics/scripting-1/the-script-element?label=master&label=experimental&aligned&q=label%3Ainterop-2025-modules)
- [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import/with)

### Navigation API

Navigation APIはHistory APIに代わるSPAでのナビゲーションやURLの更新を簡単に扱えるようにするAPIです。このAPIはブラウザのナビゲーション・アクションを開始したり、傍受したり、内容を変更できます。これまでChromeのみの実装でしたが、今年は他のブラウザでも実装されることを目指します。

- [Tests dashboard](https://wpt.fyi/results/navigation-api?label=master&label=experimental&aligned&q=label%3Ainterop-2025-navigation)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)

### Pointer and Mouse events

こちらは2024年から継続されているものです。Pointer eventsとMouse eventsは、ユーザーがポインティング・デバイスを操作することによって発生するDOMイベントです。Pointer eventsについては、マウス、タッチペン（スタイラスペン）、タッチ（1本または複数の指など）などのポインティング入力デバイスに対応しています。

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=stable&aligned&view=interop&q=label%3Ainterop-2023-events)
- [MDN（Pointer events）](https://developer.mozilla.org/docs/Web/API/Pointer_events)
- [MDN（MouseEvent）](https://developer.mozilla.org/docs/Web/API/MouseEvent)

### `@scope`

このCSSのアットルールを使用すると、特定のDOMサブツリー内の要素を選択できるようになり、要素のスタイルを正確に指定できるようになります。

例えば次の場合のCSSでは特定のクラス内で一致するリンクのカラーを変更できます。

```css
@scope (.light-scheme) {
  a {
    color: darkmagenta;
  }
}

@scope (.dark-scheme) {
  a {
    color: plum;
  }
}
```

さらに上限と下限も設定できるため、以下のような範囲指定も可能です。

```css
@scope (.media-object) to (.content > *) {
  img {
    border-radius: 50%;
  }
}
```

`.media-object` で始まり `.content` クラスの子クラスまでのすべての子孫を含むDOMフラグメントにある `img` タグにのみ指定できます。

- [Tests dashboard](https://wpt.fyi/results/css/css-cascade?label=master&label=experimental&aligned&q=label%3Ainterop-2025-scope)
- [MDN](https://developer.mozilla.org/docs/Web/CSS/@scope)

### `scrollend` event

文書のビュー内でスクロールが完了した時に発生するイベントです。これまでは `setTimeout()` を使用してスクロールが一定時間停止したかどうかをチェックするしかできなかったため、`scrollend` が導入されることで「スクロールが完了したこと」を正しく検出できるようになります。

```js
document.addEventListener('scrollend', (event) => {
  output.innerHTML = `Document scrollend event fired!`;
});
```

- [Tests dashboard](https://wpt.fyi/results/dom/events/scrolling?label=master&label=experimental&aligned&q=label%3Ainterop-2025-scrollend)
- [MDN](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event)

### Storage Access API

Storage Access APIは、認証された埋め込みをサポートしつつ、サードパーティクッキーを削除することが可能になります。主なメソッドは以下の通りです。

- `document.requestStorageAccess()` メソッドは、`<iframe>` 内のコンテンツがクッキーやその他のサイト・データの保存と読み込みを要求できるようになります
- `document.hasStorageAccess()` メソッドは、そのようなアクセスが許可されているかどうかをチェックします

ただし、[Storage Access Headers](https://github.com/privacycg/storage-access-headers)についてはこの重点箇所の対象外となります。

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2025-storageaccess)
- [MDN](https://developer.mozilla.org/docs/Web/API/Storage_Access_API)

### `text-decoration`

テキストのアンダーライン、オーバーライン、ラインスルー、またはその組み合わせを含む装飾線のスタイルと色を設定できるCSSプロパティです。

今年は、`text-decoration` プロパティを使用する際に付与されるベンダープレフィックスを不要にすることを目標としています。

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2025-textdecoration)
- [MDN](https://developer.mozilla.org/docs/Web/CSS/text-decoration)

### URLPattern

URLまたはURLの一部にマッチするパターンを表すURL Pattern APIのインターフェースです。パターンの構文は[path-to-regexp](https://github.com/pillarjs/path-to-regexp)ライブラリの構文に基づいています。

```js
const pattern = new URLPattern({ pathname: '/:username' });
const url_1 = new URL('https://example.com/johndoe');
console.log(pattern.test(url_1)); // true
const url_2 = new URL('https://example.com/johndoe/profile');
console.log(pattern.test(url_2)); // false
```

- [Tests dashboard](https://wpt.fyi/results/url-pattern-api?label=master&label=experimental&aligned&q=label%3Ainterop-2025-url-pattern)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API)

### View Transition API

ウェブサイト上でのさまざまなビュー間をシームレスな視覚的遷移を作成するためのAPIです。

今年は、同一ドキュメントでのView Transition APIを相互運用可能にすることと、`view-transition-class` CSSプロパティを実装することを目標にしています。

- [Tests dashboard](https://wpt.fyi/results/css/css-view-transitions?label=master&label=experimental&aligned&view=interop&q=all%28label%3Ainterop-2025-view-transitions%29)
- [MDN](https://developer.mozilla.org/docs/Web/API/View_Transition_API)

### WebAssembly

WebAssembly APIはWebAssemblyコードを読み込むことができるようになるAPIです。

昨年は調査対象として選出されており、WPTフレームワーク内でWebAssembly仕様のテストが実行するためのテストインフラを追加するように進められていました。今年は重点対象となり、以下APIの相互運用に焦点を当てます。

- JS String Builtins: WebAssemblyの組み込み文字列関数をJavaScript String APIのサブセットをミラーするようにし、JavaScriptグルーコードなしで呼び出せるようにします
- Resizable buffers integration: リサイズ可能なバッファを使用するJSコードにWebAssemblyを統合します

---

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&q=label%3Ainterop-2025-webassembly)
- [MDN](https://developer.mozilla.org/docs/WebAssembly)

### Web Compat

Web Compatは特定の技術ではなく、すでにリリースされているAPIであるもののバグやWeb標準からの逸脱によって問題が起きているものたちのグループになります。今年は以下の互換性の問題に焦点を当てます。

- `appearance`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/884)）
- `zoom`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/825)）
- `list-style-position`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/857)）
- `overscroll-behavior`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/858)）
- Content Security Policy（[プロポーザル](https://github.com/web-platform-tests/interop/issues/855)）
- PefromanceObserver（[プロポーザル](https://github.com/web-platform-tests/interop/issues/856)）
- `document.caretPositionFromPoint`（[プロポーザル](https://github.com/web-platform-tests/interop/issues/710)）

### WebRTC

WebRTC APIは、ブラウザ間で直接リアルタイムの通信チャネルを確立するAPIです。ブラウザ内でのビデオ会議アプリケーションなどで使用されていたりします。今年は以下のAPIの相互運用に焦点を当てます。

- `RTCRtpScriptTransform`: クロスブラウザのエンドツーエンドの暗号化を可能にするAPI
- `RTCDataChannel`: 2つのピア間で双方向に任意のデータを転送するためのネットワークチャネル

---

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2025-webrtc)
- [MDN](https://developer.mozilla.org/docs/Web/API/WebRTC_API)

### Writing modes

このCSSプロパティはテキストが水平・垂直にレイアウトされるか、左から右・右から左にレイアウトされるかを設定できるものです。今年は `sideways-lr` と `sideways-rl` 値を相互運用できるように焦点を当てます。

さらに `overflow-x` と `overflow-y` の論理的プロパティである `overflow-inline` と `overflow-block` プロパティの相互運用にも焦点を当てます。これは書き込みモードに関係なくコンテンツがボックスからはみ出した時の動作を制御できるようになります。

- [Tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned&view=interop&q=label%3Ainterop-2025-writingmodes)
- [MDN](https://developer.mozilla.org/docs/Web/CSS/writing-mode)

### Mutation Eventの削除

今年ははじめて**機能の削除**が重点対象として選ばれました。

`DOMSubtreeModified`、`DOMNodeInserted`、`DOMNodeRemoved` はDOMの変更を監視し、DOMの変更が発生したときにイベントリスナーコールバックを実行します。しかし、現在これらはすべて非推奨となっており、`MutationObserver` APIを使用することが推奨されています。すべてのブラウザでのMutation Eventのサポートを完全に取り除くことを今年の目標としています。

- [Tests dashboard](https://wpt.fyi/results/dom?label=master&label=experimental&aligned&q=label%3Ainterop-2025-remove-mutation-events)
- [MDN](https://developer.mozilla.org/docs/Web/API/MutationEvent)

## Interop 2025での調査対象について

Interopでは重点対象だけでなく、テスト合格率では進捗を測定できない分野の長期的な相互運用性向上を目的とした調査も実施されています。新しいテスト機能の追加や、プラットフォーム機能のテストカバレッジの拡大などを検討されています。今年は以下が調査対象となります。

- Accessibility testing
- Gamepad API testing
- Mobile testing
- Privacy testing
- WebVTT

## 参加企業によるInterop 2025プロジェクト開始にまつわる記事

### Apple

https://webkit.org/blog/16458/announcing-interop-2025/

### Bocoup

https://www.bocoup.com/blog/interop-2025

### Google

https://web.dev/blog/interop-2025?hl=en

### Igalia

https://www.igalia.com/2025/02/13/Interop-2025.html

### Microsoft

https://blogs.windows.com/msedgedev/2025/02/13/microsoft-edge-and-interop-2025/

### Mozilla

https://hacks.mozilla.org/2025/02/interop-2025/

## おわりに

今回の記事ではInterop 2024の振り返りと、Interop 2025の重点対象について紹介しました。

Interop 2025では前回からの継続対象も含めて172件ものプロポーザルが提出されておりました。それぞれのプロポーザルでは重点対象として注目されているものについては多くのリアクションがついており、一番多くのリアクションを集めたのは[JPEG XL image format](https://github.com/web-platform-tests/interop/issues/700)でした（2/15時点で👍リアクションが448個）。ですが、必ずしもリアクションの多いものが対象に選ばれているわけでもありません。

Interopプロジェクトは各ブラウザベンダ、コンサル企業らの尽力によりWeb標準の相互運用性を高めてもらっています。開発者でもある我々はその恩恵を活用できるようにするためにも、これらの重点対象のものが**どのように扱えるものなのかを知っておく**ことが重要です。

ちなみに重点対象のものが、各ブラウザで利用可能となる機能の指標（Baseline）として追加されると、[Web Platform Status DashboardのBaseline 2025リスト](https://webstatus.dev/?q=baseline_date%3A2025-01-01..2025-12-31)にも反映されるそうなので、こちらもチェックしておくとよいでしょう。

筆者は[前回の記事](https://zenn.dev/yamanoku/articles/interop-2025-opens-for-proposals)でも述べた通り、Navigation APIの採用を願っておりましたが、今年ついに重点対象に選出されて大変うれしく思っております。今年のInteropを通じて来年以降に安定した使用ができることを祈り、改めて技術の素振りをしておきたいと思っております。また、View Transition APIの相互運用性も徐々に高まっていき、来年以降でMPA環境での相互運用性も向上していくことを期待しています。

皆さんも今後のInterop 2025の進捗に注目していきましょう。
