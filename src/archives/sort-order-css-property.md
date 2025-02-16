---
title: CSSのプロパティ記述順についてどうするかの話
description: CSS CSS設計 css-comb
date: 2016-07-01
author: yamanoku
source: yamanoku.hatenablog.com
---

## 記述順どうしてますか？

会社ではルールを覚える前にアルファベット順で記載したらどうかという提案があり、[Google の書式ルール](https://google.github.io/styleguide/htmlcssguide.html#Declaration_Order)ではそれらしい。

確かに複数人との作業では確実性のある法則性なんですが、個人的には position のための top, bottom, left, right や、width や height などの本来関連する項目がアルファベット順で離れてしまってるのはかなり気持ち悪い気がしています。気のせいでしょうか。

```css
.hogehoge{
  bottom: 0
  height: 50px
  left: 0
  margin: auto
  position: absolute
  right: 0
  top: 0
  width: 100px
}
```

ちなみにプロパティのアルファベット順番は以下のとおりなんですって奥さん。
[http://ebisu.com/note/css3/#support](http://ebisu.com/note/css3/#support)

## なんとか他のプロパティ記述順ないんかな

調べてみたら Mozilla とか W3C で使っていた CSS ガイドラインで良さ気なのがあった。

引用：[http://unitopi.com/css-order/:title](http://unitopi.com/css-order/)

これは視覚的な要素に充てられるイメージなので自分としては管理やりやすい。
参考：[CSS プロパティ記述順序](http://qiita.com/devmgn/items/6154ccd2e23b2e65c769)

[サイバーエージェント](https://www.cyberagent.co.jp/techinfo/techreport/report/id=7926#section20)も似たような感じ。順番までは明確に書いてないけど

## どのようなのがいいのか。結局元に戻る。

デメリットとしてはやはりこの順序を頭に叩きこまなければいかないので初期はどうしても時間がかかりそうってのが一番かな。

でも英語に馴染みのない人（プログラミングしててそれは使うべきではない言葉なので修正してくださいかもだけど）はアルファベット順を一度考えながら「D の次は E だから」とか「bottom だから left より上に記述せんと」と動きが止まっちゃうのも気になる。そもそもアルファベット順でやったことない人だって結局慣れの問題になるしそこまで大きく変わらん気はする。ということで元に戻ってしまった。

## CSScomb を使用してみる

色々と悩んでみた中で、自分で記述順を悩むなんてアホくさいと思ったので**機械に全部処理してもらう**ということになりました。というわけで以下をインストール。

```
npm install csscomb --save-dev
```

## CSScomb ってどのようなものなの

[CSScomb](http://csscomb.com/)は css のプロパティの整形をしてくれるプラグインで、[sublimeText](https://github.com/csscomb/sublime-csscomb)にもパッケージがあります。整形は[pleeease](https://github.com/danielhusar/gulp-pleeease)でもできそうな気がしたけど、思っているプロパティ整理はなさそうなので有用そうなものを使用してみました。

**以下は gulp を使っているので他の記述とは異なる箇所もあるのでご了承ください。**

### gulpfile.js

```js
var conf = require('./config.json');
var gulp = require('gulp');
var comb = require('gulp-csscomb');

gulp.task('style', function () {
  gulp
    .src(conf.PATH.css)
    .pipe(csscomb())
    .pipe(gulp.dest('./src' + conf.URL + 'css'));
});

// 僕の環境ではこんな感じ
gulp.task('stylus', function () {
  gulp
    .src(conf.PATH.stylus)
    .pipe($.plumber())
    .pipe(
      $.stylus({
        use: function (style) {
          for (key in conf) {
            style.define(key, conf[key]);
          }
        },
      }),
    )
    .pipe(
      $.pleeease({
        autoprefixer: ['last 2 versions', 'iOS >= 8', 'Android >= 4'],
        rem: false,
        mqpacker: true,
        minifier: false,
      }),
    )
    .pipe(comb())
    .pipe(gulp.dest('./src' + conf.URL + 'css'));
});
```

### config.json

```json
{
  "TITLE": "test",
  "URL": "/",
  "hostname": "localhost",
  "PATH": {
    "css": ["css/**/*.css", "!css/_**/*.css"],
    "stylus": ["stylus/**/*.styl", "!stylus/_**/*.styl"]
  }
}
```

出力先の dest とか PATH 設定とかは各自ご自由に。comb()追加するだけでやってくれます。

## 整形の設定を変えたい

gulp を走らせて、保存すれば自動的に comb してくれます。

いわゆるデフォルトのソート順であったり、それぞれのプロパティの関連順に整列して 1 段空きがあったりなど、整形はしてくれたけど見た感じは微妙な感じかもしれません。また、このデフォルトの記述欄整形では他の人との連携でルールが明確で無いのでやりづらいのでこのままでは求めている記述順の正攻法にはなりません。

なので CSScomb の設定（config）をいじります。以下にアクセスどうぞ。

[http://csscomb.com/config](http://csscomb.com/config)

ここではどのような整形ルールにするかを設定できます。やってほしい ruleset を選んで順々に進めていきます（計 24 個）

```json
{
  // プロパティが空のルールセットは削除
  "remove-empty-rulesets": true,
  // 最後のプロパティも含めてセミコロンを常に付ける
  "always-semicolon": true,
  // カラーコードを小文字にする
  "color-case": "lower",
  // インデントはタブ
  "block-indent": "\t",
  // 省略可能なカラーコードでも全部記載する
  "color-shorthand": false,
  // セレクター・要素は小文字にする
  "element-case": "lower",
  // ファイルの終端には改行する
  "eof-newline": true,
  // 小数点以下の指定時、0.1vhのように「0」を残す
  "leading-zero": true,
  // クオートはシングル指定
  "quotes": "single",
  // アルファベット順に整列
  "sort-order-fallback": "abc",
  // コロンの前にはスペースを入れる
  "space-before-colon": " ",
  // コロンの後にはスペースを入れる
  "space-after-colon": " ",
  // 子セレクタ・隣接セレクタ時の記号前にはスペースを入れる
  "space-before-combinator": " ",
  // 子セレクタ・隣接セレクタ時の記号後にはスペースを入れる
  "space-after-combinator": " ",
  // プロパティ指定が複数ある時は改行する
  "space-between-declarations": "\n",
  // 囲み部分の最初（｛）はセレクターのあと改行するようにする
  "space-before-opening-brace": "\n",
  // 最初のプロパティ指定は改行する
  "space-after-opening-brace": "\n",
  // 複数セレクターがある時は改行していく
  "space-after-selector-delimiter": "\n",
  // 複数セレクターの記号前にはスペースを入れる
  "space-before-selector-delimiter": " ",
  // 囲み部分の最後（}）は改行するようにする
  "space-before-closing-brace": "\n",
  // 囲み部分の最後に半角スペース１ついれる
  "strip-spaces": true,
  // タブサイズ指定時は以下自動設定される
  "tab-size": true,
  // 値が0のとき単位などは削除する
  "unitless-zero": true,
  // vendor-prefixは右揃えにする
  "vendor-prefix-align": true
}
```

すると設定をしてくれた json を吐き出すのでこれを **.csscomb.json** と命名して、gulpfile.js と同じ階層のディレクトリに保存します（もしくはプロジェクトのルートフォルダ）

アルファベット順の整形、ベンダープレフィックスの頭揃え、カラーコードは小文字で３文字省略できるものは省略するなどでいじりました。

ちなみに自分で設定した.csscomb.json はこんな感じです。ご参考までにどうぞ。

```json
{
  "remove-empty-rulesets": true,
  "always-semicolon": true,
  "color-case": "lower",
  "block-indent": "\t",
  "color-shorthand": true,
  "element-case": "lower",
  "eof-newline": false,
  "leading-zero": false,
  "quotes": "double",
  "sort-order-fallback": "abc",
  "sort-order": ["..."],
  "space-before-colon": "",
  "space-after-colon": " ",
  "space-before-combinator": " ",
  "space-after-combinator": " ",
  "space-between-declarations": "\n",
  "space-before-opening-brace": " ",
  "space-after-opening-brace": "\n",
  "space-after-selector-delimiter": " ",
  "space-before-selector-delimiter": "",
  "space-before-closing-brace": "\n",
  "tab-size": true
}
```

これで css だけを弄る人でも config のルールをガイドラインにしておけば、混乱はないんじゃないのかなと思います。テンプレートと素の css との併合とか考えだすとめんどくさくなるのでひとまずこれでいきましょう。

## その他

### sort-order 機能について

もしアルファベット順ではなく独自の記述順がある際は **sort-order** で設定できたりします。なんかより分かりづらくなりそうですが。

```json
"sort-order": [
	[
	"font",
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"font-variant",
	"font-size-adjust",
	"font-stretch",
	"font-effect",
	"font-emphasize",
	"font-emphasize-position",
	"font-emphasize-style",
	"font-smooth",
	"line-height"
	]
]
```

### アルファベット順と autoprefixer との弊害について

以下のような場合は気をつけてください。

```css
.hoge {
  display: flex;
  display: -moz-box;
  display: -webkit-box;
}
```

アルファベット順に整理するようにすると WebKit 系ブラウザで flex で指定したはずなのに後半の-webkit-box が活きて flex レイアウトがうまくいかない場合がある。

その場合は sort-order 機能でアルファベット順に揃えたくないものを設定すると外れます。

```json
"sort-order": [
    "display"
]
```

```css
.hoge {
  display: -webkit-box;
  display: -moz-box;
  display: flex;
}
```

### オンライン上での動作確認（.csscomb.json デフォルト設定）

以下にアクセスして整形したいプロパティを入れて comb ボタンを押してください。
http://csscomb.com/online

![csscomb online](https://i.gyazo.com/29bd23845de49831e1bb29fd968c9cc7.gif)

割とスッキリできたので皆様もご参考にどうぞ。ちなみに僕はこの提案を社内で熱く語ってこの管理方法でやっていくこととなりました。

## 俺たちのプロパティ記述順道ははじまったばかり

とはいえ本当にこれでいいのかとぶち当たる日がいつか来るかもしれないので、そうならないためにも日々よい記述順をこだわってゆきます。俺の記述順はこんな感じだぜ！みたいなのあったら是非とも教えて下さいませ。こちらからは以上です。

## 参考にさせていただいた方々

- [gulp-csscomb で任意のプロパティ記述順序を設定する](http://qiita.com/naoyashiga/items/bce4ad2fbc3cbeeff1d1)
- [gulp-csscomb（CSS のプロパティを並び替えてくれるプラグイン）の整形フォーマットを自分好みに変更する。](http://blog.sakurachiro.com/2015/07/gulp-csscomb/)
- [gulp で幸せにマークアップする](http://katoken.hatenadiary.jp/entry/2015/05/02/172537)
