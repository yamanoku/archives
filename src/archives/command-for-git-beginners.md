---
title: 初心者にGit教える時に必要最低限のCUIコマンド
description: 初心者にGit教える時に必要最低限のCUIコマンド
date: 2017-01-16
author: yamanoku
source: yamanoku.hatenablog.com
---

## 前提条件

ガチ初心者で Git の操作を CUI で学ぶため、基本 **１人で master で作業する** という「いやお前それ Git 管理じゃないだろそれ」という前提でやってもらます。いいんだよ細かいのはこれから学んでいけば。

作業前にリポジトリとかはどこかで作って置いたほうがよい（Github、Bitbucket、backlog など）。

## 必要なコマンド群

### リポジトリのクローン ... Git を使う設定

```bash
git clone https://xxxxxxxx/xxxx.git
```

<span style="font-size: 80%">※この時もしかしたらログイン ID やパスワード聞かれるかもだが、気にせず入力してください</span>

### 作業ファイル全追加 ... 作業したファイルを保存

```bash
git add -A
```

### コミットメッセージ ... 何の作業をしたかの記録

```bash
git commit -m "commit message"
```

### プッシュ ... サーバーにアップする

```bash
git push
```

### プル ... 人が作業した分を同期・ダウンロード

```bash
git pull
```

右のはあくまでもそうした意味ではなく、イメージ。だいたいこれで足りる。自分は足りた。

clone した後に「**作業 → add → commit → push**」を基本ローテーションとして作業。

必要に応じて他の初心者を入れて同様に作業させて、pull を理解してもらう。コンフリクト起こしたら、その時は都度修正、コミットなどしてくれ。

## 基本の骨組みはこのイメージでいいのではないか

実際 Git は様々なコマンドがあったりフローが存在して、いわゆる「ちゃんと理解できたらちゃんと使える」代物とも言われてるので、使いこなすにはある程度知識や経験が伴う。

とはいえ自分がやってきた中では基本このイメージさえできていれば、後はそれに付随する肉付きをしていけばいいんじゃないかと思っている。

たとえば **作業で push までしたけど実は違ったものが最新になっていたのでそれを直す** というのがあった際に、上記コマンドであれば作業後に再び add、commit、push などをする一連の流れがあるわけだが、そのままだと煩雑なコミットログになりかねない（別に慣れる間であれば気にしなくて良いのだが）

そのために Git revert だったり reset だったり checkout というコマンドが調べて出てくるのだが、そうした時に学んでいけばいいんじゃないかとは思う。

## それなりに親切な Git

あと Git は丁寧なので、たとえば新しくブランチを切って作業して何も考えず add、commit して push すると「リモートにそんな追従ブランチねーよ」と教えてくれて以下のコマンドを提示してくれます。

```bash
git push --set-upstream origin branch
```

アメリカ語だけど頑張って訳せばそれなりにちゃんと教えてくれてるんだというのがわかる。なので極端に怖がらなくてよいのだ。

極端な言い方をさせてもらえば、 **やり方次第でなんとかなる** のが Git である。

## Git 教育について知見が欲しい

ウチではこうやってるよ的なのを募集しています。

こちらからは以上です。
