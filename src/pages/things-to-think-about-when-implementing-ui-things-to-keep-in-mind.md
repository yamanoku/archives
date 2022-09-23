---
title: UI の実装で考えていること, 気をつけたいこと
description: UI の実装で考えていること, 気をつけたいことの記事です
date: 2020-12-09
author: yamanoku
layout: '../layouts/ArchivesPost.astro'
---

私が Web UI コンポーネント（以下: UI）を実装する中で個人的に大切にしていることについてを某 LT 会にて発表しました。今回はその内容と、加筆したものを記事にして紹介してみます。

## 例：ボタン UI を実装する際に気をつけること

![ボタン UI のイメージ図](https://i.gyazo.com/74969d0f4c95aeda9243587c59c2c592.png)

いろいろな文脈があるとは思いますが、まず最初にこれは「リンクとしてのボタン」なのか「何かを動かすためのボタン」なのか「送信するボタン」なのかというのを考えます。

### `<button>` のボタンである場合

- `type` 指定をする
  - 指定をしないとデフォルトで`submit`（送信）と決まってしまうので設定する
- `disabled` の考慮
  - リンクボタンと違って操作できる・できないが設定できる
  - 操作できないときのスタイルはどうなっているか
- `onClick` の挙動
  - `keydown` まで考慮してしまうと [Firefox ではスペース操作で 2 回挙動するバグ](https://bugzilla.mozilla.org/show_bug.cgi?id=1487102)が存在するので注意が必要
- デフォルトのスタイルを消すための考慮
  - `apperance: none;` のほか `border`, `background-color`, `margin`, `padding` などを必要に応じてリセットする必要がある

### `<a>` のボタンである場合の考慮

- ハイパーリンクとして視覚的に認識できるか
  - `<button>` ではないと判別できるものはあるか
    - 使いどころを分けているか（流用する危険性はないか）
    - Storybook のようなコンポーネントリストで見たときに判別できるようにしているか
      - 使用例があるとベター
- `href` は存在しているか
  - 遷移先の URL は存在するか
  - 存在しない場合、リンクとしてフォーカスができなくなる

### ボタンとしての共通の考慮

リンクや何かしら挙動させる・送信するボタンである時の共通の考慮事項

- フォーカスアウトラインの制御
  - `outline` を消していないか
  - ホバー状態とは別個に考えているか
- 押された時（active）の見た目や状態をどうするか
- ボタン内部にテキスト情報が含まれているか
  - アイコンだけしか内包されていない場合は`aria-label`で何者かを証明してあげる
    - `<span class="icon-search" aria-label="Search"></span>`

ざっと一例でした。もっとニーズを広げてみるともう少し考えることがありそうです。

## なぜ考慮しないといけないのか

UI デザイン単体のものを画面で当てはめた時にそれが違ったりすることがあります。
これは私の経験ですが `~Link` と命名された UI デザインがあったので、当初は `<a>` で実装していました。
ですが、これは実際に画面上に当てはめてみると「クリックをしてモーダルを開閉するためのもの」として使われるものでした。
インタラクションとしてのものは `<button>` で表現してあげたほうが適切です。

---

これが router として使われて URL が切り替わる場合であれば `<a>` でも良かったと思います。
また、対応として `<a>` でも `role` を変更するなどの修正はできるかもしれません。しかしそれよりは `<button>` として実装したほうが `role` を変更する必要もないのでと実装コストとして安上がりです。

---

なので **この UI は一体何をするものなのか** が共通解としてできているとベターだと思います。
そうすることで双方のコミュニケーションコストも解消してスムーズに開発ができ、より広い層のユーザーをカバーすることにも繋がります。

もちろん業務でやる以上スケジュールやコストとの相談も出てくると思うので、１人で突っ走るよりかは **どこまでの何が必要なのか** を皆で話し合えるようになるといいかもしれません。

## セマンティクスであることは「いらない」考慮を減らしてくれる

ちなみに上述したボタン UI についてですが、a タグや button タグではなく、div というもので考えることも可能です

```html
<div>Button</div>
```

もちろんこれだけではボタンとしての機能を確保できません。

```html
<div
  class="button"
  role="button"
  tabindex="0"
  onClick="ClickHandle"
  onKeyUp="KeyUpHandle"
  onKeyDown="KeyDownHandle"
>
  Button
</div>
```

こうした情報が最低限必要になります。

```html
<button type="button" onClick="ClickHandle">Button</button>
```

しかしセマンティクスな表現をしてあげるとこれだけで済みます。
正しい HTML を選択することで実装コストも減り、利用するユーザに最低限の正しい機能を提供できるということにも繋がります。

つまりこれは **いらない考慮をする** 機会を減らしてくれるので、積極的に正しい HTML を書いていくべきです。

## 実装時に参考にしているもの

私が UI を実装しているときに参考にしているものを紹介します。

### [HTML Living Standard](https://html.spec.whatwg.org/)

HTML の仕様書。内包できるものや使い方といったことを見返す時に役に立っています。

### [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/)

アクセシビリティを考慮したコンポーネント作成例。あらゆる人が使えるように考える点で参考になります。

### [ソシオメディア | ヒューマンインターフェース ガイドライン](https://www.sociomedia.co.jp/category/shig)

ソシオメディアが公開しているヒューマンインタフェースデザインでの指針。GOOD や BAD といった例も載っているのでそうしたプラクティスに則っているかを確認できます。

## UI というものに向き合ってみて学べたこと

「この UI は一体何をするものなのか」ということを自分なりに考えてみた結果、結論としてちゃんと納得させるような習慣がつけられるようになってきました。

たとえばコンテンツを内包するもの（ container, wrapper ）の最大幅を考える時、皆さんはどういう基準や判断でその数値を決めていますでしょうか。

サイトやアプリの設計によるものなので絶対の正解はありませんが、[私のサイト](https://yamanoku.net/)では最大文字数のために考えるようにしています。そのため最大幅の数値は `ch` で設定しています。

> ### 最大幅について
>
> メインコンテンツの最大幅は 80ch に設定しています。ch はチェーンと呼ばれ、文字のサイズによって可変する単位です。
>
> この設定にすることのメリットとして、長文が読めない読字障害の利用者のサポートができたり、文字サイズが大きくなるに従ってテキストの一部が欠けて読めなくなるような事態も発生しにくくなります。
> https://github.com/yamanoku/yamanoku.github.io/blob/nuxt/EXPLAINING_PORTFOLIO_SITE_ja.md#%E6%9C%80%E5%A4%A7%E5%B9%85%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

このように Web 上で表現されているものの意味を突き詰めて考えてみると、それが１つのフレームワークとしてどこかで流用することもでき、迷いない意思決定がしやすくなると思っています。

## おわりに

ブラウザを通じてユーザーに良い体験を提供していけるようにするために、考慮していくことや考えていくことはどんどん増えてきていくかもしれません。そうした中で常に正しいものを提供していくというのは大変なことです。

私が今回記事として書いたものも間違った考慮となっている場合があるかもしれません。そうなったとき、間違っている部分があったとしたらすぐに気づいて直していけるようにしていく体制も必要だと感じます。

そして、みんなで良い UI とは何か？というものを考えながら作っていけるといいなと願っています。