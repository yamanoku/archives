---
title: Media Queries でコンテンツ隠すのやめたい
description: Media Queries でコンテンツ隠すのやめたい
date: 2016-06-23
author: yamanoku
---

よく Media Queries のブレークポイントで PC 時と SP 時でリンク先ほかコンテンツを、出したり出さなかったりする制御をしたりするんだけどあれって本当にいいのかという話。そんなことあり得るのかお前とお思いでしょうがまあ聞いてください。

以下例えばですけど、

```css
@media screen and (min-width: 641px) {
  // PC〜TAB時のとき表示
  .pc_hoge {
    display: inline;
  }
  // SP時は非表示
  .sp_hoge {
    display: none;
  }
}
@media screen and (max-width: 640px) {
  // PC〜TAB時は非表示
  .pc_hoge {
    display: none;
  }
  // SP時のとき表示
  .sp_hoge {
    display: inline;
  }
}
```

```html
<a href="http://xxxxxxxx" class="pc_hoge">PCのみ表示</a>
<a href="http://yyyyyyyy" class="sp_hoge">SPのみ表示</a>
```

こんな感じで a タグにクラス付けて表示・非表示するみたいな感じでやると思うけど、コレに関しての疑問。疑問というか個人的な感覚。

## レスポンシブとして考えるとイカン気はする

レスポンシブ、基本１ソースなので PC と SP のソースが混同してしまうってのは良くない気がする。理由としては

- ブレークポイントで調整しても多様なデバイスに対応しきれない
- TAB 時の値が割と曖昧
- PC でスマホ幅に縮めた時に SP 時のためのリンクが表示されてしまう

こんな感じ。

正直別ソースで作れれば問題はないし、そもそも飛び先リンクが自動で切り替わるように調整しろよって話なんですけど、今回は別ソースにできずレスポンシブサイトを作る方面で且つリンク飛び先は何もしないという状況と仮定します。

こういう対応は、一時的な対応としてはアリだけど、上述の理由を考慮すると正しい方法ではないよなと感じます。というか RWD の対応じゃ限界を感じる。

## ユーザーエージェント判定してみる

js ではユーザーエージェントを判定してそれぞれの処理を振り分けるなどのことが出来ます。なので例えば

```js
// ユーザーエージェント判定の部分は省きます
var link = document.getElementById('ua');
if (ua.isPc) {
  // PC時のリンク先
  link.href = 'http://xxxxxxxx/';
} else if (ua.isTablet) {
  // TAB時のリンク先
  link.href = 'http://yyyyyyyy/';
} else if (ua.isSp) {
  // SP時のリンク先
  link.href = 'http://zzzzzzzz/';
}
```

みたいな感じで id 指定してリンク先を動的に変更するやり方。組み込むソース上には影響ないけどこのために id やら UA 判定やら js やら打つのかという問題もあります。仕方ないんですけど。

また、動的に html 出力するのも同様の棲み分けが出来そうです（WordPress の`isMobile`みたいなやつ）

## 結局どうしたいの

RWD の意味が無いからこういう対応するのやめたいし、やめてほしい。
