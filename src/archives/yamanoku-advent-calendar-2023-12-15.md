---
title: 令和最新Route Announcer事情
description: SPAでの画面遷移のアクセシビリティ改善はつらいよねという話
date: 2023-12-15
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

## Route Announcerとは何か

Single Page Application（以下SPA）は一枚のindex.htmlを元にJavaScript側の操作で画面遷移している風に見えるルーティングの実装をしています。このためスクリーンリーダーでは、サーバーサイドから次のページ情報を送ってくる方式では問題なかった画面遷移後の情報を検知することができません。つまりSPAでは今どの画面に行ったか、どの位置にいるかが分からず操作が混乱してしまう可能性があります。

この問題を解決するために**Route Announcer**（あるいはRoute Announcement）という仕組みが存在します。

Route Announcerのおおまかな仕組みはライブリージョンというものを活用し、画面内で動的な変化があった際にそれを支援技術へ伝えるというものです。具体的には、画面遷移の挙動が発生した際にライブリージョンに遷移先のページタイトルを伝えるようにすることで、支援技術側がそれを読み上げることができ、遷移したことが分かります。

Route Announcerを活用したフレームワークは[Gatsby](https://www.gatsbyjs.com/)、[Next.js](https://nextjs.org/)、[SvelteKit](https://kit.svelte.dev/)、Angular（[Angular Material](https://material.angular.io/cdk/a11y/overview#liveannouncer)）、[Astro](https://astro.build/)が挙げられます。これらのフレームワークでのRoute Announcer挙動では、大見出し（`<h1>`）・ページタイトル（`<title>`）が存在する順から、フォールバックとしてページのURLが読み上げられます。

---

ちなみにRoute Announcerの起源について調べてみたところ、Ember.jsの[a11y-announcer](https://github.com/ember-a11y/a11y-announcer)がそれに相当するものかなと思っていました。ですが、さらに遡ると[patrickfox/a11ykit](https://github.com/patrickfox/a11ykit)から相当する挙動を参考にしているみたいです。おそらくこれが始祖に当たるものかと思っていますが、もしこれよりも前に発明されたものやアイデアがあれば是非教えてください…！

## 具体的な実装方法

次に具体的な実装方法に触れていきます。実装コードは「[Webアプリケーションアクセシビリティ──今日から始める現場からの改善 WEB+DB PRESS](https://gihyo.jp/book/2023/978-4-297-13366-5)」より引用になります。

まずスクリーンリーダーに読み上げてもらう部分になります。

<!-- prettier-ignore-start -->
```html
<p id="announcer" role="alert" aria-live="assertive"></p>
```
<!-- prettier-ignore-end -->

`role="alert"`はユーザーに即座に重要かもしれないメッセージを通知させるためのWAI-ARIAのロールになります。

`aria-live="assertive"`は要素の内容が変更された瞬間に読み上げるする指定です。この値には他にも読み上げない`off`という値と、すべての読み上げが終わった後に通知する`polite`があります。

仕様上では`role="alert"`には`aria-live="assertive"`を暗黙的に含んでいるため書く必要はないのですが、支援技術がすべて対応しているかはわからないため、ユーザーの環境を考慮して付与されている形になっています。

読み上げてもらう部分は視覚的には見えなくて良いので[Visually Hidden](https://zenn.dev/yamanoku/scraps/a6c328ccc3238c)のスタイルを付与してあげます。

<!-- prettier-ignore-start -->
```ts
const onNavigationEnd = () => {
  const announcer = document.getElementById("announcer");
  const title = document.querySelector('title').textContent;
  if (announcer instanceof HTMLElement) {
    announcer.textContent = title;  // title要素のテキストを代入する
  }
}
```
<!-- prettier-ignore-end -->

挙動については `onNavigationEnd`という関数を用意して、画面遷移が完了した際にこちらを呼び出すようにします。この関数では、`title`要素のテキストを取得してきて、要素のIDが`announcer`の中に代入しています。

これがRoute Announcerとして最低限必要な実装になります。実装を見て分かる通り`title`要素を取得してくるため、ページごとで適切な内容を設定しておくことが重要です。

## 画面遷移後の挙動も考慮する

Route Announcerの挙動は画面遷移の開始時に発火するものです。そのため画面遷移後の挙動についても考慮する必要があります。例えば画面遷移後にキーボード操作を上から始めたい場合は、ページ上部にフォーカス地点を移動させるようにする必要があります。

一番分かりやすい対応としては、画面遷移後にRoute Announcerにフォーカスを当てるというものがあります。

<!-- prettier-ignore-start -->
```diff
<body>
+ <p id="announcer" role="alert" aria-live="assertive"></p>
```
<!-- prettier-ignore-end -->

まずはRoute Announcer要素を`<body>`内での一番上に設置します。

<!-- prettier-ignore-start -->
```diff
<p
  id="announcer"
+ tabindex="-1"
  role="alert"
  aria-live="assertive">
</p>
```
<!-- prettier-ignore-end -->

読み上げる要素に`tabindex="-1"`を付与します。この値があることで<kbd>Tab</kbd>キーで順番に要素へフォーカス移動する際に、その要素だけをスキップできるようになります。

```diff
  if (announcer instanceof HTMLElement) {
    announcer.textContent = title;  // title要素のテキストを代入する
+   announcer.focus();  // 読み上げる要素にフォーカスを当てる
  }
```

テキストを代入後に`focus()`を使ってフォーカスを当てることができます。これによりSPAでの画面遷移後にはページ上部へとフォーカスが移動して、通常の画面遷移と同様にフォーカス順序が上から始められるようになります。

しかし、フォーカスの挙動としてはこの形で問題ないのですが、Windowsで使用できるスクリーンリーダー「[NVDA](https://www.nvda.jp/)」での読み上げでは「_（ページタイトル）_、警告」というように読み上げられてしまいます。なぜそのように読みあげられてしまうかというと、スクリーンリーダーでは対応するHTMLの名前と役割を取得してくるため、`role="alert"`が付与されていることで「警告」という読み上げになります。

Route Announcer自体はSPAにおけるアクセシビリティ向上させる実装になりますが、あくまでもテクニックとしてのもので、HTMLの中における適切なセマンティクスな役割といったものは存在しません。なので`role`によっては違和感のある読み上げになってしまうこともあります。

それを加味するとセマンティクスな要素にフォーカス移動するのがスクリーンリーダー利用者にとっても理解しやすいのかなと思っています。`<main>`要素にフォーカスさせるというのも1つの手ですが、これはページ内コンテンツをすべて読み上げてしまうことにもつながってしまいます。

そのため読み上げる対象をより小さくさせたいと思っており、私の中で現時点で最適解と思っているのが**ページ内の大見出し（あるいはページ内に準ずる見出し）にフォーカスさせる**ことだと考えています。

<!-- prettier-ignore-start -->
```ts
const onNavigationEnd = () => {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let focusHeading = headings[0];

  headings.forEach((heading) => {
    if (heading.tagName < focusHeading.tagName) {
      focusHeading = heading;
    }
  });

  if (focusHeading instanceof HTMLElement) {
    focusHeading.tabIndex = -1;  // 見出しにtabindexを付与する
    focusHeading.focus();  // 読み上げる要素にフォーカスを当てる
  }
}
```
<!-- prettier-ignore-end -->

## Navigation APIへの期待

以上より私が現時点でもっている最適解は**ページの大見出し（あるいはページ内に準ずる見出し）にフォーカスさせる**だと思っているのですが、ページによってはレイアウトが異なったり、大見出しの位置が必ず保証されているわけでもありません。現状の対応ではレイアウトを固定するような制約をもたせない限りは完全には解決できないと思っています。

また、画面が遷移したかどうかはJavaScriptだけの管轄になっており、実装状況や利用環境によっては読み上げをしてくれるタイミングが変わる可能性もあるため、`setTimeout()`にてタイミングをズラす必要があったりします。

結局のところ共通で使えるRoute Announcerの実装は難しいというのが現状です。Ubieさんの事例[^1]のように各プロダクトや各環境での状況に併せた実装が求められるのが現実です。

[^1]: [SPA(Next.js)のスクリーンリーダーによる画面遷移で工夫したこと](https://zenn.dev/ubie_dev/articles/499d3ecff708c0)

この独自で解決しなければならない問題に対しての銀の弾丸になりえると期待しているのが「[Navigation API](https://html.spec.whatwg.org/multipage/nav-history-apis.html#navigation-api)」です。こちらのAPIについてを[今年のJSConfJPでLTにて紹介させていただきました](https://jsconf.jp/2023/talk/yamanoku-1/)[^2]。

[^2]: [画面遷移のアクセシビリティ課題を解決しうる Navigation API への期待 - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vSosGMESLA5IiR4NPz3i2u8XF_wkHsqP80pHA1a4q-Gmk9CIFkUobNc5pMvJj6Tth0PEGmoExmalOQj/pub?slide=id.g29cfbd0e8bc_2_0)

Navigation APIは、[Location API](https://developer.mozilla.org/ja/docs/Web/API/Location)や[History API](https://developer.mozilla.org/ja/docs/Web/API/History)の後継として開発されている新しいWeb APIです。このAPIを利用することで、画面遷移の開始と終了のタイミングを通知することができたり、フォーカスマネジメントやスクロール位置の復元といったことも調整しやすくなります。

2023年現在ではChromeのみでしか使えないものですが、Interop 2024にてNavigation APIも[相互運用に注力するAPIとして投票されております](https://github.com/web-platform-tests/interop/issues/435)。アクセシビリティ以外の観点でも各種ルーターライブラリにて活用ができそうなため期待が高まっています[^3]。SPAでの画面遷移におけるアクセシビリティを大いに向上させてくれるWeb APIのため、早くクロスブラウザで実装されて、各スクリーンリーダーでも対応できるようになると良いなと思っています。

[^3]: [ReactRouter](https://github.com/remix-run/react-router/discussions/11046)と[TanStack/router](https://github.com/TanStack/router/discussions/821)とでNavigation APIに関するDiscussionsが登録されています

## 参考情報

- [What we learned from user testing of accessible client-side routing techniques with Fable Tech Labs | Gatsby](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/)
- [スクリーンリーダーはどうやってライブリージョンを読み上げるのか - Qiita](https://qiita.com/24motz/items/a992a8d3d4b65452b7eb)
- [WICG/navigation-api](https://github.com/wicg/navigation-api)
- [Modern client-side routing: the Navigation API - Chrome for Developers](https://developer.chrome.com/docs/web-platform/navigation-api/)
- [Navigation API による「JS での画面遷移」と SPA の改善 | blog.jxck.io](https://blog.jxck.io/entries/2022-04-22/navigation-api.html)
- [View Transitions API と Navigation API でページ遷移アニメーションを実装してみる](https://zenn.dev/yend724/articles/20230817-1bpoplim35e6eeqi)
