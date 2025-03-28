---
title: これからのWebが持続的になるための取り組み
description: 次世代Webカンファレンス当日にWebのサステナビリティについて考えてみました
date: 2023-12-16
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

## SDGsに関して思うこと

SDGsとは<em>Sustainable Development Goals</em>、すなわち持続可能な開発目標のことです。2015年9月に国連サミットで採択されたもので、2030年までに達成することを目標としています。17の目標があり、その中には「貧困をなくそう」「飢餓をゼロに」「すべての人に健康と福祉を」「すべての人に公正と包摂を」「ジェンダー平等を実現しよう」などがあります。

各企業でもサステナビリティとして事業が社会とどういう結びつけになっており、それをもってしてどう改善するかを示しています。例えば[Googleのサステナビリティ](https://sustainability.google/intl/ja/commitments/)では二酸化炭素、サーキュラーエコノミー、水資源についての取り組む宣言をしています。

私は社会におけるSDGsに対して、正直に言うと各達成目標について詳しくはないし、自身の生活との結びつきも理解できていないため関心はそこまで高くはないです。もちろん私の子供が将来どうなっているかを考えると、少しは関心を持っておいた方が良いのかなとは思っていますが、皆持続的な将来について考えられる余裕があるのかというと疑問ではあります。

## Webの持続性について考えてみる

社会に向けたSDGsへの関心は薄い私ですが、Webの持続性についてのことは関心があります。その関心は自分の仕事に関連するから、後世がWebを使い続けられるようになってほしいことよりも、単純に**Webそのものがこれからも長く使われてほしい**という個人的な欲求に起因しているものです。

ICT分野（サーバー、ネットワーク、端末含む）はコロナ禍を経てよりストリーミングやデジタル機器の消費が活発になっており、カーボンフットプリントも年々増大してきていると言われており[^1]、Web自体もこれに関連するものだと思っているため私自身が普段関わることとも密接に感じています。

[^1]: ["Lean ICT: Towards Digital Sobriety": Our new report](https://theshiftproject.org/en/article/lean-ict-our-new-report/)

そのためWebでは普段どういったことが起きているのか、持続的にしていくにはどういう取り組みをしていくことがいいのかを知っておく必要があります。

## Web周辺で何が起きているのかを知る

まずそもそもの何が起きているかを知るためのコンテンツとして[mozaic.fm](https://mozaic.fm/)というものがあります。Jxckさんという方がパーソナリティをしているPodcastで、今のWebにまつわる技術の話をしてくれています。その中で「Monthly Platform」というカテゴリがあり、myakuraさんをゲストにプラットフォーム側の取り組みを月1ペースで紹介してくれています。

内容自体をすべて理解・把握はできてはいませんが、今どういうことが議論されていたり、どういった人たちが関わっているか、今後はどういうものがリリースされていくのかを触れるには良いコンテンツだと思っています。というよりも、最新のことを詳細に触れているものはこれくらいしかないと思っている程にはありがたい情報源です。

日本語ベースでWebにまつわる情報源としては[株式会社ミツエーリンクスのBlog](https://www.mitsue.co.jp/knowledge/)やJavaScriptに比重が置かれている[JSer.info](https://jser.info/)、フロントエンドという領域であれば[Cybozu Frontend Weekly](https://zenn.dev/topics/cybozufrontendweek)なども挙げられます。

海外の情報源を追うためにも個人的な取り組みとしてはW3Cや各ブラウザベンダやJavaScriptエンジンのアカウント、[Intent to Ship](https://botsin.space/@intenttoship)を購読して発信を追ってみるようにもしています。

## Webサステナビリティに取り組むコミュニティグループ

Interopといったブラウザ自体は相互運用性に向けた取り組みを始めていますが、Webそのものにおけるサステナビリティの取り組みについては把握しておりませんでした。

W3Cには[Sustainable Web Design Community Group](https://www.w3.org/community/sustyweb/)というコミュニティグループがあります。その名の通りWebにおけるサステナビリティについてを議論するグループです。

Webサステナビリティの[Introduction](https://w3c.github.io/sustyweb/intro.html)にはWebでサステナビリティを行う重要性について以下のように記載されています。

> Most people are aware of "green" issues. However, fewer understand that digital products and services directly contribute to the climate crisis. With the Internet producing more emissions than the entire aviation industry, anyone with an online presence can get involved and make a difference.

> Collectively, by focusing on web sustainability, we have a real chance to make a global impact on the climate crisis going forward. Digital impacts are often proportional, with the biggest websites requiring the most change. However, larger organizations also have more resources to make that change. Plus, the Web often beats the physical world to solutions due to a focus on agility and continuous improvement.

Webのサステナビリティは、誰もが参加しやすいものになっており、物理的な世界よりもアジリティ（敏捷性）と継続的な改善が行われている強みについて触れられています。

また環境への配慮もさることながら、人的リソースへの投資による持続性の効果の期待、いわゆる人と社会と関連する部分（アクセシビリティ、パフォーマンス、セキュリティ）も持続性に寄与することが言及されています。

> - For example, good Web performance can improve user-experience while also reducing the physical impact of a site in terms of size, loading, rendering times, etc.
> - Similarly, good governance and ethical economic practices improve organizations. In turn, these organizations can also outperform their more traditional counterparts on a variety of indicators, including sustainability and long-term financial performance.

非機能要件は、事業の中では大事なことだと思われているがなかなかフォーカスしづらかった領域でもあります（蔑ろにしていい理由にはなりませんが）。そうした部分についても言及しているのは心強く感じます。

もちろんWebはインターネットというインフラの存在があって成り立っているいるため、それを維持することができなければWebは存在できません。そのため物理的な世界のサステナビリティについても意識していかなければならないことが書かれています。

今年の8月にはサステナブルなWebデザインのガイドライン「[Web Sustainability Guidelines](https://w3c.github.io/sustyweb/)」が策定されました。このガイドラインはワーキンググループではなくコミュニティグループによるもののためW3Cの標準化プロセスに則った公式のガイドラインではなく、今後も変更されていく可能性は大いにあることには注意です。

ガイドラインには多くの達成基準が含まれており[Web開発に関する項目](https://w3c.github.io/sustyweb/#web-development)もあります。Minify、Tree Shaking、HTMLを正しく書く、モバイルファーストデザイン、Dependenciesの管理など、普段の開発からも関われそうなことが多く提示されています。

このガイドラインに関する詳細はミツエーリンクスさんのコラム[^2]で紹介されていますのでご覧になってみてください。

[^2]: [サステナブルWebデザインを実践するためのガイドラインが登場 | コラム | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/column/20230926.html)

---

そして本日は[次世代Webカンファレンス2023](https://nextwebconf.connpass.com/event/300174/)が開催されます。

<figure>
  <img src="https://i.gyazo.com/f5b9f54a0220d41201bdde573a3e11c3.png" alt="fetch APIで第一引数に https://next-web-conf/2023 のURLを指定している" loading="lazy">
  <figcaption>画像引用元：次世代 Web カンファレンス 2023</figcaption>
</figure>

次世代Webカンファレンス2023は4年ぶりに開催される「これからのWebについてを真剣に議論する」場です。今年はWeb3、Passkey、Edge Computing、Tech Writingといった新たなセッションも含まれています。セッションメンバーも例年とは変わった面子になっているので、また新たなる視点での議論がされるのを楽しみにしています。当選したので私も参加してきます。

こうしたカンファレンスに参加できること自体ありがたいことだと思っています。私も何らかの形でWebの持続性に関する貢献ができるように無理なく取り組める形で探っていきたいなと思っています。
