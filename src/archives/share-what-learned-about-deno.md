---
title: denoについて調べたことを共有する
description: denoについて調べたことについての話
date: 2019-06-27
author: yamanoku
source: scrapbox.io
category: tech
topic: frontend
---

## 今回のテーマ：[deno](https://scrapbox.io/yamanoku/deno)について

- 「デノ」と呼ぶそうです
  - 参考 => [/deno-ja/Deno の発音](https://scrapbox.io/deno-ja/Deno%E3%81%AE%E7%99%BA%E9%9F%B3)
- 個人的に気になってたので調べたことについて共有
  - 補足あればハッシュタグつけて実況などお願いします

## [deno](https://scrapbox.io/yamanoku/deno)について<br>

- ご存知の方 🙋
- 触ったことある方 🙋
- 使ってなにか作ったことある方 🙋

## 3 行で説明すると

- [Rust](https://scrapbox.io/yamanoku/Rust)でつくられてる
- [Node.js](https://scrapbox.io/yamanoku/Node.js)作者の[Ryan Dahl](https://scrapbox.io/yamanoku/Ryan_Dahl)によって生み出された
- サーバーサイド[TypeScript](https://scrapbox.io/yamanoku/TypeScript)ランタイム

## なぜ作られた？

- [jsconf.eu](https://scrapbox.io/yamanoku/jsconf.eu) 2018
  - [Node.js](https://scrapbox.io/yamanoku/Node.js)の作者である[Ryan Dahl](https://scrapbox.io/yamanoku/Ryan_Dahl)が設計上の問題点を語っていた
- [Design Mistakes in Node](https://tinyclouds.org/jsconf2018.pdf)
- [Node.js における設計ミス By Ryan Dahl - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2018/06/07/080335)
  - [Promise](https://scrapbox.io/yamanoku/Promise)がない
  - [gyp](https://scrapbox.io/yamanoku/gyp)（メタビルドシステム）採用の失敗
  - `node_modules`の複雑性
    - [![Image](https://gyazo.com/6f8d9b25b1f294b99ce052471010a25b/thumb/1000)](https://gyazo.com/6f8d9b25b1f294b99ce052471010a25b) いつもの図
  - モジュールの設計を後回し
    - 管理運営自体を `private controlled` にしてしまったこと
- それらを一切ゼロベースに戻して新しいランタイムを産み出した
  - それが[deno](https://scrapbox.io/yamanoku/deno)

## ロゴ

- [![Image](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hashrock/20190204/20190204030029.png)](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hashrock/20190204/20190204030029.png) 手書きロゴ
- [チンアナゴ](https://scrapbox.io/yamanoku/%E3%83%81%E3%83%B3%E3%82%A2%E3%83%8A%E3%82%B4)っぽいが
  - 日本ユーザーグループではそう言われていた
- どうやら恐竜らしい
  - `deno`は`dino`（恐竜）と音が似てる
  - 「夜の雨の中に立って、ソフトウェア開発の闇の戦いにストイックに立ち向かう」様子
  - 詳しくは[hashedrock](https://scrapbox.io/yamanoku/hashedrock)さんのブログを参照
    - [Deno 公式にアニメロゴが採用されたことと、許容的なリーダーの話 - No Regrets in Bathing](http://hashrock.hatenablog.com/entry/2019/02/04/040505)

## [deno](https://scrapbox.io/yamanoku/deno)のすごいところ

- [TypeScript](https://scrapbox.io/yamanoku/TypeScript)サポート
  - [JavaScript](https://scrapbox.io/yamanoku/JavaScript)でも動く
- [ES2015](https://scrapbox.io/yamanoku/ES2015)以降のモジュールシステム
  - `import`文が書ける！
- ブラウザ互換性
  - 最新のブラウザであれば実行できる
- セキュリティ面
  - デフォルトでネットワークアクセスもなければファイルの書き込み権限もない
    - オプションで変更できる
  - zsh
    - Deno requests network access to "127.0.0.1:8080".
    - Grant? [a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)]
  - 依存・中央集権型のそれではない
    - [npm](https://scrapbox.io/yamanoku/npm)いろいろ危ういよね
- キャッチされないエラーが[Promise](https://scrapbox.io/yamanoku/Promise)で起きたら即シャットダウン

## yamanoku が個人的にすごいと思った部分<br>

- 絶対パスから読み込んで実行する
- [Scrapbox](https://scrapbox.io/yamanoku/Scrapbox)はコードブロックで書くとアクセスできる
  - [/help-jp/コードブロック](https://scrapbox.io/help-jp/%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF)
  - [https://scrapbox.io/api/code/yamanoku/deno について調べたことを共有する/example.ts](https://scrapbox.io/api/code/yamanoku/deno%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E8%AA%BF%E3%81%B9%E3%81%9F%E3%81%93%E3%81%A8%E3%82%92%E5%85%B1%E6%9C%89%E3%81%99%E3%82%8B/example.ts)
    - にアクセスできる
- 組み合わせると
  - ドキュメントがあり
  - ソースコード自体も使える
  - 管理者同士での修正・変更も容易
- [Scrapbox](https://scrapbox.io/yamanoku/Scrapbox)に限らない話ではあるけど、こういう未来は楽しそう

## 懸念点

- 業務実用レベルではない
- まだまだ開発中
- コマンドもすぐ変わったり・追加されたりする
- できないこと
  - HTTPS
  - [Redis](https://scrapbox.io/yamanoku/Redis)以外の DB アクセス
  - linter（開発中）
  - [npm](https://scrapbox.io/yamanoku/npm)、[package.json](https://scrapbox.io/yamanoku/package.json)がない
    - これはもともとの目的部分

## コマンド

- `deno (run) [FILE]`
  - 実行
  - `--allow-net`でネットワークアクセス省略
  - `--allow-write`で書き込みアクセス有効化
  - `-r`でキャッシュクリア・再コンパイル
- `deno info [FILE]`
  - 情報
- `deno install [FILE]`
- `deno bundle [FILE]`
- `deno fmt [FILE]`
  - フォーマッタ
  - [Prettier](https://scrapbox.io/yamanoku/Prettier)が走る
  - [![Image](https://gyazo.com/36a3442d97fa62def07c7d091bb60759/thumb/1000)](https://gyazo.com/36a3442d97fa62def07c7d091bb60759)
    - さっき触ってみたら`503`で動かんかった
      - [https://github.com/denoland/registry/issues/115](https://github.com/denoland/registry/issues/115)
      - レジストリは[aws lambda](https://scrapbox.io/yamanoku/aws_lambda)で実装しているとのこと
    - なおった！
    - [https://github.com/denoland/registry/issues/115#issuecomment-506782521](https://github.com/denoland/registry/issues/115#issuecomment-506782521)

## 標準ライブラリ（2019/6/28 時点）

- [https://github.com/denoland/deno_std](https://github.com/denoland/deno_std)
  - `colors`
  - `datetime`
  - `encoding`
  - `examples`
  - `flags`
  - `fs`
  - `http`
  - `log`
  - `media_types`
  - [prettier](https://scrapbox.io/yamanoku/prettier)
  - `strings`
  - `testing`
  - `ws`
- [deno.land](https://deno.land/) registry のスクリプトをブラウザで見に行くとソースハイライトされて表示される
  - [https://deno.land/std/fs/mod.ts](https://deno.land/std/fs/mod.ts)
    - [![Image](https://gyazo.com/35a098a488edbec2f9378a1d40c4b181/thumb/1000)](https://gyazo.com/35a098a488edbec2f9378a1d40c4b181)
    - リンクになってるので辿れる

## yamanoku はどう思ったか

- [Node.js](https://scrapbox.io/yamanoku/Node.js)に変わる新たな希望となりうるのか
  - ぶっちゃけ技術がどうのこうのよりいかにそれを脱するか大きなエネルギー・衝動のが個人的にそそるものがある
    - この労力を[Node.js](https://scrapbox.io/yamanoku/Node.js)にコミットする方向もあるんだろうけど
    - `node_modules`の依存関係問題ばかりはどうしようもなさそう
- 実行するのが容易で敷居は低く感じられた
  - 昔、アホすぎて[Node.js](https://scrapbox.io/yamanoku/Node.js)動かすときに[babel](https://scrapbox.io/yamanoku/babel)も通さず`import`文を書いて動かなくて？　となった
    - 必要なものがすべて[deno](https://scrapbox.io/yamanoku/deno)にある安心感
- まだ本番で活用できるかは怪しいので趣味で追ってみる感
- 動かせるものは色々と散見されてるので触ってみてる
  - [https://github.com/olivewind/awesome-deno](https://github.com/olivewind/awesome-deno)
    - いつもの[awesome](https://scrapbox.io/yamanoku/awesome)
  - [https://github.com/hayd/deno_docker](https://github.com/hayd/deno_docker)
    - [Docker](https://scrapbox.io/yamanoku/Docker)で動かせる
  - [https://github.com/syumai/denoboard](https://github.com/syumai/denoboard)

## そのほか参考リンク

- [/deno-ja](https://scrapbox.io/deno-ja/)
  - deno 日本グループの[Scrapbox](https://scrapbox.io/yamanoku/Scrapbox)
- [https://deno-ja-slackin.herokuapp.com](https://deno-ja-slackin.herokuapp.com/)
  - deno 日本グループの[Slack](https://scrapbox.io/yamanoku/Slack)
- [https://denolib.gitbook.io/guide/](https://denolib.gitbook.io/guide/)
- [https://deno-ja.booth.pm/items/1317172](https://deno-ja.booth.pm/items/1317172)
  - [![Image](https://gyazo.com/c63b12633250d1182236890787093336/thumb/1000)](https://gyazo.com/c63b12633250d1182236890787093336)
    - 表紙がめっちゃかわいい
  - 次回の[技術書典](https://scrapbox.io/yamanoku/%E6%8A%80%E8%A1%93%E6%9B%B8%E5%85%B8)にて denobook 2 だすかは検討中とのこと
  - 出た！
    - [https://booth.pm/ja/items/1574063](https://booth.pm/ja/items/1574063)
    - [![Image](https://gyazo.com/5804a924d764618d5f82e6e93f38fa2f/thumb/1000)](https://gyazo.com/5804a924d764618d5f82e6e93f38fa2f)
