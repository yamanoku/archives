---
title: config.jsonのhostnameをいちいち変えなくてもいい方法
description: config.jsonのhostnameをいちいち変えなくてもいい方法について
date: 2015-12-24
author: yamanoku
layout: '../layouts/ArchivesPost.astro'
---

## 背景

gulp-webserver の便利機能の１つに hostname に自分の PC の IP アドレスを設定すると、他端末でアクセスしても見れる（ただし wifi 接続時）っていうのがあるんですが、他の人と作業していると hostname 設定ママで渡しちゃうとエラーが吐いちゃうので非常に不便ですねという話。

`.gitignore`で無視させようにも管理下ファイルなので無理、というところを解決してくれるいいやつありました。

## 解決策

terminal とか iterm で Git 管理下のディレクトリで入力。

```bash
git update-index --assume-unchanged config.json
```

これで config.json の変更があっても Git で無視されるので安心ですね。

ちなみに解除は以下を入力です。

```bash
git update-index --no-assume-unchanged config.json
```

## 参考

[既に git 管理しているファイルをあえて無視したい - Qiita](https://qiita.com/usamik26/items/56d0d3ba7a1300625f92)

## 追記 2016/02/02

いちいち引っ張りだすものめんどいのでエイリアス登録した。

`~/.gitconfig`の`[alias]`箇所で以下登録。

```bash
jsonchange = update-index --assume-unchanged config.json
jsonnochange = update-index --no-assume-unchanged config.json
```

命名のセンスが無いのはご容赦ください。

[git で便利なエイリアス達 - Qiita](https://qiita.com/peccul/items/90dd469e2f72babbc106)
