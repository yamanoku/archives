---
title: JavaScript無効にしたときのユーザビリティとかについて
description: JavaScript無効にしたときのユーザビリティとかについて
date: 2017-05-01
author: yamanoku
---

社内で話した内容で気づけてよかったことなのでまとめてみる。自戒も込めてます。

## 話し合ったこと

- 最近は JavaScript 無効な環境とかに対して優しくする意識はないのではないか
  - SPA とかなんか JavaScript あり気なんだしでかい Flash を 1 つ置いてて iPhone で見る場合のと同義っぽい（※SPA を dis ってる訳ではない）
- JavaScript でガッチリ組みすぎてるのもアレだけど、とはいえ今のレイアウトは JavaScript ありきのものばかりだよね
- そうなると JavaScript が動作してなくて崩れてたとしても情報はちゃんと見せてあげたい
- リッチな表現は JavaScript にのみ任せて、それ以外の基本動作は抜きでもちゃんと機能するようにしたい
- 以下例みたいな考え方をスタンダードにしたい
  - アコーディオンは通常時は出しておき、JavaScript 読み込みで非表示にする
  - ローディングとかを入れる時、ローディング自体をすでに出しておき setTimeOut で消えるみたいな処理にしない（消えなくなる）
  - Google とかのウェブフォントも極力 js 読み込みなどを避ける
  - JavaScript で動作しないと表示しないテキストをやめる（重要なやつだと特に）
    - `text()`とかで出来る限り入れない・表示非表示で切り替える。
  - form のバリデーションはブラウザのバリデーションも意識してやる（最低限 required 付けるとか）
    - [クライアント側のフォームデータ検証 - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/HTML/Forms/Data_form_validation)
  - WAI-ARIA についても考えておく必要はある
  - JavaScript バリバリ使っているサイトだったら最低限の礼儀として noscript タグをちゃんと使おう

## まとめ

結局のところマークアップなりの時点で **HTML の構造をしっかり作れ** という感じなのですが、デザインでも JavaScript 使えて当然なリッチなものも多いのでその辺意識しないと結構大変だなと思うようになってます。

まあ結局ケースバイケースで JavaScript やれる部分は JavaScript でやるという部分はやっておき、万一のことは`<noscript>`なりできっちり表示しといたほうがいいよなと感じます。

というか最近フロントエンド界隈でのフレームワークだのビルドツールだのどうだこうだの話もありますが、まずは根本の話をしませんか、という気持ちがあります。こちらからは以上です。

## 参考

- [ユーザビリティ/アクセシビリティと JavaScript | Accessible & Usable](https://accessible-usable.net/2007/07/entry_070701.html)
- [フロントエンド開発者が実践したい、アクセシビリティに配慮した JS を書くコツ – WPJ](https://www.webprofessional.jp/writing-javascript-with-accessibility-in-mind/)
