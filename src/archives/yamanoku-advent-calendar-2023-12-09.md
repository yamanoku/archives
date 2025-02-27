---
title: Safariを「令和のIE」と風刺することより知っておくべきブラウザの事情
description: SafariはInternet Explorerとは違うし、そんなことよりも知っておくべきことがある
date: 2023-12-09
author: yamanoku
source: 2023.yamanoku.net
noindex: true
---

Webサイト制作やWebサービスをする上で、ブラウザはそれらを表示するための重要な役割を果たしています。その開発したものがブラウジングをしているユーザーに正しく表示されなければ、それはサービス提供者にとっては大きな問題になります。

クロスブラウザ、すなわち様々なブラウザにおいて、共通の挙動を保証することが基本になります。それは開発者にとっては大きな負担になりますが、その負担があるからといってユーザーが使っているブラウザで正しく表示されないということは許容されることにはなりません。

クロスブラウザ対応について、2020年以前からWeb開発していた人であれば「**IE対応**」という言葉を思い出すかもしれません。

Windows OSではかつてInternet Explorer（以下、IE）というブラウザがOS標準のものでした。2021年にMicrosoftがサポートの終了を宣言し、2022年にサポートが終了されました。

結果としてBlink、Gecko、Webkitといったブラウザエンジンが残り、それらがモダンブラウザとして現在のWebを支えています。しかし、その中でもWebkit、すなわちSafariだけでは使えないAPIやCSS表現があったためその対応で苦汁を舐めさせられることがありました。

その個別のために対応が必要なことから、具体的にいつから誰によって呼ばれ始めたかは定かではありませんが、**Safariは令和のIE**だと風刺されることがあります。

