---
title: 2021年オープンソースコントリビュート活動振り返り
description: 2021年のオープンソースコントリビュート活動の振り返り記事です
date: 2021-12-30
author: yamanoku
noindex: true
---

2021年もまもなく終わりですね。みなさんは今年どれくらいオープンソースにコントリビュートできたでしょうか？（唐突）

私は昨年、[東京都新型コロナウイルス感染症対策サイト](https://stopcovid19.metro.tokyo.lg.jp/)のコントリビュートするようになってから、業務中や余暇時間を使って、目のついた・興味があるオープンソースにコントリビュートしていくのが趣味になっています。

今年もいくつかのオープンソースに Pull Request や Issue でコントリビュートしてみましたのでその振り返りをしてみようと思います。

## Vue.js 関連

### vue-a11y

![スクリーンショット：Vue A11y 日本語サイト TOPページ](https://i.gyazo.com/0f3fb436378fec876d44315706c15857.png)

Vue.js ユーザーでアクセシビリティに関心が高い人たちが集まるチームがあり、それが vue-a11y です。主催は [Alan Ktquez](https://github.com/ktquez) 氏で、なにか手伝えることはないかと手を挙げてみたところ、私もメンバーとして誘ってもらいました。

![スクリーンショット：Vue A11y 公式サイトのメンバー紹介ページ](https://i.gyazo.com/fb5ab33e561b178000d93086a1795802.png)

今年は[サイトの日本語ページ](https://vue-a11y.com/jp/)開設やドキュメントの翻訳対応やそのレビューなどを行いました。
日本語翻訳に参加してくれた [かずやん](https://twitter.com/D_kazuyan)さん、[manak1](https://twitter.com/mikeanakida) さん、ありがとうございました！

https://twitter.com/yamanoku/status/1351683841191149568

しかしながら今年は諸事情で主催の Alan 氏や私自身が vue-a11y に割く時間がなかったため、グループ全体の活動としてはあまり進捗がない形でした。

![スクリーンショット：Accessible Vue 公式サイト](https://i.gyazo.com/c864aa971aa52f536d534ec91d9ac8df.png)

オープンソースとは別件ですが、メンバーの [Marcus Herrmann](https://twitter.com/_marcusherrmann) 氏が [Accessible Vue](https://accessible-vue.com/)という電子書籍を今年リリースしました。
Vue.js 開発においてのアクセシビリティ考慮する点をあげた書籍なので、ぜひご覧ください。

[Add A11y Section: eslint-plugin-vue-accessibility by yamanoku · Pull Request #3626 · vuejs/awesome-vue](https://github.com/vuejs/awesome-vue/pull/3626)

その他、[awesome-vue](https://github.com/vuejs/awesome-vue) に現行メンテナンスされている eslint-plugin の [eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility) がなかったので追加してみたり、

[fix: docs/aria-props.md broken link by yamanoku · Pull Request #294 · vue-a11y/eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/pull/294)

eslint-plugin-vuejs-accessibility ドキュメントでのリンクが壊れている箇所を修正したり、

[Add: vue-visually-hidden by yamanoku · Pull Request #14 · vue-a11y/awesome-a11y-vue](https://github.com/vue-a11y/awesome-a11y-vue/pull/14)

自作してみた [Visually hidden コンポーネント](https://github.com/yamanoku/vue-visually-hidden)を追加してもらったりしました。

### vuejs/vue-test-utils
Vue.js 公式のコンポーネントテストユーティリティ集

[ja docs(fix): インスト => インストール by yamanoku · Pull Request #1785 · vuejs/vue-test-utils](https://github.com/vuejs/vue-test-utils/pull/1785)

業務で使用するため確認することがあったのですが、日本語誤字があったので修正報告しました。
業務中にもすぐ出せるのは良いことです。

### vuejs/vue-router
Vue.js 公式のルーターライブラリ

[docs: aria-current-value type `"true"` and `"false"` by yamanoku · Pull Request #3558 · vuejs/vue-router](https://github.com/vuejs/vue-router/pull/3558)

WAI-ARIA 1.1 仕様書では [`aria-current` の設定値に `true` と `false` 文字列も含まれている](https://www.w3.org/TR/wai-aria-1.1/#aria-current)ため、設定できることを [vue-router のドキュメント](https://router.vuejs.org/api/#aria-current-value)にも明示できるようにしました。

### FortAwesome/vue-fontawesome
Vue.js で使用できる Font Awesome 5 ライブラリ

[add: Accessibility feature by yamanoku · Pull Request #319 · FortAwesome/vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome/pull/319)

業務上で使用している中でアイコンに装飾文字を使えないかと調べてみたところ、[実現することはできました](https://codesandbox.io/s/vuejs-font-awesome-1--getting-started-forked-11ewc?file=/src/App.vue)が README にその使い方がなかったため追加したものです。

### vueuse/vueuse
[Anthony Fu](https://github.com/antfu) 氏が作成した Vue Composition ユーティリティ集

[chore(useQRCode): add alt text for Docs by yamanoku · Pull Request #652 · vueuse/vueuse](https://github.com/vueuse/vueuse/pull/652)

コードサンプル内の `img` において代替テキストがなかったため追加しました。

### vuejs/docs
Vue.js 公式ドキュメントのリポジトリ

[ A11y Docs Labels code block `Warning` => `Note` by yamanoku · Pull Request #1394 · vuejs/docs](https://github.com/vuejs/docs/pull/1394)

アクセシビリティにまつわる項目において、フォーム関連のタグを `<label>` で囲むと支援技術側でのサポートを得られないため **Warning** 扱いにしており、HTMLの書き方としては間違いがないのに非推奨扱いにも感じられてしまったので、その異議を申し立てた Pull Request です。

以前ドキュメントの日本語翻訳した際にレビューで目を通したはずなのですが、当時意識してできていなかったのか、何故見逃していたのかが分かりませんでした…

## resetercss/reseter.css
Reset.css、Normalize.css といった CSS リセットの良いとこ取りした新しいリセット CSS

[Docs: Reseter.css Web Site Display Bug · Issue #25 · krshoss/gardevoir](https://github.com/krshoss/gardevoir/issues/25)

サイトのドキュメントスタイルが崩れていたことを報告しました。
単純に事象を伝えただけですが、コントリビューターとして追加してもらいました（今確認しましたがコントリビューター欄はなくなってそう）。

![スクリーンショット：reseter.css の README にあったコントリビューター一覧に Okuto Oyama として追加されている](https://i.gyazo.com/12c0d5f3c39f8c006513ab263ec90e9c.png)

## zenn-dev/zenn-community
Zenn のユーザが要望や質問などを投稿できるリポジトリ

[スクラップの下へジャンプボタンのキーボードフォーカス考慮 · Issue #287 · zenn-dev/zenn-community](https://github.com/zenn-dev/zenn-community/issues/287)

[4/20のアップデート](https://zenn.dev/changelog#20210420)により追加されたスクラップでコメントが多い場合に「いちばん下へジャンプ」するボタンが追加されたのですが、このボタンにキーボードフォーカスが当たるようにしてほしい要望を出しました。

再現の確認として gif アニメーションで確認できるようにしました。

![zenn スクラップページでのフォーカスの動き再現。いちばん下へジャンプするボタンにフォーカスが上がっていない。](https://i.gyazo.com/32dc1c28094bc449aa64b4afdf9f454a.gif)

上記要望は対応していただいてキーボードフォーカスが当たるようになっていました。
スピーディな対応、ありがとうございました！

![スクリーンショット：「いちばん下へジャンプする」ボタンにフォーカスが当たっている](https://i.gyazo.com/57af09f2160b2e761e4f962a070c468f.png)

## microcmsio/microcms-blog
microCMS 社が公開している公式ブログソース

[Breadcrumbでカテゴリーがない場合レンダリングしないように修正 by yamanoku · Pull Request #88 · microcmsio/microcms-blog](https://github.com/microcmsio/microcms-blog/pull/88)

パンくずリストにカテゴリがない場合でも HTML としてレンダリングされてしまうのでその修正をしました。
見た目上は違和感少ないものですが、読み上げ機能を使うと２つのリストアイテムがある」状態と判定され、２つめの中身があることを期待させてしまいかねないので、それであればない場合は描画しないように対応しました。

[日付部分をtime要素でマークアップ by yamanoku · Pull Request #89 · microcmsio/microcms-blog](https://github.com/microcmsio/microcms-blog/pull/89)

日付が出る箇所は `<time>` 要素でマークアップするように変更しました。

## azu/philan.net
[azu](https://twitter.com/azu_re)さんが作成した何処に寄付をしたかを記録できるようにしてくれるサービスソース

[feat(web): donation link exists or not by yamanoku · Pull Request #43 · azu/philan.net](https://github.com/azu/philan.net/pull/43)

寄付先のサイトURLがない場合、リンク先のない別窓リンクの `<a>` 要素で囲まれてしまうので、URLがない場合はリンクにしないように変更しました。
自分でローカルで立ち上げた際には結果が目視できなかったので勘で対応したところはあります。

[Feature: Make it possible to use `<MenuItem>` like `<a>` tags · Issue #57 · azu/philan.net](https://github.com/azu/philan.net/issues/57)

ユーザーアイコンをクリックしたときに表示されるメニュー項目の内部が `button` タグでレンダリングされるため、`a` タグのように別窓表示ができなかったのでそれができるようになるといいという要望。

Chakra UI の扱い方がわからなかったのですが、azu さんによって[改修していただけました](https://github.com/azu/philan.net/pull/66)。

## rits-dajare/rits-dajare.github.io
立命館ダジャレサークルのオフィシャルサイトソース

[ IMO ページのアクセシビリティ補強対応 by yamanoku · Pull Request #221 · rits-dajare/rits-dajare.github.io](https://github.com/rits-dajare/rits-dajare.github.io/pull/221)

[焼肉争奪戦！NU CAMP Dev&Pub LT Party](https://ntsa.connpass.com/event/211862/) というイベントを拝見して、[ygkn](https://github.com/ygkn) さんが発表内でサイトのアクセシビリティ対応をやってみた！とされていて個人的に感銘を受けました。

ソースコードをオープンソースとして公開していたので、自分からもよりよくできそうなアクセシビリティ改善提案をさせてもらいました。

## nygardk/react-share
React.js 製のソーシャルシェアボタンライブラリ

[ShareButton's `aria-label` is interfering with what I really want to say. · Issue #397 · nygardk/react-share](https://github.com/nygardk/react-share/issues/397)

先述した立命館ダジャレサークルのアクセシビリティ改善で発見した問題点について。
シェアボタンにある `aria-label` が実際にテキストを挿入したときとで意図しない読み上げになってしまうことが問題となりそうだったので、解決案を提示しました。

余談ですが Issue を書きながら、以下のことが大事だと改めて認識できたことは収穫でした。

> I think we should let the developers who use the library think about the button description.

## github/catalyst
GitHub による Web Components ライブラリとそれにまつわるドキュメント

[Fix: code of `<pre>` element is displayed protruding. by yamanoku · Pull Request #140 · github/catalyst](https://github.com/github/catalyst/pull/140)

コードが囲われている `<pre>` 部分がスマートフォンなど画面幅が縮んだデバイスで閲覧した場合、コード文がはみ出して閲覧しづらい箇所を修正対応しました。

個人的な感想ですが、レビュワーと多少チグハグなやりとりとなってしまったため、レビュー対応の難しさを感じるなどありました。

## corocn/paternity-leave-in-japan
[corocn](https://twitter.com/corocn) さんが運営している男性育休取得実績のある日本のテクノロジー企業のまとめ

[add: クラウドワークス by yamanoku · Pull Request #27 · corocn/paternity-leave-in-japan](https://github.com/corocn/paternity-leave-in-japan/pull/27)

所属する企業の2ヶ月以上の取得事例があったため、追加させてもらいました。

## shunito/axe-locales
[shunito](https://twitter.com/shunito) さんが作成した、ウェブアクセシビリティ検証ツール [aXe](https://www.deque.com/axe/) の言語を簡易的に切り替えるライブラリ

[Fix: window is not defined error pattern by yamanoku · Pull Request #1 · shunito/axe-locales](https://github.com/shunito/axe-locales/pull/1)

ローカルで起動した際に `window is undefined` となってしまうパターンに遭遇するので、空のオブジェクトで切り替えるパターンを追加しました。

## sadnessOjisan/blog.ojisan.io
[sadnessOjisan](https://twitter.com/sadnessOjisan) さんの旧ブログリポジトリ

[`word-break: break-all;` は即刻中止せよ by yamanoku · Pull Request #184 · sadnessOjisan/blog.ojisan.io](https://github.com/sadnessOjisan/blog.ojisan.io/pull/184)

文章中の英単語を強制的に改行する `word-break: break-all;` が見づらかったので、`overflow-wrap: break-word;` に修正しました。
IE11 も対応しているサイトだったとのことなので使えるプロパティも考慮しました。

| `word-break: break-all;` | `overflow-wrap: break-word;` |
| ------------------------ | ---------------------------- |
| ![スクリーンショット：記事内の英単語が改行されている](https://i.gyazo.com/46a6681a3026dd1b6ec4e61380556360.png) | ![スクリーンショット：記事内の英単語が改行されていなくなっている](https://i.gyazo.com/b3908b6b44d56acc347fd780fcb20a7f.png) |

なおその後、神の怒りに触れてリバートされました（文字量でカラムサイズ決めないでおくれ）。

https://twitter.com/sadnessOjisan/status/1394898107041652736

## tokyo-metropolitan-gov/covid19
[東京都新型コロナウイルス感染症対策サイト](https://stopcovid19.metro.tokyo.lg.jp/) のリポジトリ

[最新のお知らせのリンクリストの見た目とマークアップの齟齬修正 by yamanoku · Pull Request #6446 · tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19/pull/6446)

以前サイトの[アクセシビリティチェック会](https://engineer.crowdworks.jp/entry/product_accessibility_check)を有志で実施したのですが、改めてアクセシビリティ方針立てて試験して基準を満たすことが決まったため　[magi1125](https://twitter.com/magi1125)さんと [masup9](https://twitter.com/masup9) さんが音頭を取ってアクセシビリティプレ試験会を実施し、その試験会中で上がってきたアクセシビリティ上の問題を対応したものの１つです。

最新のお知らせのリンクリストが、日付の部分がリンクテキストではないスタイルなのにリンクの一部になっていて、見た目やインタラクション（hover）に差があるのでセマンティクスにも差が必要となっている問題を修正しました。
読み上げについての認識違いもあったのでレビューいただいたことで自分にとっても学びが得られました。

[ビルド時のアクセシビリティlint導入の検討 · Issue #6848 · tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19/issues/6848)

ビルド時のアクセシビリティ Linter を導入する提案では magi1125 さんから直接ご指名いただいたので私が分かりうる限りでアドバイスさせていただきました。

## SnO2WMaN/tohohoify
[SnO2WMaN](https://twitter.com/SnO2WMaN) さん作のトホホ…な画像を生成するジェネレーター

![tohohoify で生成された画像](https://i.gyazo.com/7d69f2e4610112ae654bf628ef568ef9.png)

[fix: Axe DevTools Critical Issues by yamanoku · Pull Request #20 · SnO2WMaN/tohohoify](https://github.com/SnO2WMaN/tohohoify/pull/20)

意味不明な Twitter 上の内輪ノリから発生して作られたものですが、[aXe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) で Critical なアクセシビリティ上の問題となっていた箇所を修正したものです。

## kawamataryo/animated-emoji-gen

[Kawamata Ryo](https://twitter.com/KawamataRyo) さんによる動く Slack 絵文字の GIF を作ることができるアプリ

[fix: axe DevTools Critical Issues by yamanoku · Pull Request #11 · kawamataryo/animated-emoji-gen](https://github.com/kawamataryo/animated-emoji-gen/pull/11)

上記の tohohoify と同様に [aXe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) で Critical なアクセシビリティ上の問題となっていた箇所を修正したものです。

## yuiseki/crisis-news-map-next
[yuiseki](https://twitter.com/yuiseki_) さんによる全国災害情報地図サイト

[ニュース記事でのカテゴリラジオボタンをグループ化 by yamanoku · Pull Request #23 · yuiseki/crisis-news-map-next](https://github.com/yuiseki/crisis-news-map-next/pull/23)

[日本の災害関連ニュース記事で「すべて」のラジオボタンがチェック状態にならない · Issue #21 · yuiseki/crisis-news-map-next](https://github.com/yuiseki/crisis-news-map-next/issues/21)

災害関連ニュース記事ページでのラジオボタン操作の補助と、バグ報告をさせてもらいました。

余談ですが yuiseki さんが[副業としてOSSコミッターで働かれる](https://twitter.com/yuiseki_/status/1466702240941752320)ようです。個人的にとても興味深い話でありました。おめでとうございます！

## miyaoka/employment-ojisan
[miyaoka](https://twitter.com/miyaoka) さんによる [sadnessOjisan](https://twitter.com/sadnessOjisan) さんが就職するまでのカウントダウンサイト

[読み上げ対応 by yamanoku · Pull Request #2 · miyaoka/employment-ojisan](https://github.com/miyaoka/employment-ojisan/pull/2)

[img に alt 入れた by yamanoku · Pull Request #6 · miyaoka/employment-ojisan](https://github.com/miyaoka/employment-ojisan/pull/6)

詳細は[【ネタアプリ】就職カウントダウンサイトを作った話](https://zenn.dev/miyaoka/articles/dfb1ea778d43c6)を参考いただければと思いますが、その中で私はアクセシビリティ対応をしました。

## svelte-jp/svelte-site-jp
有志によって運営されている Svalte 日本語サイトのリポジトリ

[translate: docs/ja/05-accessibility-warnings by yamanoku · Pull Request #471 · svelte-jp/svelte-site-jp](https://github.com/svelte-jp/svelte-site-jp/pull/471)

[ Blog What's new in Svelte: August 2021 の翻訳 by yamanoku · Pull Request #484 · svelte-jp/svelte-site-jp](https://github.com/svelte-jp/svelte-site-jp/pull/484)

SvelteJP の Discord にある「ドキュメント翻訳」チャンネルがあり、運営メンバーの [tomoam](https://twitter.com/tomoam_mat) さんから翻訳作業の募集が出ていたりします。
Svelte の雰囲気を知るために翻訳作業に参加させてもらいました。

現在は SvelteKit の[日本語サイト翻訳作業の募集](https://github.com/svelte-jp/kit/issues?q=is%3Aopen+is%3Aissue+label%3A%E7%BF%BB%E8%A8%B3%E8%80%85%E5%8B%9F%E9%9B%86
)もされています。私もやってみようかなと思いますが、興味ある方はどうぞ！

## microcmsio/react-hooks-use-modal
microCMS 社の React Hooks を用いてモーダルを呼び出すライブラリ

[Improve accessibility by dqn · Pull Request #26 · microcmsio/react-hooks-use-modal](https://github.com/microcmsio/react-hooks-use-modal/pull/26)

上記のアクセシビリティ対応自体は [dqn](https://github.com/dqn) さんによるもので私によるものではないですが、老婆心でアクセシビリティレビューを勝手にしてしまいました。

React.js 実装での参考となり大変学びがありました。

[`close()` useCallback does not work with the button spacebar · Issue #27 · microcmsio/react-hooks-use-modal](https://github.com/microcmsio/react-hooks-use-modal/issues/27)

ボタンをキーボード操作する際にエンターキーでは機能するのですが、モーダル内ではスペースキーでは機能しなかったのでバグとして報告しました。

[らんす](https://twitter.com/yuki0410_)さんの報告にて disable-scroll による影響であることが判明しました。ありがとうございました！

## mdn/translated-content
MDN ドキュメントの翻訳コンテンツリポジトリ

[fix: Missing characters by yamanoku · Pull Request #1904 · mdn/translated-content](https://github.com/mdn/translated-content/pull/1904)

[Issue with "aria-describedby 属性の使用": Invalid link for example link · Issue #2057 · mdn/translated-content](https://github.com/mdn/translated-content/issues/2057)

フロントエンド業務ではお世話になることが多いMDNドキュメントですが、脱字や英語コンテンツとで差分があったりします。Pull Request や Issue を通じてコントリビュートさせてもらいました。

日本語翻訳コンテンツは日本人のレビュワーおらっしゃるようで、報告は日本語のみでも問題ないそうです。

## sveltejs/svelte

Svelte のメインリポジトリ

[`a11y-label-has-associated-control`: Check if `for` attribute of label matches the `id` attribute of the control. · Issue #6515 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/6515)

svelte-check における `a11y-label-has-associated-control` はラベルが `for` 属性を持っているかどうかをチェックしてくれます。しかし、現状では `for=""` でもバリデーションチェックは通ります。なぜなら、ラベルが `for` 属性を持つかどうかだけをチェックしているからです。

そこで対応するコントロールの `id` 属性とラベルの `for` 属性が一致すれば問題ないというようなバリデーションにしたいと提案しました。

その提案に対してコアメンバーからは以下のように返答をもらいました。

> This would be tricky, since components are compiled independently. If the compiler saw a given for attribute, but not a matching id, there's no way to guarantee that the id is not present in some other component, or even another element on the page not controlled by Svelte. There would be a significant chance of false positives.

> This is the kind of check that would be better done on the rendered page using a tool like Axe, which can check the page as a whole instead of individual components.

おおまかに訳すると `*.svelte` コンポーネントにおいて一意である id を検出することをバリデーションとすると誤検知につながりかねない、これはコンパイラとして見る部分ではなく aXe のような全体チェックで見るべきだ、といった内容でした。

結果としては破却された提案でしたが、私の中でアクセシブルなコンポーネントを作成する上でのヒントとなった Issue でもありました。

## ota-meshi/postcss-html

HTML をパースするための PostCSS シンタックス

[ vue2 Use `lang="scss"` .vue file, stylelint not working · Issue #29 · ota-meshi/postcss-html](https://github.com/ota-meshi/postcss-html/issues/29)

stylelint が 8 にバージョンアップしたときに `*.vue` ファイルでの `<style>` ブロックの Lint がエラーになることがありました。原因がいまいちつかめてなく悩んでいたときにメンテナの [ota-meshi](https://github.com/ota-meshi) さんが聴いてくださいと言っていただいたので Issue を作成しました。

[別の Issue](https://github.com/ota-meshi/postcss-html/issues/24) では事象が発生した状況のリポジトリを提示していたので、自分も真似してみました。

間違ってプライベートで作って見せられなかったミスをやらかしましたが…

## gatsbyjs/gatsby

GatsbyJS のメインリポジトリ

[`<RouteAnnouncer>` `aria-live` value can be selected. · Discussion #34170 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/discussions/34170)

こちらは Issue ではなく Discussion での投稿です。
私が登壇した [JSConfJP の発表](https://speakerdeck.com/yamanoku/the-past-and-future-of-accessible-front-end-development?slide=58)にて `<RouteAnnouncer>` の紹介をしたのですが、こちらで使用されている `aria-live` の値が常に `assertive` を指しています。

しかし [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/#aria-live) では、以下のように書かれています。

> Because an interruption may disorient users or cause them to not complete their current task, authors **SHOULD NOT** use the assertive value unless the interruption is imperative.

`aria-live` の値が常に `assertive` に指定されると困惑するユーザもいるかもしれません。
そこで Vue.js 版の RouteAnnoucer でもある vue-announcer では [aria-live の値を他のものに設定できる](https://github.com/vue-a11y/vue-announcer/tree/next#custom-announcer-object-meta)ので、そうした形で変更できないかという提案になります。

Next.js でも使用されている大元のものは GastbyJS で作られたものだったので、本家の方で提案してみました。

## sergeicodes/a11ymyths
アクセシビリティにまつわる謬説（まちがった説や説明）をまとめたサイト

[Add Japanese version. by yamanoku · Pull Request #12 · sergeicodes/a11ymyths](https://github.com/sergeicodes/a11ymyths/pull/12)

MITとして公開されていたのでフォークして独自で日本語版を公開したところ、オーナーの [Sergei Kriger 氏](https://github.com/sergeicodes)が日本語版でコントリビューションしませんか？と誘われたので別途 Pull Request を作成しました。

最初は myth を「俗説」として訳していたのですが、[kazuhito](https://twitter.com/kazuhito) さんが「謬説」と訳されていたのでそちらが言葉として良さそうだなと思ったので参考にさせていただきました。

[Webアクセシビリティの謬説 | 覚え書き | @kazuhito](https://kidachi.kazuhi.to/blog/archives/041346.html)

## yamanoku/awesome-japanese-a11y-companies

アクセシビリティに取り組む・推進している日本のテクノロジー企業の awesome リポジトリ

[yamanoku/awesome-japanese-a11y-companies: アクセシビリティに取り組む・推進している日本企業まとめ（随時更新）](https://github.com/yamanoku/awesome-japanese-a11y-companies)

最後は自分が作成したオープンソースで、今年の9月から取り組んでみたものです。

Web アクセシビリティのまとめサイトとして [accrefs.jp](https://accrefs.jp/) というものがあるのですが、企業の取組事例だけを抽出したい・投稿を容易にしたいというモチベーションから GitHub で管理するようにしています。[awesome-a11y](https://github.com/brunopulis/awesome-a11y) にも追加させてもらいました。

[Add: awesome-japanese-a11y-companies by yamanoku · Pull Request #139 · brunopulis/awesome-a11y](https://github.com/brunopulis/awesome-a11y/pull/139)

機械的な仕組みは特になく、事例があがったものは随時 commit していく形です。今のところ自分のみがコントリビュートとなっていますが、自薦・他薦問わずプルリクエストの方はお待ちしております！
こうした方がよいのでは、みたいなものは [discussions](https://github.com/yamanoku/awesome-japanese-a11y-companies/discussions) にて投稿ください。

## その他

この他にもバグ報告や誤字・脱字の修正や指摘をしたり、[署名](https://github.com/karlgroves/overlayfactsheet/pull/686)したり、[ツイートの保護活動](https://github.com/takanakahiko/tweet-deleter/pull/15)や、[侍同士のやり取り](https://github.com/iwasa-kosui/blog/pull/51)など色々とやっていました。

## 総括

タイトルからもあるように「OSS」としてではなく「オープンソース」と称したのはソフトウェア以外のものへのコントリビュートが多いところもあります。
azu さんが[2020年の振り返りで言い換えていたこと](https://efcl.info/2020/12/31/open-source-in-2020/)も印象に残っているため自分もそう表現してみようかなと思っています。

---

こうやって挙げてみると去年よりも今年はいくつか首に突っ込めた活動ができたかなと思っています。Notion にて個人のものもまとめていますのでこちらもご覧ください。

[オープンソース活動記録 2021年](https://www.notion.so/yamanoku/2021-2c4fa51b832645f494698ebd11e069f9)

すべてのコントリビュートに対して全部問題が解消できたかというと、そういうことばかりではなく問題としてそのままになっているものもあります。

ですが、東京都新型コロナウイルス感染症対策サイトでもそうだったのですが、自分の得意分野を活かしてコントリビュートすることで、普段自分がやっていることの精度を高めていくことにもなったり知らなかったことを学ぶことにもなるので、やはりコントリビュート活動は実りがあり楽しいものです。

そして、来年は今年あまりできなかった vue-a11y 関連のことをやっていこうと思っています。

---

オープンソースコントリビュート活動以外の支援として GitHub Sponsors を出している私個人として応援したい人たちには継続支援させてもらっています（2021年12月現在）。

- sponsors-kazupon - $5 a month
- sponsors-azu - $5 a month
- sponsors-0918nobita - $1 a month
- sponsors-kt3k - $1 a month
- sponsors-sosukesuzuki - $2 a month
- sponsors-nuxt - $10 a month
- sponsors-kubosho - $1 a month
- sponsors-markuplint - $5 a month
- sponsors-ota-meshi - $5 a month

そしてありがたいことに、私自身も [はぜ](https://twitter.com/haze_it_ac)さんと [kazupon](https://twitter.com/kazu_pon) さんから GitHub Sponsor されてます。
いつもありがとうございます！

最近の OSS への支援が足りていない現状を見るに、普段のオープンソース活動が普段の収益に置き換えることができるかというと果てしない夢のようなものだと思っています。
今のところは自分にとってなんらかプラスとなれればといいなと考えています。

[寄付・支援してもらうための目的を明確にする · Issue #631 · yamanoku/yamanoku.github.io](https://github.com/yamanoku/yamanoku.github.io/issues/631)

とはいえ消極的な宣伝のままでも伝わってほしいものも伝わらないため、こうした振り返りも含めてアウトプットを皆さんに伝えられる場についても意識していきたいなとも考えております。
