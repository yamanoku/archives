---
title: "Vueユーザーから見るReact Tokyoコミュニティ"
description: "Vueユーザーから見るReact Tokyoコミュニティ"
date: 2025-12-10
author: yamanoku
source: zenn.dev
noindex: true
---

この記事は[React Tokyo Advent Calendar 2025](https://qiita.com/advent-calendar/2025/react-tokyo)の10日目の記事です。

こんにちは、[yamanoku](https://x.com/yamanoku)です。本日はReact Tokyoのアドベントカレンダー企画ということで、コミュニティ参加者から見たReact Tokyoの取り組みの印象と考えてみたことについてを書いてみました。あくまでも、運営メンバーではなく一個人の解釈としてお読みいただけると幸いです。

React Tokyoへの所感記事は[Wonder](https://x.com/iwonder118)さんも書かれているので併せてご覧になってみてください。

[(ほぼ)1年間毎月React Tokyoミートアップイベントを参加してみての所感](https://zenn.dev/iwonder/articles/2c27abb35eaa4e)

## 自己紹介

改めまして、[yamanoku](https://x.com/yamanoku)と申します。一児の父で会社員をやっている者です。
技術コミュニティウォッチャーとして興味のある国内・国外の技術コミュニティに参加してそれぞれの活動を追っています。主に[Vue.js Japan User Group](https://vuejs-jp.org/)のコミュニティや[chibivue land](https://github.com/chibivue-land)コミュニティで活動しています。

## なぜ技術コミュニティをウォッチしているのか

主にWebフロントエンドにまつわる最新の技術動向を追うのが趣味なのですが、その技術を実際にどう活用しているか・どのような感想をもっているかについても興味があります。技術コミュニティを見に行くことでそれらに関する情報収集ができると思って参加しています。もちろんウォッチャーとしてただのテイカーとなるだけでなく、自分から提供できる情報や交流する材料があれば、積極的に発信しています。

React Tokyo以外の国内技術者コミュニティには以下のところに参加しています（過去参加していたものも含む）。

<details>
<summary>コミュニティ一覧</summary>

- chibivue land
- Svelte Japan
- Deno Japan
- ウェブアクセシビリティ
- A11y Tokyo Meetup
- Rabee UI
- Angular日本ユーザーの会
- 複雑GUIの会
- Meguro.css
- Meguro.es
- DIST
- 東葛.dev
- Funabashi.dev
- PWA Night
- We Are JavaScripters!
- React Native Japan
- designsystems.tokyo
- CA11Y
- JAMStack Tokyo
- Saitama.js
- すくすく！子育てエンジニアMeetup

</details>

## 国内のReactコミュニティ動向について

React Tokyoについて触れる前に、まずコロナ禍以前の国内のReactコミュニティの動向について触れてみたいと思います。

国内ではReact Japan User Groupというグループがあり、connpass上ではReact.js meetupという勉強会イベントが開催されていました。[初回イベント](https://reactjs-meetup.connpass.com/event/11232/)は2015/04/24に開催され、定員150人のところ392人もの申し込みがあったことから、かなり期待値の高いイベントであることが分かります。他にも[ReactJS Tokyo](https://www.meetup.com/ja-jp/reactjs-tokyo/)というグループでの勉強会もありました。

しかしながらコロナ禍を経て、国内のReactコミュニティのオフラインでの活動は難しくなっていきました。React Japan User Groupにより、[React Conf Japan](https://reactconf.jp/2020/)というカンファレンスも企画されていましたが、[コロナ禍の影響で中止](https://reactconf.jp/2020/entries/cancellation-announcement/)となりました。

コロナ禍におけるフロントエンド技術コミュニティはAngular、Vue.js、Svelteがそれぞれ活動場所をつくりオンラインでの活動を中心としていましたが、Reactについてはフロントエンド勉強会で発表題材としては上がるものの、「人が集まれるコミュニティの場」はほとんど見かけなかった印象があります。
このコミュニティとしての場所がなくなったことに要因として、場所として機能していた[Slackの無料プランでのログ保持期間が定められてしまった](https://slack.com/intl/ja-jp/help/articles/27204752526611-Slack-%E3%81%AE%E3%83%95%E3%83%AA%E3%83%BC%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E6%A9%9F%E8%83%BD%E5%88%B6%E9%99%90)ことも影響していると考えています。

コロナ禍や副次的な要因でReactコミュニティは以前よりも見かけなくなってしまいましたが、関西でのReactユーザーコミュニティの[React Osaka](https://react-osaka.connpass.com/)は昨年8月より活動再開しています。[Remix Tokyo Meetup](https://www.meetup.com/ja-jp/remix-tokyo/)もプレイベントを経て同年9月からコミュニティ活動が始まっています。

## React Tokyoの登場

昨年の12月より[React Tokyo](https://react-tokyo.vercel.app/)というコミュニティが登場しました。
このコミュニティは[Daishi Kato](https://x.com/dai_shi)さんが「Webアプリ開発塾」「Meteor Fan」「React Fan」として続けていたもので、その延長線上で新たに立ち上げられたコミュニティです。コミュニティを作るに至った経緯については以下の記事で詳しく書かれています。

[React Tokyoというコミュニティを作ろうと思ったワケ](https://zenn.dev/dai_shi/articles/9f2760086fb31a)

私はX(旧Twitter)でもReact Tokyoの存在を知り、技術コミュニティウォッチャーとしてDiscordサーバーへ参加してみることにしました。

<figure>

<img src="https://res.cloudinary.com/zenn/image/fetch/s--ra_xsO7f--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/d32d25246e5a05f936883c26.png%3Fsha%3Dc676df8a2b5e0fde5d7d89f49288ceb4004e3d6c" alt="yamanokuが「こんにちは。Xの宣伝を見かけて参加しました。yamanokuと言います。よろしくお願いします。業務ではVue.js/Nuxtメインですが、ReactやNext.jsほかフレームワークにも興味があるフロントエンドエンジニアです。」と記載しポートフォリオサイトのURLも添付して自己紹介している">

<figcaption>React TokyoのDiscordサーバーへ参加したときのログ</figcaption>
</figure>

## React Tokyoの取り組み

ようやく本題に入りますが、コミュニティ参加者として見てきたReact Tokyoの取り組みにどういうものがあったかを紹介していきます。

### オンライン上で運営チームが精力的に活動している

React TokyoのDiscordへ入ってから印象に残っていることは、運営メンバーの活動がとても精力的であることです。

ほかのコミュニティの運営メンバーがみな消極的というわけではないのですが、オンラインでは参加者がなかなか発言しないこともあり、人は居るはずなのにどこか寂しくなってしまうことがあります。React Tokyoでは[Daishi Kato](https://x.com/dai_shi)さんや[Teruhisa](https://x.com/t6adev)さんなど運営メンバーが中心となり、話題提供や反応、Discordの使い方や勉強会のアナウンスなどを精力的に行っています。

そのおかげもあってか現在では運営メンバー以外でも「交流部屋」というチャンネルでReactやそれにまつわる技術について雑談するようになってきています。

### Discord内での交流しやすさをデザインしている

コミュニティの活動場所がSlackからDiscordへ徐々にシフトしていく中で、React TokyoではDiscord内で様々な施策を講じています。

まず最初にDiscordへジョインすると、チャンネル参加やロール付与のためのカスタマイズ設定が行われています。これにより興味のある領域のチャンネルに参加したり、特定のメンバー向けの通知やメンションができるようになっています。

![チャンネルやロールのアクセスをするためのカスタマイズ画面。興味のあるコミュニティ活動、興味のある技術領域、興味のあるライブラリ・フレームワーク、英語チャンネルを閲覧するか、のそれぞれにチェックを入れることができる。](https://res.cloudinary.com/zenn/image/fetch/s--sJqz71L---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/e9a68993946b31c67ca9cab5.png%3Fsha%3D9f30c13907ca7a99c5bce13f3e7f033c36e5f424)

オンライン上の交流において、フロー型のUIであると、特定の話題を出しても別の話題が盛り上がるとそれが流れていってしまったり話題が大きくなりすぎて発散してしまうことがあります。それを防ぐために「情報・質問部屋」というフォーラムページが用意されています。個別に部屋が作成されていくので気になった話題をフォローして後からウォッチしにいくことも可能です。

<figure>

<img src="https://res.cloudinary.com/zenn/image/fetch/s--Ltb0A4F_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/c5a53dd625b2e4e5a9acaa8c.png%3Fsha%3D7df442fffc4e0a5adb9148de2f23bd131c5a4563" alt="情報・質問部屋のフォーラムページ。新しいページを作成できるフォームや並び替えやカテゴライズ制御するメニューがある。作られたフォーラムページにはReact Tokyoサポートメンバー募集、セキュリティ小部屋、Misskeyっぽい何かを作る、Jotai小部屋、Waku小部屋、認証小部屋が写っており他にも多くのページが存在している。">

<figcaption>ほかにもState of　React 2025、CSS設計・戦略、再就職へのアドバイスなどジャンルは多岐にわたる</figcaption>
</figure>

オンライン上の発言も特定メンバーだけにならないよう「リーダーボード」を導入し、1週間のうちで発言量が多かったメンバーを表彰するBotも導入されています。

<figure>

<img src="https://res.cloudinary.com/zenn/image/fetch/s--Ltb0A4F_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/c5a53dd625b2e4e5a9acaa8c.png%3Fsha%3D7df442fffc4e0a5adb9148de2f23bd131c5a4563" alt="react-tokyo-botが過去1週間で発言が多かった人を表彰したリーダーボード。1位から3位までは個別に表彰され、4位以降はまとめて表示されている。yamanokuも4位以降に受賞している。">

<figcaption>まだ3位以上に入賞できたことはない</figcaption>
</figure>

このようにDiscordを単なるオンラインの集まる場所としてのみ使うのではなく、メンバー同士の交流や発信を促すための様々な施策を講じていることがわかります。

### コミュニティスポンサーの募集をしている

React Tokyoではコミュニティスポンサーを募集しています。勉強会の会場提供としてのスポンサーなどはよく見かけますが、コミュニティそのものへのスポンサーを募集しているという点では珍しいなと感じています。12/10現在、Goldスポンサーとして6社、Silverスポンサー1社、Bronzeスポンサー1社が協賛しています。

![Goldスポンサーに株式会社キッカケクリエイション、株式会社Rebase、Dress Code株式会社、株式会社カケハシ、株式会社ALGO ARTIS、MOSH株式会社。Silverスポンサーに株式会社オプティム。Bronzeスポンサーに株式会社バニッシュ・スタンダード。](https://res.cloudinary.com/zenn/image/fetch/s--N3XGj4fc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/95f8f720470992d107a3842f.png%3Fsha%3D96512ca8d40671ed34a54b79eda123170bd50946)

また、全国各地でのミートアップ開催も視野に入れた地方開催スポンサーも募集しています。興味のある企業・団体は以下ページより申し込みを受け付けているようです。

[Sponsors - React Tokyo](https://react-tokyo.vercel.app/sponsors)

### 勉強会もさまざまな形態で開催している

React Tokyoではオンライン以外でもオフラインの勉強会も定期的に開催されています。開催についてはDiscord内でアナウンスをされたのちにconnpass上で申し込みを受け付けています。React Tokyoでのオフラインイベント参加においてDiscordサーバーに参加していることが基本的に必須とされています。

[React Tokyo - connpass](https://react-tokyo.connpass.com/)

これまで15件ものイベントが開催されています。イベントの中で主に開催されているミートアップイベントではメインテーマとなるセッション発表があったのちに、それに関連するグループディスカッションが行われているようです。

通常の勉強会では、発表ののちに懇親会で議論するということがよくありますが、React Tokyoでは参加者同士でテーマに沿ったディスカッションが行われるので、参加者はただ聞くだけのイベントにならないような工夫が見られます。

ミートアップの難点としては参加者が多い影響もあり参加枠がすぐに埋まってしまうことがあります。オフラインイベントに参加したことのない初参加枠も設けられていますが、それでも埋まってしまうくらいには人気が高いようです。枠から溢れてしまってもキャンセルによる繰り上げ参加を待つことも可能ですが、できる限り早くに参加申し込みをしておきたいところです。

他にもLT会、フロントエンドカンファレンス北海道との共同イベント、Reactビギナー向けの勉強会、[温泉合宿](https://react-tokyo.connpass.com/event/373684/)（！）もあったようです。

#### 私が参加したオフラインイベントについて

私は[LT会](https://react-tokyo.connpass.com/event/350715/)に参加してきたことがあります。業務ではReactを触る機会がないのですが、普段Reactや関連するメタフレームワークに慣れ親しんでいる人たちはどのようなことを発表するのかが気になったので参加してみました。

当日は1枚のスライドを用意し3分間で発表するという形式でした。参加前に発表者だけのチャンネルが用意され、作成したスライドを投影するため、事前に運営へ提出しました。知り合いが居ない状態でReactコミュニティの皆さんの前で発表するのは緊張しましたが、参加者の皆さんが発表に関心を持っていただけたのが嬉しかったです。

LTの内容はReactのAPIにまつわるものから、自作でアプリケーションを作ってみた話、業務上での活用事例、哲学的な話（？）までさまざまな内容が発表されていました。全員が発表した後にはそれぞれのスライド内容について皆で質疑応答や意見交換が行われたのも新鮮でした。

当日のイベントレポートについては以下より確認できますのでご覧ください。

[React Tokyo LT大会 2025-05-17 イベントレポート](https://zenn.dev/react_tokyo/articles/826d680796b32f)

## コミュニティは一日にして成らず

React Tokyoではこのようにオンライン・オフラインともに様々な活動していることが分かりました。現在の活発なコミュニティの雰囲気は、運営メンバーと参加者たちの相互的な取り組みによって形づくられてきたものだと改めて感じています。

コミュニティが成熟していく過程では、参加者が「受け手」から「担い手」へと変化していく瞬間があります。最初は静観していた人が、質問に答える・議論へ参加する・イベント登壇するなど、主体的に関わっていきます。このような動きが増えて特定のメンバーだけではない形で循環していくことで、コミュニティはより持続的なものへと成長していきます。

コミュニティの運営というものも営利団体としてではなく、多くがボランティアで運営されているものです。運営メンバーの個人的な都合で積極的な運営ができなくなることも大いにあります。今後コミュニティを作って運営していきたい人たちにとっても、どのように無理なく続けていくかは重要な問題です。

私が参加する[東葛.dev](https://toukatsu.dev/)というコミュニティの運営者が、コミュニティをうまく続けるコツについて書いた資料があります。地方コミュニティとしての前提はありますが、参考になる考え方は多いと思うのでぜひご覧になってみてください。

[地方でエンジニアコミュニティを成功させる秘訣 - 大吉祥寺.pm 2025 | ドクセル](https://www.docswell.com/s/hk_it7/Z446WL-community-toukatsu-dev)

またコミュニティの参加者としても、ただお客さんとして居るのではなく、自らでも発信することでより深くコミュニティに関わることができると思っています。いきなり何かを発信することが難しくても、最初はなんらかの発言にリアクションをするだけでも良いと思います。

コミュニティの貢献もOSSへの貢献と同じように、さまざまな角度ややり方で支援できると思っています。コミュニティに還元できることはないか自分なりに探してみてください。

そんなわけで私はReact Tokyoコミュニティへの貢献として、この記事を執筆してみました。

## フロントエンドコミュニティ同士が繋がる未来

ここからは個人的な見解を述べてみたいと思います。

皆さんは国内Vue.jsコミュニティの最大イベントでもある[Vue Fes Japan](https://vuefes.jp/)をご存知でしょうか。
元々はVue.jsとNuxtにまつわるカンファレンスイベントとしてスタートしましたが、Viteの登場以来さまざまなエコシステムに影響を与え、Vue Fes Japanは今やVue.jsやNuxtだけにとどまらない幅広い技術を扱ったカンファレンスになっています。

それを象徴するかのように今年はVue.js・Viteクリエイターの[Evan You](https://x.com/youyuxi)氏とReactコアメンバーの[Dan Abramov](https://bsky.app/profile/danabra.mov)氏、Svelte・Viteコアメンバーの[dominikg](https://bsky.app/profile/dominikg.dev)氏を招いての[パネルディスカッション](https://vuefes.jp/2025/speaker?section=panel-discussion#panel-discussion)が行われ、話題になりました。

私はこの、Viteを起点としてさまざまなフロントエンドコミュニティたちが介在するようになったことから、**各コミュニティ同士の垣根を超えて、お互いの関心を深めあっていくことができるのではないか**と考えています。

フロントエンド開発の潮流が激しかった過去においてはそのようなことはあまり考えられなかったのですが、今はそうした動きも落ち着き、いかに安定したアプリケーションを提供できるかに重きを置いていく時代になってきていると考えています。

それぞれの技術優位性で反目し合うことよりも、どのような解決法があるのか・どういう課題があるのかをお互いに共有し合い、より良いものを相互的に作っていくことができるのではないかと考えています。

今から何が解決できるかということは正直わかりません。ですが、それぞれのことを知っていくことは、今後のフロントエンド開発にとってマイナスなことにはならないのではないかと私は考えています。**だからこそ業務でReactを使わない私も、React Tokyoに参加しています。**

## あなたもReact Tokyoに参加してみませんか

この記事を読んで興味を持たれた方は、ぜひReact TokyoのDiscordサーバーを覗いてみてください。
まずは自己紹介チャンネルで自己紹介をして、全体の雰囲気を見るだけでもいいですし、リアクションとしてスタンプを押すだけでも立派なコミュニティ参加になります。

https://discord.com/invite/5B9jYpABUy

また来年2月28日には[React Tokyoフェス2026](https://react-tokyo.vercel.app/fes2026)というReact Tokyoコミュニティのお祭り型イベントが開催されます。
ポスターセッションや参加者同士の交流ブース、スポンサービスやライブコーディングセッションなどの企画があるそうです。Discordサーバーに参加したのちconnpass上で参加申し込みができます。

[React Tokyo フェス 2026 - connpass](https://react-tokyo.connpass.com/event/366003/)

今後もReact Tokyoコミュニティの発展を参加者として応援していきたいと思います。

ここまでご覧いただきありがとうございました。
