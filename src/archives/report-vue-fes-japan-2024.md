---
title: Vue Fes Japan 2024参加レポート
description: Vue Fes Japan 2024に参加したのでそのレポートです
date: 2024-10-25
author: yamanoku
source: qiita.com
noindex: true
---

皆様こんにちは。[株式会社Schoo](https://corp.schoo.jp/)（以下、Schoo）でフロントエンドエンジニアをしております [@okuto_oyama](https://x.com/okuto_oyama) です。
今回は、10月19日に開催された[Vue Fes Japan 2024](https://vuefes.jp/2024/)の参加レポートをお届けします。

## Vue Fes Japanとは

Vue Fes Japanは[Vue.js日本ユーザーグループ](https://vuejs-jp.org/)が主催する日本最大級のVueエコシステムにまつわるカンファレンスです。Vue・ViteクリエイターでもあるEvan Youをはじめ、VueエコシステムのOSSメンテナやコントリビューターも参加し、各技術の最新動向を知ることができます。

2018年に初開催、その後台風やコロナ禍で中止されるも、2022年にオンラインカンファレンスとして復活、2023年は久しぶりのオフラインカンファレンスが開催し、今年もまたオフラインで開催されました。

当初はVue.jsやNuxt開発者のためのカンファレンスでしたが、ViteやVolarの登場から徐々にVue.js・Nuxtだけに閉じない様々な発表が増えおり、より間口の広がったフロントエンドのカンファレンスになってきております。

## 気になったセッションの紹介・感想

今回のVue Fes Japan 2024での発表は35件ほどあり、どれを聴くか非常に悩ましかったです。その中で私が興味を持って聴いた発表についてと感想を紹介していきます。

### キーノート

毎年恒例となっているEvan Youによる基調講演からスタートしました。

前半はVue.jsのこれまでの歴史を振り返りつつ最近リリースされたVue 3.5の紹介やこれから改善予定についてを語ってくれました。3.5からは個人的待望だった[`useId()`](https://ja.vuejs.org/api/composition-api-helpers#useid)が実装されたのでEvanに感謝の気持ちで聞いていました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">useId作ってくれてありがとうございます <a href="https://twitter.com/hashtag/vuefes?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847455156021186663?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

後半はViteにまつわる今後の技術戦略（OxC、Rolldown）や、設立した企業の[VoidZero](https://voidzero.dev/)についてを発表してくれました。Viteが様々なフレームワークなどで活用されているエコシステムの凄さを感じつつ、更なる技術的進化が語られておりワクワクさせられました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Viteの将来が楽しみです！ <a href="https://twitter.com/hashtag/vuefes?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847462088295534785?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ちなみにVue.jsは今年で登場して10周年になるのですが、私がVue.jsに初めて触れたのが2016年からなのでそこから8年近くも経っているのだなぁ〜と思い出に浸っていました。

### IT未経験者をVue.jsで開発できるITコンサルタントに育てあげる秘訣 - フューチャーの新人研修の取り組み

こちらはフューチャーアーキテクト株式会社さんのスポンサーセッションです。

新人研修の中でVue.jsを用いた開発ができるように組み込んでいるとのことでしたが、[eslint-plugin-vue](https://eslint.vuejs.org/)のメンテナでもある太田さん（[ota-meshi](https://github.com/ota-meshi)）が教材の監修に関わっているとのことでした。

Schooでもフロントエンドアーキテクチャの選択肢としてVue.jsやNuxtを用いているので、今後の新卒エンジニアの研修教材にどう組み込むか検討しています。新卒研修でVue.jsやNuxtを組み込んでいる企業の方と意見交換できたらいいなとか考えていました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Vue.jsを使って開発研修しているところってどれくらいあるんだろうかな <a href="https://twitter.com/hashtag/vuefes?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847470907507585187?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Nuxtベースの「WXT」で開発用のChrome拡張を作成する

Chrome拡張を作るにあたり何かしらのボイラープレートとなるものは色々と存在しています。今回はNuxtのディレクトリ構成に似た「[WXT](https://wxt.dev/)」でChrome拡張を作成したという内容を発表してくれました。

Manifestファイルを自動生成してくれたり、開発時には拡張機能を取り込んだブラウザが立ち上がりホットリロードして機能検証できるなど、開発者体験が良さそうに思いました。モジュールを入れる必要はありますが、Vue.jsやReact、Svelte、SolidJSを用いたUI開発もできるとのことです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Vue以外でReact、Svelte、SolidJSも使える！マイクロフロントエンドっぽくやれる…？ <a href="https://twitter.com/hashtag/vuefes_kickflow?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes_kickflow</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847481945732894873?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 同期する都市のキャンバス：Vue.jsによる大規模メディアインスタレーションの舞台裏

セッションやLTのおおよそはVueエコシステムの話やシステム開発・Web開発の話だったのですが、それとは違う毛色のVue.js活用事例についての発表でした。

group_inouとAC部のミュージックビデオ作品『HAPPENING』のWebアプリでも[Vue.jsが使われていた話](https://baku89.com/making-of/kindolphin)もあり、映像とVue.jsは親和性があるのかなと思い、興味をそそられました。

発表では[渋谷サクラステージ](https://www.shibuya-sakura-stage.com/)でのデジタルサイネージにはNuxtが使われているという衝撃の事実を知ることができました（[技術解説記事](https://rettuce.blog/2024/01/11/shibuyasakurastage/)）。自分にとっては、複雑なGUIを作るためにNuxtを活用するイメージがまったくできていなかったので、ここまで実現できるのかと驚きました。色の合成についてもCSSで行っているということでWeb技術をフル活用されていたことが嬉しかったです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Web技術をつかっていろんな展開ができる話はわくわくするな〜 <a href="https://twitter.com/hashtag/vuefes_mntsq?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes_mntsq</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847496993184375178?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ちなみに渋谷サクラステージはSchoo本社からも近い場所にあるので、出社した際はデジタルサイネージがどうなっているかを覗きに行ってみようと思います（[デジタルサイネージのイメージ動画URL](https://www.youtube.com/watch?v=DJfNFAYwEaU)）。

### Vue 3 と Svelte 5 のランタイムを比較する 〜技術を一段深く理解する〜

SvelteのコアチームメンバーでもあるbaseballyamaさんによるVue 3とSvelte 5、そしてVue Vapor Modeのそれぞれのランタイムを比較した発表です。個人ではSvelteを書いたことがあるのと、コンパイラとして魅力を感じているOSSだったので、Vue.jsとSvelteとでどのようにランタイムが違うのか気になっていました。

ReactやVue.jsでは仮想DOMを用いていますが、Svelteでは仮想DOMを持たないランタイムを持っています。Vue Vapor Modeでも同様に仮想DOMを用いない手法を取り入れているため、どの部分が似ていてどの部分が違うのかを簡略化されたコードで説明してくれました。

それぞれのランタイムについて詳細に見たことがなかったため、今回の発表でSvelteとVue Vapor Modeのそれが、非常に近しいものであることをざっくり理解できました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Vue Vapor Modeのランタイム、Svelteと似てるんだ <a href="https://twitter.com/hashtag/vuefes_mntsq?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes_mntsq</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847508935332548659?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ざっくりとしたランタイムの紹介だったけどVapor Modeはよりシンプルなコンパイラを目指そうとしてるんだろうなと雑に理解しました <a href="https://twitter.com/hashtag/vuefes_mntsq?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes_mntsq</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847509741943345480?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ちなみに同日夜よりSvelteにまつわるカンファレンスの[Svelte Summit Fall 2024](https://www.youtube.com/watch?v=fAPFsRP-mbc)が開催され、Svelte 5の正式リリースが発表されていました。新たに搭載された[Rune API](https://svelte.dev/docs/svelte/what-are-runes)もVue.jsの書き方と近しくなってきたと感じるので、いつかプロダクションで導入してみたいなぁという気持ちがあります。

### 次世代フロントエンドクロストーク

![Vue Fes Japan 2024のステージスクリーンに『次世代フロントエンドクロストーク』の情報が表示されている。登壇者にはEvan You、Sosuke Suzuki、Boshen Chen、Kia King Ishii、太田 洋介、Unvalleyが含まれている。](https://i.gyazo.com/c285dc5ad1aa369eedecff3f776036c5.png)

Evan You、OxCクリエイターのBoshen Chen、ESLint Communityコアチームの太田 洋介さん、PrettierメンテナのSosuke Suzukiさん、Biomeコアコントリビューターのunvalleyさんらが集まりフロントエンドツールのこれからについてを語るパネルディスカッションがありました。このメンバーが一度に揃うことはまず無いのでかなり豪華な対談となりました。

もともとJavaScriptはWebブラウザで使われる言語でしたが、サーバーサイドJSが生まれ、UIライブラリ・フレームワークが登場し、そこから複数のフロントエンドツールが生まれてきています。徐々に複雑なアプリケーションや要件が生まれるようになって、JavaScriptだけで解決するには限界が生まれてきています。そんな中、フロントエンドツールを動かすための言語にRustが選択されてきています（ちなみに[esbuild](https://github.com/evanw/esbuild)はGo言語です）。

フロントエンドツールのRust化が進む中で、参入障壁の難易度やエコシステムそのものがどうなっていくかは個人的にも懸念していましたが、Rollupプラグインの後方互換や有名なプラグインはコアとして取り込んでいくなど、不安に思っていた部分に対する回答が聞けました。またVoidZeroの今後の取組みとしてASTの標準化や共通化についても話しており、今後どのような動きが出てくるのかも気になりました。

登壇されたSosuke Suzukiさんの[ブログ記事](https://sosukesuzuki.dev/posts/vuefes-2024-follow-up/)でも語られていましたが、このパネルディスカッションは幅広い聴衆に伝わるような話で展開されていたため、自分も若干の物足りなさがありました。欲を言えば[次世代Webカンファレンス](https://nextwebconf.connpass.com/)のような聴者おいてけぼりにしてしまう議論も聴いてみたいなと感じてしまいました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">延長で1時間やってほしい <a href="https://twitter.com/hashtag/vuefes_mntsq?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes_mntsq</a></p>&mdash; オオヤマ オクト (@okuto_oyama) <a href="https://twitter.com/okuto_oyama/status/1847527711084073237?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Deep dive into Nuxt Server Components

フロントエンドの文脈で「Server Components」というと、Reactの印象が強いかもしれません。実はNuxtにも「[Nuxt Server Components](https://roe.dev/blog/nuxt-server-components)」というものが存在します。今回はその内容についてと実際に最小単位で実装する場合にどのような形となるのかを解説してくれました。

仕組みの解説で必要な構成要素を説明してくれたのですが、その中で個人的な驚きだったのが、[Teleport](https://ja.vuejs.org/guide/built-ins/teleport)を扱っていたことです。モーダルダイアログなどの表示などでDOM階層の外側に移動させる使い方だと思っていたのですが、SSRでのハイドレーションミスマッチを防ぐ（＝クライアントとサーバーとでDOM構造を一致させる）ために用いられることは知りませんでした。

まだExperimentalな機能ではありますが、クライアントのバンドルサイズを減らしたりクライアントサイドに情報を残したくないときに活用していけるといいなと思いました。

### Vue.jsコミュニティにようこそ！

Vueエコシステムのコミュニティで活動しているメンバーたちによる、どのようにコミュニティに参加し貢献できるかについてのパネルディスカッションがありました。私は途中から参加しましたが、立ち見が発生するほどの満員で大盛況でした。

<img src="https://i.gyazo.com/8fb151346c2eed7f4a2bcf97c8760f0b.png" width="240" alt="多くの参加者が座ってスクリーンを見つめており、前方には登壇者がパネルディスカッションを行っている。スクリーンには『Vueコミュニティの課題と未来のビジョン』といった内容の発表スライドが表示されている。">

セッション内では[chibivue](https://ubugeeei.github.io/chibivue/)という学習コンテンツ向けのDiscordサーバー（現在はchibivueに閉じず様々なコンテンツを扱っています）の紹介がありました。そこから一気に参加者が増えてサーバー内でアラートがでるほどの人気ぶりでした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/vuefes?src=hash&amp;ref_src=twsrc%5Etfw">#vuefes</a> にサーバー荒らされました (chibivue 鯖) <a href="https://t.co/3eHP3Rju9Q">pic.twitter.com/3eHP3Rju9Q</a></p>&mdash; @ubugeeei.dev 🦋 (@ubugeeei) <a href="https://twitter.com/ubugeeei/status/1847572522763768002?ref_src=twsrc%5Etfw">October 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

コミュニティに参加・貢献するということ何をもってして証明されるか明確な基準はありません。Vue Fes Japanに参加することだけでもそうかもしれませんし、Vueエコシステムを活用して開発してみることだったり、この参加レポートのような感想記事を書くこともその1つかもしれません。

Vue.jsのコミュニティーガイドには「[あなたができること](https://ja.vuejs.org/about/community-guide#what-you-can-do)」という項目があり詳細にどのようなことができるかの紹介が載っています。貢献してみたい人は自分ができそうなことから始めてみると良いかもしれません。

ちなみに私が始めてVue.js関連で貢献をしたものは[ドキュメントの日本語翻訳にまつわるもの](https://github.com/vuejs-jp/ja.vuejs.org/pull/61)でした。

## 参加したSchooエンジニアの感想

Schooからは私を含めたエンジニア3名が参加してきました（うち2名は個人スポンサーもさせていただいております）。それぞれが気になるセッションへ参加してきて刺激をもらってくることができました。参加したエンジニアによるVue Fes Japanの感想についても掲載させていただきます。

- Vue周りはコミュニティが本当にいいと再認識！
- Vue/Nuxtはあくまでも選択肢の一つのイメージだったが、これからのコミュニティの広がり熱量を感じて自分の中での価値・熱量みたいなものが上がった気がする
- どんな形でもいいから自分でも何かしらコミットしたい！
- Vue作者の実際の話聞ける場ありがたい。リアルタイム翻訳ありがとう。（笑いどころはずれる）
- リファクタ、テスト、パフォーマンスチューニングはみんな困っていそう
  - AIを用いたリファクタ、テストはやってみても良さそう
- 深掘りたいことが増えた！
- Vueはいいぞ！

## Vue Fes Japan 2024を終えて

午前からはじまったカンファレンスでしたが夜のアフターパーティが終わるまであっという間に過ぎたと感じるくらい濃密な時間となりました。直接聴けなかった発表がいくつもあったのでアーカイブ動画が公開されるのを心待ちにしております。

全セッション終了後に行われたアフターパーティでは、私と同じくVue 1系から関わっていた人たちと会えたり、過去在籍していた企業の同僚、chibivue関連で新しく繋がった方たちともご挨拶ができました。海外からの参加者も含め、幅広い多様な層が参加していることで、Vue.jsが誕生してから続くコミュニティというものの歴史の長さを感じることができました。

SchooでもVue.jsやNuxtをプロダクト開発に活用させてもらっています。引き続きVueエコシステムを活用しつつ、そこから得られた知見を通じて、コミュニティやOSSへ貢献をしていければと思っています。

![黒のクリエイティブウォールにカラフルなペンで会社ロゴや個人の思いなどが所狭しと描かれている](https://i.gyazo.com/6cb49b47537d700f1a016de8db723a02.png)
