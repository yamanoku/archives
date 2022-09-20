---
title: 生まれ変わったログインページにまつわるフロントエンド開発の話
description: クラウドワークスのログインページリニューアルにまつわるフロントエンド開発の話です
date: 2021-08-18
author: yamanoku
layout: '../layouts/ArchivesPost.astro'
---

![](https://i.gyazo.com/fe4a2e7b145af6bdeed58321dc1e0c84.png)

こんにちは！クラウドワークスで引き続きフロントエンドとWebの可能性を模索し続けている [@yamanoku](https://twitter.com/yamanoku) です。

最近の取り組みとして、この度「デザイン基盤整理」という有志活動の中で[ログインページ](https://crowdworks.jp/login)を刷新しました。

<b>Before</b>

![スクリーンショット：リニューアル前のログインページ](https://i.gyazo.com/9e2f15f24af30b177a209a3ece9514b3.png)

<b>After</b>

![スクリーンショット：リニューアル後のログインページ](https://i.gyazo.com/1c00cf8ddb2fc2b7f5ec11b9b22f2800.png)

以前はPC・モバイル画面それぞれ定義されていましたが、今回の改修でレスポンシブ対応したモバイルファーストな改修になりましたね。

今回はその刷新した取り組み・内容についてをフロントエンドの観点から紹介してみようと思います。

8/25 更新：デザイナーブログも公開されましたのでこちらも合わせてご覧ください。

[生まれ変わったログインページとデザインシステムのスタート｜タカシ｜note](https://note.com/4_taka_4/n/n7551b8d897de)


## デザイン基盤整理とは

ユーザーに価値を提供するために日々デザイン・開発をしていますがプロダクトが大きくなるにつれて以下の問題点が生じてきます。

- 何の意図をもってデザインされたものなのかわからない
- 複雑な実装になっているため変更提案ができない・しづらい
- デザインデータのメンテナンスがなく１から作る必要があり必要な作業時間がとられる

そうした問題点を解消し、ユーザーへの価値を最速で届けられる基盤を作る目的で発足されたものがデザイン基盤整理です。

当初はデザイナーが主体となって基盤整理を進めていました。<br>
その後フロントエンドやデザインへ関心があるエンジニアも参加して徐々に大きくなってきました。

そんなデザイン基盤整理の最初の取り組みとして、今年の3月から新ログインページを設計・リリースを目指す動きが始まりました。

ちなみにリニューアルに際して、コード上で判別できるようにコードネームを決めようとなり、プロダクトオーナーが何気なく提案した「Norman」がそのまま採用されました。

![ミハイ・チクセントミハイさんの後継者とか居ないかな、または誰デザの著者への敬意を込めて「Norman」とか じゃあ、Normanで（スマイルマーク）](https://i.gyazo.com/2a5c8fdb7501e8a29fa4ed577c152bc4.png)

ノリで決まったところはありますが、個人的にはお気に入りです。<br>
※ミハイの後継者、というくだりは以前作成していたCSSフレームワーク「Mihaly」のプロジェクトネームから来ています。

## なぜログインページから着手したのか

最初にデザイナーが体験設計における重要度順で改修すべきページをリストアップしていました。

しかしクラウドワークスでは、バックエンドとフロントエンドの分離が出来ていない状態であるので、目に見えている範囲以外にもコード上で考慮しなければならない箇所や複雑な要件も存在します。

そこで [@t0yohei](https://twitter.com/t0yohei) がエンジニア観点での実装難易度を比較したシートを作成してくれました。

![重要性検討一覧（実装難易度メモ付き）シートが開いているスプレッドシートのスクリーンショット](https://i.gyazo.com/4ceab07769d29bbc43fabfdb97f1712a.png)

実装難易度については以下の観点で考慮しました。

- GET処理だけしているページ
  - 表示するだけのページ、POST処理ほかビジネスロジックが入り組んでいないところ
- バックエンド側の変更が容易そうなところ
  - メインの業務を進めつつ合間で対応可能か
- SEO観点で見て影響が少ないところ
  - Vue.js単体でページ実装する（後述）ためGoogle botへの考慮

そうしたデザイナー・エンジニアの総合的な観点で、まずはログインページから着手するのが良さそうではないか、という結論になりました。

## 実装に関して考慮したこと

新ログインページを実装するにあたり、フロントエンド観点で考慮したことを紹介します。<br>
※ 執筆時点ではVue 2 × [@vue/composition-api](https://github.com/vuejs/composition-api)で実装したものになっています。

### デザイン基盤整理用の新たなerbファイルの作成

今回の改修ではerbファイルをidでマウントする以外はVue.jsのみで操作できるようRails依存を極力脱した実装をしています。

弊プロダクトではSprocketsとwebpackerが入り交じっており、デザイン基盤整理用に新たな分岐をつくるのはさらなる混沌を産みかねないと判断しました。

そこでまっさらな状態のレイアウトファイルを作成してそこにマウントできるような新たなページを作成しました。

```ruby
  #
  # RawPage 用のページ用にビルドされた JS を読み込むタグを返す
  # 存在しなければ例外を発生させる
  #
  # @return [String] script tag
  def raw_page_javascript_pack_tag(page:)
    # EntryPoint は app/javascript/packs/raw_pages/**/*.ts となります。
    pack_path = "raw_pages#{page}"
    full_path = "app/javascript/packs/#{pack_path}"

    if Rails.root.join("#{full_path}.ts").exist? || Rails.root.join("#{full_path}.js").exist?
      return javascript_packs_with_chunks_tag(pack_path)
    else
      raise RuntimeError, "javascript for RawPages is not found: #{full_path}"
    end
  end
```

```typescript
import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueCompositionApi from '@vue/composition-api';
import '/app/javascript/norman/lib/common_css.ts';
import LoginContainer from 'norman/components/pages/login/LoginContainer.vue';

const buildVue = () => {
  const el = '#vue-container';

  if (!document.querySelector(el)) {
    return;
  }

  Vue.use(VueCompositionApi);
  Vue.use(VueMeta);

  document.addEventListener('DOMContentLoaded', () => {
    new Vue({
      el,
      components: { LoginContainer },
      render: (h) => h('LoginContainer', {}),
    });
  });
};

buildVue();
```

`<div id='vue-container' />` のみのviewファイルを作成してそこにマウントしています。<br>
meta情報については `vue-meta` を使用してメタ情報を認識できるように実装しています。

### Storybook を使用した開発

クラウドワークスのフロントエンド開発では去年より [@Bugfire](https://twitter.com/andobario) の方でStorybookを試験的に導入し、今年からプロダクト開発において積極的に活用するようになりました。<br>
Storybookの導入により以下メリットのある開発ができるようになりました。

- Railsアプリを立ち上げなくてもNode.jsのみでStorybookを立ち上げてフロントエンド単体の開発ができるようになった
- ビルドした静的ページをS3にアップしてエンジニア以外でも確認できるようになった
- エラー時の見た目も実際の挙動で確認せずともStoriesで区切って確認ができるようになった
- [@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y) を用いて、コンポーネントごとのアクセシビリティチェックができるようになった

Storybook開発は今年6月にリリースされた[カンタン発注プラン診断](https://crowdworks.jp/order_plan_diagnoses)でも使用されており、今回のデザイン基盤整理での開発においても活躍してくれました。

[オススメの発注方法・予算相場を約1分で知れる「カンタン発注プラン診断」機能をスタートしました – クラウドワークス　お知らせブログ](https://blog.crowdworks.jp/archives/4430/)

### デザイントークンの活用

デザインから実装へ移る際、参考にしたものの1つとして**デザイントークン**の考え方があります。<br>
デザイントークンとはデザインシステムを構築する上で使われるパタン・ランゲージのことです。

たとえば色、フォントサイズ、余白や空きの数値などを一貫性のある値として定義し、それを共同で使用して認識できるようにします。

最初から共通のコンポーネントを作って運用していくことも考えました。<br>
ですが、まだ始まったばかりの改修から共通化を進めると、拾えきれない・想定しきれなかったユースケースが出てきたりして破綻する可能性もあります。<br>
とはいえ、ルールなき実装のまま進めていくとデザイナー・エンジニアの認識を揃えることも難しくなります。

どう進めていくか悩んでいたとき、以前参加したpixivテックカンファレンスでの[デザインシステムの発表](https://inside.pixiv.blog/2021/07/01/151500)から「コンポーネント集から作るのではなくまずは定数を決めていく」という取り組み方が参考になりました。

まずはユーティリティとして使うデザイントークンという共通の定数で認識を揃えていくところからはじめました。

どういった粒度や命名にするかを考えるにあたり、[SmartHRのデザインシステム](https://smarthr.design/products/design-tokens/)や[GMOペパボのデザインシステム](https://design.pepabo.com/inhouse/about/)のドキュメントを拝見しました。

最終的にはベーストークン（根底となる値）とセマンティクストークン（意味づけられた値）という考え方で分離することにしました。

```css
:root {
  /**
   * color
   */
  /* loginページ用トークン */
  --login-gray-050: #f9f9f9;
  --login-gray-100: #d5d8dc;
  --login-gray-800: #353d48;
  --login-blue-050: #e6f1fd;
  --login-blue-300: #6bb8ff;
  --login-blue-800: #0068b6;
  --login-blue-900: #064da0;
  --login-red-900: #d91808;
}
```

```css
.button-login {
  background-color: var(--login-blue-800);
}
```

実際に色の変更があったときにトークンで管理することによって、共通で使われていた箇所を洗い出し、漏れを防ぐことができました。<br>
逆に使い回す予定がない一時的に作られたものとしてはトークンとして管理をしないようにもしました。

今現在のデザイントークン命名規則については以下のルールを決めて運用しています。

- white, blackはCSS Variable化しない
- 色に関する`color` は`色名-数字`で表し、数字は0〜1000。色名には “-” を含まない
- フォントサイズに関する `fontsize` は `fontsize-数字` で表し、数字はpxをそのまま示す
- 要素間の空きに関する `space` は `space-数字` で表し、数字はpxをそのまま示す

また、colorの数値を決める際には [Material Design](https://material.io/inline-tools/color/) のカラーピックツールを使用しました。

![Color palettesで青色の数値を検証しているスクリーンショット](https://i.gyazo.com/d7f3e5caf8eac27c0779f120cfebe652.png)

### レイアウト制御コンポーネント

Vue.jsで実装するにあたりボタンや見出し、フォームパーツといったものは1つずつコンポーネントとして細分化して実装しています。

更に要素間の空きについても `Stack` というレイアウト制御コンポーネントで管理するようにしてみました。

Stackについては [Every Layout](https://every-layout.dev/layouts/stack/) で紹介されているレイアウトパターンの1つで、内部コンテンツの空き関係を親側で制御するようにしたものです。

```html
<template>
  <div :class="`stack-${size}`">
      <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

type Spacing = 4 | 8 | 12 | 16 | 24 | 32 | 40;

export default defineComponent({
  name: 'Stack',
  props: {
    stackSize: {
      type: Number as PropType<Spacing>,
      required: true,
    },
  },
  setup(props: { stackSize: Spacing }) {
    const size = String(props.stackSize).padStart(2, '0');
    return { size };
  },
});
</script>

<style scoped>
[class^='stack'] > * {
  margin-top: 0;
  margin-bottom: 0;
}

.stack-04 > * + * {
  margin-top: var(--login-space-04);
}

.stack-08 > * + * {
  margin-top: var(--login-space-08);
}

/* 以下4の倍数ごとに続く */
</style>
```

`Stack` を用いることによって、内部にいかなるコンテンツが入ってきても決められた `margin-top` で制御することができます。

```html
<ContainerLayout>
  <Stack :stack-size="24">
    <Stack :stack-size="32">
      <Stack :stack-size="16">
        <Stack :stack-size="isShowError ? 16 : 8">
          <template v-if="isShowError">
            <Stack :stack-size="8">
              <HeadingLevel2 :heading-text="'ログイン'" />
              <ErrorArea :error-message="errorMessage" />
            </Stack>
          </template>
          <template v-else>
            <HeadingLevel2 :heading-text="'ログイン'" />
          </template>
          <LoginFieldArea
            :text-field-id="'username'"
            :text-field-label="'メールアドレス'"
            :password-field-id="'password'"
            :password-field-label="'パスワード'"
            :submit-button-label="'ログイン'"
            :authenticity-token="authenticityToken"
            :redirect-to-params-value="redirectToParamsValue"
          />
        </Stack>
        <LinkBlock :url="newPasswordResetRequestsPath" :link-text="'パスワードをお忘れですか？'" />
      </Stack>
      <Border />
    </Stack>
    <Stack :stack-size="12">
      <HeadingLevel3 :heading-text="'他のアカウントでログイン'" />
      <div>
        <SnsAccountList :sns-service-list="snsList" :authenticity-token="authenticityToken" />
      </div>
    </Stack>
  </Stack>
</ContainerLayout>
```

### フォーム実装に関するベストプラクティス

今回の新ログインページではメールアドレスとパスワードの入力（SNSアカウントでのログイン導線）という簡易的なフォーム構成になっています。<br>
単純に入力フィールドを[Form Design Patternsのログインパターン](https://form-design-patterns-ja.herokuapp.com/examples/login-form)より参考にして実装しました。

```html
<label :for="fieldId" class="textfield-label">{{ fieldLabel }}</label>
<input
  :id="fieldId"
  :name="fieldId"
  type="text"
  class="textfield-area"
  autocapitalize="none"
  autocorrect="off"
  spellcheck="false"
/>
```

- `autocapitalize="none"` ... メールアドレスで大文字になったりするのを防ぐ
- `autocorrect="off"` ... テキストを自動修正する機能をオフにする
- `spellcheck="false"` ... スペルミス指摘をしない設定にする

`autocorrect="off"` については[標準外の属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#attr-autocorrect)ではあるものの、 iOS Safariユーザーの入力負荷をへらすためのユーザビリティ考慮として実装しています。

エラー表示箇所については `role="group"` でグループ化されているものとして、`aria-labelledby` で見出しのIDを紐付けて何のグループなのかを伝えるようにも実装しています。

```html
<div role="group" aria-labelledby="error-summary-heading">
  <h3 id="error-summary-heading" class="error-visually-hidden-heading">入力内容に問題があります</h3>
  <Stack :stack-size="8">
    <div class="text-center">
      <div class="alert-text">{{ error.text }}</div>
    </div>
  </Stack>
</div>
```

### Rails 特有の記述への留意

リニューアル前のSNSアカウントでのログイン導線は以下のように `link_to` で実装されていました。

```
<% link_to '/auth/facebook', rel: 'nofollow', method: :post do %>
<% end %>
```

最初はページ遷移するリンク要素として実装していたのですが、実際に動かしてみるとSNSアカウントの連携先には遷移されませんでした。

原因は何かを探ってみると `link_to` の `data-method` 属性によってフォームに送信する挙動として使われていました。

> この方法を用いると、リンクをクリックしたときにドキュメント内に「隠しフォーム」が1つ作成されます。隠しフォームにはリンクのhref値に対応する「action」属性やdata-method値に対応するHTTPメソッドを含まれており、そのフォームが送信されます。
https://railsguides.jp/working_with_javascript_in_rails.html#data-method

リンクコンポーネントとしてではなく、POST処理を行うボタンコンポーネントとして変更するようにして動作させるように変更しました。

```html
<template>
  <form method="post" :action="serviceUrl">
    <input name="_method" value="post" type="hidden" />
    <input :value="authenticityToken" name="authenticity_token" type="hidden" />
    <button type="submit" class="button-login-sns_account">
      <IconGoogle v-if="serviceId === 'google'" />
      <IconFacebook v-if="serviceId === 'facebook'" />
      <IconYahooJapan v-if="serviceId === 'yahoojp'" />
      {{ serviceName }}でログイン
    </button>
  </form>
</template>
```

ブラウザ上のソースでは一見してわからなかったため、Railsテンプレートから素のHTMLで実装する際は、Rails特有の記法がないかをチェックしないといけないと感じました。

## これからのデザイン基盤整理の開発について

新ログインページがリリースされましたが、今後もユーザー体験と実装難易度の優先度の中で徐々に対象ページを広げていければと思っております。

次のステップとして今回作ったコンポーネントがほかページでも流用できるか、実装工数を削減して生産性が高い開発できるかなども検証しつつ進めていきたいと考えています。

また今後の計画としてモノリシックなRailsアプリをバックエンドとフロントエンドに分離し、BFF層とNuxt.jsとを活用したフロントエンド開発にしていきたい所存です。

おれたちのフロントエンド開発はこれからだ！（未完）

## （宣伝）アクセシビリティ試験されます

8月27日にWP ZoomUP様が主催している勉強会にて、freee株式会社の伊原力也さんに新ログインページのアクセシビリティ試験をしていただく予定です。

今回の改修についてお褒めの言葉をいただけるか、公開処刑となるか、その目で確かめてみてください（？）

[続・もしあなたが『アクセシビリティ試験』をやることになったら WP ZoomUP #71 - connpass](https://wpzoom.connpass.com/event/219967/)

9/14 追記：当日の試験結果のYouTubeが公開されました。1:45:00より試験が始まります。

[続・もしあなたが『アクセシビリティ試験』をやることになったら WP ZoomUP #71 - YouTube](https://youtu.be/-SjG-2l4I4g?t=6244)
