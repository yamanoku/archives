---
title: 交差点を増やした発表をしていきたい
description: カンファレンスの発表で技術自体とは直接は関連しない事象を交えた内容を発表することで気をつけたいこと
date: 2023-12-18
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

---

<strong>今回の記事は私自身が課題として感じていることを整理することを目的としており、特定の個人やそれにまつわる発言や発表についてを言及・批難するものではありません。</strong>その点をご理解いただいた上でお読みください。

---

私は、特定の言語や技術をテーマとした勉強会やカンファレンスにて直接は関連しない事象について発表する際に、それらがどのように関連しあっているかについてを着目しています。今回の記事ではその関連性を「**交差点**」と名付けることにします。

交差点とは具体的に何を指すのでしょうか。例をあげると、私が関心を持っているアクセシビリティについてがそれに挙げられます。より分かりやすくするため、比較的規模の大きい（参加者が多い）技術カンファレンスにて、私がCFP（Call for papers）を出して当選した発表事例を紹介します。

- [Vue.js meets Web Accessibility - Vue Fes Japan 2019](https://vuefes.jp/2019/sessions/yamanoku/)（イベント自体は中止により未発表）
- [アクセシブルなフロントエンド開発のこれまでとこれから - JSConf JP 2021](https://jsconf.jp/2021/talk/the-past-and-future-of-accessible-front-end-development)
- [Vue.js でアクセシブルなコンポーネントをつくるために - Vue Fes Japan Online 2022](https://vuefes.jp/2022/sessions/yamanoku)
- [画面遷移から考えるNuxtアプリケーションをアクセシブルにする方法 - Vue Fes Japan 2023](https://vuefes.jp/2023/sessions/yamanoku)
- [画面遷移のアクセシビリティ課題を解決しうる Navigation API への期待 - JSConf JP 2023](https://jsconf.jp/2023/talk/yamanoku-1/)

これらの発表において、Vue.jsのイベントはVue.jsとアクセシビリティとの交差点を、JSConf JPはJavaScript（あるいはWeb API）とアクセシビリティとの交差点を意識して話してきたつもりです。

私以外の発表でもこうした交差点が見受けられそうな発表はいくつかあります。しかしそれらの発表においては、その技術とアクセシビリティとが交差している発表だと思えないものも存在します。メインである言語や技術自体と関与していない話をすることは私にとっては、あえて強い言葉を使うのなら、**価値のない発表**だと思っています。

そういったものはアクセシビリティの基礎・概要的な部分だけを説明するものが多く、それはそれで知らない人にとってみれば大事な情報だとは思いますが、表面をなぞっただけのものがそのカンファレンスにおけるセッション枠を取ってまで発表する意義のあるものなのか、私には到底思えません。そのため、CFPを選出した運営側にはどういった意図や期待があったのかが気になっています。

私もCFPを提出しその当落の結果の連絡を受けても、何故いくつもある中から選ばれたのかについての意図を聞けたことはありませんでした。具体的に何を期待されているのかは分かりませんが、アクセシビリティとのその技術の交差点を意識した発表をするように心がけてきていたつもりです。

しかし、最近は私の発表自体にも限界を感じています。その理由は、日常業務やプライベート活動における交差点が欠けていると感じるからです。具体的には、個人の取り組みや私が関わる事業で、特定の技術を使ってアクセシビリティの問題をどのように解決できるかが明確ではありません。また、その取り組みが実際にどんな成果を生んでいるかも不明確なためです。

私のこれまでの発表はアクセシビリティ向上をしていく人向けにヒントとなるのを目的として発表していましたが、そこから実際にどうやって課題を解決してきたのか、本当に問題なくできたのか、という実践的な部分には触れていません。

あくまでも「こうしたことをすることでアクセシビリティが向上する」というのを示すことに留まっています。聴者が知らないと**思い込んでいる**知識の紹介だけです。

解決したい課題と直接つながっていない内容は、その場では興味深く思ってもらっていても、実践してなければ机上の空論になっている可能性もあります。何らかの解決法をもってそれを実践するのは皆が一律に問題なくできるわけではないと思います。

実践するにあたり障壁をどのように乗り越えてきたのか、ということも交えていれば聴者にとってもイメージしやすく、より持ち帰れる話になると思っています。

[今年のVue Fes Japan 2023での発表における反省点](/2023-12-10#今回の発表における反省点)でもあげましたが、実際の当事者のインタビューも取り入れられていれば、なぜそういう対応をしないといけないかの課題を理解しやすい発表になったと考えています。

例えばCallum Macraeによる「[Accessibility with Vue](https://www.youtube.com/watch?v=1Rvg_XkFH8Q&t=225s)」では視覚障害当事者のインタビューも交えた発表となっており、単なるコード例を示すよりも実際の問題点について意識しやすくなっていると思っています。

事業会社の人間としてより理想的な技術カンファレンスでの発表は、React Conf 2021での「[Accessible Japanese Form Components with React](https://www.youtube.com/watch?v=S4a0QlsH0pU)」が挙げられます。Reactとアクセシビリティだけでなく自身が所属して関わるプロダクト（あるいはデザインシステム）との交差点も意識された発表だったからです。OSSを企業で活用したことと社会とのつながりをわかりやすく発表できることはより価値ある事例だと思っており、こういったものに近づけるように取り組んでいきたいものです。

登壇することで特定の事象への認知が広がっていくこと自体は良いことだと思います。ですが、その事象のことだけを話すだけではなく、そこからより発展して多くの交差点があることを示していくことが、より価値ある発表になると私は考えています。

単純な点とならないためにも、広い視野で関与できていることがないかを探していきたいです。

---

ちなみに私が交差点の少なさとは別で抱えている課題は、私以外での同じ分野（アクセシビリティ）に取り組んでいる人の発表がまだ聞けていない、ということもあります。

アクセシビリティ自体をまだ知らない人はいるにせよ、取り組んでいっている人たちは徐々に見かけるようになってきています。私がまだ取り組んでいる人を知らないだけかもしれませんので、来年以降、新たなる人との「交差点」が生まれていくこともひそかに期待しています。
