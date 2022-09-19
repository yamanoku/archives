---
title: Hubot弄ってみる 準備編
description: Slackでbotを動かすためのHubotを触ってみる話
date: 2016-01-17
author: yamanoku
layout: '../layouts/ArchivesPost.astro'
---

## 経緯

[割と本気で家庭用 Slack Bot を作ってみた - 八発白中](https://blog.8arrow.org/entry/2016/01/13/183349)

[slack で残業申告時間前になったら残業するやつは申告しろって通知する bot 作りたいんだけど、通知されたところで自分たちが申告するのを仕事一旦止めてすぐやれるかという人間性の問題について考えてる。](https://twitter.com/yamanoku/status/687067575998525440)

勉強がてら色々と弄ってみたい。とりあえず環境構築してみる。

## Hubot 導入前

そもそも node のバージョンとかが古いんじゃないのかと思って-v してみたら 3.0 くらいのやつだったので、アップデートしたい、というか環境周り色々と整えたいと思ったので自分の中で Hubot 入れる以前の話になった。

[nodebrew で Mac の Node.js 環境をスッキリさせた - akiyoko blog](https://akiyoko.hatenablog.jp/entry/2015/06/20/132239)

nodebrew 入れた方がよさそう、とのことだったので上記参考に node とか npm とかアンインストールして再度インストールした。

個人的に`~/.bash_profile`に追加するので躓きかけた。vim で直接入力してやった。

その後、動かすサーバーとテスト環境が欲しかったので Heroku と slack を登録した。特に課金とかしなくていいです。

## Hubot 導入

導入に先駆けてとりあえずググってみた。以下のが色々と参考になった。

[slack と連携する hubot を 3 分でインストールする（動画付き）](https://bitwave.showcase-tv.com/slack%e3%81%a8%e9%80%a3%e6%90%ba%e3%81%99%e3%82%8bhubot%e3%82%923%e5%88%86%e3%81%a7%e3%82%a4%e3%83%b3%e3%82%b9%e3%83%88%e3%83%bc%e3%83%ab/)

まず Hubot のジェネレーターをインストール

```bash
$ npm install -g generator-hubot
```

そのあと Hubot を動かすためのディレクトリを作成。yamabot というのを作ります。

```bash
$ mkdir yamabot
$ cd yamabot
$ yo hubot
```

そんでこの Hubot を定義するために以下のが尋ねられます

- Owner（管理者）
- Bot name（Hubot の名前）
- Description（Hubot の内容）
- Bot adapter（Hubot と連携させる Web サービス）

Bot adapter の箇所には slack と入力しましょう。

動作確認としてローカルで動くかどうかを確認。
自分がつけた Bot 名が表示されてたら OK

```bash
$ bin/hubot
```

## Heroku にログイン、プロジェクト登録

ここまでの状態で Heroku にアップしてみたいのでまずはログイン。
そのあと Hubot 用のプロジェクトを作ります。
作った後は Git で add、commit、push しちゃいます。

```bash
$ heroku login
$ heroku create yamabot
$ git add -A
$ git commit -am "first commit"
$ git push heroku master
```

## Slack API 所得

次に slack に移動して API を取得してきます。

[http://my.slack.com/services/new/hubot](http://my.slack.com/services/new/hubot)

[![Image from Gyazo](https://i.gyazo.com/10c5e0bcff205475bac1a3e7142025b8.png)](https://gyazo.com/10c5e0bcff205475bac1a3e7142025b8)

名前を入力して決定を押すと API が表示されますのでコピーします。

[![Image from Gyazo](https://i.gyazo.com/323ce8c5a952d8090a05a53b4b665c26.png)](https://gyazo.com/323ce8c5a952d8090a05a53b4b665c26)

コピーした API を以下`<Your token>`に入力して登録します

```bash
heroku config:set export HUBOT_SLACK_TOKEN=<Your token>
```

あと hubot の Heroku に登録した app url を以下で入力、確認して
HUBOT_HEROKU_KEEPALIVE_URL に[your bot app url]に入力、登録。

```bash
$ heroku apps:info
...
Web URL: https://yamabot.herokuapp.com/
...
$ heroku config:set HUBOT_HEROKU_KEEPALIVE_URL=[your bot app url]
```

Heroku のダッシュボードに入って登録したプロジェクトの Settings→Domains でも確認できます。

## Slack を見る

[![Image from Gyazo](https://i.gyazo.com/6e2b8677ec2aa84f9291027947e6b42f.png)](https://gyazo.com/6e2b8677ec2aa84f9291027947e6b42f)

登録した slack を見ると slack bot 以外にも自分が登録した Hubot が居るかと思われるので
ひとまず適当なチャンネルを作って Invite します。

そこで bot 名を入力した後 ping と入力。
直後に bot が PONG と返せたらたぶん設定完了。

[![Image from Gyazo](https://i.gyazo.com/d347e4c0add0fb1e3e4408e875061132.png)](https://gyazo.com/d347e4c0add0fb1e3e4408e875061132)

自分は色々右往左往しながらやったのでちゃんと設定がキレイにできてるか怪しいのですが
bot が登録されて PONG 言ってるしまあ良いか的な感じです。

もちろん、あっさり行く人はそれでいいです。いかなくても大体なんとかなります。

## 次回の予定

CoffeeScript いじって色々発言させるのとか。一応の最終目標としては定時に何かしらの報告をしてくれるようにしたい。

進捗あったらまた書きます。
