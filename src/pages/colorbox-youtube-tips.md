---
title: colorbox - iframeでYoutube使う時の諸注意
description: colorboxでYoutube使う時の諸注意について
date: 2016-03-23
author: yamanoku
layout: '../layouts/ArchivesPost.astro'
---

## 経緯

colorbox で YouTube 動画をモーダルギャラリーで見せるみたいな流れになった。

やり方は以下の感じ。

```html
<p>
  <a href="https://www.youtube.com/embed/00000000" class="colorBox">
    <img src="~~" alt="" />
  </a>
</p>
```

```js
// 事前にjquery.jsとcolorbox.js読み込んでおく
$('.colorBox').colorbox({
  rel: 'colorBox',
  iframe: true,
  width: 640,
  height: 480,
  fixed: true,
  top: '20%',
});
```

概ね順調に実装できてたけど Win7 の IE11 で動画が表示されてから「次へ」「前へ」「閉じる」ボタンが見えなくなった。おそらく被さってたためと思われる。

z-index で弄ってみたが効果なし。iframe の遅延読み込みでもまったく効果がなかったのでどうしたもんかと悩んでた。

## 解決策

iframe で表示させるのでその辺で調べてみたら以下の記事にぶち当たった。

[IE で埋込み YouTube が最前面に表示される - knowledge base](http://shinimae.hatenablog.com/entry/2016/01/08/184617)

どうやら読み込み先リンクに<b>「?wmode=transparent」</b>をつければ解決するとのこと（パラメータがすでに付いている場合は?を&へ変更する）

つまり上記の HTML を以下のように変更

```html
<p>
  <a
    href="https://www.youtube.com/embed/00000000?wmode=transparent"
    class="colorBox"
  >
    <img src="~~" alt="" />
  </a>
</p>
```

これで見れた。IE7~9 くらいの出来事かと思ってたけど普通に IE11 でも起こってたのでそういう問題でもなさそうだった。

変に疲れた。iframe でいい思い出まったくないので早く廃れて欲しい。こちらからは以上です。

[Colorbox - a jQuery lightbox](http://www.jacklmoore.com/colorbox/)
