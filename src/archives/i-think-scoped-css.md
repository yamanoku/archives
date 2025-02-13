---
title: ScopedCSSを使って思ったこと
description: ScopedCSSを使って思ったことについて
date: 2016-11-14
author: yamanoku
source: yamanoku.hatenablog.com
---

[Scoped CSS | Vue Loader](https://vue-loader.vuejs.org/guide/scoped-css.html)

今個人的に Vue.js を使ってアレコレ試してて Vue コンポーネントを使うために Vue-loader を導入しており、中で templete と style と script を一気に記述できるんだけど、style で使える scoped-css て[ECSS](http://ecss.io/)の設計思想にうまく合いそうだなと思う。

理由としては１つのコンポーネントに対して、必ず独自のクラス付けをして他のコンポーネントには上書きが起きないようにするみたいな考え方なので。

ECSS、とにかく長生きさせるためには誇大化してもしょうがないみたいなスタンスだけど、webpack とかで js 内に全部ひとまとめに出来たりするのがあれば、その辺についても深く考えなくてもいいかもしれないとか浅はかながらに思っています。

今は Vue-loader 使ってるけど PostCSS とかで使ってみてもいいかもしれない（こっちはやったことないので憶測で言ってます）

[https://www.npmjs.com/package/postcss-scoped](https://www.npmjs.com/package/postcss-scoped)

## 実例

```html
<style>
  /* 共通のスタイル */
</style>

<style scoped>
  /* 特定のコンポーネント用スタイル */
</style>
```

## ビルド後のイメージ

```html
<style scoped>
  article {
    position: absolute;
    top: 0;
    left: 0
    width: 100%;
    height: 100%;
    backg round-color: #efefef;
  }
  .detail {
    height: 100%;
    margin: auto;
    padding: 30px 5% 0;
    background-size: cover;
    background-position: center center;
  }
  .detail+a {
    text-align: center;
  }
  .detail_heading {
    background: #fff;
    color: #333;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 50px;
    padding: .5em .75em;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom: 1px solid #f0f0f0;
    box-shadow: 0 1px 1px rgba(0,0,0,.35);
  }
</style>
```

これをビルドすると

[![Image from Gyazo](https://i.gyazo.com/a72042dcd05dfb09e4b085f427e1cf95.png)](https://gyazo.com/a72042dcd05dfb09e4b085f427e1cf95)

こんな感じになる。Vue なんで IE とかは厳しいのかと思います（IE 無視していいなら別に大丈夫かと）
