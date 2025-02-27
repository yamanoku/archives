---
title: サイトをリニューアルしたい話（計画）
decription: ポートフォリオサイトをリニューアルしたかったみたいです
date: 2016-08-20
author: yamanoku
source: yamanoku.hatenablog.com
---

[![Image from Gyazo](https://i.gyazo.com/f887aabba3a1b03e65af671af4399435.png)](https://gyazo.com/f887aabba3a1b03e65af671af4399435)

計画としてではあるのですが、自分のポートフォリオサイトをリニューアルしたいなという話です。

## リニューアルについて

### 現状把握

とはいっても内容を全てを新しくするとかそういうわけではなくて、色々分散している内容をどうまとめようかみたいなところの話です。ちなみに内容はこんな感じ。

- oyamaokuto.org（自サイト）
  - 過去成果物
  - ABOUT ページ
  - CONTACT ページ
  - 日常ブログ（同サーバー内 WordPress）
- SNS・外部ツール
  - Twitter
  - facebook
  - tumblr（リブログ用）
  - tumblr（yamagraph.tumblr.com）
  - google+
  - github
  - github ページ（視覚的コーディング実績）
  - はてなブログ（技術ブログ）
  - その他放置気味の SNS アカウント（Instagram, pixiv とか）

個人的に見せたいなと思っているものは

- 過去の制作実績
  - コーディング成果物
  - デザイン・イラスト関連
- ブログ
  - 日常ブログ
  - 技術ブログ（ここ）
- SNS
  - tumblr
  - github
  - Twitter, Facebook, google+

それで、更新頻度が高いものをなるべく目につくようにしたいなと思っており、

- ブログ
- tumblr
- 制作実績, GitHub
- 過去の制作実績
- その他 SNS アカウント

みたいな優先順位はつけたいなと思っています。そう考えるといっそのこと wordpress で
運用したほうが管理云々は早い気はするんですが、静的サイトと共に育ってきた身としてはいままで通り html 手書きおじさんのままで居たい（もちろん色々テンプレートとかは使うと思います）。

でもブログは WordPress のままで行くかなと思います（もしくは静的サイトジェネレーターを使うか）。ここの技術ブログは結局日常のほうと合体するかもしれません（前ははてなに引っ越そうかと思っていましたが）。

### 分散型の運用

今までのやり方としては自サイトをベースとして各コンテンツにリンクさせるという分散型に近いやり方をとっていました。

自サイトにアクセスしてくれたら、各コンテンツにはリンクできるようにしているが、逆パターンは自サイトへの誘導のみなのが多いので、それぞれでも行き来ができるようにしたいけど SNS だとその辺は難しそう。なのでこれまで通り自サイトのみに誘導する形で良さそう。

運用面では、ここまで分散させてはいましたが割と並列的にやれてるのかなとは思っています。ですがせっかく整理する予定なので、もうちょっと分かりやすくしたいなとも思っています。

### コンテンツ管理の整理

そういう訳で今一度コンテンツ管理を整理してみます。

- <b>自己紹介、下記コンテンツへのリンク</b> ... 自サイト
- <b>ブログ関係</b> ... WordPress（ほか CMS）
- <b>コーディング</b> ... GitHub
- <b>デザイン・イラスト</b> ... Tumblr
- <b>SNS 関連</b> ... 通常通り。但し自サイトのみの誘導リンクだけ。

こんな感じですかね。一応自サイトとブログはイコール紐付ける可能性が高いです。更新頻度があるブログがサイトみたいなのが見栄えは良さそうなので。

ちょっと怖いのはどこかしらのサーバーが落ちた時に見れなくなる問題ってのがあり、せっかく人に教えたのにここは見れたけどこっちは見れないって時ですかね。でも全部でその対応をとるのも頭の良いやり方ではなさそうなので、そこはしょうがないという感じにしたいです。

### ていうか何で今更みたいな話

最近仕事の方で同業務職の募集をかけていて、選考する中で意見を出す時（最終決定権は上の方なので）色々とポートフォリオサイトをもつ人のを見てきて、そういや自分のってどのようなふうにしていたかなと感じたのがきっかけです。

最初は自サイトのみで運用すればいいでしょとか思っていましたが、SNS が台頭してきて更新頻度もそうですし、そもそもの住民の数みたいなのも変わってきて、自分というものを発信する場が変わってきており、そのままほったらかしにしていたみたいなノリがあります。

世の中には分散型メディアなるものがあるようで、SNS 上で発信して自サイトをもたないというやり方もあるそうです。

[いまさら聞けない、分散型メディアとは - VISUAL FEED - Medium](https://medium.com/visual-feed/%E3%81%84%E3%81%BE%E3%81%95%E3%82%89%E8%81%9E%E3%81%91%E3%81%AA%E3%81%84-%E5%88%86%E6%95%A3%E5%9E%8B%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E3%81%A8%E3%81%AF-a38fa3644787)

しかしながらカスタマイズ性やサーバー内での設定ほか細かなことをやりたい欲もあるめんどくさい性分ですし、自分の名刺をまさか SNS アカウントで出すのは個人的にはどうかなというのもあるので自分のドメインを持って自サイトはもちたいです（ただドメイン名は変更するかも）

### 進捗について

実は手の方も少し動かしています。タスクランナーのほうでカタカタと（以下長めです）

[![Image from Gyazo](https://i.gyazo.com/95fef128852c222213820526706138aa.png)](https://gyazo.com/95fef128852c222213820526706138aa)

あくまでまだ仮なので少しずつ詰めていきたいなと思います。こちらからは以上です。
