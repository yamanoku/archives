---
title: 敵を知り己を知ればXSS危うからず
description: XSSについての話と基本的な対策について
date: 2016-07-19
author: yamanoku
source: blog.geek.co.jp
---

[![Image from Gyazo](https://i.gyazo.com/a6c2744e875f9ebadb3a9e70bd3d0f89.png)](https://gyazo.com/a6c2744e875f9ebadb3a9e70bd3d0f89)

## XSS（クロスサイトスクリプト）とは

クロスサイトスクリプト（以下 XSS）とは一種のセキュリティホールであり、サイトの脆弱性をついてユーザーが悪意のある攻撃をしてしまうスクリプトを埋め込まれてしまうことです。歴史的に遡ってみると 2000 年頃に発生しているようです。

例えばフォームで送信する際に通常であれば名前や住所といった文字列を入力するとおもいますが、ここにスクリプトタグを書き込んで送信されると、XSS 対策されているサイトであればタグ囲み部分がエスケープされて実行されませんが、対策がされていないとそのままスクリプトタグを読み込んでしまい、実行がされてしまうといった流れです。

[![Image from Gyazo](https://i.gyazo.com/9fd2a746caa6623a7b8b58136df0aa8c.png)](https://gyazo.com/9fd2a746caa6623a7b8b58136df0aa8c)

このように動的な要素を生成する場合、XSS 脆弱性を発生させやすくなっています。他にも以下の様な危険性があげられます。

- ページの改ざんによる偽装ページ
- Cookie データの抜き取り
- ajax による攻撃者のデータ送信
- etc…

なのでこうした問題を未然に防ぐため、今回は JavaScript の観点からみた XSS 対策を考えてみたいと思います。

## セキュアな js 記述を知ろう！

フロント側の実装をする際に動的な部分をつくるために JavaScript で色々と書かれているかと思われますが、XSS 対策を意識した書き方でよりセキュアな実装にできます。

### エスケープをする

すぐできる対策であり、割と効果的なものがエスケープ処理です。これは問題を起こしうる特殊文字を文字参照に変換して、実行させないようにする処理です。対応する特殊文字は「＆」「＜」「＞」「”」「’」の５つです。

```js
function escapeHTML(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}
```

ちなみに ES6 であればテンプレートリテラル（=Template strings）を使用して下記処理もできます。

```js
 function escapeHTML() {
  var raw = String.raw.apply(null, arguments)
  var safe = raw.replace(/&/g, '&').replace(//g, '>').replace(/"/g, '"').replace(/'/g, ''');
  return safe
 }
 var input = "<img src=# onerror=alert(1)>";
 var html = escapeHTML`<div>${userinput}</div>`;
```

テンプレートリテラルの使い方は「｀」（バッククオート）で囲むだけです。

### URL は http および https スキーム

URL を取り出し、それをデータとして扱う際に気をつけたいことは、JavaScript スキームなど複数のスキームを介在させないために、リンク先が`http://`か`https://`なのかを判断して挿入するようにすることです。

```js
 var url = decodeURIComponent(location.href);
 if( url.match( /^https?:\/\// ) ){
     var elm = document.getElementById("link");
     elm.setAttribute("href" url);
 }
```

JavaScript スキームはいわゆるブックマークに登録して便利な機能として使うというのが一般的ですが、それを XSS として使用されるのを防ぐための策であります。

### JSONP の取り扱い注意と JSON.parse

JSONP はクロスドメイン、つまり同一のドメインのデータでなくても引っ張ってこれるもので便利なものではありますが、同時に他者が仕組んだ悪意のある JSONP データも入り込む可能性があります。

JSONP をまったく使用するな、ということではないのですが使用する際は信頼のあるデータであることを証明した上で使用するのが吉です。

そして JSON ほか外部データを使用する際は必ず `JSON.parse` 関数を使用してください。

これは文字列を JSON として解析するためのものなので、`eval`関数だと JSON の中に実行文が紛れていると実行されてしまう恐れがありますので意識して使いましょう。

### レンダリングメソッド使用廃止

主に下記のソースになります。これは上述したエスケープ処理がない場合、確実に XSS の標的になり得ますし、この部分を使って悪用されるおそれがあるかもしれないからです。

- `element.innerHTML = “…”;`
- `element.outerHTML = “…”;`
- `document.write(…);`
- `document.writeln(…);`

### 余談：input pattern でバリデーション

js とは違った観点ではありますが、HTML5 の`input`要素に「`pattern`属性」というものがあるのをご存知でしょうか。

これは正規表現を使った入力制限により制限にかかっていないものはバリデーションで弾いてくれるという優れた代物で、特に js などのバリデートをしなくてもブラウザに準拠したバリデートが働いてくれます。

```html
<input
  type="text"
  name="name"
  pattern="^[ァ-ンヴー]+$,[\u30A1-\u30FF]*"
  required
/>
```

ですので上述したエスケープ部分の記号が入る必要のない箇所（カタカナ表記、郵便番号など）には正規表現ですでに弾いておくようにすると後々の対応も楽になるかと思います。

### 参考リンク

- [正規表現パターンの記述 – JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Writing_a_Regular_Expression_Pattern)
- [HTML5 における input 要素の pattern、type 属性のおさらい](http://qiita.com/ka215/items/795a179041c705bef03b)

## 目指すは脱・jQuery！

jQuery はライブラリの１つですが、煩雑なコードを容易に記述しやすくして、デザイナーさんにも扱える簡単なもので今も制作会社で広く使用されていると思われます。

実は jQuery でも XSS 対策はできるものがあり、それは `text()` です。受け取る値をテキストデータにエスケープしてくれる代物なので input での入力を即出力するものには適しています。

```js
$('input').on('keyup', function (e) {
  $('.hoge').text($(this).val());
});
```

しかしながら、jQuery 自身の長所でもあり弱点としても見られる「[DOM]の直接操作」部分が割とネックとなってきています。つまり DOM 操作による XSS の介入が起こりうる可能性があるのです。

以前の ver.1.6 では `$(location.hash)` の脆弱性が指摘されており、要素の検索や作成などを引数の文字列で判断するため、$()内でスクリプトを記載すると#id で指定したものがそのまま要素として判断されることがありました（ver1.6.3 にて修正済み）

```js
//my-web-app/#<img onerror="alert(1)" src="xxx">
http: $('#<img onerror="alert(1)" src="xxx">'); //ハッシュ値で判断すると左の値で取得する
//<img>タグで処理されるようになってしまう。
```

jQuery 自身も ver3.0 の更新（2016 年 5 月）があったように、日々使いやすくかつ脆弱性を潰してきて、簡単な装飾程度であれば使用する面では問題無いかもですが、セキュリティ面を考えた上で web サイト・アプリに使い続けるというのは難しい選択のようにも思えます。

なので jQuery のみに頼り続けるのは危ないかも、というのを念頭に置いておくと良いかもしません。
※使用をやめろ！　と固く禁じる訳ではないです

## 仮想 DOM を信じろ！

[![Image from Gyazo](https://i.gyazo.com/7f12364e058283699217b3e201b615af.png)](https://gyazo.com/7f12364e058283699217b3e201b615af)

上記は素で js を書いたり jQuery を使用する際の注意点でしたが、中級者以上の賢明なエンジニアの方であればフレームワークを使用した開発をされていると思われます。というか大体の web サイト・アプリはフレームワーク使っているんじゃないかなと思われます。

有名フレームワークはもともとセキュリティ面を徹底しており、意識しなくとも XSS 対策をしている状態でスクリプトを書くことが出来ます。その中でも Facebook が開発した「React.js」は、界隈の中では扱いやすく良いものだと評判のシロモノです。

ちなみに React などの便利なフレームワークの特徴でもある仮想 DOM の考え方はなかなかよい感じです。

通常の DOM（Document Object Model）はマークアップなどで html に記述してあるもので、それを jQuery などで直接操作するなどがありますが、仮想 DOM は現時点での DOM の持っている構造を JSON などに設定してそれを DOM として吐き出すようにしているので、DOM からの読み込み・書き込みといった処理をする必要がなくなります。

つまり仮想 DOM のメリットとしては、生 DOM 生成における XSS リスクをかなり減らせるのです！

ですが生成された DOM を jQuery などで触ると意味が無いです。**※両者の親和性はかなり悪いとおもわれます…**

ちなみに React には`dangerouslySetInnerHTML`という html を埋め込む際に、名前からして物騒な、これは危険だよと知らせるためのプロパティがあります。

```jsx
function createMarkup() {
  return { __html: 'First &middot; Second' };
}
<div dangerouslySetInnerHTML={createMarkup()} />;
```

## XSS 攻撃を試してみたい（？　！）

以上 XSS についての対策や方法論を述べてまいりましたが、実際に色々な XSS 攻撃を試してみたいという好奇心過多な方もいるかもしれません。しかし適当なサイトでそういった行為をするのは許されてはいません。

その抑えられない好奇心をどうすればいいか、Google が公開している XSS をゲーム感覚で試せるサイト[XSS game](https://xss-game.appspot.com/)に行ってみてください。

[![Image from Gyazo](https://i.gyazo.com/656b1c40b5a0063e805a9cb73be67f10.png)](https://gyazo.com/656b1c40b5a0063e805a9cb73be67f10)

こちらでは様々なパターンでの XSS 攻撃を体験でき、わからない場合はヒントも教えて頂けるという親切設計になっております。内容はすべて英語となっていますので翻訳しながら見ていただけるとよろしい感じです。クリアするとケーキが見れます。

## ブラウザ XSS フィルタについて

ちなみに最新版のブラウザー（2016/07 現在：Firefox 除く）であれば、簡易的な XSS を自動的に排除してくれる XSS フィルターがついています（Firefox であれば類似のプラグインがあります）。皆さん大好き Chrome であればインストールしてすでに内蔵されていると思います。

[![Image from Gyazo](https://i.gyazo.com/3411fbe9ddf6a6b282517c53e5fa203b.png)](https://gyazo.com/3411fbe9ddf6a6b282517c53e5fa203b)

しかしながらフィルタも万全というわけではなく、そもそも誤探知してしまったり、その脆弱性をついてすり抜けてくる XSS も存在していますので、フィルタがあるから大丈夫という油断は禁物です。あくまでも気持ち程度のものとして。

## 終わりに

以上 XSS にまつわる知見についてまとめてみましたが、正直なところ、XSS の分野はセキュリティ領域の中ではかなり複雑・難解なものとなっており、徹底するとなると専門家の意見を聞いたりセキュリティ関連の著書を読むべきではあります。ですがこうした些細なことでもセキュリティ意識をもってプログラミングをすることで、クライアントやユーザーが安心して使える web サイト・アプリ作りに繋がってゆく第一歩となります。

今一度自分たちが書いたコードを見返してみて、脆弱性について考えてみてはいかがでしょうか。

それでは皆様、素晴らしきコーディングライフを！

## 参考文献

- [クロスサイトスクリプティング対策 ホンキのキホン- 葉っぱ日記](http://d.hatena.ne.jp/hasegawayosuke/20160106/p1)
- [セキュアコーディング ガイドライン – cybozu.com developer network](https://cybozudev.zendesk.com/hc/ja/articles/201919400)
- [DOM ベース XSS 対策チートシート – OWASP – GitHub Pages](https://jpcertcc.github.io/OWASPdocuments/CheatSheets/DOMbasedXSSPrevention.html)
- [ブラウザの XSS フィルタを利用した情報窃取攻撃 | MBSD Blog](https://www.mbsd.jp/blog/20160407_2.html)
- [徳丸浩の日記](https://blog.tokumaru.org/)
  - Web セキュリティ界の大偉人です
