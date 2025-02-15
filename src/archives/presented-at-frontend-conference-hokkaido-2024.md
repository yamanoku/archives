---
title: フロントエンドカンファレンス北海道でブラウザ互換についての発表をしてきました
description: フロントエンドカンファレンス北海道でブラウザ互換についての発表をしてきた話です
date: 2024-09-11
author: yamanoku
source: qiita.com
noindex: true
---

8/24に札幌にて「[フロントエンドカンファレンス北海道2024](https://www.frontend-conf.jp/)」が開催され、そちらに参加して登壇・発表をしてきました。

- [ブラウザ互換の重要性 - あらゆるユーザーに価値を届けるために必要なこと by 大山奥人 | トーク | フロントエンドカンファレンス北海道2024 #frontendo - fortee.jp](https://fortee.jp/frontend-conf-hokkaido-2024/proposal/d7d08dd7-18eb-4104-94a1-788138639608)
- [ブラウザ互換の重要性 - あらゆるユーザーに価値を届けるために必要なこと - Speaker Deck](https://speakerdeck.com/yamanoku/burauzahu-huan-nozhong-yao-xing-arayuruyuzanijia-zhi-wojie-kerutamenibi-yao-nakoto)

詳細な内容は[ドキュメントページ](https://yamanoku.net/frontendo-2024/ja/)を参照していただきたく、この記事では

- なぜブラウザ互換の発表をしたいと思ったのか
- 発表では伝えきれなかったこと

について紹介したいと思います。

## なぜブラウザ互換の発表をしたいと思ったのか

去年開催された[フロントエンドカンファレンス沖縄2023](https://frontend-conf.okinawa.jp/)で発表された内容を見ると、フレームワーク・ライブラリ・デザインシステム・アクセシビリティ・関連するツール群などなど、フロントエンドにまつわる内容も多岐にわたっていることがわかります。

その中で自分が関心をもちつつ他の発表とで差異があるようなものを考えた時に「ブラウザ互換」があがりました。

この発表を思いつくにあたり、私が過去の勉強会で発表してきたことが由来となっています。まずは、それらについてを触れておきたいと思います。

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRfZCfZpjvKndrrHZYH4QQsMM8JwcRYCbYlgeIaJxEQdvz5BbWFx2pKv2ctZ1KT8CTztpC-hR1n6vIO/embed?start=false&loop=false&delayms=3000" title="HTML だけで UI を作る限界、あるいは無理なくユースケースと向き合っていくためには" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="width: 100%; height: 100%; aspect-ratio: 760 / 569"></iframe>

HTMLオンリーでUIを生み出すことの難しさについて述べた発表です。まとめとして、領域が広がってきているフロントエンドエンジニアとして、あらゆることができるのではなく、ブラウザ上で **「表示されるもの」に責務を置くべき**と提言しました。

[アクセシブルなフロントエンド開発のこれまでとこれから / the past and future of accessible front-end development - Speaker Deck](https://speakerdeck.com/yamanoku/the-past-and-future-of-accessible-front-end-development)

[JSConf JP 2021](https://jsconf.jp/2021/)でのフロントエンド開発におけるアクセシビリティの取り組みについての発表です。ここではWebアクセシビリティ原則の1つである「知覚可能」という点に触れており、**あらゆる人が情報やインターフェースに触れることができるようにすることを最初に目指すべき**と述べました。

いずれも3年前の発表内容ですが、私の中ではこれらの考え方やこだわりに大きな変化はなく、今後もフロントエンドに関わる人に大切にしてほしいと考えています。

誤解のないように補足しておくと、それ以外の領域（バックエンドとの連携、パフォーマンス・チューニング、セキュリティ、SEO等）も求められる要件によっては重要であり、これらを軽視する意図はありません。

これらの発表に共通する点として、いずれも「ブラウザ」を通じたものです。

情報を見たり操作するのもブラウザからですし、支援技術を使うことで情報にアクセスできるのもブラウザからです。Webのプロダクトを提供するのであれば、ブラウザはユーザの利用環境・実行環境そのものになるため、関心を割くべき領域だと考えています。

今回はそんなブラウザについて、今どのようなことが行われているかを再確認して整理してみたかったのと、フロントエンド関連の勉強会やカンファレンスでブラウザにまつわるテーマで発表しているものがなかなか見られなかったので、その話をCfPとして提出しました。

ちなみに今回のカンファレンスの発表ではn13uさんが[フロントエンド開発の歴史](https://fortee.jp/frontend-conf-hokkaido-2024/proposal/190cff6a-d2b0-4b61-aef0-138d8910ebc8)でブラウザのことに触れていたり、canalunさんが[ブラウザにおけるテキストレンダリング](https://fortee.jp/frontend-conf-hokkaido-2024/proposal/a5735dc2-301b-497b-a354-d97639596365)の発表をされていたりなど、他にもブラウザにまつわる発表があって一人だけではないという心強さがありました。

## 発表では伝えきれなかったこと

以下は発表内には収まりきらなかったものの、こういった事象についても知ってもらいたいということを紹介します。

### ブラウザ互換以外のことにも注意を払ってほしい

Interopという取り組みやBaselineという指標が生まれてきて、ブラウザ互換に関する取り組みは以前よりも増えてきておりブラウザの齟齬についてを気にすることは減ってきました。とはいえブラウザのことを一切気にしなくていいというわけではありません。

[AndroidではCPUのパフォーマンスを考慮する必要がある](https://2023.yamanoku.net/2023-12-09/#:~:text=Android%E3%81%AECPU%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%81%AFSafari%E3%82%88%E3%82%8A%E3%82%82%E6%82%AA%E3%81%84)ことや、[エンタープライズ向けのブラウザ特有の機能や挙動](https://zenn.dev/loglass/articles/ef5767a8994136)を理解しておくなど、様々な非機能要件についても考える必要があります。

実際にブラウザ上で試したり、実機で検証してみないと見えないこともあります。どこまでを対象範囲とするかはプロダクトによって異なるかもしれませんが、実装者としても引き続き注視すべき点には気をつけていきたいと思っています。

ソフトウェアの品質を保つためにも、ユーザに安心して使ってもらうためにも、プロダクトがどのように提供されているかに注目し、その特性を活かした体験づくりを考えていきましょう。

### どんなものが新たに策定されているかを知っていく

品質を守るという観点でも重要ですが、新しい仕様をいち早く知ることで、自身のプロダクトに反映できそうなアイデアや取り組みにつなげることもできるのではないかと思っています。

発表内でも触れましたが、Intentsという取り組みをウォッチしておくことで、今後どのようなものが策定されるかを知ることができます。

- https://x.com/intenttoship
- https://botsin.space/@intenttoship
- https://bsky.app/profile/intenttoship.dev
- [RSS feed](https://botsin.space/@intenttoship.rss)

最近では[Summarizer API](https://groups.google.com/a/chromium.org/g/blink-dev/c/rCpcU0ZTgTk)、[Writer API](https://groups.google.com/a/chromium.org/g/blink-dev/c/U_4jtNS4aDY)、[Rewriter API](https://groups.google.com/a/chromium.org/g/blink-dev/c/9qR53S0QCbE)といった生成AI関連の仕様提案が興味深いと思っています（注：現在は提案段階で、Chromeへの実装が許可されているわけではありません）。

私個人としては[Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)というものがクロスブラウザで実装されて安定することを期待しています。このAPIの具体的な内容については以下スライドをご参照ください。

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSosGMESLA5IiR4NPz3i2u8XF_wkHsqP80pHA1a4q-Gmk9CIFkUobNc5pMvJj6Tth0PEGmoExmalOQj/embed?start=false&loop=false&delayms=3000" title="画面遷移のアクセシビリティ課題を解決しうる Navigation API への期待" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="width: 100%; height: 100%; aspect-ratio: 760 / 569"></iframe>

### Webを持続的なものとするための取り組みを知る

第2次ブラウザ戦争付近で生まれたブラウザたち（Firefox、Safari、Google Chrome）が登場してから16年が経っています。普段使われているブラウザは、今後も持続的に安定して使えるようになってほしいものです。

持続可能といえば、SDGs（持続可能な開発目標）を思い浮かべるかもしれませんが、Webにおいても持続可能なものにするにはどういったことが必要かという観点で「[Web Sustainability Guidelines](https://w3c.github.io/sustyweb/)」というものがコミュニティグループによって策定されています（注：これはW3C公式のガイドラインではありません）。

ガイドラインには多くの達成基準が含まれており、[Web開発に関する項目](https://w3c.github.io/sustyweb/#web-development)もあります。例えば、Minify、Tree Shaking、HTMLの適切な記述、モバイルファーストデザイン、依存関係の管理など、普段のフロントエンド開発からも取り組めることが多く提案されています。

Webというプラットフォームを使ってビジネスを行う立場として、事業が継続的かつ持続可能であるためにも、Web自体が持続的に運用されていくことが望ましいと考えています。ブラウザの話題を超えて広範な話になりますが、長期的に関わっていくテーマとして、このガイドラインがヒントになるかもしれません。

Web Sustainability Guidelinesについては他の関連する記事や発表についても併せてご覧になってみてください。

[サステナブルWebデザインを実践するためのガイドラインが登場 | コラム | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/column/20230926.html)

[Web 開発の長距離走と持続可能性 - TechFeed Experts Night#31 〜 フロントエンドアーキテクチャの現状と未来 - Speaker Deck](https://speakerdeck.com/ahomu/web-development-marathon-and-sustainability)

## 終わりに

当日会場やオンラインで発表を聞いてくれた方、登壇の場をいただけた実行委員会の皆さん、改めてありがとうございました。来年もカンファレンスの開催を楽しみにしております。
