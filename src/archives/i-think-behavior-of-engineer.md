---
title: エンジニア立ち居振舞い：誰がどう触っても良いようにつくる
description: エンジニア立ち居振舞いに関する記事
date: 2016-11-19
author: yamanoku
source: yamanoku.hatenablog.com
---

[お題「エンジニア立ち居振舞い」](http://blog.hatena.ne.jp/-/odai/10328749687193803821)

マークアップなのかフロントエンドなのかいまいち良く分からない位置付けに居ますが、自分の中で大事にしていることについて。

タイトルの通りなんですが簡単な例でいくと、jQuery でトグルボタンを実装する時に

```js
$('#button').on('click', function () {
  $(this).next().slideToggle();
});
```

という風になると思う。でもこれには問題があって、ボタンを何度もクリックすると律儀なまでにトグルする動作が押された回数分繰り返されるのでボタンを押すのを止めても動作し続けてしまう。

なので以下のように対応する。

```js
$('#button').on('click', function () {
  $(this).next().stop().slideToggle();
});
```

これは stop()メソッドを使用することでトグルしようとする動作を一度ストップさせるので、押す → トグル動作の間にボタンを押してもその動作をキャンセルして次の動作へ移行させることができる。

動作イメージは以下よりどうぞ。

[https://jsfiddle.net/ft21p1cy/2/](https://jsfiddle.net/ft21p1cy/2/)

これは非常に単純な例ですが、<b>ユーザーはどういった操作をするかはエンジニアには検討が全くつかない</b>。我々は「１回クリックする」だけのことを考えますが、間違って２回クリックしてしまうとその人は「何だこれは」という風になってしまいます。たった１つのメソッドを追加するでだいぶ使いやすくなるのに、そういったことに気がつけないというのが一番怖い部分です。

だからどんな人がどのようなシチュエーションで弄ったとしても<b>「出来る限り」</b>平等なユーザー体験をもたらさなければならない、というのが私たちの使命なのだと感じています。

こちらからは以上です。
