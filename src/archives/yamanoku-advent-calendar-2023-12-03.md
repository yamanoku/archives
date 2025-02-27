---
title: オープンソースへのアクセシビリティコントリビュート振り返り
description: yamanokuのこれまでのオープンソースへのアクセシビリティへのコントリビュートを振り返ります
date: 2023-12-03
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

## オープンソースとアクセシビリティことはじめ

アクセシビリティを学び始めて、なんらかのアクセシビリティ改善したいと望むことはあるでしょう。事業会社であれば自分が関わるプロダクトであったり、受託制作であればサイトであったり、あるいは自分の作ったプロダクトであればそれ自体を、といった形で改善してみたい対象は様々だと思います。

私は現在事業会社に勤めており、関わるプロダクトや会社全体のアクセシビリティ向上に取り組んでいます。アクセシビリティに関する縁から副業に参画し、そこでも改善活動を行ってきました。しかし、本業や副業以外でもアクセシビリティを向上させる方法はないものかと考えていました。

そんな時、機会が突然訪れました。2020年に新型コロナウイルスが蔓延していく中で立ち上がった[東京都新型コロナウイルス感染症対策サイト](https://github.com/Tokyo-Metro-Gov/covid19)は非営利団体「[Code for Japan](https://www.code4japan.org/)」によってオープンソースで運営されていました。

このサイト自体はGitHubにて公開されており、誰でもコントリビュートすることができました。私はとあるきっかけによりこのオープンソースにコントリビュートするようになっていきます（詳細は[東京都新型コロナウイルス対策サイトにアクセシビリティ視点でコントリビュートしてみた](https://archives.yamanoku.net/covid-19-site-a11y-contribute)をご覧ください）。

いくつかのコントリビュートを経て、オープンソースを利用する人々にとって、それがアクセシビリティに考慮されていれば、より使いやすくなり、改善提案も増えていくのでは、と考えました。そこで、業務時間や余暇時間を利用して、関心のあるオープンソースプロジェクトにアクセシビリティ改善のための貢献を行ってきました。

今回は、どのようなプロジェクトにどのような形で貢献してきたかを振り返りながら紹介します。これを読むことで、オープンソースへのアクセシビリティ取り組みに興味を持つ方の参考になれば幸いです。

※一部は[2021年オープンソースコントリビュート活動振り返り](https://archives.yamanoku.net/open-source-contribution-activity-2021)から引用しています。

## gatsbyjs/gatsby-ja

Gatsby.jsの公式日本語ドキュメントサイト（現在は別ドメインになり日本語翻訳は削除されています）。

> [translate docs/making-your-site-accessible by yamanoku · Pull Request #72 · gatsbyjs/gatsby-ja](https://github.com/gatsbyjs/gatsby-ja/pull/72)

「Making Your Site Accessible」というアクセシビリティにまつわるドキュメントを日本語翻訳しました。

## mizchi/amdx

[mizchi](https://twitter.com/mizchi)によるMDXをベースにした高速化、最適化、AMP対応されたMarkdownコンパイラ。[mizchi.dev](https://mizchi.dev/)にて活用されています。

> [a11y_fix: text-link by yamanoku · Pull Request #7 · mizchi/amdx](https://github.com/mizchi/amdx/pull/7)

Lighthouse判定でAccessibilityが100点が取れるようにテキストリンクのコントラスト比を高いものに変更するアクセシビリティ改善しました。

## vuejs-jp/ja.vuejs.org

Vue.jsの公式日本語ドキュメントサイト（現在は旧サイト扱いになっています）。

> [docs:translate Accessibility > Basic by yamanoku · Pull Request #61 · vuejs-jp/ja.vuejs.org](https://github.com/vuejs-jp/ja.vuejs.org/pull/61)

Vue.jsのメジャーバージョンが3に上がる際にドキュメントにアクセシビリティの項目が追加されたのでその翻訳対応をしました。Vue.js日本ユーザーグループの[kazupon](https://twitter.com/kazu_pon)より他のアクセシビリティにまつわるドキュメントの翻訳レビューをしていただきたいと指名してもらったのでそちらも対応いたしました。

## vue-a11y/eslint-plugin-vuejs-accessibility

Vue.jsでの開発時にアクセシビリティチェックするためのESLintプラグイン。

> [Do we need a no-onchange rule? · Issue #97 · vue-a11y/eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/97)

`@change`を指定する際に`@blur`も指定するようなルールだったのですが、元々はレガシーブラウザの対応のためで、参考にしていたJSXでのESLintプラグインでのルールでも[すでに非推奨になっていた](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/398)ため、Vue.jsでのルールも非推奨にするように提案しました。

2020年の12月に提案して、2023年7月に該当するルールが非推奨扱いになりました。

## vuejs/vue-router

Vue.js公式のルーターライブラリ。

> [docs: aria-current-value type `"true"` and `"false"` by yamanoku · Pull Request #3558 · vuejs/vue-router](https://github.com/vuejs/vue-router/pull/3558)

（当時最新の勧告であった）WAI-ARIA 1.1仕様書では[`aria-current`の設定値に`true`と`false`文字列も含まれている](https://www.w3.org/TR/wai-aria-1.1/#aria-current)ため、設定できることを[vue-routerのドキュメント](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#ariaCurrentValue)にも明示できるようにしました。

## vueuse/vueuse

[Anthony Fu](https://github.com/antfu)が作成したVue Compositionユーティリティ集ライブラリ。

> [chore(useQRCode): add alt text for Docs by yamanoku · Pull Request #652 · vueuse/vueuse](https://github.com/vueuse/vueuse/pull/652)

コードサンプル内の`img`において代替テキストがなかったため追加しました。

## zenn-dev/zenn-community

Zennのユーザが要望や質問などを投稿できるリポジトリ。

> [ズーミングや拡大縮小を有効にしてほしい · Issue #53 · zenn-dev/zenn-community](https://github.com/zenn-dev/zenn-community/issues/53)

Zennでページを一部拡大して読みたい場合（主にスマートフォン）に、ズーミングや拡大縮小ができなかったためその報告をしました。

> [ログインモーダルを閉じる挙動に関する改善要望 · Issue #85 · zenn-dev/zenn-community](https://github.com/zenn-dev/zenn-community/issues/85)

ログインしていない状態で記事の下部にあるコメント欄にタブキーフォーカスするとログインモーダルが出現します。ですがキーボード操作でモーダルを閉じることができないためその報告をしました。

> [スクラップの下へジャンプボタンのキーボードフォーカス考慮 · Issue #287 · zenn-dev/zenn-community](https://github.com/zenn-dev/zenn-community/issues/287)

[2021年4月12日のアップデート](https://zenn.dev/changelog)により追加されたスクラップでコメントが多い場合に「いちばん下へジャンプ」するボタンが追加されたのですが、このボタンにキーボードフォーカスが当たるようにしてほしい要望を出しました。

再現の確認としてGIFアニメーションで確認できるようにしました。

![zenn スクラップページでのフォーカスの動き再現。いちばん下へジャンプするボタンにフォーカスが上がっていない。](https://i.gyazo.com/32dc1c28094bc449aa64b4afdf9f454a.gif)

上記要望は対応していただいてキーボードフォーカスが当たるようになっていました。

![スクリーンショット：「いちばん下へジャンプする」ボタンにフォーカスが当たっている](https://i.gyazo.com/57af09f2160b2e761e4f962a070c468f.png)

## microcmsio/microcms-blog

[microCMS](https://microcms.io/)社が公開している公式ブログソース

> [Breadcrumbでカテゴリーがない場合レンダリングしないように修正 by yamanoku · Pull Request #88 · microcmsio/microcms-blog](https://github.com/microcmsio/microcms-blog/pull/88)

パンくずリストにカテゴリがない場合でもHTMLとしてレンダリングされてしまうのでその修正をしました。見た目上は違和感少ないものですが、読み上げ機能を使うと2つのリストアイテムがある状態と判定されます。これは2つ目に中身が期待されるという誤解を招きかねません。そのためカテゴリがない場合は、リストを描画しないように対応しました。

> [日付部分をtime要素でマークアップ by yamanoku · Pull Request #89 · microcmsio/microcms-blog](https://github.com/microcmsio/microcms-blog/pull/89)

日付が出る箇所は`<time>`要素でマークアップするように変更し、セマンティクスな日付情報にするようにしました。

## rits-dajare/rits-dajare.github.io

立命館ダジャレサークルのオフィシャルサイトソース。

> [\[IMO\] ページのアクセシビリティ補強対応 by yamanoku · Pull Request #221 · rits-dajare/rits-dajare.github.io](https://github.com/rits-dajare/rits-dajare.github.io/pull/221)

[焼肉争奪戦！NU CAMP Dev&Pub LT Party](https://ntsa.connpass.com/event/211862/)というイベントを拝見して、[ygkn](https://github.com/ygkn)が発表内でサイトのアクセシビリティ対応をやってみたことについて個人的に感銘を受けました。

ソースコードをオープンソースとして公開していたので、自分からもよりよくできそうなアクセシビリティ改善提案（スクリーンリーダー読み上げ考慮、ボタンの`aria-label`上書き、見出し順の訂正、`input`に紐付けるラベル）をさせてもらいました。

## nygardk/react-share

React.js製のソーシャルシェアボタンライブラリ。

> [ShareButton’s aria-label is interfering with what I really want to say. · Issue #397 · nygardk/react-share](https://github.com/nygardk/react-share/issues/397)

先述した立命館ダジャレサークルのアクセシビリティ改善で発見した問題点でもある、シェアボタンにある`aria-label`が実際にテキストを挿入したときとで意図しない読み上げになってしまうことが問題となりそうだったので、解決案を提示しました。

この提案を行ったのが2021年の1月でしたが、2023年の11月にバージョン5をリリースするにあたりデフォルトで`aria-label`で上書きしないように対応されました。

## tokyo-metropolitan-gov/covid19

[東京都新型コロナウイルス感染症対策サイト](https://stopcovid19.metro.tokyo.lg.jp/)のリポジトリ。

> [最新のお知らせのリンクリストの見た目とマークアップの齟齬修正 by yamanoku · Pull Request #6446 · tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19/pull/6446)

以前サイトの[アクセシビリティチェック会](https://engineer.crowdworks.jp/entry/product_accessibility_check)を有志で実施したのですが、改めてアクセシビリティ方針立てて試験して基準を満たすことが決まったため[magi1125](https://twitter.com/magi1125)と[masup9](https://twitter.com/masup9)が音頭を取ってアクセシビリティプレ試験会を実施し、その試験会中で上がってきたアクセシビリティ上の問題を対応したものの1つです。

最新のお知らせのリンクリストが、日付の部分がリンクテキストではないスタイルなのにリンクの一部になっていて、見た目やインタラクション（hover）に差があるのでセマンティクスにも差が必要となっている問題を修正しました。

> [ビルド時のアクセシビリティ lint 導入の検討 · Issue #6848 · tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19/issues/6848)

ビルド時のアクセシビリティLinterを導入する提案ではmagi1125から直接ご指名いただいたので私が分かりうる限りでアドバイスさせていただきました。

## SnO2WMaN/tohohoify

[SnO2WMaN](https://twitter.com/SnO2WMaN)作のアイリスアウト（画面を丸く閉じながら暗転させる手法）のような画像を生成するジェネレーター。

![tohohoifyで生成されたアイリスアウト風の画像](https://i.gyazo.com/7d69f2e4610112ae654bf628ef568ef9.png)

> [fix: Axe DevTools Critical Issues by yamanoku · Pull Request #20 · SnO2WMaN/tohohoify](https://github.com/SnO2WMaN/tohohoify/pull/20)

[aXe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)でCriticalなアクセシビリティ上の問題となっていた箇所を修正したものです。

## kawamataryo/animated-emoji-gen

[Kawamata Ryo](https://twitter.com/KawamataRyo)による動くSlack絵文字のGIFを作ることができるアプリ。

> [fix: axe DevTools Critical Issues by yamanoku · Pull Request #11 · kawamataryo/animated-emoji-gen](https://github.com/kawamataryo/animated-emoji-gen/pull/11)

上記のtohohoifyと同様に[aXe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)でCriticalなアクセシビリティ上の問題となっていた箇所を修正したものです。

## yuiseki/crisis-news-map-next

[yuiseki](https://twitter.com/yuiseki_)による全国災害情報地図サイト

> [ニュース記事でのカテゴリラジオボタンをグループ化 by yamanoku · Pull Request #23 · yuiseki/crisis-news-map-next](https://github.com/yuiseki/crisis-news-map-next/pull/23)

災害関連ニュース記事ページでのラジオボタン操作のアクセシビリティを向上させるために、ラジオボタンをグループ化しました。キーボード操作の充実化とグループ化でスクリーンリーダーによる読み上げがよりわかりやすくなるようになりました。

## miyaoka/employment-ojisan

[miyaoka](https://twitter.com/miyaoka)による[sadnessOjisan](https://twitter.com/sadnessOjisan)が就職するまでのカウントダウンサイト。

> [読み上げ対応 by yamanoku · Pull Request #2 · miyaoka/employment-ojisan](https://github.com/miyaoka/employment-ojisan/pull/2)

> [img に alt 入れた by yamanoku · Pull Request #6 · miyaoka/employment-ojisan](https://github.com/miyaoka/employment-ojisan/pull/6)

詳細は[【ネタアプリ】就職カウントダウンサイトを作った話](https://zenn.dev/miyaoka/articles/dfb1ea778d43c6)を参考いただければと思いますが、その中で私はアクセシビリティ対応をしました。

## microcmsio/react-hooks-use-modal

[microCMS](https://microcms.io/)社のReact Hooksを用いてモーダルを呼び出すライブラリ。

> [Improve accessibility by dqn · Pull Request #26 · microcmsio/react-hooks-use-modal](https://github.com/microcmsio/react-hooks-use-modal/pull/26)

上記のアクセシビリティ対応自体は[dqn](https://github.com/dqn)によるもので私によるものではないですが、老婆心でアクセシビリティレビューを勝手にしてしまいました。

> [`close()` useCallback does not work with the button spacebar · Issue #27 · microcmsio/react-hooks-use-modal](https://github.com/microcmsio/react-hooks-use-modal/issues/27)

ボタンをキーボード操作する際にエンターキーでは機能するのですが、モーダル内ではスペースキーでは機能しなかったのでバグとして報告しました。

## sergeicodes/a11ymyths

アクセシビリティにまつわる謬説（まちがった説や説明）をまとめたサイト。

> [Add Japanese version. by yamanoku · Pull Request #12 · sergeicodes/a11ymyths](https://github.com/sergeicodes/a11ymyths/pull/12)

MITとして公開されていたのでフォークして独自で日本語版を公開したところ、オーナーの[Sergei Kriger](https://github.com/sergeicodes)が日本語版でコントリビューションしませんか？と誘われたので別途Pull Requestを作成しました。

## react-hook-form/react-hook-form

React Hooksでのフォームの状態管理・バリデーションをするライブラリ。

[Suggest: Moving the Accessibility (A11y) item in Advanced Usage to Get Started. · react-hook-form · Discussion #5444](https://github.com/orgs/react-hook-form/discussions/5444)

ドキュメントにはアクセシビリティに関する項目があったのですが、WAI-ARIAによるものでReact Hook Form APIの上級者向けの扱いとしてのものではないと感じたため、Advanced UsageではなくGet Startedの「Handle errors」項目に移動する提案をしました。

作者とメンテナーでもある[Beier (Bill)](https://github.com/bluebill1049)よりアクセシビリティは高度なものであるという考えが示されましたが、[Peter Coleより賛同するコメント](https://github.com/orgs/react-hook-form/discussions/5444#discussioncomment-3715850)をしていただき、最終的にドキュメントを変更してもらいました。

## sadnessOjisan/twiogp

[sadnessOjisan](https://twitter.com/sadnessOjisan)によるTwitter（現：X）でURLから展開されてOGPが表示される仕組みを活かしたプロダクト。

> [twitter:image:alt 対応 by yamanoku · Pull Request #11 · sadnessOjisan/twiogp](https://github.com/sadnessOjisan/twiogp/pull/11)

Twitter Cardでの代替テキストを付与するための`twitter:image:alt`を設定するようにしました。

## deno-ja/deno-ja

[Deno](https://deno.com/)の日本ユーザによるオンラインコミュニティのランディングページ。

> [`<html lang="ja">` 設定にする by yamanoku · Pull Request #4 · deno-ja/deno-ja](https://github.com/deno-ja/deno-ja/pull/4)

[Fresh](https://fresh.deno.dev/)でのデフォルト設定では`lang="en"`になっており、日本ユーザ向けサイトなので`lang="ja"`になるように変更しました。

## storybookjs/storybook

UIコンポーネントをカタログ化して管理・開発するためのツール。

> [fix: skip to canvas link style by yamanoku · Pull Request #21021 · storybookjs/storybook](https://github.com/storybookjs/storybook/pull/21021)

Storybookにはサイドバーにキャンバスへのスキップリンクが存在します。サイドバーに登録されているロゴが縦長の場合や横幅を広げた場合にスキップリンクが表示されることがありました。

<figure>
  <img src="https://user-images.githubusercontent.com/845031/205020926-36bf316d-b901-4faf-9c89-082f006e0694.png" alt="サイドバーに登録されているロゴが縦長の場合にスキップリンクが表示されているスクリーンショット" width="640">
  <figcaption><a href="https://github.com/storybookjs/storybook/pull/15740#issuecomment-1333496719">該当Issue</a>より引用</figcaption>
</figure>

このスキップリンクの表示方法を`opacity`で管理するようにして、上記問題点を解消しました。

---

以上が、これまで私がオープンソースプロジェクトへ行ってきたアクセシビリティに関するコントリビュートの紹介です。

最初は、自身が持つアクセシビリティに関する知識を活かし、ドキュメントの日本語翻訳から始めました。その後、様々なサイトやプロダクトのアクセシビリティ改善や提案を行ってきました。これらの経験は、実際の業務にも大いに役立ち、アクセシビリティに関する知識や経験を深めることができました。

私の経験が、皆さんにとってオープンソースプロジェクトへのアクセシビリティコントリビュートへの興味を引き起こすきっかけになれば嬉しいです。しかしながら、注意していただきたい点もあります。

今回紹介したコントリビュートは、マージされたり採用された例です。しかし、マージされなかった提案も当然存在します。

オープンソースへの修正や提案は、そのプロジェクトのポリシーに沿っていれば自由に行えます。ただし、時には求められている対応とは異なる場合や、メンテナからの反応がない場合もあり、必ずしもマージ・採用されるとは限りません。

そうした場合には、自分でフォークしたオープンソースとして公開する方法もありますが、その際は自身でのメンテナンスが必要となり、元ソースの方が引き続き参照される可能性もあります。アクセシビリティに対するオープンソースへのコントリビュートに興味がある方は、これらの点を考慮して取り組んでみてください。

今後も私は可能な限りオープンソースへのアクセシビリティコントリビュートを続けていきたいと考えています。皆さんも、ぜひオープンソースへのアクセシビリティコントリビュートに挑戦してみてください。
