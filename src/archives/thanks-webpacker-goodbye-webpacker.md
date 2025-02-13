---
title: ありがとう Webpacker さようなら Webpacker
description: Webpacker から Simpacker + webpack に移行した話
date: 2022-12-13
author: yamanoku
source: engineer.crowdworks.jp
noindex: true
---

![アイキャッチ：ありがとう Webpacker さようなら Webpacker](https://i.gyazo.com/567989b2601e625e02adecd20e97b503.png)

こんにちは。crowdworks.jp における技術的負債の解消をリードするジャンヌチームです。

12 月ということでアドベントカレンダーの時期ですね。今年も弊社で開催しており、合計 25 名が参加して盛り上げております。

[クラウドワークスのカレンダー | Advent Calendar 2022 - Qiita](https://qiita.com/advent-calendar/2022/crowdworks)

ジャンヌチームからは [@okuto_oyama](https://twitter.com/okuto_oyama) が今年のフロントエンド活動の振り返りをしていました。

[クラウドワークスの​フロントエンド活動を​振り返る​ 2022](/looking-back-at-crowdworks-front-end-activities-2022)

その中の１つに「Webpacker から Simpacker + webpack 構成へ」というものがあり、今回はそれに関する取り組みを紹介していきます。

## Webpacker とは

[Webpacker](https://github.com/rails/webpacker) は Rails アプリケーションにおける webpack でのフロントエンド開発をするときに用いる公式ライブラリです。このライブラリの利点として webpack のビルドシステムに詳しくなくとも汎用的な設定が提供されており、すぐにモダンなフロントエンド開発がしやすくなるというところです。Rails 6 からは標準のライブラリとして搭載されています。

crowdworks.jp における Webpacker の導入については過去のブログ記事をご覧ください。

[CrowdWorks流！Webpacker活用術 - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/2018/07/30/151813)

## なぜ Webpacker を辞めるのか

そんな Webpacker を辞めることになったのですが、そうするに至った理由をあげてみます。

### Webpacker は今年１月にリタイア宣言をしているため

- 次期バージョンの RC 版が正式リリースされるのは未来永劫無いので使い続ける必要がない
  - 後続の [Shakapacker](https://github.com/shakacode/shakapacker) を使う選択肢もある
  - しかし crowdworks.jp において Rails 依存のフロントエンド開発からの脱却を計画しているのでこの選択肢としては誤り

### Webpacker に依存しているモジュールが隠蔽されているため

- 内部の webpack に依存しているものが隠蔽されており、なにが使用されているか分かりづらい
  - Babel 周りの設定を crowdworks.jp 本体の package.json に含めていなかったのでビルド失敗することが何度かあった
  - デバッグ自体が容易ではない
    - stylelint の v14 系は [postcss を入れないといけない](https://github.com/stylelint/stylelint/issues/5632#issuecomment-951601124)のだが、Lint は通っても webpack のビルドで失敗していた
      - 原因を探りたいがどこの設定が悪いのかが一見してわからなかった
  - 素の webpack に移行することで、設定を自分たちで考えることができる

### パフォーマンスチューニングがしづらいため

- webpack だけではないが、 Rails における assets precompile のビルドも CI で動いている
  - ここにかかる時間が長くなり、CI やデプロイが失敗するためリソースクラスを拡大している状態
  - 細かい webpack のチューニングができていない
  - webpack 自体のアップデートで軽減できることもありそう
    - 使用していた Webpacker の安定版に内包されている webpack は v4

以上の観点から Webpacker の利用自体を廃止して、フロントエンドの責務はフロントエンドで管理できるようにしようと決めました。

ちなみに先の未来として crowdworks.jp ではフロントエンドフレームワークに移行したいと思っており、すべてそちらで動かせるなら Webpacker を削除する対応自体が不要になります。ですが、フレームワークへの移行自体はまだ目処が立っていない状況のため、正しい現状維持として webpack を使う方向にしています。

## やることを整理する

まずは Webpacker を辞めるにあたり、やることを整理してみました。過去の取り組み事例としていくつかの Webpacker を辞める記事があったのでそれらを参考にしてみました。

主に [pixivさんの記事](https://inside.pixiv.blog/subal/4615) と [iCAREさんの記事](https://dev.icare.jpn.com/dev_cat/bye_bye_webpacker/) が参考になりました。この場を借りてお礼申し上げます。

- webpack の設定
  - Webpacker DSL（独自設定）（config/webpack 以下）を webpack.config.js に移行
  - 必要なプラグイン・モジュールのインストール
  - webpack-dev-server の設定
- Webpacker を削除
  - gem から削除
  - config/webpacker.yml を廃止する
- Rails での webpack ビューヘルパーの実装
  - ヘルパー実装
  - テスト実装
- Docker, CI 設定の変更
  - CI に webpack ビルド機構を組み込む
  - docker-compose の設定に webpack 処理を追記する
  - ステージングでの CI チェック
  - docker-compose の挙動チェック
- ローカル・ステージングでの動作確認
  - ローカルでの画面確認（webpack ビルドに関する画面のみ）
  - ステージングでの画面確認（webpack ビルドに関する画面のみ）

## Webpacker の実装を調査する

最初にやったこととしては Webpacker の実装がどうなっているかを調査しました。

まずは全体がどうなってるかをざっくり把握するため、Webpacker の設定を出力するようにしてみました。

方法はいたって簡単で `config/webpack` に配置してあった各環境の DSL ファイルにおける `module.exports` 内の末尾に `console.dir(webpackConfig, { depth: null });` といった形でログがでるようにしてみました。関数ベースで書かれているところは細かく見られませんが、これでざっくりと全体の形がわかりました。

Webpacker に含まれていた webpack の設定箇所は以下詳細より確認できます。

<details>
  <summary>設定詳細</summary>
  <ul>
    <li>
      <a href="https://v4.webpack.js.org/configuration/entry-context/#entry">entry</a>
      <ul>
        <li>webpack 側で読み込むファイルの設定箇所</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/output/">output</a>
      <ul>
        <li>ビルドされ書き出される箇所の設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/resolve/#root">resolve</a>
      <ul>
        <li>モジュールをどう名前解決できるかの設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/resolve/#resolveloader">resolveLoader</a>
      <ul>
        <li>webpack の loader パッケージの名前解決のみの設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/node/#root">node</a>
      <ul>
        <li>
          特定の Node.js グローバルとモジュールをポリフィルまたはモックにするかどうかを設定
          <ul>
            <li>
              Node.js 環境用に書かれたコードが、ブラウザなどの他の環境でも実行できるようになる
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/concepts/loaders/#root">loaders</a>
      <ul>
        <li>
          webpack は JS と<a class="keyword" href="http://d.hatena.ne.jp/keyword/JSON">JSON</a>のみを理解する。そのため他のファイルを解読できるように変換してくれる部分
          <ul>
            <li><code>hoge-loader</code>&nbsp;みたいなものがそれにあたる</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/concepts/plugins/">plugins</a>
      <ul>
        <li>webpack のプラグイン設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/mode/#root">mode</a>
      <ul>
        <li>開発環境設定</li>
        <li>
          <code>production</code>, <code>development</code> などを指定できる
        </li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/devtool/#root">devtool</a>
      <ul>
        <li>ソースマップの生成、どのように生成するかの設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/stats/#root">stats</a>
      <ul>
        <li>表示されるバンドル情報の制御に関する設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/other-options/#bail">bail</a>
      <ul>
        <li>エラー発生時に失敗させる設定</li>
      </ul>
    </li>
    <li>
      <a href="https://v4.webpack.js.org/configuration/optimization/">optimization</a>
      <ul>
        <li>最適化実行に関する設定</li>
      </ul>
    </li>
  </ul>
</details>

次はその結果を元にして詳細な Webpacker の実装を調査していきます。

[rails/webpacker at 5-x-stable](https://github.com/rails/webpacker/tree/5-x-stable)

crowdworks.jp で使用していた Webpacker のバージョンは 5 系だったので `5-x-stable` のブランチを確認しました。関心があった部分は `webpack.config.js` にあたる部分なのでそのソースのみを見てみました。

- `webpacker/package/environments/` … 環境設定関連。基本的な webpack 設定が入っている
- `webpacker/package/rules/` … loaders の rule 一覧。使っているものだけ参考にする

また、併せて必要な [package.json](https://github.com/rails/webpacker/blob/5-x-stable/package.json), [babel.config.js](https://github.com/rails/webpacker/blob/5-x-stable/lib/install/config/babel.config.js), [postcss.config.js](https://github.com/rails/webpacker/blob/5-x-stable/lib/install/config/postcss.config.js) も確認しました。

## Webpacker と webpack 単体でのビルド結果を比較する

内部の実装を参考にしつつ webpack 単体でビルドできるかを実験してみました。

crowdworks.jp ではフロントエンド関連のツール（Storybook など）は別階層のディレクトリにあるのでそこに新た設置し、アプリケーション内のフロントエンドコードを参照する webpack の設定をしました。

ビルドが一通り通るようになったのを確認したあとは、ステージング環境でビルドされる結果と webpack 単体でビルドした結果の差分を比較してみました。

crowdworks.jp ではアプリケーションのビルドパイプラインに CircleCI を使用しているので、`artifacts` にビルドされたファイル群を保存するようにしました。

```yaml
- run:
  name: Compress Artifacts
  command: tar -cvzf assets-precompile.tar public/packs
- store_artifacts:
  name: Uploading artifacts - assets:precompile の結果を保存
  path: assets-precompile.tar
```

設定として足りていない部分やファイル数・内容に差分があったところは見直しながら揃えていき、最終的にほぼ一致[^1] するところまで揃えることが出来ました。

[^1]: 一部ビルド結果に差分があった箇所については表示・操作において問題がないと確認・判断できたので許容することにしました。

## webpack のビルド結果を Rails アプリケーションに組み込む

ビルド結果が問題ないことを確認したら、次は実際にそれらを Rails アプリケーションに反映していきます。

Webpacker は [webpack-assets-manifest](https://github.com/shellscape/webpack-manifest-plugin) を使用して manifest.json を作成、それを用いて Rails の View ヘルパーへ配信する形になっています。

Webpacker を辞めるために代替となる View ヘルパーも作成する必要があったのですが、独自でヘルパー実装するよりも [Simpacker](https://github.com/hokaccha/simpacker) という gem を使用してみることにしました。

Simpacker は Webpacker とは違い webpack 側の設定を一切管理せず、出力する manifest.json のパスだけしか関与していません。責務もきれいに分割されており、設定自体も非常にシンプルです。

Webpacker を使用していた時から Split Chunks の設定をしていたので以下ヘルパーを導入して置き換えることにしました。

```ruby
def javascript_packs_with_chunks_tag(*names, **options)
  paths = names.flat_map{ |name| simpacker_context.manifest.lookup!("entrypoints", name, "js") }.uniq
  javascript_include_tag(*paths, **options)
end

def stylesheet_packs_with_chunks_tag(*names, **options)
  paths = names.flat_map{ |name| simpacker_context.manifest.lookup!("entrypoints", name, "css") }.uniq
  stylesheet_link_tag(*paths, **options)
rescue Simpacker::Manifest::MissingEntryError
  # css を extract しない場合もあるのでその場合はエラーが発生するが何も返さない
end
```

## webpack-dev-server を動かせるようにする

Webpacker では [webpack-dev-server](https://github.com/webpack/webpack-dev-server) も内包されていたため、こちらも動作できるようにしました。Simpacker を導入していたので、webpack.config.js で `devServer` の部分を変更して npm scripts で動かせるようにするだけで済みました。

webpack-dev-server を動かすようにした際の問題点として、内包されていたバージョンが 3 系で Webpacker と同じ設定をしてもうまく動作してくれないことがありました。

これについては原因を細かく調査するよりも、開発のみで使うものでプロダクションに影響がないのであれば最新版にして動けばよいのではと思い、最新の 4 系までアップデートして `devServer` の設定に関する部分のマイグレーションも行いました。

結果としてこれで動作するようになりました。Webpacker 5 系からの移行を検討されている方は参考にしてみてください。

## CI 上の動作をチェックする

上記にもありますが、crowdworks.jp のデプロイは CircleCI で管理されています。モノリシックなアプリケーションとなっているためフロントエンドのビルド機構もその中に組み込まれており、ここが失敗しないように webpack に差し替わったときの設定を見直していきます。

設定を見直している中で、フロントエンドのエラー監視体制のために[ソースマップファイルを Rollbar にアップロードしている](https://engineer.crowdworks.jp/entry/2020/06/24/130000) ワークフローも入れているのですが、何故かアップロードできない事象にひっかかりました。

原因を調査をしていくと、`yarn install` をする際に付けていた `--ignore-optional` オプションの影響だと判明しました。

これは webpack で生成されるソースマップファイルが optional dependencies に依存していたため、必要なモジュールがなくうまく生成されていないというものでした。そのため、このオプションは外してインストールさせることにしました。

## エンジニアにローカル環境で動作するかチェック依頼する

crowdworks.jp の開発では Docker を使用しているため、エンジニア向けに Simpacker + webpack での動作確認を依頼しました。

![スクリーンショット：Slackのチャンネル上でモバイルアプリチーム以外のエンジニア向けに Docker の実行手順、それをもとにした確認事項についてを連絡している](https://i.gyazo.com/f6be587c9de55c5176b1e4f2ce4a00ba.png)

Docker 立ち上げやビルド結果の反映自体は問題なかったのですが、webpack-dev-server における Hot Module Reloads がうまく動作していない部分について分かりました。その後ジャンヌチーム内で動作確認しつつ修正しました。

## モブレビュー会を実施する

今回、変更点が非常に大きい PR となってしまったため、ジャンヌチームの中で前提知識や認知負荷を軽減させるためにモブレビュー会を実施しました。

![スクリーンショット：「2022-10-27 脱 Webpacker モブレビュー会メモ」というタイトルの Notion 記事。モブレビュー時のメモなどが記載されている。](https://i.gyazo.com/f0514f89c2de231aa6e37ce64722d7d0.png)

長い間取り組んでいたもののため、自分自身もやったことを振り返ることができ、動作として不明だった部分も原因が明らかになりました。この会で発見した漏れなども修正して反映させました。

## Architecture Decision Records を策定する

現在 crowdworks.jp ではアーキテクチャの選定理由を残すために Architecture Decision Records（以下 ADR）を今年の 9 月より導入しています。

Webpacker の廃止に伴う作業中にはまだなかった取り組みですが、今回の移行で Simpacker を導入することになっていたのでその ADR を策定し、エンジニア内でレビューしてもらうことにしました。

![スクリーンショット：Webpacker から Simpacker（+ webpack）へ移行する ADR ドキュメント](https://i.gyazo.com/e9dee178ea15247b895ce3d7b2f31fa6.png)

ちなみに ADR の取り組みが導入されてからのはじめてのドキュメントとなりました。

## リリース当日

長きに渡る対応でしたが、必要な対応はすべて揃ったのでいよいよリリースします。ステージング環境でも何度も検証してリリースに際しては問題ないとは思っていましたが、念のため事前にエンジニアへの共有をさせてもらいました。

![スクリーンショット：Webpacker を辞める作業のリリースについてを Slack チャンネルで連絡している様子](https://i.gyazo.com/0e4c618e45643ddd04f43ad57bd89102.png)

非常に大きな変更となったのでリリースはとても緊張しましたが、リリース完了後は動作が問題なくアラートも飛ばずユーザー影響がないと判断したので、完了報告と改めての動作手順を共有させていただきました。

![スクリーンショット：リリース完了後、Simpacker + webpack になった環境への反映方法を Slack チャンネルで連絡している様子](https://i.gyazo.com/5f6238156516dfdfb80a1e058899ca94.png)

無事うまくリリースできてよかったのか、しばらくは放心状態でありました。

## 振り返り

今回の Webpacker を辞めるまでの取り組みについて振り返ってみました。

### Good

- Simpacker + webpack への移行自体をやりきることができた
- webpack の管理やビルドの責務を Rails から分割できた
- EOL の状態を解消できた

### Problem

- Webpacker に内包されていた npm packages を大量に抱え込むことになった
  - Try ⇒ _これはすでに想定していたことなのでアップデートも兼ねて剪定をしていく_
- npm packages 更新も進行していたので package.json でコンフリクトが多発し、リベース作業が困難だった
  - モジュール自体を追加した状態で検証し、先にリリースすべきだった
  - Try ⇒ _ビルド差分の検証ができる機構をつくっていく（今後のアップデートの心理的安全性を築く）_
- 移行作業を [@okuto_oyama](https://twitter.com/okuto_oyama) が 1 人で抱え込んでいた
  - 片手間で調査を進めていたところからそのまま修正対応も行っていた
    - 詰まっていたところを [@bugfire](https://qiita.com/bugfire) もいくつか補佐してくれた
  - 全体のエンジニアの開発に関わる部分なのでチーム内で分担する作業にしてもよかった
  - Try ⇒ _調査からそのまま着手せず全体の見通しが分かってからタスクとして切るようにしておく_

## おわりに

今年の 4 月より調査を開始し、途中チーム内での別の作業のため止めていた時期もありましたが、11 月 24 日にようやく移行してリリースできました。年内に終わらせることができて本当によかったです。

Webpacker 自体に苦しめられたこともありますが、長きに渡り crowdworks.jp のモダンなフロントエンド開発を支えてくれていたのも事実です。今まで共に戦ってくれてありがとうございました。

> Webpacker脱却記事も多いので、フロントエンド人材が育ったら引き剥がすことがそこまで難しくなさそうなのもポイントです。
>
> Webpackerをフロントエンド環境の補助輪と考えて、将来存在が足かせになったタイミングでWebpackerのレイヤは剥がしてもらえばよいと考えています。
>
> [メンテ不能になったフロントエンド環境を立て直す話 - クラウドワークス エンジニアブログ](https://engineer.crowdworks.jp/entry/2019/05/28/114806)

過去のフロントエンド環境を立て直す記事を見なおして、このレイヤを剥がしてもいい段階にこれたのかなと個人的にしみじみしていました。

Webpacker は辞めることができましたが、引き続き webpack のバージョンアップも含め開発者体験を損なわないビルドフローの改善にも取り組んでいければと思っております。

## 参考文献

- [今日から簡単！Webpacker 完全脱出ガイド - pixiv inside](https://inside.pixiv.blog/subal/4615)
- [RailsからWebpackerを外してpureなwebpack構成にしてみる その3 | Mission-Street.](https://hakozaru.com/posts/purge-webpacker-3)
- [フロントエンド原理主義者が目論んだ脱webpacker. webpacker+vueのプロジェクトをwebpack+vueにする | by Tomoya Komiyama | スタディスト開発ブログ](https://studist.tech/goodbye-webpacker-183155a942f6)
- [Steb by Step で剥がす Webpacker - 30歳からのプログラミング](https://numb86-tech.hatenablog.com/entry/2019/01/10/211416)
- [WebpackerをやめるならWebpackManifestというgemが便利、という話 | Raksul ENGINEERING](https://tech.raksul.com/2018/10/18/rails-webpack-without-webpacker/)
- [Rails: Webpacker→jsbundling-rails+webpackアップグレード手順（翻訳）｜TechRacho by BPS株式会社](https://techracho.bpsinc.jp/hachi8833/2022_02_03/115289)
- [モノリシックな Ruby on Rails サービスからの Webpacker の剥がし方 | 働くひとと組織の健康を創る iCARE](https://dev.icare.jpn.com/dev_cat/bye_bye_webpacker/)
