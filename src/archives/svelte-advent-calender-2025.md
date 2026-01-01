---
title: "SvelteKitのクライアントサイドルーティングはどういう仕組みなの？"
description: "SvelteKitのクライアントサイドルーティングはどういう仕組みなの？"
date: 2025-12-18
author: yamanoku
source: zenn.dev
noindex: true
---

この記事は[Svelte Advent Calendar 2025](https://qiita.com/advent-calendar/2025/svelte)の18日目の記事です。

こんにちは、[yamanoku](https://x.com/yamanoku)です。私は現在[Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)とそれに関連するAPIやエコシステムを調べるアドベントカレンダーの「[ひとりNavigation API Advent Calendar](https://qiita.com/advent-calendar/2025/navigation-api)」を実施しています。

その中でSPAにおけるクライアントサイドルーティングがどのような仕組みになっているかを調べており、[SvelteKit](https://svelte.dev/docs/kit/introduction)の内部を調査しています。今日はその実装内部で興味をもった部分があったので、それをまとめて記事にしてみました。

# Sveltekitのクライアントサイドルーティングの仕組み

SvelteKitのクライアントサイドルーティングは、他のルーターライブラリと同様にHistory APIとLocation APIを中心に構築されています。主にHistory APIの `pushState` や `replaceState` を用いて、ルーティング処理を行っています。

SvelteKitではクライアントサイドルーティング遷移をコンポーネント上で表現するにあたり、特定のルーター用のコンポーネント（`<Link>` や `<NuxtLink>` のようなもの）を呼び出すことはありません。代わりにHTMLの `<a>` 要素を使って表現できます。これは他メタフレームワークと比較して個人的に面白いなと思っている部分です。

しかし、ただの `<a>` 要素であればHTMLでのリンクとしてそのまま遷移してしまいます。それを防ぐためにSvelteKitでは通常のリンク遷移のインターセプト（中断）処理を実装して制御しています。今回はその内容を紹介していきます。

# インターセプト処理を見る

クライアントサイドルーティング処理は `kit/packages/kit/src/runtime/client/client.js` 上で実装されています。その中にインターセプト処理も含まれております。

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2461-L2579

まず最初のコメントを見ると[Page.js](https://github.com/visionmedia/page.js)についてが書かれています。Page.jsはExpressのルーターを参考にした小さなクライアントサイドルーティングのライブラリです。このライブラリの内容を一部参考にした部分があるようです。

```js
// Adapted from https://github.com/visionmedia/page.js
// MIT license https://github.com/visionmedia/page.js#license
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2463-L2464

<details>
<summary>参考：Page.jsのクリックハンドラ部分</summary>

```js
  Page.prototype.clickHandler = function(e) {
    if (1 !== this._which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    // ensure link
    // use shadow dom when available if not, fall back to composedPath()
    // for browsers that only have shady
    var el = e.target;
    var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

    if(eventPath) {
      for (var i = 0; i < eventPath.length; i++) {
        if (!eventPath[i].nodeName) continue;
        if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
        if (!eventPath[i].href) continue;

        el = eventPath[i];
        break;
      }
    }

    // continue ensure link
    // el.nodeName for svg links are 'a' instead of 'A'
    while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
    if (!el || 'A' !== el.nodeName.toUpperCase()) return;

    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    // svg target is an object and its desired value is in .baseVal property
    if (svg ? el.target.baseVal : el.target) return;

    // x-origin
    // note: svg links that are not relative don't call click events (and skip page.js)
    // consequently, all svg links tested inside page.js are relative and in the same origin
    if (!svg && !this.sameOrigin(el.href)) return;

    // rebuild path
    // There aren't .pathname and .search properties in svg links, so we use href
    // Also, svg href is an object and its desired value is in .baseVal property
    var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

    path = path[0] !== '/' ? '/' + path : path;

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;
    var pageBase = this._getBase();

    if (path.indexOf(pageBase) === 0) {
      path = path.substr(pageBase.length);
    }

    if (this._hashbang) path = path.replace('#!', '');

    if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
      return;
    }

    e.preventDefault();
    this.show(orig);
  };
```

</details>

その次に書かれているのは、以下の操作時に処理が無効となります。

- 左クリック以外でクリックされたとき [^1]
- Ctrl、Meta、Shift、Altキーが押されているとき
- `preventDefault` が既に呼ばれているとき

[^1]: `event.which !== 1` によって左クリック以外はfalseとなるのですが、[`which` プロパティは現在非推奨](https://developer.mozilla.org/ja/docs/Web/API/UIEvent/which)となっています

```js
if (event.button || event.which !== 1) return;
if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
if (event.defaultPrevented) return;
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2465-L2467

次はクリックされた要素から、親要素を辿ってアンカー（`<a>`）要素を探します。`find_anchor` 関数は、クリックイベントのターゲットから開始して、href属性を持つ `<a>` 要素が見つかるまで親要素を辿ります。存在しない場合は処理を無視します。

```js
const a = find_anchor(/** @type {Element} */ (event.composedPath()[0]), container);
if (!a) return;
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2469-L2470


次に `get_link_info` 関数でリンクの詳細情報を取得しています。`target` 属性が `_parent`、`_top`、または `_self` 以外の値である場合、ブラウザのデフォルト動作となるようにしています。

```js
const { url, external, target, download } = get_link_info(a, base, app.hash);
if (!url) return;

// bail out before `beforeNavigate` if link opens in a different tab
if (target === '_parent' || target === '_top') {
  if (window.parent !== window) return;
} else if (target && target !== '_self') {
  return;
}
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2472-L2480

同様に `download` 属性が設定されている場合もデフォルト動作となるようにしています。

```js
if (download) return;
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2500

次に `http:` または `https:` 以外のプロトコル（`mailto:`、`tel:` など）のリンクは、インターセプトせずにブラウザのデフォルト動作に任せます。

```js
if (
  !is_svg_a_element &&
  url.protocol !== location.protocol &&
  !(url.protocol === 'https:' || url.protocol === 'http:')
)
  return;
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2493-L2498

外部リンクまたは `data-sveltekit-reload` 属性が設定されている場合、`beforeNavigate` コールバックを実行した後、ブラウザのデフォルト動作になります。

```js
if (external || (options.reload && (!same_pathname || !hash))) {
  if (_before_navigate({ url, type: 'link', event })) {
    // set `navigating` to `true` to prevent `beforeNavigate` callbacks
    // being called when the page unloads
    is_navigating = true;
  } else {
    event.preventDefault();
  }

  return;
}
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2506-L2516


同じpathnameでハッシュのみが異なる場合は、特別な処理が行われます。既に同じハッシュにいる場合は、要素へのスクロールのみを実行します。

```js
if (hash !== undefined && same_pathname) {
  // If we are trying to navigate to the same hash, we should only
  // attempt to scroll to that element and avoid any history changes.
  // Otherwise, this can cause Firefox to incorrectly assign a null
  // history state value without any signal that we can detect.
  const [, current_hash] = current.url.href.split('#');
  if (current_hash === hash) {
    event.preventDefault();

    // We're already on /# and click on a link that goes to /#, or we're on
    // /#top and click on a link that goes to /#top. In those cases just go to
    // the top of the page, and avoid a history change.
    if (hash === '' || (hash === 'top' && a.ownerDocument.getElementById('top') === null)) {
      scrollTo({ top: 0 });
    } else {
      const element = a.ownerDocument.getElementById(decodeURIComponent(hash));
      if (element) {
        element.scrollIntoView();
        element.focus();
      }
    }

    return;
  }
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2521-L2544


最終的に `event.preventDefault()` が呼ばれ、ブラウザのデフォルトのページ遷移が防止されます。

```js
event.preventDefault();
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2559

その後、`requestAnimationFrame` と `setTimeout` を使用してブラウザの再描画を待ってから、SvelteKitの `navigate` 関数が呼び出されてクライアントサイドナビゲーションが実行されます。
`requestAnimationFrame` と `setTimeout` の組み合わせは、Core Web VitalsのInteraction to Next Paint（INP）スコアのペナルティを防ぐために、ブラウザが再描画する前にナビゲーションを開始することを保証するための処理です。

```js
await new Promise((fulfil) => {
  requestAnimationFrame(() => {
    setTimeout(fulfil, 0);
  });

  setTimeout(fulfil, 100); // fallback for edge case where rAF doesn't fire because e.g. tab was backgrounded
});

await navigate({
  type: 'link',
  url,
  keepfocus: options.keepfocus,
  noscroll: options.noscroll,
  replace_state: options.replace_state ?? url.href === location.href,
  event
});
```

https://github.com/sveltejs/kit/blob/85a57a03160ab68dc45da6acd57ac8670d7b1d26/packages/kit/src/runtime/client/client.js#L2563-L2578

# Navigation APIのインターセプト処理について

SvelteKit内でのリンクのインターセプト処理を見ましたが、この処理部分はNavigation APIのインターセプト処理を使うことで簡略化できそうです。

Naviation APIについてを簡単に紹介すると、Histroy API処理をより現代のフロントエンド開発に適合させた後継のWeb APIです。ChromeとEdgeはすでにサポートされており、Safariは26.2よりサポート、Firefoxは来年1月以降にサポートが予定されております。

Navigation APIの `NavigateEvent` に `intecept()` というメソッドがあり、これを使用してインターセプト処理が実装できます。以下はHTML Living Standardにある[サンプルコード](https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-navigateevent-intercept-dev:~:text=The%20NavigateEvent%27s%20intercept()%20method%20allows%20intercepting%20a%20navigation%20and%20converting%20it%20into%20a%20same%2Ddocument%20navigation%3A)です。

```js
navigation.addEventListener("navigate", e => {
  // 一部のナビゲーション（例: クロスオリジン遷移）はインターセプトできない。
  // その場合はブラウザに通常どおり処理（遷移）させる。
  if (!e.canIntercept) {
    return;
  }

  // 同様に、フラグメント遷移やダウンロードも中断しない。
  if (e.hashChange || e.downloadRequest !== null) {
    return;
  }

  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/articles/")) {
    e.intercept({
      async handler() {
        // URLはすでに変更されているため、
        // 新しいコンテンツを取得する間はプレースホルダー（スピナーUIなど）を表示する。
        renderArticlePagePlaceholder();

        // 新しいコンテンツを取得し、準備ができたら表示する。
        // signalは読み取り専用のAbortSignalで、遷移キャンセル時にfetch処理を中断できる
        const articleContent = await getArticleContent(url.pathname, { signal: e.signal });
        renderArticlePage(articleContent);
      }
    });
  }
});
```

リンククリック処理をインターセプトせずとも、Navigation APIの `intecept` メソッドよりSvelteKitの `navigate` 関数を渡すことで簡略化できるかもしれません（詳細な内部実装までは追えてないのであくまで想像です）。

参考までにHistory APIで実装したクライアントサイドルーティングとNavigation APIのクライアントサイドルーティングのサンプルページがあるので実装内容を比較してみてください。

- [History APIで実装したクライアントサイドルーティング](https://codepen.io/yamanoku/pen/JoXepMb)
- [Navigation APIで実装したクライアントサイドルーティング](https://codepen.io/yamanoku/pen/dPMEvOV)

来年より本格的にクロスブラウザ対応となるNavigation APIですが、SvelteKit以外でも様々なルーティングライブラリに影響を与えてくれると思っています。来年以降でのNavigation APIの活用が広がっていくのが楽しみです。

Navigation APIについての仕様や動向は引き続き[ひとりNavigation API Advent Calendar](https://qiita.com/advent-calendar/2025/navigation-api)で追っていきたいと思っております。興味ある方は是非ご覧になってみてください。

## 謝辞

本記事は、DeepWikiによるリポジトリ内要約を協力してもらい作成されました。感謝申し上げます。
