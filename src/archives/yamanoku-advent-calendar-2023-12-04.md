---
title: button要素のtype属性について気にしたくないけどそうもいかない話
description: type属性の指定があまり重要視されていない現状にモヤッたので言語化してみた
date: 2023-12-04
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

皆さんは`<button>`要素を書く時に`type`属性を書くこと気にしてますか？

私は気にしてます。気にしすぎているほどに。

## なぜ気にしているのか

`<button>`要素には`type`属性があります。この`type`属性はデフォルトの値が`submit`になっています。送信目的ではなくJavaScriptと組み合わせたインタラクションが目的（例えば要素を開閉するなどの挙動）の場合は`type`属性を`button`とする必要があります。その他にもフォーム内容をリセットさせる`reset`という値もあります。

```html
<button type="submit">送信する</button>
<button type="button">開閉する</button>
<button type="reset">リセットする</button>
```

この指定がない場合に困る問題としてコンポーネントとして扱っている際に親要素に`<form>`要素があると送信ボタンとして認識されて実装時に予期せぬ挙動になることがあります。

> alertを出したあと一旦console.logするだけにしたのですが<br>
> なぜか画面がリロードされてしまう。。。（URLの最後に?がつくのでget通信しようとしているようにみえる）
>
> [buttonタグで勝手にリロードされてしまう(vue.js) #JavaScript - Qiita](https://qiita.com/haruraruru/items/53614e739437bf7e5b1c)

> これ、ひとつのコンポーネントの template で form と button が同時に出てきていたら比較的探しやすいんだけど、コンポーネントが入れ子になっているとかなり見つけにくいということが分かった。
>
> [buttonタグで勝手にリロードされてしまう問題](https://random.tagucch.dev/posts/2021-10-19)

この挙動自体はHTMLの挙動になるのですが、JavaScriptと一緒に扱っている場合はどこに問題があるのか一見して分からなくなる可能性があります。そうしたヒューマンエラーを防ぐためにも`type`属性を明示的に指定することが重要だと思っています。

ただし以下のように`<form>`要素の中で使う場合は送信ボタンとして自明なのでその場合は`type`を省略しても問題ないと思っています。

<!-- prettier-ignore-start -->
```html
<form method="post">
  <label>
    名前
    <input name="submitted-name" autocomplete="name" />
  </label>
  <button>保存</button>
</form>
```
<!-- prettier-ignore-end -->

> [\<form>: フォーム要素 - HTML: ハイパーテキストマークアップ言語 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form)

## サンプルコードで`type`属性が明示されていないものがある

技術ブログやドキュメントなどのサンプルコードで`type`属性が明示されていないことがあります。私はネット上にある情報を収集するのが好きなので色々なものを見るのですが、ボタンの使い方として明示されていないものを見ると気になってしょうがありません。

以下はSWRのブログ記事のサンプルコードです。`type`属性が省略されています。

<!-- prettier-ignore-start -->
```jsx
const { mutate, data } = useSWR('/api/todos')

return <>
  <ul>{/* Display data */}</ul>

  <button onClick={() => {
    mutate(addNewTodo('New Item'), {
      optimisticData: [...data, 'New Item'],
    })
  }}>
    Add New Item
  </button>
</>
```
<!-- prettier-ignore-end -->

> [Announcing SWR 2.0 – SWR](https://swr.vercel.app/blog/swr-v2)

こうした代表的なライブラリのサンプルコードに`type`属性が省略されていることは、問題ないものと錯覚させてしまうかもしれないので個人的には好ましくありません。

もちろん明示的に`type`属性を示しているものもあります。Preactのチュートリアルでは`type="submit"`を明示しています。この例はとても良いので見習ってほしいです。

<!-- prettier-ignore-start -->
```jsx
import { h, render, Component } from 'preact';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <form>
          <input type="text" />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
```
<!-- prettier-ignore-end -->

> [Tutorial | Preact: Fast 3kb React alternative with the same ES6 API. Components & Virtual DOM.](https://preactjs.com/guide/v10/tutorial/)

それはそれとして`<input type="text">`にラベルが紐づけていないのが気になります。

## Linterで`type`属性をつけるよう矯正する

このような属性に関する指摘をいちいちレビュー等で毎度指摘するのは大変なので、できるかぎり機械的に指摘するようにしてもらいたいです。

そこで業務でも私用でも愛用しているマークアップのリンターである[Markuplint](https://markuplint.dev/ja/)では以下のように`type`属性をつけるように強制できるルールを作れます。

```json
{
  "rules": {
    "required-attr": true,
  },
  "nodeRules": [
    {
      "selector": "button",
      "rules": {
        "required-attr": {
          "value": [
          {
            "name": "type",
            "value": ["button", "reset", "submit"]
          }
        ],
        "reason": "type指定がないとデフォルトでsubmitの挙動になるので、予期せぬ挙動にならないように意図的に提示してください。"
      }
    }
  ]
},
```

AngularのESLintでは`<button>`要素に`type`属性がないと警告されるルールが搭載されています。これはとても良いものです。

[angular-eslint/packages/eslint-plugin-template/docs/rules/button-has-type.md at main · angular-eslint/angular-eslint](https://github.com/angular-eslint/angular-eslint/blob/0fd361abb7ba80d908e7abdc1e038974366cf72c/packages/eslint-plugin-template/docs/rules/button-has-type.md)

## `<form>`要素を使わなくてもデータ送信ができるようになった

しかし`<button>`要素の`type`属性を意識するのは`<form>`要素を使う時だけなのかもしれません。事実、現在サーバーにデータを送信するために`<form>`要素を使わなくてもJavaScriptを経由して送信することができます。

JavaScriptでHTTPリクエストを送るオブジェクトであるXMLHTTPRequestを使うことで可能になります。

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/todos');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ title: 'New Item' }));
```

Fetch APIを使う場合でも同様のことが可能になります。

```js
fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title: 'New Item' }),
});
```

このように`<form>`要素を使わなくてもデータを送信できるようになってきています。JavaScriptとWeb APIの進化により送信するための責務がHTMLから離れてきており、`<button type="submit">`を意識することは減ってきてしまっているのかと私は推測しています。

しかし最近ではRemixやReact.js（あるいはNext.js）からServer Actionといったものが生まれてきて、JavaScript（この場合はJSX）を書きつつも`<form>`要素でデータ送信を扱う事例も増えてきています。

<!-- prettier-ignore-start -->
```jsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createTodo } from '@/app/actions'

const initialState = {
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
```
<!-- prettier-ignore-end -->

> [Data Fetching: Forms and Mutations | Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)

これはハイドレーションが完了するまでにフォーム操作ができるようになるユーザー体験としての利点がありますが、そもそもデータを送信するセマンティクス情報として`<form>`要素を意識して書くことができるのであれば、フレームワークに準じて書くべきだと思っています。

## `<button>`自体が汎用的なものになってきている

ところでいまWebブラウザ上で「ボタン」を表現するとしたら、`<button>`要素を使って表現する人が多いと思っています。私もそうです。

HTML仕様上では`<input>`要素の`type`属性で`button`を指定することでも同等の挙動になるのでこの書き方でも有効です。ちなみに`<button>`の方が後で生まれたもの（[HTML4.0](https://www.w3.org/TR/html40/interact/forms.html#h-17.5)より）になります。

<!-- prettier-ignore-start -->
```html
<!-- 以下２つは挙動としては妥当なマークアップ -->
<input type="button" value="お気に入りに追加">
<button type="button">お気に入りに追加</button>
```
<!-- prettier-ignore-end -->

`<input>`要素の`type`属性で`button`を指定すると`value`属性の値がボタンのラベルになります。`<button>`要素では中身のテキストがボタンのラベルとなります。

ですがボタンの中で画像やアイコンを差し込むことを想定した場合は`<button>`要素のほうが圧倒的に扱いやすいでしょう。

```html
<button type="button">
  <svg
    width="20"
    height="20"
    viewBox="0 0 100 100"
    role="img"
    aria-hidden="true"
  >
    <polygon
      points="50,10 60,40 90,40 65,60 75,90 50,70 25,90 35,60 10,40 40,40"
    ></polygon>
  </svg>
  <span>お気に入りに追加</span>
</button>
```

最近はインタラクティブな要素としてJavaScriptを書かなくても表現できるものが増えつつあります（**現時点でクロスブラウザ対応しているかは置いておきます**）。

Popover APIを活用するとJavaScriptを使用せずポップオーバーを表示させることは可能になってきています。

```html
<button type="button" popovertarget="popover">ポップアップを表示する</button>
<div popover id="popover">ポップアップ内のコンテンツ</div>
```

> [ポップオーバー API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)

更に発展させたInvokersを使うとポップオーバーのほかダイアログや開くことも可能になるように検討されています。

```html
<button type="button" invoketarget="my-dialog">ダイアログを開く</button>
<dialog id="my-dialog">ダイアログ内のコンテンツ</dialog>
```

> [Invokers (Explainer) | Open UI](https://open-ui.org/components/invokers.explainer/)

ブラウザで扱うものが文書としてのWebページ以外にもアプリケーションとしても活用されるようになってきた現代においては、様々なインタラクションの発火点として`<button>`要素はますます重宝されることになると思っています。だからこそインタラクションのものとして`type="button"`を明示的に書くことは重要だと考えています。

## `type`属性の値は今後増えていくかもしれない

`type`属性で使える値は`submit`と`button`と`reset`のみが今のHTMLの仕様で定義されていますが、今後それらが増えていく可能性があることも頭の片隅に置いておくべきだと思っています。

### Web Share API

Web Share APIとはOSの共有機能をWebブラウザから利用できるようにするAPIです。現在この機能を`<button>`上で実現するために`type="share"`という値が提案されています。

```html
<button type="share">共有する</button>
```

> [Share Button Type · Issue #11 · WICG/proposals](https://github.com/WICG/proposals/issues/11)

### Selectlist Element

OpenUIはW3Cコミュニティグループの1つで、組み込み用のUIコンポーネントのスタイリングや機能拡張を目的として日々活動しています。その中で`<selectlist>`要素というものも提案されています。

リストボックスを開くために`<button>`要素を使うことができて、その際に`type="selectlist"`という値が使えることが提案されています。

<!-- prettier-ignore-start -->
```html
<selectlist>
  <button type="selectlist">
    selected option: <selectedoption></selectedoption>
  </button>
  <option>one</option>
  <option>two</option>
</selectlist>
```
<!-- prettier-ignore-end -->

<figure>
  <img src="https://open-ui.org/images/selectlist-usecase-button.png" alt="The rendering of a selectlist with an author-provided button" width="320">
  <figcaption><a href="https://open-ui.org/components/selectlist/#replacing-the-button">Replacing the button より引用</a></figcaption>
</figure>

> [Selectlist Element (Explainer) | Open UI](https://open-ui.org/components/selectlist/)

---

これらはいずれもWeb標準の挙動としてはまだ確立されていませんが、`type`属性の値が3つしかないと思いこんでいると、今後増えていくことを見落としてしまうかもしれません。

## おわりに

以上`<button>`要素の`type`属性について書きました。この記事を読んでそもそも`<button>`要素のデフォルト挙動が`submit`になっていること自体が煩わしいと感じた人もいるかもしれません。

しかしWebは後方互換性を重視しているものです。これまで明示的に書いていなかったものがデフォルトの挙動を変えてしまえば何らかのサイトやアプリケーションで動かなくなってしまう可能性が大いにあります。一斉に皆で変えることができればいいでしょうがそんなことは不可能でしょう。Webが一般的になった今、デフォルトの挙動を変えることはとても難しいことです。

`<button>`要素の`type`属性の値自体は、マシンリーダブルの観点や支援技術（スクリーンリーダー）の読み上げにおいて影響は及ぼしません（私が知る限り）。しかし私はHTMLの意味論的ルールの観点においても、`<button>`要素の`type`属性を実装する人が何の意図をもってその`type`属性で実装したのか明示的に書くことは、ほかの実装者がそれを知れるためにも重要だと思っています。

Webサイト・アプリケーションを作っていく上で今後も`<button>`要素は重要な役割を担っていくと思っています。そのためにも`type`属性を明示的に書いていくことは重要です。これまで意識して書いてなかった人もこれを機に意識して書いていけるようになってくれると嬉しいです。

## 参考情報

- [4.10.6 The button element - HTML Standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [\<button>: ボタン要素 - HTML: ハイパーテキストマークアップ言語 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/button)
- [`button`要素で画像ボタンを作る](https://blog.w0s.jp/263)
- [ボタンには常にtype="button"をつけよう](https://zenn.dev/fujiyama/articles/496e5e81ba7df9)
- [adactio/share-button-type](https://github.com/adactio/share-button-type)
