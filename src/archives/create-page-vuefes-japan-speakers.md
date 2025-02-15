---
title: Vue Fes Japanの歴代スピーカー一覧を見られるページを作った
description: Vue Fes Japanの歴代スピーカー一覧を見られるページを作成しました
date: 2024-08-31
author: yamanoku
source: zenn.dev
noindex: true
---

今年の10月19日に開催される[Vue Fes Japan 2024のタイムテーブル](https://vuefes.jp/2024/#timetable)が公開されました。このタイムテーブルを眺めているときに、[RubyKaigiの登壇者まとめサイト](https://imaizumimr.hatenablog.com/entry/2024/08/20/204241)を作っている方を見かけて歴代のVue Fes Japanのスピーカー一覧を見られるページを作ってみようと思って作りました。

[Vue Fes Japan Speakers](https://vuefes-japan-speakers.nuxt.dev/)

サイト内容自体はシンプルで、全スピーカーを一覧で見られるもの、開催年とスピーカーそれぞれの発表一覧を見られるものを用意しています。

- [https://vuefes-japan-speakers.nuxt.dev/](https://vuefes-japan-speakers.nuxt.dev/)
- [https://vuefes-japan-speakers.nuxt.dev/2024](https://vuefes-japan-speakers.nuxt.dev/2024)
- [https://vuefes-japan-speakers.nuxt.dev/speakers/Evan You](https://vuefes-japan-speakers.nuxt.dev/speakers/Evan%20You)

現時点で以下Vue Fes Japanサイトの情報が含まれています。2019年は開催されておりませんが、スピーカー情報は公開されているので含めるようにしてみました。

- [Vue Fes Japan 2024](https://vuefes.jp/2024/)
- [Vue Fes Japan 2023](https://vuefes.jp/2023/)
- [Vue Fes Japan Online 2022](https://vuefes.jp/2022/)
- [Vue Fes Japan 2019](https://vuefes.jp/2019/)
- [Vue Fes Japan 2018](https://vuefes.jp/2018/)

---

スピーカーのデータ自体は特段一元管理されていなかったので、各年のサイトデータから参照して取得し、名前などは一部修正して[APIとして取得できるようにまとめています](https://github.com/yamanoku/vuefes-japan-speakers/blob/6b31cabb9a8d13b50fc88267d46e37ae5ed862fc/server/api/speakers.ts)。

取得ができるようになったので現時点で公開されている発表数をまとめてみました。

| イベント                  | 発表数 |
| ------------------------- | ------ |
| Vue Fes Japan 2024        | 25     |
| Vue Fes Japan 2023        | 34     |
| Vue Fes Japan Online 2022 | 34     |
| Vue Fes Japan 2019        | 17     |
| Vue Fes Japan 2018        | 11     |

中止となってしまった2019年からしばらく経ってから開催された2022年より発表数が2倍にも伸びているのがわかります。

2024年は今後公開されるであろうスポンサーセッション分を入れると31件で、すべて合算すると127件になりそうです。

---

今回のサイト構築で使用したフレームワークはVue関連ということで[Nuxt](https://nuxt.com/)を使用しています。`compatibilityVersion` の設定よりNuxt4の機能を使えるようにしているため、`app` ディレクトリを使用した構成になっています。

```sh
app
├── app.vue
├── components
├── composables
└── pages
    ├── [year]
    │   └── index.vue
    ├── index.vue
    └── speakers
        └── [name].vue
```

このサイトのビルド先には以前[NuxtHub](https://hub.nuxt.com/)を活用した事例記事を見かけていたので自分も試してみようと思い、今回のサイトをNuxtHubでデプロイしてみました。具体的な導入方法は下記記事を参考ください。

[Co-Edo終了報告サイトをCloudflareで開発するとき使った NuxtHub がとっても便利！](https://zenn.dev/comm_vue_nuxt/articles/nuxt-hub-cloudflare-2025-coedo-org)

今回作成したソースも公開しておりますので、併せてご覧になってみてください。

[yamanoku/vuefes-japan-speakers: 歴代のVue Fes Japanのスピーカーを一覧できるサイトです。](https://github.com/yamanoku/vuefes-japan-speakers)
