---
title: eslint-plugin-vuejs-accessibility入門
description: eslint-plugin-vuejs-accessibilityの入門記事です
date: 2024-02-18
author: yamanoku
source: zenn.dev
noindex: true
---

## eslint-plugin-vuejs-accessibilityとは何か

eslint-plugin-vuejs-accessibilityは、Vue.jsのコンポーネントにおけるアクセシビリティの問題点を検出するためのESLintプラグインです。

[vue-a11y/eslint-plugin-vuejs-accessibility: An eslint plugin for checking Vue.js files for accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)

類似するものとして[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)があります。これはReactのJSXにおけるアクセシビリティの問題を検出するためのESLintプラグインです。今あるルールはこのプラグインから参考になっている部分がいくつかあります。

## eslint-plugin-vue-a11yとの違い

元々は個人で開発していたeslint-plugin-vue-a11yというものがあります。

[maranran/eslint-plugin-vue-a11y: Static AST checker for accessibility rules on elements in .vue](https://github.com/maranran/eslint-plugin-vue-a11y)

こちらのeslint-plugin-vue-a11yは現在メンテナンスがされておりません。今回紹介するeslint-plugin-vuejs-accessibilityは[vue-a11y](https://github.com/vue-a11y)というOrganizationsにて現在メンテナンスされているのでこちらを使うことをお勧めします。

## インストール

それぞれのパッケージマネージャからインストールします。

### npm

```shell
npm install --save-dev eslint-plugin-vuejs-accessibility
```

### yarn

```shell
yarn add --dev eslint-plugin-vuejs-accessibility
```

### pnpm

```shell
pnpm add -D eslint-plugin-vuejs-accessibility
```

## 設定

ESLintの設定から以下のように追加します。

### Flat Config（ESLint v9以降）

`eslint.config.js` ファイルに以下のように追加します。

```javascript
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

export default [
  ...pluginVueA11y.configs['flat/recommended'],
  {
    rules: {
      // 個別でオーバーライドしたいルールは以下のように設定できます。
      'vuejs-accessibility/alt-text': 'warn',
    },
  },
];
```

### ESLint v9以前

`.eslintrc.*` ファイルに以下のように追加します。

```javascript
{
  plugins: [
    'vuejs-accessibility'
  ],
}
```

適応したいルールを個別で設定できます。

```javascript
{
  rules: {
    'vuejs-accessibility/label-has-for': 'error',
    // ...
  }
}
```

個別指定ではなく、`extends` より推奨となっているルールをまとめて使うこともできます。

```javascript
{
  extends: [
    'plugin:vuejs-accessibility/recommended'
  ],
}
```

推奨となっているルールは[Rule Overview](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rule-overview/)より確認できます。

## ルールについての説明

それぞれのルールについて簡単に説明します。

### alt-text

代替テキストを必要とするすべての要素に必要な属性が設定されていることを確認します。

> [alt-text | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html)

### anchor-has-content

`<a>` 要素がコンテンツを持っていることを確認します。

> [anchor-has-content | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/anchor-has-content.html)

### aria-props

存在する正しいARIA属性で設定されていることを確認します。

> [aria-props | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/aria-props.html)

### aria-role

存在する正しい `role` 属性で設定されていることを確認します。

> [aria-role | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/aria-role.html)

### aria-unsupported-elements

ARIA属性をサポートされていない要素にARIA属性が設定されていないことを確認します。

> [aria-unsupported-elements | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/aria-unsupported-elements.html)

### click-events-have-key-events

`@click` イベントを指定する要素は、同様に `@keyup` 、`@keydown`、`@keypress` のいずれかのイベントを指定されていることを確認します。

> [click-events-have-key-events | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/click-events-have-key-events.html)

### form-control-has-label

フォーム要素が対応する `<label>` 要素をもつ、あるいは `aria-label` 属性か `aria-labelledby` 属性が設定されていることを確認します。

> [form-control-has-label | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/form-control-has-label.html)

### heading-has-content

見出し（`<h1>`〜`<h6>`）要素がコンテンツを持っていることを確認します。

> [heading-has-content | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/heading-has-content.html)

### iframe-has-title

`<iframe>` 要素に `title` 属性が設定されていることを確認します。

> [iframe-has-title | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/iframe-has-title.html)

### interactive-supports-focus

インタラクティブな要素がフォーカス可能であることを確認します。

> [interactive-supports-focus | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/interactive-supports-focus.html)

### label-has-for

フォーム要素が `<label>` 要素内でネストされており、`<label>` 要素の `for` 属性にフォーム要素のID値が設定されていることを確認します。

> [label-has-for | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/label-has-for.html)

### media-has-caption

メディア要素が字幕データを挿入できる `<track>` 要素を持っていることを確認します。`muted` 属性が設定されている場合は除外されます。

> [media-has-caption | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/media-has-caption.html)

### mouse-events-have-key-events

いずれかのマウスイベント（`@mouseenter`、`@mouseover`、`@mouseout`、`@mouseleave`、`@hover`）を持つ要素には、同様に `@focus` 、`@blur` のいずれかのイベントを指定しているかを確認します。

> [mouse-events-have-key-events | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/mouse-events-have-key-events.html)

### no-access-key

`accesskey` 属性を設定した要素がないことを確認します。

> [no-access-key | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-access-key.html)

### no-aria-hidden-on-focusable

`aria-hidden="true"` がフォーカス可能な要素やその要素の親に指定されていないことを確認します。

> [no-aria-hidden-on-focusable | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-aria-hidden-on-focusable.html)

### no-autofocus

`autofocus` 属性を設定した要素がないことを確認します。

> [no-autofocus | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-autofocus.html)

### no-distracting-elements

`<blink>` や `<marquee>` などの気の散る要素がないことを確認します。

> [no-distracting-elements | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-distracting-elements.html)

### no-onchange

<!-- textlint-disable -->

現在このルールは非推奨扱いになっています。

<!-- textlint-enable -->

`@change` イベントを指定した場合は同様に `@blur` イベントも指定するか、`@blur` イベントだけの指定になっているかを確認します。

> [no-onchange | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-onchange.html)

### no-redundant-roles

デフォルトで `role` 属性をもつ要素に対して、更に `role` 属性を設定して冗長になっていないかを確認します。

> [no-redundant-roles | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-redundant-roles.html)

### no-role-presentation-on-focusable

`role="presentation"` がフォーカス可能な要素やその要素の親に指定されていないことを確認します。

> [no-role-presentation-on-focusable | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-role-presentation-on-focusable.html)

### no-static-element-interactions

インタラクティブな `role` を持たない要素（`div` や `span` など）にインタラクティブな操作を指定していないことを確認します。

> [no-static-element-interactions | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-static-element-interactions.html)

### role-has-required-aria-props

ある `role` 属性に対して必要なARIA属性がすべて設定されていることを確認します。

> [role-has-required-aria-props | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/role-has-required-aria-props.html)

### tabindex-no-positive

`tabindex` 属性で正の値（`1` 以上）が設定されていないことを確認します。

> [tabindex-no-positive | eslint-plugin-vuejs-a11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/tabindex-no-positive.html)

## 活用事例

eslint-plugin-vuejs-accessibilityを実際に活用している事例を紹介します。

[160個あったアクセシビリティのエラーをエンジニア全員で改善しました｜note株式会社](https://note.jp/n/ne87cb90e1039?gs=b7d8afc90ca5)

[アクセシビリティを普段の開発に定着させるためにやったこと #STORESアドカレ - STORES Product Blog](https://product.st.inc/entry/2022/12/24/143311)
