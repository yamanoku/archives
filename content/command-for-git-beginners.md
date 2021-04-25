---
title: 初心者にGit教える時に必要最低限のCUIコマンド
description: 初心者にGit教える時に必要最低限のCUIコマンド
date: 2017-01-16
author: yamanoku
---

## 前提条件

ガチ初心者でGitの操作をCUIで学ぶため、基本 **１人でmasterで作業する** という「いやお前それGit管理じゃないだろそれ」という前提でやってもらます。いいんだよ細かいのはこれから学んでいけば。

作業前にリポジトリとかはどこかで作って置いたほうがよい（Github、Bitbucket、backlogなど）。

## 必要なコマンド群

### リポジトリのクローン ... Gitを使う設定
```bash
git clone https://xxxxxxxx/xxxx.git
```
<span style="font-size: 80%">※この時もしかしたらログインIDやパスワード聞かれるかもだが、気にせず入力してください</span>

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

cloneした後に「**作業 → add → commit → push**」を基本ローテーションとして作業。

必要に応じて他の初心者を入れて同様に作業させて、pullを理解してもらう。コンフリクト起こしたら、その時は都度修正、コミットなどしてくれ。

## 基本の骨組みはこのイメージでいいのではないか

実際Gitは様々なコマンドがあったりフローが存在して、いわゆる「ちゃんと理解できたらちゃんと使える」代物とも言われてるので、使いこなすにはある程度知識や経験が伴う。

とはいえ自分がやってきた中では基本このイメージさえできていれば、後はそれに付随する肉付きをしていけばいいんじゃないかと思っている。

たとえば **作業でpushまでしたけど実は違ったものが最新になっていたのでそれを直す** というのがあった際に、上記コマンドであれば作業後に再びadd、commit、pushなどをする一連の流れがあるわけだが、そのままだと煩雑なコミットログになりかねない（別に慣れる間であれば気にしなくて良いのだが）

そのためにGit revertだったりresetだったりcheckoutというコマンドが調べて出てくるのだが、そうした時に学んでいけばいいんじゃないかとは思う。

## それなりに親切なGit

あとGitは丁寧なので、たとえば新しくブランチを切って作業して何も考えずadd、commitしてpushすると「リモートにそんな追従ブランチねーよ」と教えてくれて以下のコマンドを提示してくれます。

```bash
git push --set-upstream origin branch
```

アメリカ語だけど頑張って訳せばそれなりにちゃんと教えてくれてるんだというのがわかる。なので極端に怖がらなくてよいのだ。

極端な言い方をさせてもらえば、 **やり方次第でなんとかなる** のがGitである。

## Git教育について知見が欲しい

ウチではこうやってるよ的なのを募集しています。

こちらからは以上です。