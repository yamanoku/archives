---
title: まだ内容を把握できてないことを調査して、勉強会で発表するまでにやってきたこと
description: 内容を把握してないことを調査して勉強会で発表するまでにやってきたことの紹介です
date: 2025-04-04
author: yamanoku
source: qiita.com
noindex: true
---

こんにちは。[株式会社Schoo](https://corp.schoo.jp/)の技術戦略部門でフロントエンドエンジニアをしております[@okuto_oyama](https://qiita.com/okuto_oyama)です。

3/28（金）にVue.js日本ユーザーグループが主催する[Vue.js v-tokyo Meetup #22](https://vuejs-meetup.connpass.com/event/343338/)にて登壇・発表してきました。

![当日の勉強会会場でもあるユニークビジョン社で登壇・発表する大山の様子。登壇スライドの表紙が映し出されている。周囲には椅子に座っている聴衆が見える。室内には黒いテーブルと椅子が並べられており、天井の照明は白色で、部屋全体は白色、天井の一部も白色で覆われている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/16c4abb6-22a2-4076-abd5-cb109e6a8208.png)


当記事内の写真はVue.js日本ユーザーグループの[keigo](https://github.com/kspace-trk)さんに撮影していただいたものを掲載しています。感謝申し上げます。

リアクティビティシステムをテーマにした勉強会で、Vue.js以外にもAngular、Preact、Svelteにまつわるフレームワークでのリアクティビティについても触れることができる特別回でした。当日の様子は以下のnote記事をご覧ください。

[Vue.js v-tokyo Meetup #22 を開催しました｜jay-es](https://note.com/jayes/n/n79f587e5b0a0)

この勉強会で私はリアクティビティライブラリの[alien-signals](https://github.com/stackblitz/alien-signals)に関する発表となったのですが、実はこの登壇を迎える前までは**内容をあまり把握していないライブラリ**でした。

今回のテックブログでは勉強会で登壇するにあたり、どのように情報を収集し、そして聴衆に伝わるように資料を作成・発表したか、そのプロセスや考え方やTipsについてを共有していきます。

当日の発表したalien-signalsの詳細については以下発表スライド、関連する解説記事、勉強会のアーカイブ動画よりご覧になってみてください。

- [発表スライド（Speaker Deck）](https://speakerdeck.com/yamanoku/learning-alien-signals-from-the-evolution-of-reactive-systems)
- [解説記事（Zenn）](https://zenn.dev/comm_vue_nuxt/articles/about-alien-signals)
- [アーカイブ動画（YouTube）](https://www.youtube.com/watch?v=yM2Us-ZQHSE)

## この記事の対象読者

- 登壇経験はあるけど、準備の進め方にあんまり自信がない方
- 他の人がどんな風に登壇準備してるか、ちょっと覗いてみたい方
- 未知の分野で発表するための準備を知りたい方

## 1. 発表者として立候補する

まず勉強会で発表するにあたり**立候補することが何よりも大切です**。当たり前すぎますが、そもそも手を挙げないと発表できる機会すらありませんので…。

今回はVue.js日本ユーザーグループの[kazupon](https://github.com/kazupon)さんにalien-signalsにまつわる発表者を、[chibivue land](https://github.com/chibivue-land)のDiscordにて募集していたのがきっかけになっています。

![kazuponが「次の v-tokyo を考えているのですが、alien-signals がリリースされたので、この discord にいる人で、話してみたいという人います？」とDiscord上でコメントしている](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/5adef742-cb93-4327-be29-fd39ea1e8e6a.png)

この時点で自分自身がどこまで発表できるレベルにあるのかは未知数でしたが、**社内で活用しているVue.jsの内部に関連する部分であり**、（実装の詳細はさておき）**人に説明できるレベルで理解としておきたい気持ちがあった**ので手を挙げてみました。

## 2. 登壇に向けてのゴール設定

登壇が決まった後は発表に向けての準備をしていきます。まず最初に発表する「ゴール」をざっくり決めます。「これだけは持って帰ってほしい！」というメッセージです。

### 誰に何を伝えたいか？

今回のテーマではフロントエンド開発者向けに **「alien-signalsというものがある」** ことを最低限知ってもらうことをゴールとしました。

しかし、alien-signalsという言葉だけを知ってもらうだけであれば、URLを提示したり周辺情報を載せるだけでも十分です。それだけであればわざわざ時間を割いてまで人前で発表する必要はありません。

今回の発表では、リアクティビティライブラリの **「リアクティビティ」とはそもそも何か**ということから深ぼってみることにしました。そもそも前提となる事象を把握してもらった上で、alien-signalsは何をするのか、という導線になったほうが理解しやすいと考えました。

そうした考えから **「リアクティビティとは何をするものか」** **「リアクティビティを実現するalien-signalsとは何か」** という2つをゴールに再設定しました。

## 3. 情報をもとに効率よく探る

テーマが決まったら、必要となる情報をひたすらインプットしていく情報収集の段階です。

### 情報のインプット元を収集する

あまりわかっていないテーマとはいえ、闇雲に調べていくだけではあまり効率的でありません。次はどのように情報収集していったかを紹介していきます。

リアクティビティについて、まずは[Vue.jsの公式ドキュメントで書かれている箇所](https://ja.vuejs.org/guide/extras/reactivity-in-depth)を見に行きました。この時点では内容自体にはあまり注目せず、関連しそうなリンクやワードを収集していきます。

次にフロントエンド開発におけるリアクティビティの原始はどこからくるのか、ということでドキュメントに記載されていた[Knockout.js](https://knockoutjs.com/documentation/observables.html)や[Meteor](https://docs.meteor.com/api/Tracker.html)に関連するものを検索していきます。そこからさまざまなワードで検索していくと調べていくと、オブザーバーパターンやPub-Subといったデザインパターンが関連していることがわかってきます。

「Signals」というワードもリアクティビティと関連するもののため、モダンなフロントエンドフレームワーク名と併せて公式ドキュメントや作者・チームが言及している内容を調査していきました。この調査で[EmberJSもリアクティビティシステムを活用したAPIを開発している](https://guides.emberjs.com/release/in-depth-topics/autotracking-in-depth/)ことが知れたのは収穫でした。

alien-signalsについては、[GitHubリポジトリのREADME](https://github.com/stackblitz/alien-signals/blob/cda8328ce974ea26bf6be8f6968a9db188eec034/README.md)を見ていきます。そうするとVue.jsのリアクティビティシステムの改善についての記載があったので、それにまつわるPull RequestのURLを収集していきます。そのほか作者である[Johnson Chu](https://github.com/johnsoncodehk)氏のX上での関連しそうなポストも探っていきました。

また「[signal-polyfill](https://github.com/proposal-signals/signal-polyfill)」というワードから、Signalsというリアクティビティシステムを標準化していく動きも含まれているのがわかりました。

### 情報を整理していく

次に集めた情報をもとに整理していきます。[Notion](https://www.notion.so/)や[Obsidian](https://obsidian.md/)、[Cosense](https://scrapbox.io/)などのメモツールを活用し情報を一次元にまとめていったりします。

今回はGoogleが提供するAIリサーチアシスタントである[NotebookLM](https://notebooklm.google.com/)を活用して、収集した一次情報群をインプットさせていきました。

![NotebookLM Plusで「リアクティブシステムの入門編」というページが作られている。３つの枠に別れていて、１つは関連するサイトやYouTube動画が並んでいるソースに関連する部分。１つはソースを元にした概要が書かれているチャットで質問が投げられる部分。１つはStudioと書かれた音声ガイドやメモ機能が使える部分。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/d323c0fd-3ef3-41ab-962c-49d7871ce4d1.png)

NotebookLMの良いところは、ウェブサイトやPDFからのテキストデータだけではなく、YouTubeといった動画データも要約してまとめてくれるところです。関連するカンファレンスでの発表動画を読み込ませることができたので非常にありがたかったです。

まとめた情報についてはチャットから質問していくことで、LLM側が要約した内容を提供してくれるので自分の理解を深める部分でも大いに役立ちました。

### 構成（ストーリーライン）を考える

NotebookLMに要約してもらった情報を咀嚼し、どういった構成としていくかを考えていきます。

今回の発表のゴールでもある **「リアクティビティとは何をするものか」** **「リアクティビティを実現するalien-signalsとは何か」**　へ聴衆を導くため、以下のような構成にしてまとめてみました。

1. リアクティビティとはそもそも何を指すのか
1. 関連するデザインパターンの紹介（オブザーバーパターン、Pub-Sub）
1. フロントエンドにおけるリアクティビティの歴史
1. Signalsという概念とその活用事例
1. alien-signalsの紹介
1. TC39でのSignals標準化の取り組み

### 記事としてまとめる

今回、インプットした情報のアウトプットとして技術記事としてもまとめてみることにしました。記事を書かずに、そのままスライドへ作成に入ることもできましたが、以下の理由より記事としてまとめてみることにしました。

- 発表自体は10分程度しかないため、聞いた内容を改めて見直すときに詳細な説明が載っているテキストデータ側を参照して欲しいと思ったから
- 掲載するスライド上からはリンクへと遷移できないことがあるので記事のほうで参照してもらいたかった
- 公開されたテキストデータを提供することでLLMでの要約にも活用できると思ったから

さきほどの構成と要約した記事をもとに1週間程度で以下の記事を書き上げました。

[Webフロントエンドでのリアクティビティからalien-signalsを知ろう](/about-alien-signals)

この記事をリリースするにあたり、レビューと正誤確認についてを[ubugeeei](https://github.com/ubugeeei)さん、[ナイトウ](https://github.com/engineer-naito/)さん、[GANGAN](https://github.com/shinGangan)さんにご協力いただけました。改めてお礼申し上げます。

## 4. 「伝わる」スライドにこだわる

記事としてまとめたので次は発表スライドを作成していきます。

### まずはゴールを伝える

発表では最初にアジェンダを提示しておくとよいとされています。これは聴衆がこの発表では何を話すのかということがイメージしやすくなるためです。

私の発表ではアジェンダの代わりに、今回の発表ではどういうことを伝えたいと思っているのか、どういうゴールを目指しているのかを伝えるようにしてみました。

![This Session's Goalと書かれたスライドのスクリーンショット。「Understanding Reactivity System」「Learning about alien-signals」「To help you understand the next presentations」という３つの目的が書かれている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/53088cef-2cb9-47e8-be22-55af515cd7b3.png)


### 理解しやすくする工夫

今回は[Anthony](https://github.com/antfu)氏や[Kevin](https://github.com/sxzz)氏など海外からのVue.jsコアチームメンバーの参加者もいたので彼らにも伝わるようにスライド自体は英語に寄せてみました。とはいえ日本人参加者がメインの勉強会でもあるので、英語も難しい単語などは避けて簡単で理解しやすい[Plain English](https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AC%E3%82%A4%E3%83%B3%E3%83%BB%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%AA%E3%83%83%E3%82%B7%E3%83%A5)で記述するように心がけていきました。

一枚あたりの情報量も調整します。びっしりと文字で埋め尽くされたスライドを見ても内容はあまり頭に入ってこないものです。一枚で見せるものはできるかぎり情報を削減して要点だけ伝わるようにします。

リアクティビティに関する挙動についても、一枚の図を作るだけではなく、どういった動きで伝播していくのかがイメージしやすいようにスライドアニメーションをつけました。

![Push-Pullの概要をアニメーション付きでどのように変更がされて通知が来ているのかについてを説明しているスライド。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/88d0d7a1-2d38-438c-a4cb-f7e539a5b6f0.gif)

### スライドツールは使いやすいものを使う

スライドのツールは自分が使い慣れたものを使っていきましょう。Google SlidesやKeynote、[Slidev](https://sli.dev/)、[Marp](https://marp.app/)など自分に合ったものを選択していきます。私は一番使い慣れているGoogle Slidesで作成してみました。

スライド自体にも簡単なスライドテンプレートがあると、デザインに悩まず効率的に作れます。私は[Azusa 3](https://azusa3.sanographix.net/)のテンプレートを活用させてもらっています。非常に素敵なデザインです。

## 5. 練習を含めた最終準備
スライドができたら、練習と調整を重ねていきます。

### 声に出して練習

**絶対に、やったほうが、良いです**。

スライドに文字で起こしたものを見て発表すると、想定しているよりも時間がかかってしまうことのほうが多いです。今回は10分の発表時間でしたが、皆さんが想像しているよりも、10分というのはあっという間に終わってしまうものなのです。

当日に時間が大幅にオーバーしてしまうことを避けるためにも、手元にタイマーを置きながら喋ってみて実際にはどれくらいかかるかを体感で覚えておくと良いです。

大事なことなのでもう一度言いますが、**絶対に、やったほうが、良いです！**

### 資料は必要に応じて調整していく

発表練習をすると不要に感じる箇所が出てくるかもしれません。その場合は思い切って削ってみたり、違う形で言い換えてみてもよいでしょう。

ただし、発表のテーマにかかわる大事な部分を削らないように注意が必要です（今回の場合はゴールに辿り着くまでに必要な情報だけを取捨選択しました）。

### 事前にフィードバックをもらえるようにしておく

時間があれば、同僚やコミュニティメンバー等に一度聞いてもらうと客観的なフィードバックがもらえて参考になります。

ただし事前に聴いてもらうことは発表内容のネタバレとなってしまうので、念の為、そういったことが気にならない方へ依頼しておくとよいでしょう。

![プレゼンテーションを行う大山と、スクリーンを見ている聴衆。スクリーンには大山奥人の顔写真と名前、所属、ポッドキャストの情報、SNSアカウントが記載されている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/00e6a20a-e7c3-49e4-945f-ae46a1fcfac2.png)

## 6. 発表当日

いよいよ発表当日です。

### PCの接続チェックを済ませておく

発表前にPCの接続チェックがあればやっておきます。おそらくは初めての環境での接続のため、画面のミラーリングなどができていない場合があり、発表時に手間取ってしまわないようにしたいところです。

登壇中にSlackなどで業務に関する通知など見えてはいけないものを見せないようにもしましょう。以下記事でさまざまなTipsが紹介されているので参考にしてみてください。

[登壇中にうっかり見せちゃいけないもの見せないようにするための技術](https://zenn.dev/tenntenn/scraps/4b011b9e14dbf0)

### 緊張しないための工夫

接続チェックが終わり自分の発表までを待つ間は緊張するものです。

発表としての心構えとして「うまく話なさなきゃ」よりも「伝えたいことを伝えよう」という気持ちを持つことが大切です（そして何よりも楽しむ気持ちが大事です）。

足りない部分は解説記事を読んでもらう導線を作ることも、発表のハードルを下げるために必要なことでした。

他にも、始まる前に軽く深呼吸したり、好きな飲み物を手元に置いておいておく、聴いてくれている誰かを見て話すようにする、などして緊張を緩和していました。

![マイクを持ち話をする大山奥人の上半身の画像。スクリーンには大きく「signals」という文字が表示されている。左側には観葉植物が配置され、手前の机の上にはノートパソコンと飲み物が置かれている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/cad67b57-a739-444a-ae5c-d80a60ae5926.png)

### 質疑応答について

勉強会によっては質疑応答の時間が設けられることもあります。懇親会などで聞かれることもあるかもしれません。

質問に対しては分かる範囲で誠実に答えていきましょう。分からなければ「分かりません、改めて調べてみます！」と正直に答えておくことも大事です。

質問が来ることは私もまだ不慣れなものですが、自分の発表へ興味をもって聞いてくれたから質問してくれているのです。質問してくれた方への感謝を忘れないようにしましょう。

## おわりに

以上が今回の勉強会発表に向けて私が準備してきたことでした。

正直、登壇準備は毎回大変です…。普段の業務をこなす合間で準備することが基本なので、いかにスピード感をもって完成までもっていけるかが、最近考えている課題です。

ですが、そうした苦労を経て自分自身が一番理解を深められるのが登壇の良いところです。さらに、発表後に「わかりやすかったです！」「面白かったです！」と言ってもらえると、本当にやってよかったなと感じます（[alien-signals作者のJohnson氏も、発表内容を見ていただけていた](https://x.com/johnsoncodehk/status/1906949711157948618)ようです）。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">導入優しい <a href="https://twitter.com/hashtag/v_tokyo22?src=hash&amp;ref_src=twsrc%5Etfw">#v_tokyo22</a></p>&mdash; とと / totocalcio (@dir20634) <a href="https://twitter.com/dir20634/status/1905566682783121636?ref_src=twsrc%5Etfw">March 28, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Reactivity の説明めっちゃわかりやすい…<br><a href="https://twitter.com/hashtag/v_tokyo22?src=hash&amp;ref_src=twsrc%5Etfw">#v_tokyo22</a></p>&mdash; kzhrk//Kazuhiro Kobayashi (@kzhrk0430) <a href="https://x.com/kzhrk0430/status/1905568010317738086?ref_src=twsrc%5Etfw">March 28, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">導入からわかりやすい構成だからわかりやすいなぁ<br> <a href="https://twitter.com/hashtag/v_tokyo22?src=hash&amp;ref_src=twsrc%5Etfw">#v_tokyo22</a></p>&mdash; Naoki Haba (@naokihaba) <a href="https://twitter.com/naokihaba/status/1905568920066724283?ref_src=twsrc%5Etfw">March 28, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">alien-signalsのセッションめちゃ分かりやすかった！<br><br> <a href="https://twitter.com/hashtag/v_tokyo22?src=hash&amp;ref_src=twsrc%5Etfw">#v_tokyo22</a></p>&mdash; hiro (@hiro_xre) <a href="https://twitter.com/hiro_xre/status/1905569805144654244?ref_src=twsrc%5Etfw">March 28, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この記事が、これから登壇に挑戦する方や、準備に悩んでいる方の、ほんの少しでも参考になれば嬉しいです。

最後まで読んでいただき、ありがとうございました！
