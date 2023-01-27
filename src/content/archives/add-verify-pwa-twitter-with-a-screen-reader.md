---
title: PWA版Twitterをスクリーンリーダー検証してみる
description: PWA版Twitterをスクリーンリーダー検証してみた話です
date: 2021-06-26
author: yamanoku
---

## PWA Night CONFERENCE 2021 お疲れさまでした
- みなさん楽しかったですか？
- スタッフ参加させてもらいました
- 去年はネタLT参加してましたが今年も参加です

## 以前PWA Nightの勉強会にも登壇させてもらいました

- [![Image from Gyazo](https://i.gyazo.com/5fcfe324559b7b0797cf00e174df480b.png)](https://gyazo.com/5fcfe324559b7b0797cf00e174df480b)
  - [PWA is Progressive Web Accessibility - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vROD7gIsTh1BF1q5LVec0pZSGXVtLBD_DjNonbuwdR8zfRNH_qgRazaIG0oU-Zte6EgqaKoIyfoRfpA/pub?start=false&loop=false&delayms=3000&slide=id.g85503d545f_0_0)

## 今回もPWA×Webアクセシビリティネタやります
- 特にオチなしヤマなしなのでゆるく聴いてください

## Webアクセシビリティとは？
- あらゆる人がWebから情報を得られるようにする考え方・対応
  - マウス操作、キーボード操作
  - 支援技術で閲覧することができる

## よりよいPWAをつくるための要件「Is fully accessible」

[![Image from Gyazo](https://i.gyazo.com/edfe7d9160d234889d8e9f22b1641841.png)](https://gyazo.com/edfe7d9160d234889d8e9f22b1641841)

## PWA版のTwitterでスクリーンリーダー検証してみよう
- スクリーンリーダー＝画面の読み上げソフトウェア
- 検証ツール
  - AndroidのTalkback

## ユーザーページでの読み上げ順を確認

[https://scrapbox.io/files/60d5df37b1add8001cc205e2.mp4](https://storage.googleapis.com/scrapbox-file-distribute/5983f25ce54f440011c2cd40/8dfc265df62b5b3864b4abe674dc2d11?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=file-upload%40scrapbox-server.iam.gserviceaccount.com%2F20220920%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220920T015820Z&X-Goog-Expires=3601&X-Goog-SignedHeaders=host&X-Goog-Signature=53d2cfdbfb5a9b5052486e9e72d315429f519bacf6924175244f32f97bfb893699adfee6420dd1df6ffe230ae44436d7c1b8c9016af34ddfe9f9f3d1b5bdeb7089943bc8943ca7b242e53f3ace268f093b51cbd26f58b07fe600f2c6c193f83032c52f687b37103b7482b87ffc8d6041fba01d980e663a9b16b8e5880f1ad08fef9081c95a69b15f3870b2fa37109cef67e041a9fb011e4ae9c90959ce8c2dccce8be7f4011c3eb8cc273bc3093dc98343a4a7ade34f60cd7e5c2ed6e2b1d96f765778af4b1387509e76f6b61f79dc05156915b1b323dcf2234ddf8acc6ed950113d6a4c5bc152badda46b8c815468d0f0cf0fc70b2e5b9fa96e112d9730b030)

### 前へ・次へ？

[https://scrapbox.io/files/60d5df816976be001cfee5fb.mp4](https://storage.googleapis.com/scrapbox-file-distribute/5983f25ce54f440011c2cd40/4d34fd55a75951bfdcdcdda9a00326a8?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=file-upload%40scrapbox-server.iam.gserviceaccount.com%2F20220920%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220920T015845Z&X-Goog-Expires=3601&X-Goog-SignedHeaders=host&X-Goog-Signature=73e77eff6d992f6b3d25753d31eeb578e5e8273e718bd3282ef67a34ded239b74699953c5907503e746dfb15aba9e0d25e2051df0cd84edfe9a101b34f8380592c522af76ec303c022d5d61796cc056993e376d9668741a5c781527a5d665fe5a7030728c55a855014b861bd97b6951602ec485c5809065b621c14d2329042a2966098c63801a46de00bcc4219a4e8e640240f39696ee7bfa010145a134f034b51e3fc443823614e507cc4c5df5bffafed2ffe3ab39d6e8a05053dd2ced9ed525a5835f70a7129cb5df2f00eb5a776910a2977f6d325e426cbb65218c4404e18118014dac9b2b645447859999a458d14cc4b805c616f8f039b98e4556150f46e)

- サブナビゲーション内に謎のボタン
- `role="button"`と指定されている`div`が存在していた
- `aria-disabled="true"`で無効になっている
-	使用用途は分からない…

### 内部のコンテンツがすべて読み上げられる

[https://scrapbox.io/files/60d5e9a2ed6716001c954275.mp4](https://storage.googleapis.com/scrapbox-file-distribute/5983f25ce54f440011c2cd40/c030ea410732362f51ef03fe3812160e?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=file-upload%40scrapbox-server.iam.gserviceaccount.com%2F20220920%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220920T015925Z&X-Goog-Expires=3601&X-Goog-SignedHeaders=host&X-Goog-Signature=1e9ba81c25212b38b6a8ce633343fedd74cf827846ac1bad64f70e79c65fea03a5db9ff30b849c50c049262c6d661771fc1d14bac5969c0e5a07307f83cf74f66f694cffb922bcb79b82d086ab2ba4ac521b658864c897aa6c5d54cb865dcd97d81c0e053d4800f06b0b6ecd3db025c124c0917476623e10a5f2b2f23b59a1577ffd136f53b9cb4fc360b03b6d90588d176262838273dfdbcf406334047666ef67f2f43d59f7b442f57471cc1fc940e5178f26357ff2a63b275cd096b93f15f5473efd15f433c9d27ae9bc3eb62542f8523d0d2c878ed7c29bea71594fedadf8d4da73a404a025c6da70f92431afa2262d1d0e62d3557a8043ba43b8bcd99540)

- [![Image from Gyazo](https://i.gyazo.com/55cfaeaec40b5830422a03443b7fecad.png)](https://gyazo.com/55cfaeaec40b5830422a03443b7fecad)
  - [![Image from Gyazo](https://i.gyazo.com/362e77040a0c4e7c33d3cb638fda17cf.png)](https://gyazo.com/362e77040a0c4e7c33d3cb638fda17cf)
  - `aria-labelledby`で関連するIDが紐付けられている

### 代替テキストの設定

[https://scrapbox.io/files/60d5e4e0b79b2b001c41fd04.mp4](https://storage.googleapis.com/scrapbox-file-distribute/5983f25ce54f440011c2cd40/95eb8ac158aaa492d0f70b14f8e70f4a?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=file-upload%40scrapbox-server.iam.gserviceaccount.com%2F20220920%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220920T020004Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=7e8bec6a9d52768982f287a49573c749daf4bae182eb443a89f00d081c4976b3a48a5659fbbcaba48c637fdc68c7193760b99a43828fa435db29755c1e366dc4bb92bf52fd84132354c83ed6357bedccce340f6186f50d1ae87add77cf04316b947622a51c8871893475582d5fdbb72f8a041a5530e53635a1580bfda783f51a64ed3709d9176181702c7594c980f269607a6c1f3228336b9db09bc57047abfa9e664aa4cdc2fecc39d111bda90099c0bfc2e3864bd0d89808891592d1b4966197ccc44663f4b3f66295dae060623beb91ddd26cf513d5aedd93ed9be926fdff5d86b326f6b3610380c842f97471a90061e09261eb9488665b4b72b59045feee)


- [![Image from Gyazo](https://i.gyazo.com/42e3164d5c0bdadffd5d1556182f6145.png)](https://gyazo.com/42e3164d5c0bdadffd5d1556182f6145)
- 画像投稿
- 「件の説明を追加」
- 挿入すると画像の読み上げをしてくれる

## 内部実装を見てみる
- WAI-ARIAをバリバリ使っている
  - ただしタグの上書きをしている箇所もある
    - `<h2 role="heading" aria-level="2">`
    - `<a role="link" href="/settings/profile">`
  - React Native for Web のレンダリング結果のため？

```jsx
<Text accessibilityRole="heading" /> /* <h1> */
<Text accessibilityRole="heading" accessibilityLevel={2} /> /* <h2> */
```

- 開閉部分
  - [![Image from Gyazo](https://i.gyazo.com/50fd6beab5719ef71f3e259a67469553.png)](https://gyazo.com/50fd6beab5719ef71f3e259a67469553)
    - メニュー
  - [![Image from Gyazo](https://i.gyazo.com/d2a7d47eeef5a8efc6e9e1203f06b1ff.png)](https://gyazo.com/d2a7d47eeef5a8efc6e9e1203f06b1ff)
    - ダイアログ

## まとめ
- 読み上げてみて目では見えない何かが見えてきた
- 画像にも代替テキストを
- スクリーンリーダーを使う場合はネイティブアプリ側がやりやすそう…
  - そこはプログレッシブということで（？）
