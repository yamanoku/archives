---
title: markuplintをプロダクトに導入してみた
description: markuplintをプロダクトに導入してみた話です
date: 2021-10-07
author: yamanoku
noindex: true
layout: '../layouts/ArchivesPost.astro'
---

![](https://i.gyazo.com/96e1d4851ca4e1c5221bb06cdb750995.png)

こんにちは、こんにちは。フロントエンドとWebの可能性を信じる[@yamanoku](https://twitter.com/yamanoku)です。<br>
最近気になっている W3C Working Draft は[CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)です。[^1]

現在クラウドワークスのプロダクトで導入されているフロントエンドのlintツールはeslint、stylelintで、これらの規約に違反しているコードはCIによるチェックを通じて指摘されるようになってます。

今回このlintツールの中に新たに「markuplint」を追加した話をしようと思います。

## markuplintについて

詳細については[公式のリポジトリ](https://github.com/markuplint/markuplint)や[作者による紹介（YouTube動画）](https://youtu.be/7Vl0TKPAMJw?t=345)を見ていただくのが一番なので、ここでは軽い紹介に留めます。

その名の通り「マークアップすること」に関するlintツールで、各種ルールについても柔軟に設定できるようになっています。
かつてフロントエンドチームで[アクセシビリティチェックを行ってみた経験](https://engineer.crowdworks.jp/entry/product_accessibility_check)から、健全なマークアップを効率的にやっていけるといいなと思って、このlintツールは気になっておりました。

HTMLのlintツールとして[HTMLLint](https://github.com/htmllint/htmllint)もありますが、markuplintはHTMLの規約を守るものとしてよりも、チーム内でのマークアップ規約なるものをlintツールで定義していく使い方が向いていると思っています。

またパーサーも種類豊富で、JSX、React、VueやSvelteなど13種類の言語・テンプレートエンジンで使用可能です（2021年9月現在）。

パーサーについては以前私からの要望で作者にerbも作成してもらったのですが、erbファイルが膨大すぎて使う機会がなく作らせてしまっただけになりました。


[https://twitter.com/yamanoku/status/1311527268397707264](https://twitter.com/yamanoku/status/1311527268397707264)

[https://twitter.com/cloud10designs/status/1361115436117450753](https://twitter.com/cloud10designs/status/1361115436117450753)

（作者にはお伝えしましたがこの場を借りて改めて）使えておらず大変申し訳ありませんでした…。

ちなみにCLIとして動かす以外にも[VSCodeのExtentions](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint)でも公開されています。

## プロダクトで使ってみる

前述したとおりerbファイルで使おうと考えていましたが、小さく始めようと思った矢先に大量にエラーが出たらそれも併せて修正しないと…となるとスタートとしてあまりよくないなと判断しました。

そこで、以前[ログイン画面をリニューアルした話](./renewal-crowdworks-login-page)で新たなデザイン基盤にVue.jsを使って開発していると書きましたが、そのファイル群にmarkuplintを適用し「デザイン基盤でのマークアップ規約となるよう活用してみよう」というところからはじめました。

markuplintの対象はデザイン基盤のコードのみに絞り、

```json
"markuplint": "markuplint 'app/javascript/norman/**/*.vue'"
```


CircleCIにてジョブを追加し、新たにチェック対象として動作するようにしました。

![CircleCIのjobで「markuplintの実行」が成功しているスクリーンショット](https://i.gyazo.com/8f8cf9a9bac98bed56868563ba796a3d.png)

## ルールの適用について

markuplintのルールについては以下で適用しています。

```json
{
  "rules": {
    "required-attr": true,
    "indentation": false
  },
  "nodeRules": [
    {
      "tagName": "img",
      "rules": {
        "required-attr": [
          "alt",
          "srcset"
        ]
      }
    }
  ],
}
```

- `<img>`のタグに`alt`,`srcset`を両方設置する
  - `srcset`では社内で画像を使う場合、解像度指定をするルールがあるため
- インデントルールは無効
  - Prettierでの整形と被る可能性があるため

現状は上記ルールの拡張をしているだけですが、汎用的なコンポーネント化が進んできたときに、[permitted-contents](https://markuplint.dev/rules/permitted-contents)ルールで内部で使うタグを定義して指摘できるようにしたいです。

またアクセシビリティ対応のために[WAI-ARIAルール](https://markuplint.dev/rules/wai-aria)整理もしていきたいです。

## GitHub Sponsorによるサポート

現在markuplintでは[GitHub Sponsorの窓口](https://github.com/sponsors/markuplint)も作られており、弊社社員からもスポンサードしています。

[https://twitter.com/markuplint/status/1433027060524470272](https://twitter.com/markuplint/status/1433027060524470272)

そのほかこうした要望がある、こういう問題があった、とIssueで報告することもサポートする形だと思います。
更に使い込んでいってソースコード側のプルリクエストにてコントリビュートもしていければと考えております。

## おわりに

まずは試しに[Playground](https://playground.markuplint.dev/)で試し、VSCodeの拡張を入れるなど小さく始めつつ、チームでのマークアップ規約をつくる際に使用してみてはいかがでしょうか。

現在、markuplintはv2.0に向けて開発も進んでおり、[SVG対応](https://github.com/markuplint/markuplint/issues/166)や[CSS設計補助の強化](https://github.com/markuplint/markuplint/issues/227)、[終了タグ](https://github.com/markuplint/markuplint/issues/246)にまつわるルールも想定されていたりします。

機能面もそうですが、markuplintを使って業務効率が改善できたといった話や、より多くの方が触ってみてmarkuplintのユースケースも増えていけばいいなといちユーザーとして思っております。

[^1]: [継続的ドキュメンテーション: Github DiscussionsとADRのすすめ - LIFULL Creators Blog ](https://www.lifull.blog/entry/2021/09/08/100000)リスペクト
