---
title: PlayBackTech2017
description: 2017年に関わってきた技術に関する振り返り
date: 2017-12-01
author: yamanoku
source: blog.geek.co.jp
---

[![Image from Gyazo](https://i.gyazo.com/baf0bffa88a384d25b672d4f9cecaa62.jpg)](https://gyazo.com/baf0bffa88a384d25b672d4f9cecaa62)

## Velocity.js

- アニメーション案件で使用してみました。
- これまで CSS3 アニメーションなりで無理やり動かしていたところをぬるぬるアニメーションさせたい用に検討。[jQuery]と親和性があるのでバリバリ使えました。
- 公式がドキュメント更新してなかったので知らなかったけど調べたら`pause`と`resume`というのがあった。
  - [Velocity.js 一時停止・再生機能について https://qiita.com/yamanoku/items/23e56a428aaa4fad7040]
- 付随して、GPU]での処理（position 要素の廃止、transform の使用）、[will-change)の存在などパフォーマンスは出来る限り高められるような設定などもしました。

## ES5 => ES6 対応

- マークアップ案件とかだとなかなか Webpack もバベる機会もないので個人的に変換しつつ勉強しています。
  - https://lebab.io/
- 実際のコードをここで変換してみてどう置き換わるかなどの検証や勉強に使ってます。
- 個人リポジトリの JS も ES6 対応しつつあります。
  - https://github.com/yamanoku/birthday-countdown-js/releases/tag/v2.0.0
- jQuery とアロー関数は最悪の組み合わせとのことで、jQuery を捨てる１つの材料となりそう。
  - jQuery とアロー関数の微妙な関係 https://qiita.com/mogya/items/1d6a0eadc7e0f9d2982b)
  - [jQuery を使うときに安易にアロー関数を使ってはいけない(戒め)](http://www.pandanoir.info/entry/2017/11/04/190000)

## Docker + WordPress

[![Image from Gyazo](https://i.gyazo.com/69af6f1b89ec88b2af36e7988f45af44.jpg)](https://gyazo.com/69af6f1b89ec88b2af36e7988f45af44) [![Image from Gyazo](https://i.gyazo.com/2e2cbb5e6bc6f1531149f12f0d43c31d.png)](https://gyazo.com/2e2cbb5e6bc6f1531149f12f0d43c31d)

- 社内案件で Docker を使っていたので個人的にもなんか使えないかと画策。
- WordPress を動かすのがちょうどチュートリアルとして良さそうでした。
  - [docker-compose を使って WordPress テーマ開発環境を構築しよう](https://tech.recruit-mp.co.jp/infrastructure/post-11266/)
- docker-compose を覚えた。以下自作 WP テーマを公開してるリポジトリで使えます。
  - https://github.com/yamanoku/malachite
- 内製アプリで使えるようになるだろうか、色々試作してみたい（機会があるのか？）。

## Flexbox

- 去年よりもレイアウトのためにバリバリ使うようになりました。`clearfix`はそろそろ卒業。
- むしろ`clearfix`といった疑似要素があると`justify-content`のときに邪魔になる場合も…
  - 均等割付した折り返し Flexbox の最後の行
- `order`や`flex-grow`とか`flex-shrink`には地味にお世話になったかも。
- あと`column-reverse`とか。
- 来年は[Grid Layout]も考えていきたい。
  - [CSS Grid Layout – Can I use](https://caniuse.com/#feat=css-grid)
  - [これからの CSS は margin 禁止！？CSS グリッドレイアウトやコンポーネント指向な CSS について、矢倉さんに聞いてきた！](https://html5experts.jp/shumpei-shiraishi/24439/)

## Intersection Observer がもたらすスクロールイベントにおける革命

- いままでスクロールをさせてイベントを発火させていたところを、ウィンドウや要素・コンポーネント同士が交差するときを監視してイベント発火させるようなものに変更してみた感じです。
  - [Intersection Observer が良さそうなので試してみた](https://qiita.com/yamanoku/items/027308e23cfc69845d7e)
- inview.js ほか scroll イベント動作といった負荷がかかったり、管理が煩わしかった部分を解消してくれた気がします。
- polyfill でなんとかなってるので今後も積極的に対応していきたいです。
  - `<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>`

## きれいなマークアップ、WAI-ARIA、アクセシビリティについて

- 今年、個人的にはマークアップエンジニアとして、意識的に取り組んでみた内容かもしれない。
- `div`要素で作ったパンくずやナビゲーションには、`aria-*`属性付与するようにしてみた（ページのカレント状態など）
  - `<div aria-label="current page">カレントページ</div>`
  - https://www.w3.org/TR/wai-aria/
- 注釈ほか`role`要素、フォーカスのあたらない div 要素への`tabindex`の設定など、少しずつではありますがユーザビリティを蔑ろにせず、アクセシビリティもじんわりと改善しています。
- [Japan Accessibility Conference](https://japan-a11y-conf.com/)にも参加してきました。
- 結局のところ、WAI-ARIA に頼らずともちゃんとしたマークアップが出来ていればだいぶ機能的にかつアクセシビリティ面でも評価されるとのことなのでちゃんと書こうとなってます。
- HTML もデザイン通りの組みとしてよりかは「マシンリーダブル」らへんを意識して順番を変えるなどしてみました。

## TypeScript、Storybook

- 業務でやってみたいというエンジニアに合わせて体験してみた感じ。
  - https://www.typescriptlang.org/
- 正直な所「すごく便利」という認識まで個人的においつけなかったのが反省点。
- とはいえ型定義しておくことのメリット・重要性みたいなのは理解した。
  - とりあえず覚えたのは`any`で宣言しとけばなんとかなるということです（雑）
- Storybook も活かしきれるまでには至らず、また、React.js) v16 にて互換性がなかったため見送り。
  - 企業別 Storybook 集 => https://storybook.js.org/examples/
- 関係ないですけど、React16.2 からの Fragment 用の新しいシンタックスが出て`div`で括らなくなったのすごくいいですね

```jsx
render() {
    return (
        <>
              <h1>React v16.2 has been released!</h1>
              <h2>Introduces a new syntax for fragments!</h2>
              Thanks to all our collaborators!
        </>
    );
}
```

# PostCSS

[![Image from Gyazo](https://i.gyazo.com/2599c040c415d83db1ebc75e021bfd45.png)](https://gyazo.com/2599c040c415d83db1ebc75e021bfd45)

- 社内的には Stylus をこれまで使用していたが、更新があまりない（2~4 年前の）CSS プリプロセッサだったので、改めて一体どのようなオプションだけが必要なのか・PostCSS 自体も業務に導入すべきかなどあった上で自分の方で試してみた感じです。
- 感想としては css 単体で使うよりも sass や less などに付随させて必要なものを動かすのがてっとり早いという感じ。
- プリプロセッサのオプションじゃまかない切れないものを継ぎ足すイメージ。
  - https://github.com/luisrudge/postcss-flexbugs-fixes
  - これはすごくて感動しました。

## GitHub 開発、CircleCI、CodeClimate

- 社内で GitHub での開発がスタート。１案件＋社内ツールプロジェクトなどでジョイン中。
  - https://github.com/geekcojp
- メリットとしては GitHub 用のツールとの連携とかで、いままで backlog)のリポジトリ内管理だったので、いろんなことが出来ることが知れてよかった。
  - [backlog 上で案件・進捗管理をしていた自分が Github に触れてみた感想](http://yamanoku.hatenablog.com/entry/2017/09/18/backlog%E4%B8%8A%E3%81%A7%E6%A1%88%E4%BB%B6%E3%83%BB%E9%80%B2%E6%8D%97%E7%AE%A1%E7%90%86%E3%82%92%E3%81%97%E3%81%A6%E3%81%84%E3%81%9F%E8%87%AA%E5%88%86%E3%81%8CGithub%E3%81%AB%E8%A7%A6%E3%82%8C)
- 自動化ツールの CircleCI ほか CodeClimate についても体験。やはり間違いを減らす・機械的に判定してもらうというのは良い。
  - ただ一時期開発中にエラーばかり吐いてバツマークが付きすぎてたので`ci skip`を多用していた時期がありました。

## stylelint、csscomb

- CSS 周りの設定で stylelint を使用してみてます。
- ターミナルでエラーがでるようになってそれを直す矯正マシーンみたいな感じですが、逐一ルールも確認せずとも教えてくれるので便利。
- 弊社は ECSS の設計思想で CSS 書いてますが、それに付随した stylelint もドキュメント内にあったので、内容を少し更新してそれを派生させて動かすようにやってます。
  - http://ecss.io/chapter9.html#stylelint
- あと csscomb もコンフィグ化してみた。以下自分用ですが。
  - https://www.npmjs.com/package/@yamanoku/stylelint-config
  - https://www.npmjs.com/package/@yamanoku/csscomb-config
- 共通で使えるパッケージ、モジュールを作ってパブリックでいつか公開します。
- もちろん TSLint や ESLint とかも使ってます。
  - htmllint や textlint も今後導入しようとかいう感じです。

## Vue.js、Nuxt.js

[![Image from Gyazo](https://i.gyazo.com/3a2a2919e156d721277ae29ebc7a9eae.png)](https://gyazo.com/3a2a2919e156d721277ae29ebc7a9eae) [![Image from Gyazo](https://i.gyazo.com/ad0755fc9babcc4f48c7080944f04ac4.jpg)](https://gyazo.com/ad0755fc9babcc4f48c7080944f04ac4)

- 去年、個人的に動かしてみて理解につなげてみてましたが、実は社内案件でこっそり使い始めています。
- Nuxt.js は興味湧いたので個人的に触ってみてます。SPA、SSR ほか静的ジェネレータとしても使えるようなのでマークアップ案件で活かせないかと検討中。
  - [Vue.js 製フレームワーク Nuxt.js ではじめる Universal アプリケーション開発](https://html5experts.jp/potato4d/24346/)
- やっぱり素として使うにはそれなりにコストがでてくる（モジュールやプラグインを使いたい時とか）ので、やっぱり[webpack]とかでビルドできるような動かした方が必要に感じました。
  - https://www.slideshare.net/ShoheiOkada/1-vuejs
  - この辺見たんですけど 1000 行の`new Vue()`が気になってしょうがない。
- さくらインターネット株式会社様も Vue.js バリバリ使ってる or 使おうとしているようです
  - [「さくらインターネットのエンジニアは Vue.js をこんな風につかってます」レポート #さくらの夕べ](http://yamanoku.hatenablog.com/entry/2017/10/31/%E3%80%8C%E3%81%95%E3%81%8F%E3%82%89%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%81%AE%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AF_Vue_js_%E3%82%92%E3%81%93%E3%82%93)

## vw,vh

- Viewport units という概念を取り入れてみました。
- `calc()`とは相性が悪いみたいです。

## Qiita Organization 始動

- 社内の Qiita Organization をやろうかと MTG で検討していたのをついに始動しました。
  - https://qiita.com/organizations/geekinc
- [株式会社 GEEK の Qiita Organization はじめました！](http://blog.geek.co.jp/archives/1739)

## ECSS ドキュメント見直し・翻訳作業

- 個人の Scrapbox にて個人的にコツコツやってる（スローペースですが）。
  - [Enduring CSS 非公式翻訳](https://scrapbox.io/yamanoku/Enduring_CSS_%E9%9D%9E%E5%85%AC%E5%BC%8F%E7%BF%BB%E8%A8%B3)
- ほかにも公式でまとめられている抽象的表現が多いドキュメントとかもまとめて分かりやすくしたのを社内で配布するなどしてみたいです。
- なんか今更みたいなのもあるかもしれませんが、誰もやっていないところで生まれる価値や仕事というものを見出していくようなことをしていきたいです。

## Zeppelin、Avocode 体験

- デザインツールではあるが弊社デザイナーが取り入れてみた上記２点も体験してみました。
- CSS コード自動生成がすごい。100％希望通りのこととはならないが、画像化されているものの CSS 判定の精度の高さに感動しました。
  - [![Image from Gyazo](https://i.gyazo.com/8eaefa123b187ebcb3ef3e03f469b67d.png)](https://gyazo.com/8eaefa123b187ebcb3ef3e03f469b67d)
  - と当時書いてみたがどうやら微妙に px が違う問題があるらしい
- あと Sketch も案件によっては触れる機会がありました。

## 自分用 RSS リーダーを作ろうとした

- 経緯 => https://yamanoku.github.io/LT/lt04/
- Slack のチャンネルに URL をなげたら RSS リーダーとして機能するというのを導入してみた。
  - https://elements.heroku.com/buttons/gozman/slack-rss
- そもそも iOS アプリのはてなブックマークが使いづらくなったのでなんとかしようと試していたのですが気がついたら使いづらい部分が直ってました。
- 自作 RSS のは中途半端に頓挫しました。機会があったら復帰させたい。
