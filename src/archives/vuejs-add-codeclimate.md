---
title: CodeClimateで.vueファイルも判定させる
tags: CodeClimate Vue.js JavaScript YAML
date: 2017-08-29
author: yamanoku
source: qiita.com
category: tech
topic: frontend
---

## 概要

vue.js で作ったプロジェクトを[CodeClimate](https://codeclimate.com/)で試そうと思ったのだけれど、
通常時では `.vue` ファイルは CodeClimate の判定に入らない。

## 解決

### 公式ドキュメント

https://docs.codeclimate.com/v1.0/docs/eslint#section-extensions

> Extensions
> You can configure our ESLint Engine to analyze the file types you’d like by configuring the extensions in your `.codeclimate.yml` , as shown in the example below:

```yaml
eslint:
  enabled: true
  config:
    extensions:
      - .es6
      - .js
      - .jsx

ratings:
  paths:
    - '**.es6'
    - '**.js'
    - '**.jsx'
```

eslint エンジンに対応するように、こういう感じで追加していけとのこと。

### .codeclimate.yml

以下をプロジェクトルートに追加、push する。

```yaml
---
engines:
  duplication:
    enabled: true
    config:
      languages:
        - javascript
      extensions:
        - .js
        - .vue
ratings:
  paths:
    - '**.js'
    - '**.vue'
```

### リポジトリを追加する

「Open sourse」→「Add a repository」で移動して、対象のリポジトリを追加する。

判定、通過しているか確認。

### 結果

判定できた！　ちなみに今回は細かい `.eslintsrc` ほか、詳細な eslint 設定などはしてないです。

## 備考

試したプロジェクト：[https://codeclimate.com/github/yamanoku/vue_portfolio_templete](https://codeclimate.com/github/yamanoku/vue_portfolio_templete)

作った経緯：[よく分かってなくてもVue.jsで動くモノが作れた話](./beginner-make-vuejs-spa)
