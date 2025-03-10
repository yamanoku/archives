---
title: iOSでダブルタップしないとリンク反応しないバグ対応について
description: iOS JavaScript CSS
date: 2017-07-27
author: yamanoku
source: yamanoku.hatenablog.com
---

もともと iOS8 であったバグだが、8 以降でもこのバグが発生することがあるので備忘録。

## 問題点・原因

スマホ時のタップ判定は mouseover → click という順序を通過して行われる。
この部分でとある不具合が生じるのが **hover 時のスタイル設定**

```css
a:hover {
  opacity: 0.5; /* よくあるやつ */
}
```

上記のように hover 時に opacity をかけた要素は最初のタップ（mouseover）でそのスタイルが適応された後、次のタップ（click）でリンク機能が使える。
いわゆる２回タップが生じる。

※ background や color などではこのバグは発生しない。display 判定だと起こる模様 [^1]

## 解決策

### 01. media query、CSS 分け対策

```css
@media screen and (min-width: 640px) {
  a:hover {
    opaciry: 0.5;
  }
}
```

もしくは

```css
li > a {
  color: red;
}
li > a:hover {
  opaciry: 0.5;
}
```

```css
li > a {
  color: red;
}
```

つまりスマホレイアウト時ではこのスタイルを適用させない方法。

#### メリット

PC・スマホのサイトがそれぞれ分離していれば問題なし。

#### デメリット

レスポンシブサイトと断定的に使う場合この策は悪手。スマホやタブレットの解像度が疎らでどれに基準を置くか、PC 時にブラウザを縮めた際にこのスタイルは適応しないなどの説明が必要。

### 02. userAgent 対策

```js
var ua = navigator.userAgent;
if (/iPhone|iPad|iPod/.test(ua)) {
  $('body').addClass('ios');
}
```

```css
.a:hover {
  opacity: 0.7;
}
.ios .a:hover {
  opacity: 1;
}
```

下記でも可

```js
var ua = navigator.userAgent;
if (!/iPhone|iPad|iPod/.test(ua)) {
  $('a').each(function () {
    $(this).hover(
      function () {
        $(this).css('opacity', 0.7);
      },
      function () {
        $(this).css('opacity', 1.0);
      },
    );
  });
}
```

iOS のときのみスタイルを適用させない方法

#### メリット

iOS バグのみなので切り分けて考えられる。レスポンシブサイトでも問題なく使える。

#### デメリット

対応する箇所ごとにスタイルを追加しなければならないのでその分行数は増える。
またコメントやドキュメントにこのバグ対策したことを記載する必要あり。

```js
if (window.ontouchstart === null) {
  $('a').addClass('touch');
}
```

上記のようなタッチイベントがあるかどうかを判定してクラスを付与して制御するやり方もあるようです。

```css
a:hover {
  opacity: 0.75;
}
a.touch:hover {
  opacity: 1;
}
```

### 03. js による挙動制御 (タッチ挙動)

通常の場合

```js
$('a').on('touchstart', function () {
  var url = $(this).attr('href');
  location.href = url;
});
```

別窓の場合

```js
$('a').on('touchstart', function () {
  var url = $(this).attr('href');
  window.open(url, '_blank', 'width=800,height=600');
});
```

#### メリット

タッチデバイスのみに適応できる。CSS 管理とは分離ができる。

#### デメリット

タッチ挙動に関しての別のバグが起きないか注意。こちらもコメントやドキュメントなどで追記の必要あり。

### 所感

明確な棲み分けとしては**「02. userAgent 対策」**が妥当かと感じた。開発規模も大きくなく他 js との棲み分けも問題ないのであれば**「03. js による挙動制御 (タッチ挙動)」**でも良さそうだが、確実な手として比較すると怪しいかもしれない。

そもそもスマホ時にホバー（厳密にはタップ）時のアクションなどを予め除外しておくことのが重要そうだと思った。MaterialDesgin のような優れたタップイベントが分かる UI ならまだしも、**opacity をかけるだけのスタイルでユーザビリティが壊滅的になるならば**除外することが正解にも感じるなど。

### 参考記事

- [【スマホ最新情報】iPhone でバナーを押しても反応しなくなった理由とは？](https://www.turbine.co.jp/blog/20150911_ios)
- [WordPress での iOS 8.4.1 CSS:hover のタップバグ問題の解決方法](https://iwb.jp/wordpress-ios-8-4-1-css-hover-tap-bug/)
- [iOS 10.3.1 の Safari で CSS の:hover を 1 クリックカウントしてしまい 2 タップしないとリンク遷移しないのを jQuery で修正](http://epixion.com/2017/04/11/ios-10-css-hover-2-taps-bug/)
- [javascript で新規タブ/ウィンドウを作成する時の罠](http://qiita.com/yukiyukki/items/907d3173001c52df50c0)
- [クリックとタップを同時に指定したい場合【Javascript】](http://muumv.com/click-tap/)

[^1]: [http://qiita.com/hibikikudo/items/6703f11627ac0c55c796](http://qiita.com/hibikikudo/items/6703f11627ac0c55c796)