X（旧Twitter）でも[「令和のIE」というワードで検索する](https://twitter.com/search?q=%E4%BB%A4%E5%92%8C%E3%81%AEIE%20lang%3Aja)と、いくつかの関連するポストが出てきます。こうした風刺は日本だけではなく海外でも言われているようです[^1]。

[^1]: [Apple Safari browser might become the new Internet Explorer • The Register](https://www.theregister.com/2021/10/22/safari_risks_becoming_the_new_ie/)

## IEは何がよくなかったのかを振り返る

そもそも何故IEは開発者を苦しめていたのかを振り返ってみます。

### 標準に準拠できてない・独自実装が多い

IEは標準に準拠できていないことが多く、それに伴う表示バグも多く、独自で実装しなければならないが多いことが問題になっていました。有名なものだと[flexboxの表示バグ](https://qiita.com/hashrock/items/189db03021b0f565ae27)があげられます。

SafariでもかつてWeb標準の対応が遅れており、Safariでは使えない新しいAPIがあり、IEと同様準拠できておらず使いたくとも使えない現状がありました。

しかし、Appleのエバンジェリスト兼DXチームに所属するJen SimmonsはSafariの改善と取り組みについてを積極的に発信していってます。Safariを新しいIEであるという悪評判を聞いて具体的なフィードバックを求め改善していくことを投稿しています[^2]。

[^2]: [https://twitter.com/jensimmons/status/1491064075987873792?s=20](https://twitter.com/jensimmons/status/1491064075987873792)

SafariはWebの相互運用性を改善していく[Interop](https://wpt.fyi/interop-2023?stable)の取り組みでも90点以上のテストをパスしており、相互運用性の向上について積極的に取り組んでいることがわかります。ここ最近のアップデートでCSSの新機能がクロスブラウザで対応できてきていることは記憶に新しいものがあります。

対応遅れからPWAの普及を妨げているという話も耳にしていましたが、最近ではWeb PushといったPWAとして活用されるAPIもiOSで使えるようになってきています[^3]。

細かい部分ではバグがあったりまだまだ改善の余地はあるかもしれませんが、標準に追従したくとも難しかったIEと比較すると同じものとは言い切れないでしょう。

[^3]: [Web Push for Web Apps on iOS and iPadOS | WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

一方でChromeのみでしか使えないAPIもあったり、逆にChromeでは使えないAPIもあったりと「独自実装」についてはSafariだけの話ではないように思えます。

### OSのバージョンを上げないとブラウザも追従できない

IEのバージョンアップは基本的にWindows OSのバージョンアップに伴って行われていました。一方Safariも本体のOSバージョンアップに伴って一緒にアップデートされます。この点については双方で似ている部分があります。

たしかにiPhone自体にはOSのバージョンアップの上限があり、古い端末ではOSのバージョンアップができないためSafariが使えないことがあります。しかしながら端末自体も経年劣化していくものでありハードウェアの寿命があり、相当大事に使っていない限りはバッテリーの持ちなども厳しいものになるでしょう。

そう考えると日常的に使用する端末自体を変えることはいずれある自明なことで、IEのそれと比較するならそこまで懸念にならないと思っています。

## 風刺よりも知っておくべき今のブラウザの事情

SafariがかつてのIEの状況と似ている点に触れてみましたが、ブラウザベンダ間で共同して解消していけることや、デバイスの定期購入など、いずれも風刺するための強い要因になるとは言い切れないと思います。

そうした風刺をするよりも、ブラウザに関わるものとしてそれ以外での懸念すべき今の事情や問題点においても目を向けるべきだと私は思っています。

### AndroidのCPUパフォーマンスはSafariよりも悪い

Androidは多様なデバイスを販売しており、日本国内発の端末もありますし、らくらくスマートフォンといった高齢者向けの端末もAndroidがベースになっています。PixelといったGoogle謹製のスマートフォンよりも格安で使える機器も存在します。そういった意味でAndroidはiPhoneよりも使えるスマートフォンの選択肢の幅が広いと言えるでしょう。

更にAndroidはOSのバージョンに追従せずともアプリがアップデートできるのもSafariとは違った点です（もちろんバージョンの限度はあると思いますが）。

しかしAndroid端末で忘れられてしまいがちな事実があります。それはCPUパフォーマンスについてです。

<figure>
  <img src="https://infrequently.org/2022/12/performance-baseline-2023/single_core_scores.png" alt="2013年から2022年までのスマートフォンのGeekbenchを使ったシングルコアスコアを示す線グラフ。データは横軸に年を、縦軸にスコアを示す形式で表されている。スコアには、iOSデバイスのスコアを表す青い線と、高スペックのAndroidのスコアは濃い青緑の線、中程度のスペックのAndroidはオレンジ色の線、低スペックのAndroidは薄い青緑の線で書かれている。グラフは時間の経過と共に、iOSデバイスがもっともスコアが向上していることを示しており、高スペックのAndroidとで大きく差をつけている。各ポイントには、特定のデバイスの名前（例：iPhone 13、Galaxy S22 Ultraなど）がラベル付けされている。">
  <figcaption>
    引用: <a href="https://infrequently.org/2022/12/performance-baseline-2023/#devices-1">
     The Performance Inequality Gap, 2023 - Infrequently Noted
    </a>
  </figcaption>
</figure>

<figure>
  <img src="https://infrequently.org/2022/12/performance-baseline-2023/multi_core_scores.png" alt="2013年から2022年までのスマートフォンのGeekbenchを使ったマルチコアスコアを示す線グラフ。データは横軸に年を、縦軸にスコアを示す形式で表されている。スコアには、iOSデバイスのスコアを表す青い線と、高スペックのAndroidのスコアは濃い青緑の線、中程度のスペックのAndroidはオレンジ色の線、低スペックのAndroidは薄い青緑の線で書かれている。グラフは時間の経過と共に、iOSデバイスがもっともスコアが向上していることを示しており、高スペックのAndroidとで大きく差をつけている。各ポイントには、特定のデバイスの名前（例：iPhone 13、Galaxy S22 Ultraなど）がラベル付けされている。">
  <figcaption>
    引用: <a href="https://infrequently.org/2022/12/performance-baseline-2023/#devices-1">
     The Performance Inequality Gap, 2023 - Infrequently Noted
    </a>
  </figcaption>
</figure>

iPhoneのスペックは年々高くなっていますが、AndroidのそれはiPhoneに比べて低いことがわかります。パフォーマンスを悪化させるボトルネックがあることは、それは低スペックな端末に負荷をかけることになります。結果として閲覧するユーザーにとってはストレスになりかねないでしょう。

### iOSのブラウザはWebkitベースになっている

iOSのブラウザはみなWebkitベースになっています。これが意味することとしてはiOSで閲覧するChromeもWebkitベースになっているということです。これはApple Stroreのガイドラインにも明記されています[^4]。

[^4]: [2.5.6 Apps that browse the web must use the appropriate WebKit framework and WebKit JavaScript.](https://developer.apple.com/app-store/review/guidelines/#software-requirements)

Safariブラウザにて脆弱性があった場合にも、Chromeや他のiOSで使えるブラウザも同様に脆弱性があることにもつながります[^5]。

[^5]: [新MacBook Pro（M3）でも機密情報が漏えい　2020年以降のApple製品全てに脆弱性　米国チームが発表：Innovative Tech - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2311/30/news070.html)

こうしたWebkitベースの状態を寡占している問題についてはEUが一石を投じていて撤廃することを検討している[^6]みたいですが、EU以外の地域でそれが撤廃されるかどうかは定かではないようです。

[^6]: [アップル、iOSブラウザへの「Webkit」強制を廃止？EUデジタル市場法に対応か | Gadget Gate](https://gadget.phileweb.com/post-24390/)

### 特定のブラウザが寡占してしまうことへの懸念

最近のサービスではIEだけでなく、Firefoxのサポートをやめるサービスが増えつつあります。その理由としてはFirefoxのシェアが少ないことが起因しているようです。

> Firefoxの利用者数が少ないためだろうか。先述したPayPay銀行のように、ウェブサービスのサポート対象からFirefoxを外すケースは珍しくなくなっている。

> [「Firefox」サポートしないサービス続々　国内シェア今や6%足らずに: J-CAST トレンド【全文表示】](https://www.j-cast.com/trend/2022/03/26433910.html?p=all&utm_source=dlvr.it&utm_medium=twitter)

最近ではmicroCMSがFirefoxのサポートをやめるという話があったのも記憶に新しいです。

<!-- prettier-ignore-start -->
> 3. 推奨環境からFirefoxを除外
> 管理画面の安定した動作を実現するため、比較的ご利用シェアの少ないFirefoxを推奨環境から除外させていただくこととなりました。
<!-- prettier-ignore-end -->

> [【要対応】APIのリクエスト制限強化等の仕様変更のお知らせ | microCMSブログ](https://blog.microcms.io/api-limit-change/)

事業者側としてはブラウザの対応をやめることで開発コストを下げることができ、集中できるというメリットがあります。しかしそれはブラウザの選択肢を狭めてしまいます。そしてブラウザの選択肢が狭まるのは、特定のブラウザの寡占につながりかねません。

相互運用性が下がることは、特定ブラウザの寡占を進めてとあるWebプラットフォームが中央集権的になってしまうことにつながります。様々なブラウザのための対応をすることの考慮が減り、それはそれで都合が良いと考えてしまう人もいるかも知れません。ですが開発都合では楽でも、よくない事態が起きるおそれがあります。

過去、Mark Nottingham氏がもしChromiumのみのブラウザエンジンだけしか使えないWebになったらどうなるか？という記事を書いており、その中で以下のように述べています。

> Many argue that browser engine diversity is the backbone of the open Web – assuring not only interoperability and user choice but also a bulwark protecting the Web from centralization.

> In one future Chromium-only world, governance of the Web shifts completely away from Open Standards, and the Web becomes more like Linux – something based upon some historical standards but whose present and future are firmly governed by Open Source practices.

> A slightly different future would be one where Chromium still draws on the Web standards process for broad review and community participation, but because of the increase in their power (something that people already complain about regarding browsers in the W3C), the implementers are effectively in charge, and the SDOs are just along for the ride (even more so than today).

> I strongly suspect that in a Chromium-only world, governments already suspicious of big tech’s influence over SDOs will have absolutely no inclination to consider Open Source governance as legitimate for something as important as the Web. While currently they’re somewhat willing to defer to SDOs in most cases, Open Source governance won’t get the same benefit of the doubt, and browsers will likely be regulated as many other products are, with exacting government-led standards for their design. I’ve written before about the pitfalls on that path. In short, expect fragmentation and ossification.

> And just in case you think that cookies are the only place intervention might take place, consider encryption. And accessibility. And browser fingerprinting. And DRM. How will the Web look when they’re all regulated by multiple governments, or by groups of them (in the same way that trade is increasingly regulated by regional trade agreements)?

> [What ~will~would a Chromium-only Web look like?](https://www.mnot.net/blog/2022/06/22/chromium-only)

今後のChromiumはオープンソースでコード自体は見れたとしても、その意思決定においてまでは不透明なままで、Googleの見えない社内政治に巻き込まれて誰もが参加できなくなる可能性や、政府がGoogleに対して厳格な規制介入が入ることでWeb自体はどうなっていくのだろうか、といったことが書かれています。

Chromiumをフォークして新たなブラウザエンジンを作る方向性もあるかもしれません。ですが、EdgeがEdgeHTMLからChromiumベースに生まれ変わったり、新たに産まれたブラウザの[Arc](https://arc.net/)もChromiumベースになっているものがあることを考えると、新たなエンジンを元にブラウザを作ることは到底できないように感じています。

具体的にこうした課題についてと今後のWebのありたい形については「[WEB の自重](https://www.youtube.com/watch?v=HHpmgrg_NF4)」を一度観ていただくと理解につながるかもしれません。

## おわりに

Safariが令和のIEと風刺されることに対して現状を踏まえつつ振り返り、それ以外のブラウザにおける問題点についてを書きました。ブラウザベンダ間でどうにかする以外では正直なところ開発者としてブラウザの問題点をすぐにどうにかすることはできないのが現状です。しかしながら現状ある事情を知っておくことで、クロスブラウザにおける体験についてを考え直すきっかけにはなるかと思います。Webという資産を活かした開発をしている以上、我々はそうした問題とも向き合いつつ、ブラウザ共通体験を意識して今のベストエフォートを提供していくしかないでしょう。

## 参考情報

- [IE Graduation (IE の功績を讃える) - Speaker Deck](https://speakerdeck.com/jxck/ie-graduation)
- [晩年のIEに思いを馳せる](https://zenn.dev/akfm/articles/7de0c6b7a6ebb1)
- [2022年におけるフロントエンド開発のベースライン](https://engineering.linecorp.com/ja/blog/uit-baseline-for-front-end-development-in-2022)
- [Chromium、Safariでは対応しているけどFirefoxでは対応しないWebAPI](https://zenn.dev/cateiru/scraps/7493d153ca6fe0)
- [Web Standards Interop 2022 ～TechFeed Conference 2022講演より | gihyo.jp](https://gihyo.jp/article/2022/09/tfc012-web_standards)
