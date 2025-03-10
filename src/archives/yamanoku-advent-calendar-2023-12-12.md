---
title: 何がjQueryを負債たらしめているのかを考察する
description: jQuery本体は更新されていてもjQueryライブラリは新規で生まれなくなりましたね
date: 2023-12-12
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

現代のフロントエンド技術的負債の要因となっているものはいくつかあると思いますが、その中でも共通で「[jQuery](https://jquery.com/)」が挙げられるかなと思っています。長期間運営されているサービスであればまだまだ現役なのではないでしょうか？かくいうウチもそうです！

2023年現在でのフロントエンド開発であれば今は新規でjQueryを選択肢としてあげることはほとんどないと思っていますが、今よりもJavaScriptのサポートが貧弱だったころ、かつてのブラウザ間の齟齬を吸収する点で大変重宝されていたようです。

JavaScript自体が進化してきたのもあり、jQueryでできた表現が単体のJavaScriptとWeb APIとで表現できるようになってきている[^1]ので、jQueryでなければならない必要性は薄れてきていると思います。

[^1]: [You Might Not Need jQuery](https://youmightnotneedjquery.com/)

jQueryもまたInternet Explorerのように、Webの歴史において重要な役割を果たした技術だったのですが、時代の流れとともにその役割は薄れていき、技術的負債の代表格として忌み嫌われる存在になってきています。

しかしよく忘れがちなことですがjQueryでは現在でも開発が続けられており、機能開発やセキュリティバグ対応がされています。さらに次期バージョンとなる4.0へのロードマップを見るにやるべきことはほぼほぼ完了しており、リリースも近いように見えます。

> ![12月現在での4.0.0へ向けた対応マイルストーンの達成率は99%](https://i.gyazo.com/e212c7f5437ea0ddf5e3d9a3b3112cda.png)
>
> [4.0.0 Milestone - jquery](https://github.com/jquery/jquery/milestone/7)

すでにメンテナンスや機能開発が行われなくなってしまったものならまだしも、今現在も開発が続けられているものに対して「負債」という言葉を使うのは少し違うような気がします（どちらかというと枯れた技術になっています）。それよりも目を向けるべき見直さなければならない箇所はjQueryそのものではなく、**その周辺のエコシステム**なのではと思っています。

jQueryでの開発が盛り上がっていた時、おそらくjQuery単体だけで開発をされていたわけではないと思います。jQueryをベースにしたライブラリ・プラグインが開発されており、それらを組み合わせて開発を行っていたのではないでしょうか。ポップアップウィンドウであれば[Lightbox2](https://lokeshdhakar.com/projects/lightbox2/)、スライダーであれば[slick](https://kenwheeler.github.io/slick/)などが有名でしょう。

[jQuery UI](https://jqueryui.com/)や[jQuery Mobile](https://jquerymobile.com/)といったUIフレームワークもあり、レガシーな環境ではこのデザインベースのものがまだ残っているのではないでしょうか。こちらは2021年の時点でメンテナンスモードになったり、使用が非推奨となったり[^2]しています。しかしながらそうした部分が広範囲になっており、変更したくとも手をつけられない状態が続いているのではないでしょうか。

[^2]: [jQuery UIとjQuery Mobileがついに開発終了、今後はメンテナンスのみに。jQuery本体は引き続き積極的に開発 － Publickey](https://www.publickey1.jp/blog/21/jquery_uijquery_mobilejquery.html)

そういったライブラリやプラグインに依存している場合、そもそもが開発が止まったものもあるかもしれず、jQuery本体のアップデートと共に追従できていない可能性もあります。本体と一緒にアップデートできているものは今どれだけあるのでしょう（あるいは存在するのでしょうか？）。

jQuery自体のエコシステムと捉えるかは微妙ですが、jQueryの呼び出し方が多彩になっていることも技術的負債となっている原因の1つだと思います。これは直接jQueryソースを管理していたり、あるいはCDNで呼び出していたり、あるいは[Bower](https://bower.io/)といったパッケージマネージャで管理しているものが混在しているなど、その時その時で管理がおろそかになってしまい、バージョンが複数存在してしまっている問題もあります。

今年の[Vue Fes Japan 2023](https://vuefes.jp/2023/)でのVueクリエイターであるEvan Youの発表では、Vue3の進化に伴って失敗したことの1つとしてエコシステムライブラリへの追従を考えられていなかったこと[^3]と分析していました。Vue2向けで作られたライブラリがVue3用に対応できていないことがあり、そのライブラリを使用するプロジェクトでのVue3への移行がなかなか進まないという問題もあるようです。現在はこの失敗を元に[Vue Ecosystem CI](https://github.com/vuejs/ecosystem-ci)を導入してリリース前にエコシステムへのテストを行うなどの対策を取っているようです。

[^3]: [VueFes Japan 2023イベントレポート](https://gihyo.jp/article/2023/11/vuefes-japan-2023-report#gh6XUpRzap)より「失敗（mistake）したこと - エコシステムライブラリへのインパクトを見誤っていた」

エコシステム周辺が充実していることはそれだけ参入障壁が低くなり、コミュニティとしても活発になっていき、結果としてエコシステム全体に良い影響を与えていく正のループが回っていけるのだと思います。逆にそこが蔑ろにされつつあるものは徐々に人が離れていき、真逆の負のループができてしまいかもしれません。エコシステムの充実度合い、導入しやすさや外しやすさという観点は技術選定における指標になるのかもしれません。

フロントエンドの技術的負債解消について取り組む際は、メインとなる技術についてをどうにかするかを考えるのではなく、まずその周辺のエコシステムによって今どのようにソフトウェアを構築しているのかについてを見直し、必要なのか不必要なのか、あるいはより容易に代替できる方法はないかを考えた上で、負債解消に取り組んでいくのが良いと思っています。
