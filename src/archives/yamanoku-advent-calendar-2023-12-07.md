---
title: あなたの推しコンパイラは？私はSvelteです
description: Svelteのコンパイラとして推せる部分、それにまつわるネガティブな反応とこれからの在り方について
date: 2023-12-07
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

こんにちは。**私の推しコンパイラはSvelteです**。というわけで今日はコンパイラ視点でのSvelteの好きな部分の話をしていきます。

## Accessibility warningsというアクセシビリティチェック機能

Svelteはコンパイル時にアクセシビリティに関する誤った記法があった際に警告を出してくれます。この機能こそが私がSvelteをコンパイラとして最も推せる理由です。

たとえばSvelteのコード内で`<img>`要素に`alt`属性がないものを書いてみましょう。

```html
<img
  src="https://i.gyazo.com/809a6f523937838d9ba5eaf20717feee.png"
  width="320"
/>
```

すると`alt`属性を付けるように警告を出してくれます。これは「a11y-missing-attribute」というルールによるものです。

```shell
A11y: <img> element should have an alt attribute
```

> 参考：[Svelte REPLでのサンプルコード](https://svelte.dev/repl/7c40bf320f5040ce80c72803da37b072?version=4.2.8)

これがESLintのプラグインとしてではなく標準のチェッカーとして設定されていることが非常に心強く感じました。

もちろん、実装上どうしてもルールを無視せざるを得ない場合もあります。もし警告を出したくない場合は`<!-- svelte-ignore a11y-<code> -->`というコメントを記述することで無視することができます。

```html
<!-- svelte-ignore a11y-autofocus -->
<input autofocus />
```

アクセシビリティにまつわるルールは12月7日現在で28個のルールがあり、それらの詳細は[ドキュメントにまとまっています](https://svelte.jp/docs/accessibility-warnings)。

[Svelte Summit Fall 2023](https://www.sveltesummit.com/2023/fall)の「Accessibility tips with Svelte solutions」で現時点のSvelteのアクセシビリティに関するルールについてEnrico Sacchettiが説明してくれています[^1]。ざっくりと理解する上でも良い発表内容になっておりますので是非ご覧になってみてください。

[^1]: [Svelte Summit Fall 2023 - Accessibility tips with Svelte solutions](https://www.sveltesummit.com/2023/fall/accessibility-tips-with-svelte-solutions)

## Svelteを書きつつアクセシビリティを守れるようにしたい

ところでSvelteのコンパイラにこうした機能が導入されてるのは何故なのでしょうか。それはSvelteの作者であるRich Harrisが過去書いた「A11y and being a good citizen of the web」というIssueを見るとその意図が分かります。

> Personal confession: I suck at a11y. I have 20/20 vision, no colour blindness, good hearing, and no disabilities. Because of that I'm bad at remembering to write accessible markup — the non-accessible web seems fine to me.

> Svelte could help me with that, because of what it is and how it works. For example it could yell at me if I add an `<img>` tag and forget the `alt` attribute, and it could do all that at compile time. I don't think it should be an error, because then it will just get in the way of rapid prototyping and drive people mad, but it would be useful to get a printout of accessibility hints when a component is compiled, for example.

> We can help educate developers about a11y and make a strong statement about the kind of web we want to be a part of — I think we should.

> [A11y and being a good citizen of the web · Issue #374 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/374)

Rich Harrisはアクセシビリティについては苦手意識をもっており、自身も障害は特になくアクセシビリティを意識したマークアップが苦手であると告白しています。Svelteにて`<img>`に`alt`属性を入れるようにアクセシビリティにまつわる指摘を導入することで、開発者自身がそのヒントを元にアクセシビリティを意識し、Webの良き市民となれるようにしたい、といったことが書かれています。

この内容が作者により示されていたことに、当時Svelteを知りたてだった頃の私は非常に感銘を受けました（アクセシビリティに関心があったからもありますが）。

余談ですが今年の4月にあった発表[🌶️ IMHO 🌶️ - Rich Harris on frameworks, the web, and the edge.](https://zenn.dev/ryoppippi/articles/8addfe62eb4d3e)についてもほぼ同意できる内容でとても良かったです。最近はSvelteそのものよりもRich Harris自身のほうが好きになってきています。

## コミュニティ内からは微妙な反応が…

いやぁSvelteは作者も含めて素晴らしいなぁ！ということで綺麗にこの話を終えたいと思っていたのですが、コミュニティ内からはこの部分について微妙な反応があることも知りました。この記事がSvelteコンパイラのアゲ記事だけにならないためにも、それらについても取り上げてみようと思います。

> [How can we disable svelte warnings? (a11y, etc) · Issue #650 · sveltejs/language-tools](https://github.com/sveltejs/language-tools/issues/650)

1つめのIssueではVSCodeのSvelte拡張機能にてアクセシビリティやそれらにまつわる警告を無視する方法はないのか、という内容が議論がされています。VSCodeの設定を上書きして`svelte.config.js`の設定を変更することで無視することができることが示されていますが、不満を持っている人も多いのか[アクセシビリティに対して強めの発言をされている](https://github.com/sveltejs/language-tools/issues/650#issuecomment-1207510357)のが気になります。

> [Move a11y check to the eslint plugin · Issue #9485 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/9485)

2つめのIssueではESLintプラグインとしてアクセシビリティに関するチェッカーを移行することについて議論がされ始めています。アクセシビリティのチェックはすでにESLintのプラグインとしていくつか実装されており、ESLintコミュニティの恩恵を得ることで車輪の再開発をする必要はないのではないか、という意見が出ています。

現在は非推奨となっている[eslint-plugin-svelte3](https://github.com/sveltejs/eslint-plugin-svelte3)というESLintプラグインでは`svelte3/compiler-options`や`svelte3/ignore-warnings`というルールでLinterの警告やコンパイル時の警告を無視することができました。それを現行のプラグインである[eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte/)にて同様の機能を実装できないか、という話もされています[^2]。

[^2]: [Ignore specific warnings of svelte-check · Issue #311 · sveltejs/eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte/issues/311)

## コンパイラによるアクセシビリティチェックの難しさ

アクセシビリティやWebの力を強く信じている私ですが、こういった意見ややり取りをみると寂しい気持ちになる反面、コンパイラの都合に対してもどかしく思うのは分からなくはないという気持ちの両方があります。

私はかつてSvelteのアクセシビリティルールについて提案をしてみたことがあります。

> [`a11y-label-has-associated-control`: Check if `for` attribute of label matches the `id` attribute of the control. · Issue #6515 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/6515)

svelte-checkにおける「a11y-label-has-associated-control」というルールは`<label>`要素が`for`属性を持っているかどうかをチェックしてくれます。しかし`for=""`でもバリデーションチェックは通ってしまいます。なぜなら`for`属性を持つかどうかだけをチェックしているだけだからです。

<!-- prettier-ignore-start -->
```html
<input type="checkbox" value="hoge" />
<label for="">hoge</label> <!-- この状態でも問題ない判定 -->
```
<!-- prettier-ignore-end -->

> 参考： [Svelte REPLでのサンプルコード](https://svelte.dev/repl/230fc5c1a4ff459f80fb0a27e7258fe6?version=4.2.8)

この状態ではコンパイラとしては問題ないがフォームコントロールのアクセシビリティが確保できていないので精度としては微妙だと思いました。

そこで対応するコントロールの`id`属性とラベルの`for`属性が一致すれば問題ないようなバリデーションはできないか提案しました。

しかしこの提案に対して「コンパイラとしてその判定をもつのは難しい」「誤検知につながりかねない」といった意見が出てきました。代わりにコンパイラ側ではなく[axe DevTools](https://www.deque.com/axe/)といったツールでページ全体でそのチェックをすべきではないか、という意見も出てきてこの提案はクローズされました。

私自身、Svelteのコンパイラ開発に携わってないため、このような判定を作ることがいかに難しいのかどうかは正直わかっておりません。それと同時に機械的なものだけでアクセシビリティチェックをすることの限界についても理解しているつもりです。Svelteのコンパイラだけに頼るのではなく、実際にユーザーテストをするなど様々な観点でアクセシビリティをチェックできるようにすることが重要です。

## おわりに

私が推しコンパイラとしてSvelteを選ぶ理由の1つにアクセシビリティに関するチェック機能があることを書きました。この機能がある事は私はとても良いことだと思ってはいますが、チェックが完全なものとして機能できていないことも分かっています。

今後もまたいくつかアクセシビリティにまつわるルールは出てくるかもしれません。その度にルールを設定でignoreするのではなく、コンパイラとして**なぜこのルールが今必要になるのか**、**それはどういう問題があるからなのか**といった、コミュニティ内でアクセシビリティにまつわる部分を話し合っていくことが重要だと感じています。

Svelteは私にとって好きなOSSの1つです。今後もSvelteの動向を見守りつつ、Svelteにおけるアクセシビリティにまつわる議論が進んでいくことを願っています。
