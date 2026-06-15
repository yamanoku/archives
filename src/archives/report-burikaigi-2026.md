---
title: BuriKaigi 2026に登壇しました
description: BuriKaigi 2026に参加＆登壇したのでそのレポートです
date: 2026-01-14
author: yamanoku
source: note.com
noindex: true
---

![「BuriKaigi 2026」で「たかがボタン、されどボタン」というテーマで登壇した筆者の様子。登壇スペースで笑顔でダブルピースしている。](https://i.gyazo.com/8f19f09c48134713ea89cfe5fb5a7db1.jpg)

1/9、1/10に開催された[BuriKaigi 2026](https://burikaigi.dev/)の2日目に参加・登壇しました。この記事はその参加レポートです。

## BuriKaigiと私

そもそもBuriKaigiとは何か。公式サイトには以下のように書かれています。

> 年に一度、寒ブリの季節にソフトウェア開発・ITにおける各分野で最前線で活躍するエキスパートを全国から北陸へ招待し、技術の旬を持ち寄り、講義・ディスカッションを行う勉強会です。
>
> https://burikaigi.dev/#about

「BuriKaigi」という名前でスタートしたのは[2017年](https://toyama-eng.connpass.com/event/45745/)からのようですが、元の富山合同勉強会で辿ると2015年にスタートしていたようで、今年は11周年になる勉強会のようでした。

BuriKaigi自体は2023年に、自分が運営するポッドキャスト「[お元気ですか.fm](https://creators.spotify.com/pod/profile/ogenkidesuka-fm)」パーソナリティのtakanoripが登壇したことで存在を認知しました。登壇後はポッドキャストにて振り返っていました。

[vol.18 - 2023年の抱負と通信制美術大学の話 - お元気ですか.fm | Podcast on Spotify](https://open.spotify.com/episode/5TSPgv4s9ZG90Pz2nEdgx4?si=774KxrnITn6p-kOPwBzEUQ&nd=1&dlsi=ef6cdda4d4dc40b5)

元々は.NETやJavaに関する勉強会だったのですが、2023年ごろからフロントエンドの話題で登壇されている方が居たり、知り合いが遊びに行っていたり、富山はいいところだよ！という話を受けて、じゃあ自分も参加してみたいな〜という軽い気持ちでプロポーザルを申し込んでみたところ、まさかの登壇になりました。ありがとうございます。

## 当日発表の振り返り

[たかがボタン、されどボタン ～button要素から深ぼるボタンUIの定義について～ by やまのく | トーク | BuriKaigi 2026 #burikaigi - fortee.jp](https://fortee.jp/burikaigi-2026/proposal/8d122b65-c135-41d2-8f1c-315a499843c6)

ボタンにまつわるUIをHTMLの[button要素](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/button)、関連する仕様やアクセシビリティの観点からどのように実装していくと良いのか、という話をしました。

この発表の元のきっかけとなったのは2023年にひとりアドベントカレンダーを実施していたときにbutton要素について思うことがあったのでそれについてを１記事としてまとめました。

[button要素のtype属性について気にしたくないけどそうもいかない話](./yamanoku-advent-calendar-2023-12-04)

この話自体はどこかで一回発表するネタとして膨らませたいなと思っていたところでBuriKaigiという場所を選んでみました。
フロントエンドエンジニア中心の勉強会でこの話題に出すよりも、フロントエンド以外の人にHTMLの基礎的なことを知ってもらいたいという気持ちで出してみました。

結果として聴講者の方からは良い反応をいただけました。これを機に見直すきっかけとなれたら幸いです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">たかがボタン、されどボタン<br><br>ボタン1つにフォーカスしたテーマ、私は実装する人じゃないけど考えるべきことがたくさんあっておもしろかった！<a href="https://x.com/hashtag/burikaigi_s?src=hash&amp;ref_src=twsrc%5Etfw">#burikaigi_s</a> <a href="https://x.com/hashtag/burikaigi?src=hash&amp;ref_src=twsrc%5Etfw">#burikaigi</a></p>&mdash; Miki (@mya73mk) <a href="https://x.com/mya73mk/status/2009855094540599359?ref_src=twsrc%5Etfw">January 10, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ボタンの話聞いてよかった。<br>歴史長いアプリだとdiv でボタン作ってること多いので、正直に言うと実のところ&lt;button type=&quot;button&quot;&gt;知らなかった<br> <a href="https://x.com/hashtag/burikaigi_s?src=hash&amp;ref_src=twsrc%5Etfw">#burikaigi_s</a></p>&mdash; k-yoshida (@8maim0) <a href="https://x.com/8maim0/status/2009855434002444622?ref_src=twsrc%5Etfw">January 10, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

トーク内容自体はすぐに形になったのですが、スライド作りについてはかなり難航していました。というのも内容の理解度を上げるために実際に触れるボタンを作ったり、絵として見てもらう場面を多くつくる必要があったため、どのように見せるのがいいかについてを考えた結果、非常に時間がかかってしまいました。

コードの生成自体はClaude Codeに手伝ってもらったり、画像自体はNanoBanana Proに作ってもらったり、自分のスライド作成でもっとも生成AIに活躍してもらったスライドになりました。お礼申し上げます。

想像していたよりもなかなか難産となりましたが、これも良い経験になったなと思い返しています。

<script defer class="speakerdeck-embed" data-id="0f957e5845c847b4a350cbc8007682e1" data-ratio="1.7753623188405796" src="//speakerdeck.com/assets/embed.js"></script>

実際のインタラクションが体験できるSlidev版、スピーカーノートとしての[ドキュメント版](https://yamanoku.net/burikaigi-2026/)も作成しているので好きな媒体でご覧ください。

## BuriKaigiに参加してみて

今回はじめてBuriKaigiに参加してみたのですが、BuriKaigiの紹介文にもあるように何らかのジャンルだけに囚われない様々な技術の話を聴ける場所だったと思いました。これまでフロントエンドにまつわるカンファレンスのみに参加するだけだったので、知らない分野に触れることが出来てとてもよい刺激となりました。

t_wadaさんによるTDD Boot Camp、TinyGoを使ったキーボード開発やAIアプリケーションを構築するワークショップ、アンカンファレンス、毎年？恒例のライブコーディング対決など、セッションやLT以外にも多様なイベントが開催されていました。

自分の発表以外にも各種セッションを聴講していましたが、最後に参加した[なぎせゆうき](https://twitter.com/nagise)さんの「[『農家は Replace() されました』で始める競技プログラミング！](https://fortee.jp/burikaigi-2026/proposal/a194d4cb-39dd-450f-a13d-1e9324947ee9)」はゲームをしつつ参加者と一緒にモブプログラミングしてみるセッションでした。型にはまらない自由度の高い時間だったなと感じています。
ゲーム自体は知っていたのですが、実際にコードを書いてみるのと競技プログラミングとして最速の動きを皆で探り探り進めていく場に一緒に居れたのは貴重な時間だったと感じます。

東葛.devのこうのさんによる[Enumにまつわる発表](https://www.docswell.com/s/hk_it7/KLVM77-enum-burikaigi)後、スタッフの方がものすごい勢いでEnumについて熱い自分語りをしていてビビったのはいい思い出です。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">なんかスタッフの人が急にEnumについて早口で喋リ出して情報量にびびった <a href="https://x.com/hashtag/burikaigi_m?src=hash&amp;ref_src=twsrc%5Etfw">#burikaigi_m</a></p>&mdash; やまのく🐶 (@yamanoku) <a href="https://x.com/yamanoku/status/2009865454937092370?ref_src=twsrc%5Etfw">January 10, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

イベント中には富山の銘菓や弁当を食べることもでき、イベント中も富山を体感できました。

<figure>
<img src="https://i.gyazo.com/d9c39079263a424182988b65750bc807.png" width="360" alt="銘菓「反魂旦」を持っている">
<figcaption>休憩コーナーにあった反魂旦という銘菓。<br>お土産にも購入しました。</figcaption>
</figure>

<figure>
<img src="https://i.gyazo.com/2c78c967e0e347e217dfb24857be5c1a.png" alt="alt="ぶりかまめしの弁当の中。厚いぶりかま、わかめ、白エビ二匹、刻みショウガが酢飯の上に載っている。"">
<figcaption>ランチセッションで配られたお弁当。<br>ブリかまの厚さにずっと驚きながら食べていました。</figcaption>
</figure>

クロージングで共有されたBuriKaigiへの参加率（スタッフ含め）は驚異の98%とのことで、このイベントが非常に期待値が高いものだったことが伺えます。

![申し込み数が318、参加者数が313で参加率が98%と書かれているスライド](https://i.gyazo.com/6def944233712903fea78fecf263b39d.png)

## 富山観光

実は今回の富山入りでは私の家族（妻と娘）も一緒に旅行という形で付いてきました。1/9に富山入りし家族で観光してきて1/10は妻と娘が別行動で富山を堪能していました。一緒に行動していた初日は[富山市ガラス美術館](https://toyama-glass-art-museum.jp/)と[廻る富山湾 すし玉](https://sushitama.co.jp/)に行ってきました。

![富山市ガラス美術館の外観](https://i.gyazo.com/44c686430ca66de9122ff5bdedea3c32.png)

![富山市ガラス美術館の吹き抜け空間。木材とガラスが調和した現代的な内装に、天窓から自然光が差し込む。](https://i.gyazo.com/6a634c03f19abd9e80830ec2c74ae483.png)

<figure>
<img src="https://i.gyazo.com/ee58bdc8370e83aa8370ca5d20ad1324.png" alt="淺原千代治の「ファンタジー」というガラス作品。透明なガラスの中にブルーと赤紫色の帯が層のように重なり、虹のようなアーチを描いている。">
<figcaption>昨年<a href="https://scrapbox.io/yamanoku/2025-09-05">北海道旅行</a>した時にも見かけた淺原千代治氏の作品。</figcaption>
</figure>

![すし玉の看板。富山湾沿岸と北陸の漁港を描いた木製の地図。赤い点で漁港が示され、背景には波模様があしらわれている。](https://i.gyazo.com/36704c362613f4852df8c5fdd4ae1471.png)

![黒い長方形の皿に盛り付けられた色とりどりの握り寿司。マグロ、イカ、エビ、白身魚、カニ、ホタテなど多彩なネタが並ぶ。](https://i.gyazo.com/046b9e0662e591c13941a24d52d887e7.png)

![皿に置かれている白エビの唐揚げ。レモンが添えられている。](https://i.gyazo.com/e6179aa00ac35c946725c9f57e531696.png)

1/10はBuriKaigiに参加する前に富山市役所の展望台に上がり立山連峰を眺めてきました。この季節では珍しく快晴だったとのことだったので、キレイな立山連峰を生で見ることができて非常に感動しました。

![富山市役所展望台から見る立山連峰と市街地の風景。澄み渡った冬の青空の下、富山市のビル群の背後に、雪を頂き白く輝く立山連峰が雄大に連なっている。](https://i.gyazo.com/5397e3d0518c199ba6ce162da571555f.png)

泊まっていたホテルの朝飯会場で調理スタッフのおじさんに今日はどちらに行かれるんですか？と聞かれたので自分はBuriKaigi、妻と娘は別で富山観光です、と伝えたら発表頑張ってくださいとのことでのど飴をもらいました。

<figure>
<img src="https://i.gyazo.com/d99fc0beb17bc76f71d9c35a566f4d8b.png" alt="Kanroのボイスケアのど飴が２つ">
<figcaption>のど飴のおかげで無事に発表することができました。<br>ありがとうございました！</figcaption>
</figure>

最終日はあいにくの天気でしたが、無事に家に帰ることができました。家についてからはお土産を堪能しておりました。

<figure>
<img src="https://i.gyazo.com/0889351c18dfe3f071ef62cf511ef338.png" alt="皿に盛られた3切れの鱒寿司">
<figcaption>妻が買ってきた鱒の寿しまつ川の鱒寿司を食べました。</figcaption>
</figure>

## おわりに

というわけでBuriKaigiスタッフ・関係者、そして参加者の皆様お疲れ様でした。来年も素晴らしいイベントとなれることを期待しております。
