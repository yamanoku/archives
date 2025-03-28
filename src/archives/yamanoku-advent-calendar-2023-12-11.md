---
title: TailwindCSSに関する私の考えやスタンス
description: TailwindCSSに対してどういうポジションなのか探りを入れられるのは正直ダルいです
date: 2023-12-11
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

以前とある方と1on1をしていた際に「yamanokuさんってTailwind CSSアンチだと思っていた」という旨の発言がありました。何故そういうイメージがあったのかは分かりませんが、私は別にアンチではありません。逆に特段思い入れがあるというわけでもないですが…。

そこで今回はTailwind CSSに対する私の考えやスタンスについてを書いてみようと思います。

## かつて考えていた設計思想と近く、親近感がある

私がWeb制作の仕事をしていた2017年頃、CSS設計思想としてBEMやFLOCSSといったものがある中で、そうした考え方を使わない「使いまわせるCSS」についてを考えていました。

> [最近考えてる「使いまわせるCSS」について | yamanoku.net](https://archives.yamanoku.net/i-think-reuse-css)

要素の空き・余白の関係性を示すためにそれぞれの値を定義したり、ボタンの幅についてもクラス名で決め打ちで定義するようにしたりと、いわゆるユーティリティファーストなCSSを書くのがよいのではないか、と考えていた事がありました。

```css
.mt-10 {
  margin-top: 10px;
}
.mt-100 {
  margin-top: 100px;
}
.pt-10 {
  padding-top: 10px;
}
.pt-100 {
  padding-top: 100px;
}
```

```css
.btn-w200 {
  max-width: 200px;
}
```

あまりCSSクラス自体に広い責任をもたせず、その場その場で必要なものをプロパティをもつ単体のクラスを定義する、いわゆるYAGNIのような考え方でした。この頃はまだTailwind CSSは存在していませんでしたが、当時はユーティリティだけで表現するようにしたい考えをもっていたので、考え方が近いことに親近感をもっていました。

## スタイル表現、横に伸ばすか縦に伸ばすか

Tailwind CSSを使う際に、HTMLへの記述量が増えていくことに違和感をもつことはあると思います。実際のコード例をみるためにとあるサインインフォームを想定してみましょう。

![ユーザーネームとパスワードのテキストボックスとSign inと書かれた送信ボタンが並ぶサインインフォーム。フォーム内部は白背景で外枠は角丸になっており薄いシャドウボックスがつけられている。](https://i.gyazo.com/85f8040534019a309a8c605dea8e90c9.png)

このサインインフォームをTailwind CSSでスタイリングすると以下のようなコードになります。

<!-- prettier-ignore-start -->
```html
<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
  <div class="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white px-4 py-8 shadow-md">
    <h1 class="text-3xl font-bold text-gray-700">Sign in</h1>
    <form class="mt-4">
      <div class="mb-4 flex flex-col">
        <label class="mb-2 font-bold text-gray-800" for="username">Username</label>
        <input class="rounded-md border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none" type="text" name="username" id="username" placeholder="Enter your username" />
      </div>
      <div class="mb-4 flex flex-col">
        <label class="mb-2 font-bold text-gray-800" for="password">Password</label>
        <input class="rounded-md border border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none" type="password" name="password" id="password" placeholder="Enter your password" />
      </div>
      <button class="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none" type="submit">Sign in</button>
    </form>
  </div>
</div>
```
<!-- prettier-ignore-end -->

たしかにHTMLのclassへの記述量が増えています。この表現をCSSで行う場合は以下のようになります。

```css
.sign-in-form {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(243 244 246);
}

.sign-in-form__inner {
  display: flex;
  width: 100%;
  max-width: 28rem; /* 448px */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem; /* 32px 16px */
  background-color: rgb(255 255 255);
  border-radius: 0.5rem; /* 8px */
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.sign-in-form__title {
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  font-weight: 700;
  color: rgb(55 65 81);
}

.sign-in-form__form {
  margin-top: 1rem; /* 16px */
}

.sign-in-form__form-item {
  margin-bottom: 1rem; /* 16px */
  display: flex;
  flex-direction: column;
}

.sign-in-form__form-label {
  margin-bottom: 0.5rem; /* 8px */
  font-weight: 700;
  color: rgb(31 41 55);
}

.sign-in-form__form-input {
  border-radius: 0.375rem; /* 6px */
  border-width: 1px;
  border-color: rgb(229 231 235);
  padding: 0.5rem 0.75rem; /* 8px 12px */
}

.sign-in-form__form-input:focus {
  outline: none;
  border-color: rgb(99 102 241);
}

.sign-in-form__submit-button {
  border-radius: 0.375rem; /* 6px */
  background-color: rgb(99 102 241);
  padding: 0.5rem 1rem; /* 8px 16px */
  color: rgb(255 255 255);
  border-radius: 0.25rem;
}

.sign-in-form__submit-button:hover {
  background-color: rgb(79 70 229);
}

.sign-in-form__submit-button:focus {
  outline: none;
  background-color: rgb(79 70 229);
}
```

これらを比較した時に、極端で乱暴な言い方をしてしまえば、CSSで表現するものが**横に伸びるか、縦に伸びるか**の違いなだけに見えます。

私はCSSで記述するよりも、Tailwind CSSのような表現を使うことで**そのHTMLにどれだけ表現が集中しているかの責務**がよりわかりやすくなるのではないかなとも思っています。

## 書き方の特殊さは慣れでどうにかなると思っている

Tailwind CSSで使用できるクラス名はCSSプロパティ名を継承するようにはなっていると思いますが、一部はそれに沿っていないものもあります。私も最初Tailwind CSSを使ってスタイルを定義するようにしたときに`font-size`や`color`の指定が`text-xx`のような形であったことには違和感がありました。

ただ、この部分は慣れによるものかなと思います。脳内のワーキングメモリーとして覚えきれないような場合は、[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)を活用してコードを補完してもらうなど、機械的な仕組みに任せるようしたほうが良いでしょう。

## ルールが定まってない中で使いだすのは難しい

具体的にスタイルの定義においてルール化されていないフロントエンド開発でいきなりTailwind CSSを使用するにはノイズが大きくなりそうな気がしています。

CSS（この場合はクラス名やそこの責務について）を書きたくないというモチベーションが高い人であれば親和性は高いかもしれませんが、CSSを一から書いたほうが分かりやすい人も居たり、Tailwind CSSの慣習から逸脱したいと考える場合に認知負荷が高まっていきどこかで破綻していきそうです。「[Arbitrary Values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)」という表現力を使うことで、柔軟な値に対応できるようになりますが、考えなしに多用することは無秩序なコードだらけになりやすいため注意が必要です。

Tailwind CSSを導入するのであれば、その前にスタイルの定義についてルールを定めておいた方が良いと思っています。もしそういうのが定まっていない状態であれば、使用範囲を限定する方向に倒したほうが良さそうです。

## Tailwind CSSは技術的負債になりうるのか

Tailwind CSSがCSS表現をロックインしてしまい他の技術へ移行することができない技術的負債になると懸念する声もあります。ですが私はそこまで懸念されるほどのものなのかがピンと来ていません。もしTailwind CSSを除去する場合は依存するクラス名だけを抽出して削除することで他画面には影響なく安心して消すことができるはずなので、むしろ取り扱うのは容易な方だと思っています。

それよりかはTailwind CSSの作法と独自のCSS記法などが混在しているなど、コーディングルールから逸脱するようなものがあれば剥がしにくくなると思います。前述したようにどのようなやり方でスタイルを定義するかのルールを定めておくことが技術的負債を産まない点で大事なのではないかなと思っています。

## デザイントークンを定義する手法として参考になる

デザイントークンとはデザインシステムを構築する上での要素の1つで、色やスペーシング、タイポグラフィのスケールなどをガイドラインから基づいて定数で表現し使われるものです。色のデザイントークンが定義されている場合、デザイナーやエンジニアでの会話は「薄いグレー（`#d1d5db`）や濃いグレー（`#374151`）」といったものから「`gray-300`や`gray-700`」という表現で行えるようになります。このようにデザイントークンはデザイナーやエンジニアが同じ言葉でそのイメージを共有できるようになるメリットがあります。

Tailwind CSSではそうした色やスペーシング、タイポグラフィを定数で管理するようにしているため、デザイントークンを定義するときの参考になるのではないかなと思っています。設定ファイルである`tailwind.config.js`の`theme`を編集することで元の定義を変えたり、あるいは新たに定義を追加することができます。

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#67e8f9',
        },
      },
    },
  },
};
```

```html
<div class="bg-brand-blue">ブランドカラーの青を使った背景</div>
```

## GitHub Copilotとの組み合わせでプロトタイプの爆速実装

GitHub Copilotを用いて、こうした表現をしたいというプロンプトと共にTailwind CSSを使用することで自動的にコードを生成してくれます。

```
プロンプト：カードUIをTailwindCSSで作りたい
```

<!-- prettier-ignore-start -->
```html
<div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <!-- 生成時の画像ソースのURLは404だったためそこだけ差し替えました -->
  <img class="w-full h-56 object-cover object-center" src="https://placehold.jp/640x480.png" alt="カード画像">
  <div class="p-4">
    <h2 class="text-xl font-semibold text-gray-800">カードのタイトル</h2>
    <p class="mt-2 text-gray-600">カードの説明文が入ります。</p>
  </div>
</div>
```
<!-- prettier-ignore-end -->

<figure>
  <img src="https://i.gyazo.com/61cbaefc9ec36e03270d62253fc95f6c.png" alt="GitHub Copilotにより生成されたカードUI。カード全体は角丸になっていてダミー画像が入った後にタイトルと説明文の順番で並んでおりその部分は白背景になっている。" width="480" loading="lazy">
  <figcaption>GitHub Copilotにより生成されたカードUI</figcaption>
</figure>

ちなみに「スタイル表現、縦に伸ばすか横に伸ばすか」の章にあったサインインフォームのコードもすべてCopilotによって生成されたものです（私は何も考えていません！）。

何らかのUIライブラリを検討したりデザインを起こす間もなく、プロトタイピングなどのスピード感を求める実装をする場合には組み合わせとしては有用なのではないかなと思います。

## 結論

Tailwind CSSも単なるツールなので、用法用量を守って正しく使っていきましょう。

加えて、人に対してよく分からずにアンチとかいうラベルを貼りつけないようにも気をつけましょう。
