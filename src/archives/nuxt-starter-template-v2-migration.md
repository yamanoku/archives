---
title: vue-cliで作ったNuxtスターターキットでNuxt1 => 2に上げるやり方
description: Vue.js vue-cli nuxt.js nuxt2 初心者
date: 2018-09-21
author: yamanoku
source: qiita.com
category: tech
topic: frontend
---

## 追記（2018/10/26）

![vue init nuxt-community/starter-template がdeprecatedになったという告知](https://i.gyazo.com/e91df68c9bb73a2637ad2fb09da78d64.png)

`vue init nuxt-community/starter-template` が公式発表 10/14 で**deprecated**になったようです。

https://github.com/nuxt-community/starter-template/commit/82513c7306563b2dd42c7da3efed57803d25aea2

今後はこんな記事なんぞ参照せず**create-nuxt-app**を使うようにしましょう 👋👋👋

## Nuxt.js 2.0 Release !

![Nuxt公式ドキュメント VERSION 2.0.0 のIntroduction。「What is Nuxt.js?」の見出しがある](https://images.yamanoku.net/nuxt-starter-template-v2-migration/f8a82a7c384f33360aed3884a2fbdba8.png)

[Nuxt.js 2.0: Webpack 4, ESM Modules, create-nuxt-app and more! 💫
](https://medium.com/@nuxt_js/nuxt-js-2-0-webpack-4-esm-modules-create-nuxt-app-and-more-6936ce80d94c)

ついに来ました Nuxt2.0。ということで初心者でもすぐ体験できる Nuxt2 の世界の話をします。

たぶんこのあと`vue-cli`がちゃんとアップデートしてくれると思いますが、それまでの僅かな命だと思ってご覧ください。

## install

npm 5.2.0 以上だったら`npx`使うとラクチンです。

```bash
npx vue-cli init nuxt-community/starter-template nuxt2
? Project name nuxt2
? Project description Nuxt.js project
? Author yamanoku <0910yama@gmail.com>

   vue-cli · Generated "nuxt2".

   To get started:

     cd nuxt2
     npm install ## Or yarn
     npm run dev
```

```bash
cd nuxt2
yarn
```

宗教上の都合で`yarn`を使ってますが別に`npm`でも問題ないです

## package.json

現時点（9/21）ではこうなってると思います

```json
  "dependencies": {
    "nuxt": "^1.0.0"
  },
```

ここから２にあげる

```bash
yarn add nuxt
```

```json
  "dependencies": {
    "nuxt": "^2.0.0"
  },
```

## run

とりあえず動かしてみましょう

```bash
yarn dev
yarn run v1.9.4
$ nuxt
```

![ターミナル。INFO Building projectの下に、Builder initializedとNuxt files generatedのsuccessが緑で出ている](https://images.yamanoku.net/nuxt-starter-template-v2-migration/d790ef2cbcef0071a90531d7cbe157e2.png)

おっ動いてる

![ターミナルのERROR。Failed to compile with 1 errorsと、eslint-loaderのCannot read property 'eslint' of undefined](https://images.yamanoku.net/nuxt-starter-template-v2-migration/22a2bd507b01a49725c8221be7b93a88.png)

と思いきや`eslint`でなにやらコケてる

## fix

以前@potate4d さんの記事で拝見した[Migrate from isServer to process.server](https://qiita.com/potato4d/items/7b3119c88869d7622a7d#migrate-from-isserver-to-processserver)で該当箇所を修正してみる。

### before

```js
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
```

### after

```js
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config) {
      if (process.server && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
```

![ビルド成功のあと、READY Listening on http://localhost:3000 と出ているターミナル](https://images.yamanoku.net/nuxt-starter-template-v2-migration/b0864a60c02e61e7e90d58f43887f7ac.png)

エラー消えた！

![ターミナルでプロンプトから yarn build と入力している画面](https://images.yamanoku.net/nuxt-starter-template-v2-migration/c0cc3fead577df1aa4edcabc985866a7.gif)

`build`も動く

![ターミナルでプロンプトから yarn generate と入力している画面](https://images.yamanoku.net/nuxt-starter-template-v2-migration/394756cc959d76f9ccfa09fd63bfd1ac.gif)

`generate`も動く

以上！！！！！！！！！！！！！！！！！！

## etc

他なにかわかったら追記します。

### vendor があると警告が出る

```js
  build: {
    vendor: [
      'axios',
    ]
  },
```

こういうのがあったと思うんですが、Nuxt2 にアプデしてこのまま動かすと警告が出ます。

```
⚠ warn vendor has been deprecated due to webpack4 optimization
```

webpack4 の最適化による非推奨になったためだそうです。
