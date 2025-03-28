---
title: よく分かってなくてもVue.jsで動くモノが作れた話
description: Vue.js 初心者 JavaScript
date: 2016-12-09
author: yamanoku
source: qiita.com
---

この記事は、[Vue.js Advent Calender 2016](http://qiita.com/advent-calendar/2016/vue) 9 日目の記事です。

（アドベントカレンダーには）初投稿です。何卒よろしくお願いします。

## これを書いてるひとのスペック

マークアップエンジニアとフロントエンドエンジニアの境目を行ったり来たりしています。
あまりフレームワークの理解がそれほどないので地味にフルスタック気味で JS 書いたりしています。最近はどっちかというとディレクションとか進行の方に首突っ込んでいます。

## 発端

フレームワークをそろそろ何か触ってみないといかんとは思っており、社内のとあるプロジェクトで React を使ってはいましたが大規模だったのと、どうやら暖かそうだったのもあり、そこまで敷居が高くなさそうな別のものはないかと探した所、Vue.js と巡り会いました。

## 開発環境を整える

Vue.js はサンプルコードで見るからに簡単に使えるウリではあるのですが、これを使ってちゃんとサーバーにアップして確認できるものをビルドできるようにしたいと思いました。

自分はまだバベったりするのとかビルドさせるのに全然慣れてないのでいろんなチュートリアルを見てもうまく活かしきれてませんでした。

そんな中１から Vue.js を使うのではなく、[vue-cli](https://github.com/vuejs/vue-cli)と出会ったことで自分は形にできるところまで進められました。ありがとう[vue-cli](https://github.com/vuejs/vue-cli)。

なので初めて Vue.js を触る人は vue-cli を使いましょう。

### vue-cli

自分よりも分かりやすくご解説されている方のがあるのでこちらご確認ください。

[Vue.js を vue-cli を使ってシンプルにはじめてみる](http://qiita.com/567000/items/dde495d6a8ad1c25fa43)

つまりは Compoment として html と js と css が一括で扱えるのがとても分かりやすくて良いということです（自分基準）。あと webpack か browserify をガッチリしたのかシンプルなのかを選べるのも良いかもです。

### バージョンに関して

vue-cli でいろいろやろうとしていた所だったんですが、Vue.js 2.0 の正式リリース前だったのもあり、ひとまず 1.0 でやったほうがいいかなということで実は 1.0 で作っています。
しかしながら今は 2.0 が主流と化したようです。正直途中で直す勇気がありませんでした。ごめんなさい。

## やりたいこと

一応やりたいことは考えており、自サイトをそろそろドメイン新しくしてリニューアルしたいなという気持ちが高まっていたのでこういうのはどうだろうと考えた。

- [ ] 成果物を一覧で表示しよう
- [ ] ページはコンポーネントで１つ１つ作るんじゃなくて json とかから拾ってきて表示したい
- [ ] データバインディングできるみたいなので検索窓つけたい
- [ ] あとルーター使いたい
- [ ] できればウザくない程度にトランジション効果もつけたい

よく分かってないところもあったので苦労しましたが、なんとかこれを形にできました。個人的には json のところがしんどかったです。

## 成果物

こんなんになりました。以下よりご確認ください。

- [デモページ](https://yamanoku.github.io/vue_portfolio_templete/)
- [GitHub](https://github.com/yamanoku/vue_portfolio_templete)

結局こういうのって SPA と呼べるんでしょうか？　なんとなく違う気はします。

## 個人的にアレコレしたこと

ソースは GitHub に置いてますので確認していただければですが、一応アレコレした部分も軽く紹介です。

### router 設定

```js
router.map({
  '/home': {
    component: Timeline,
  },
  '/work/:number/detail': {
    component: Detail,
  },
  '/profile': {
    component: Profile,
  },
  '*': {
    component: NotFound,
  },
});
router.redirect({
  '/': '/home',
});
```

404 を出させたかったが色々と苦労した。最初は:number 部分を出していたから、どんなものでも受け入れてしまってました。うまくやれるやり方もあるんだろうけどこの形で落ち着きました。

### 詳細部分

```html
<template>
  <article transition="fade" v-cloak>
    <template v-for="list in lists">
      <div
        class="detail"
        v-if="$route.path === '/work/' + list.id + '/detail'"
        :style="{ backgroundImage: 'url('+ list.image +')' }"
      >
        <h2 class="detail_heading">
          No.{{list.id}} - {{list.title}}
          <span class="detail_type">{{list.type}}</span>
        </h2>
        <p>{{list.desc}}</p>
        <a href="{{list.url}}" target="_blank">{{list.url}}</a>
      </div>
    </template>
    <a class="detail_btn" v-link="{ path: '/home' }">Back Home</a>
  </article>
</template>

<script>
  import jsonData from './data/list.json';
  export default {
    data() {
      return {
        lists: jsonData,
      };
    },
  };
</script>
```

最初 v-for の回し方をどこにするか考えてて結局 templete の中で書くことに成功したのだがこれでいいのかと自問自答しました。結局よい返し方が思い浮かばなかったのでここに落ち着いてます。

### 検索部分＋メイン部分

```html
<template>
  <section class="main" transition="main" v-cloak>
    <div class="textfield">
      <input
        class="textfield_input"
        type="text"
        placeholder="Search Words..."
        v-model="filterKey"
      />
    </div>
    <p class="logo">
      <a v-link="{ path: '/profile' }"
        ><img src="/images/icon_beta.png" alt=""
      /></a>
    </p>
    <div class="container">
      <div class="card" v-for="list in filterItems | filterBy filterKey">
        <a
          v-show="filterItems.length"
          v-link="'/work/' + list.id + '/detail'"
          :class="'card_img'+ list.id + ' card_img'"
        >
          <img :src="list.image" :alt="list.title" />
        </a>
        <div class="card_detail">
          <a v-link="'/work/' + list.id + '/detail'" class="filetype"
            >[{{ list.type }}]</a
          >
        </div>
      </div>
    </div>
    <h2 class="no-result" v-show="!filterItems.length">
      <span>No results.</span><br />
      <span>\(^Д^)/</span>
    </h2>
  </section>
</template>
<script>
  let filterKey;
  import imagesData from './data/list.json';
  export default {
    data() {
      return {
        filterKey: '',
        lists: imagesData,
      };
    },
    computed: {
      filterItems: function () {
        return this.$eval('lists | filterBy filterKey');
      },
    },
  };
</script>
```

検索ヒットしなかった場合も下の方で書いています。絵文字なのは Google fonts のパクリです。

ただ、検索に関しては json データの文字列を全部もってくるみたいなので、/images/〜みたいに書いてると全部ヒットしちゃう。この辺もよい回避を探らなければならなそう。
（すみません間に合いませんでした。配列でヒットしたい部分だけ filter とか使うんですかね）。

## Vue.js のよかったところ

Vue.js のよいところは[とにかく公式で日本語ドキュメントがしっかりとしてある](https://jp.vuejs.org/v2/guide/)ということで、これは単にお前の英語力が足りてないだけだろというだけの話ではありますが、ともかく安心感がありました。良さ。

Vue.js 紹介記事とかを見ていると割と簡単な実装をするものには使えるようで、コンポーネント単位で作れるというのも自分にはやりやすかったです。
対応もモダンブラウザのみという先進性も良いです（IE9 どころか IE11 ももういらない）。
それと ScopedCSS もできるのでそのコンポーネント内だけで管理できるので ECSS 的な CSS 設計としてはよいなーとも。→ [感想記事](./i-think-scoped-css)

## Vue.js の悪かったところ

2.0 リリースに伴い router もバージョンアップをして、公式日本語ドキュメントが一時的に消えたことですかね。絶望感がすごかったです。

あとこれは別に悪いところじゃないんですけど、GitHub でサンプルコードとか検索していると中国人の方が多かった印象です（作者の方も中国出身だから？）

## フレームワークを使ってみて

ひとまずこうした感じで形になるものを作ることが出来たのですが、出来上がったものをみると「これ Vue.js 使う意味あったのか…」と思うような出来で、結局はまともなサービスを作っていない人間にまともなものは作れないという学びはありました。

とはいえ、現状のものよりもだいぶマシになるであろうレイアウトが天啓として頭に落ちてきたので、引き続き作ってみようということにはなっています。今度は 2.0 で作ってみます。できたらまた何かしら書いてみます。

あとホント恥ずかしい話ですが未だに Flux とか Vuex について理解が乏しいです。この辺も作りながら理解していければと思っています。それと ES6 も。

## おわりに

よく分かってなくても動くものが作れることに感銘を受けていたわけですが、何だかんだでここに至るまで色々な技術記事を拝見しました。先人の方々、ありがとうございます。

他の方々と比べて参考にならない記事ではありますが、一歩踏み出せない方たちに少しでも響けばいいかなと思っております。ともかく動けるものを触る・作るってのは大事ですね。
ここまでご覧いただきありがとうございました。

## 参考文献

- [https://jp.vuejs.org/v2/guide/forms.html](https://jp.vuejs.org/v2/guide/forms.html)
- [http://vegibit.com/vue-js-tutorial/](http://vegibit.com/vue-js-tutorial/)
- [http://engineer.recruit-lifestyle.co.jp/techblog/2016-09-15-try-vue-flux/](http://engineer.recruit-lifestyle.co.jp/techblog/2016-09-15-try-vue-flux/)
- [http://qiita.com/hosomichi/items/25041c1d46452de84aa6](http://qiita.com/hosomichi/items/25041c1d46452de84aa6)
- [http://qiita.com/hosomichi/items/e37c47d3f22e5738eb84](http://qiita.com/hosomichi/items/e37c47d3f22e5738eb84)
