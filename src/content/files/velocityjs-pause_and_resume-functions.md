---
title: Velocity.js 一時停止・再生機能について
decription: jQuery Velocity JavaScript アニメーション
date: 2017-06-21
author: yamanoku
---

![Velocity.js](https://i.gyazo.com/e4ff99807a7e6917ee9f5dfa0be8f5fc.png)

Velocity.js、アニメーションさせる際には[CSS で動かすよりも圧倒的パフォーマンス](https://davidwalsh.name/css-js-animation)を出すことで非常に便利なのですが、とある機能の日本語情報が見受けられなかったのでここに記載します！

## 一時停止 → 再生機能

stop()メソッドはあるのですが、いわゆる「一時停止 → 再生」するもののドキュメント情報が[公式サイト](http://velocityjs.org/)がありませんでした（しかも stop()だと完全停止しちゃう）。

Github の Issue で「一時停止・再生機能つけてくれ頼む」という話はあったのですが、[肝心の作者がやる気を喪失](https://github.com/julianshapiro/velocity/issues/14#issuecomment-56395478)していたので、本人からの実装には期待が０になり、以下のようなテクニカルであまり汎用的ではない方法で一時停止・再生する機能をつけるようにやっていました。

<p data-height="230" data-theme-id="0" data-slug-hash="ykIzw" data-default-tab="result" data-user="wlindner" data-embed-version="2" data-pen-title="Velocity.js - Pause/Resume animation" class="codepen">See the Pen <a href="https://codepen.io/wlindner/pen/ykIzw/">Velocity.js - Pause/Resume animation</a> by William Lindner (<a href="https://codepen.io/wlindner">@wlindner</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

[https://codepen.io/wlindner/pen/ykIzw](https://codepen.io/wlindner/pen/ykIzw)

google 日本語検索でもそれに関する記事は見受けられませんでした。

しかし、１人の Contributior の活躍により [2016 年 11 月に一時停止・再生機能が実装されました](https://github.com/julianshapiro/velocity/pull/718)。

## 実装例

```js
$(function () {
  $('.hover').velocity(
    {
      scale: [1, 0.6],
    },
    {
      duration: 1500,
      complete: function () {
        $(this).velocity(
          {
            scale: [0.6, 1],
          },
          {
            duration: 1500,
            loop: true,
          }
        );
      },
    }
  );
  $('.hover').hover(
    function () {
      $(this).velocity('pause');
    },
    function () {
      $(this).velocity('resume');
    }
  );
});
```

## デモ

[https://jsfiddle.net/g09jkr80/1/](https://jsfiddle.net/g09jkr80/1/)

![demo](https://i.gyazo.com/cc2cc731deccdd699f8f16437702945f.gif)

## 得られた教訓

**公式ドキュメント、アップデート情報はちゃんと調べてちゃんと読もう！！！！！**

以上学びでした。

## 余談ですが React 用の velocity.js プラグインがあります

[https://github.com/twitter-fabric/velocity-react](https://github.com/twitter-fabric/velocity-react)

おっきなとこが管理してるので安心 ☺
