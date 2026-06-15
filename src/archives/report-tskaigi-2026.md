---
title: TSKaigi 2026に参加＆登壇してきました！
description: TSKaigi 2026に参加＆登壇したのでそのレポートです
date: 2026-06-12
author: yamanoku
source: qiita.com
noindex: true
---

![TSKaigi 2026の会場入口に設置されていたスポンサーが掲載されている垂れ幕。白地に青い文字で Welcome to TSKaigi 2026と書かれ、多数のスポンサー企業ロゴが並んでいる。](https://i.gyazo.com/7f80887bf305e7e7e4dc59ffaeca9165.png)

こんにちは。株式会社Schooの[@okuto_oyama](https://qiita.com/okuto_oyama)です。
2026年5月22〜23日に開催された[TSKaigi 2026](https://2026.tskaigi.org/)へ参加・登壇してきました。

今回の記事では、カンファレンスのハイライトと印象に残ったセッション、そして私自身の登壇内容について、TSKaigi 2026を終えての総括をしていきます。

## TSKaigiとは何か？

TSKaigiはオフラインでは世界最大級と言われているTypeScriptのカンファレンスです。

![TSKaigi 2026のオープニングトークで投影されたスライド。スクリーンには『去年に引き続き、今年もオフラインの TypeScript のカンファレンスとしては世界一の規模です』と表示されている。](https://i.gyazo.com/d94c835f7f33f3c497033e811662278a.png)

2024年から始まって今年で3年目を迎えたTSKaigiは、企業のスポンサーも非常に多く、この2日間で約800名のエンジニアが現地参加されていたそうです。TypeScriptにまつわる国内のオフラインイベントでこの規模のものはなかなか見られないと思います。

## TypeScript 7.0について

今回のカンファレンスでのキーノートはMicrosoftのプリンシパルソフトウェアエンジニアを務めるJake Bailey氏による「[TS 7: How We Got There](https://2026.tskaigi.org/talks/37)」でした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">基調講演の様子をお届けします！<br>TypeScriptのこれまでの歩みと未来に向けた貴重なお話に、会場全体が引き込まれています！✨<a href="https://x.com/hashtag/TSKaigi?src=hash&amp;ref_src=twsrc%5Etfw">#TSKaigi</a> <a href="https://x.com/hashtag/TSKaigi2026?src=hash&amp;ref_src=twsrc%5Etfw">#TSKaigi2026</a> <a href="https://x.com/hashtag/tskaigi_leverages?src=hash&amp;ref_src=twsrc%5Etfw">#tskaigi_leverages</a> <a href="https://t.co/Z8hDDJMyll">pic.twitter.com/Z8hDDJMyll</a></p>&mdash; TSKaigi (@tskaigi) <a href="https://x.com/tskaigi/status/2057754321358577966?ref_src=twsrc%5Etfw">May 22, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

私たちが現在利用しているTypeScript（6.x系）は、TypeScript自身でコンパイラが記述されています（セルフホスティング）。しかし、次期メジャーバージョンであるTypeScript 7.0から、コンパイラの実装がGo言語によるネイティブ実装（コードネーム：Corsa）へと移行することが発表されました。

[A 10x Faster TypeScript - TypeScript](https://devblogs.microsoft.com/typescript/typescript-native-port/)

昨今のフロントエンドツールチェーンはRustでの書き直しがトレンドですが、TypeScriptチームがGoを選択した理由は「既存コードの移植性（Port）」にあります。

- コードスタイル: 関数や構造のパラダイムが近く、既存のTSコードをGoへスムーズに移植可能
- メモリ管理: 複雑な循環参照を多用するTypeScriptの型構造において、Goのガベージコレクション（GC）が有利に働く
- 並行処理: `goroutine` を用いたパース・型チェック処理の並列化が容易

以前より提示されているベンチマークでは、巨大なコードベースにおけるコンパイル速度が約10倍に跳ね上がることが示されました[^1]。

| プロジェクト名 | ソースコード行数 | TSコンパイル時間 | Goコンパイル時間 | 高速化 |
| --- | --- | --- | --- | --- |
| VS Code | 1,505,000 | 77.8秒 | 7.5秒 | 約10.4倍 |
| Playwright | 356,000 | 11.1秒 | 1.1秒 | 約10.1倍 |
| TypeORM | 270,000 | 17.5秒 | 1.3秒 | 約13.5倍 |

[^1]: 参考: https://devblogs.microsoft.com/typescript/typescript-native-port/#how-much-faster

Jake氏のデモでは、複雑なTypeScriptプロジェクトを `tsc` と `tsgo` でそれぞれビルドし、その時間を比較していました。前者が**約2分半（147.57秒）** もかかっていたのに対し、後者はわずか**約11秒（11.946秒）** で完了していました。TypeScript 7.0は現在ベータ版が公開されており、年内にRC版を経て安定版がリリースされる予定です。今のうちから最新の6系に追従しておき、ネイティブ版へスムーズに移行できるよう備えておきたいところです。

## 気になったセッションの紹介

基調講演以外にも、実務への応用から言語のコアな仕様に切り込むものまで、非常に濃密なセッションが展開されていました。今回も昨年同様300件以上ものプロポーザルが集まったそうです。その中から特に私が印象に残った5つのセッションを紹介していきます。

### 業務に残された「よくない型」で考える「TypeScriptの難しさ」
https://2026.tskaigi.org/talks/5

株式会社サイボウズのSajiさんによる、業務コードに潜む「よくない型」をどう分類し、解決していくかのアプローチについてです。開発現場でついつい使われがちな `any`、強引な `as` によるキャスト、型チェックを無視する `@ts-ignore`、雑な型ガード関数など。このセッションでは、これらにどのような傾向があるのか、そしてそれをAIコーディングを活用して網羅的に棚卸し・分類し、改善していく手法が語られていました。
私たちのプロジェクトにおいてもすべてがこのパターンで網羅できているわけではないですが、分類してみることは内部理解をするための良いきっかけになりそうでした。また、Arrayにまつわる型推論の弱さについては、ちょうど所属するチームでも議題に上がっていたところで、解決法が示されていたことがとてもありがたかったです。

### 権限チェックの一貫性を型で守る TypeScript による多層防御
https://2026.tskaigi.org/talks/9

株式会社フライルの北川さんによる、エンタープライズ製品には欠かせない「複雑な権限制御」を型で安全にする実践例です。フライルさんのようなプロダクトでの部署やチーム、プロジェクトといった多角的な階層構造を持つシステムでは、権限管理を見誤ると致命的なバグとなります。それをTypeScriptの高度な型システムを用いて解決している事例が共有されました。
Template Literal Typesを用いて文字列ベースの権限を型レベルで分解し、`as const satisfies` で網羅性を担保。さらに `switch` 文と `never` 型を組み合わせることで「新しい権限を追加した際の条件分岐の漏れ」を型エラーとして確実に検出する、まさに型による堅牢な多層防御の設計論が語られていました。また型だけでは防ぎきれない部分（主にビジネスロジックにまつわる箇所）についてはテストで担保するなどの責務の切り分け方についても紹介されていました。

### TypeScriptのclassはなぜこうなったのか — 歴史・落とし穴・そして使いどころを探る
https://2026.tskaigi.org/talks/16

株式会社カケハシのkosuiさんによる、TypeScriptにおけるclassの歴史と落とし穴についての話です。TypeScriptのclassは `tsconfig.json` の設定（`useDefineForClassFields` フラグの真偽値）によって、実行時の挙動が大きく変わってしまうような罠があります。こういったことがなぜ起こり得るのかについてをECMAScriptの歴史から振り返りつつ、どのような特性があるのか、そしてどう対策していけばよいのかについて、丁寧に解説してくれました。
classはカスタムエラー（`class ValidationError extends Error`）や、リソース管理のための `Symbol.dispose` と `using` の組み合わせなど、明確な使いどころがあります。その一方で、関数として表現できるものは関数に寄せていく手法や、「Angular/NestJSのようにクラスを活用する側」と「React/Vue 3/Honoのようにクラスを活用しない側」というフレームワークごとの思想・立場に応じて付き合うべきだと総括してくれました。

### Stage 3 Decorators でできること / できないこと
https://2026.tskaigi.org/talks/19

株式会社はてなのsusisuさんからは、classの機能拡張やメタデータ付与に用いられる[Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)の最新動向が共有されました。デコレータはNestJSのようなフレームワークでDI（依存性注入）やログ、ルーティング定義で広く使われていますが、JavaScriptの標準仕様として正式採用されるまでには、まだ互換性の議論などいくつかの壁があります。トランスパイラ側の実装は進んでいるものの、ライブラリやフレームワーク側が完全に移行するにはもう少し時間がかかるという、エコシステムのリアルな現在地を知れました。
そしてこの発表の前日にTC39のミーティングで[Stage 2.7に降格する提案](https://github.com/tc39/agendas/blob/main/2026/05.md)が行われており、引き続き動向が気になっているところです。

### いつテストを書くか？―ソフトウェア開発における安心と不安について考える
https://2026.tskaigi.org/talks/63

lacolacoさんによる、ソフトウェア開発における「安心と不安」に焦点を当てたテスト設計論です。「ソフトウェアがソフトであるとはどういうことか？」という本質的な問いから始まり、変更が困難になったコードはソフトではなく「ハード化している」という指摘がありました。開放閉鎖原則（OCP）やテスト駆動開発（TDD）に触れつつ、テストはどのタイミングで書いていくのかについても述べられていました。
正直なところ、私は開放閉鎖原則についてあまり理解できていない部分もありどのようにテスト設計していけば良いのかまだ確信はもてておりませんが、ソフトウェアがハード化にならないよう構造を見直しつつ、且つ新たな価値を付与できるための柔軟性を保てるようにするため日々テストと向き合っていく必要がある、という風に解釈しました。

## 筆者の登壇内容の紹介

今年のTSKaigiは、昨年に引き続き[^2]私も登壇させていただきました。新しいWeb標準APIとTypeScriptの型定義の関わりについてを発表しました。

[^2]: [転生したらTypeScriptのEnumだった件～型安全性とエコシステムの変化で挫けそうになっているんだが～ | TSKaigi 2025](https://2025.tskaigi.org/talks/yamanoku)

https://2026.tskaigi.org/talks/33

SPAのルーティングにおいて、長らく使われてきたHistory APIは状態管理が壊れやすく、開発者を悩ませてきました。これに代わるものとして、最新の主要ブラウザで利用可能（Baseline Newly Available）となった[Navigation API](https://developer.mozilla.org/ja/docs/Web/API/Navigation_API)が挙げられます。これを使うことにより、ページの状態管理もより厳格になり、ページ遷移時のインターセプト（介入）処理や、遷移時のフォーカス管理も実装しやすくなっています。

しかし、最新のAPIをTypeScript環境で使おうとすると型エラーが発生します。この時、TypeScriptの標準DOM型定義である `lib.dom.d.ts` はどのような基準で更新されているのか、ということが気になって調査してみたのが今回の発表内容です。詳細な内容について[当日の登壇資料](https://yamanoku.net/tskaigi-2026/slide/)もアップロードしておりますので、こちらをご覧になってみてください。

## TSKaigi 2026を終えての総括

今回の参加を通して、私なりにTypeScriptとそのエコシステムにまつわるものに関して考えてみたことを総括していきます。

### サーバーサイドTypeScriptの特性理解と実行環境の選択
Node.jsでの「Type Stripping（型情報の除去による直接実行）」の公式サポートが進む中、サーバーサイドでのTypeScript採用がさらに手軽になってきたように感じます。ですが、サーバーサイドTypeScriptという技術の利点・特性を改めて理解しておく必要を感じています。何にでも適用するのではなく、どういう場面で効果を発揮するのかを組織の中で把握しておくことが何よりも重要です。
また現在はNode.jsのみならず、[Bun](https://bun.com/)や[Deno](https://deno.com/)といった次世代のJavaScriptランタイムも同様に進化を遂げています。これらの活用もツールやアーキテクチャ設計の視野に入れてよいと感じております。

### 新しいAPIの積極導入検討

私の発表でも触れましたが `lib.dom.d.ts` 自体は日々更新されてきており、プロダクトの特性にも寄りますが、扱えるWeb APIは積極的に使ってみてフィードバックしていくと良いと考えております。
こうした姿勢で取り組むべき対象はWeb APIだけに限りません。TypeScript 6.0で型定義が追加され、Node.js 26から標準搭載される時間操作APIである[Temporal](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Temporal)により、鬼門だった日時操作を型安全かつ不変な値として扱えるようになっています。こうした標準APIの進化を捉え、不要になりそうな外部ライブラリへの依存を減らしていくべきだと考えております。
Temporalの動向については[temporal-polyfill-lite](https://www.npmjs.com/package/temporal-polyfill-lite)の作者であるfabonさんの記事が非常に参考になりますのでご覧になってみてください。

[Temporalのpolyfillをゼロから実装した](https://zenn.dev/fabon/articles/84f7696cd8a2fb)

### Rust製ツールチェーンの台頭
ここ1～2年の間にOxcやBiomeといったRust製のフロントエンドツールチェーンが台頭してきております。Type-aware Linting（型情報を考慮した静的解析）のサポートもあり、人間がPRレビューで「Promiseの `await` 忘れ」「新規で `any` を使ってはいけない」などと指摘するのではなく、Lintによって自動検知・修正させるフローへ移行していくと良さそうです。

弊社ではVue.jsをフロントエンドライブラリとして採用していますが、2026年6月現在、Oxcによる[Lintサポート](https://oxc.rs/compatibility.html)はまだ対応されていませんので進捗が気になっているところです。完全移行がされた際にはESLintからOxlintへの移行も視野に入れたいと考えています。

他にもVue.jsのRustツールチェーンである[Vize](https://vizejs.dev/index.html)はLint, Format, TypeCheckの対応が入っており、v1.0.0のα版公開に向けて開発が進められています。こちらも進展として気になっております。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">⚡️ Announcement for Vize<br><br>Vize is entering the Real World Testing phase.<a href="https://t.co/Dr2q3FyOl4">https://t.co/Dr2q3FyOl4</a><br><br>Looking for:<br><br>・Bug reports (Issues)<br>・Pull Requests<br>・Medium-to-large Vue projects to test against<br><br>The next milestone is v1.0.0-alpha. <a href="https://t.co/7DSaKeCxTo">pic.twitter.com/7DSaKeCxTo</a></p>&mdash; 筋と憎悪，もののけ王 (@ubugeeei) <a href="https://x.com/ubugeeei/status/2063508372834693284?ref_src=twsrc%5Etfw">June 7, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

---

TSKaigi 2026、振り返ってみるとあっという間の2日間でした。朝からの参加で移動も含め後半は疲労困憊でしたが、2日間続けて参加できて大変よかったです。エコシステムの最新動向や各社のTypeScriptの活用事例を知ることができ、スポンサーブースでは様々なプロダクトに触れ、懇親会では色々な方たちと交流できました。

TypeScriptの進化はまだ続いており、Web開発に関わる自分としても引き続き動向を追いつつ業務内で有効に活用していきたいと改めて感じました。この波に乗り遅れないよう、まずは足元のLinterやビルド環境のモダン化を推進していきたいと考えております。

TSKaigi 2026以降も様々な[サイドイベント](https://2026.tskaigi.org/side-events)が開催されるみたいです。また次回のTSKaigiは[仙台で開催される](https://sendai.tskaigi.org/)とのことです。

![TSKaigi 2026の会場出口に設置されたホワイトボード。青と赤の手書き文字で「TskKaigi 2026」「トートバッグご自由にどうぞ！」「おつかれさまでした！次は？」などのメッセージがあり、伊達政宗像のイラストと「SENDAl」 の文字、日本地図の描き込みがある。](https://i.gyazo.com/500edd1a67a9118eb1d5d81ea27d6695.png)

改めて、TSKaigi 2026に参加した皆さん、お疲れさまでした！

