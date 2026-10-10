---
title: PWA版Twitterをスクリーンリーダー検証してみる
description: PWA版Twitterをスクリーンリーダー検証してみた話です
date: 2021-06-26
author: yamanoku
source: scrapbox.io
category: tech
topic: accessibility
---

## PWA Night CONFERENCE 2021 お疲れさまでした

- みなさん楽しかったですか？
- スタッフ参加させてもらいました
- 去年はネタ LT 参加してましたが今年も参加です

## 以前 PWA Night の勉強会にも登壇させてもらいました

- ![タイトルが「PWA is Progressive Web Accessibility」のスライド。PWA Night vol.16、Okuto Oyama、2020/05/20 とある](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/5fcfe324559b7b0797cf00e174df480b.png)
  - [PWA is Progressive Web Accessibility - Google スライド](https://docs.google.com/presentation/d/e/2PACX-1vROD7gIsTh1BF1q5LVec0pZSGXVtLBD_DjNonbuwdR8zfRNH_qgRazaIG0oU-Zte6EgqaKoIyfoRfpA/pub?start=false&loop=false&delayms=3000&slide=id.g85503d545f_0_0)

## 今回も PWA×Web アクセシビリティネタやります

- 特にオチなしヤマなしなのでゆるく聴いてください

## Web アクセシビリティとは？

- あらゆる人が Web から情報を得られるようにする考え方・対応
  - マウス操作、キーボード操作
  - 支援技術で閲覧することができる

## よりよい PWA をつくるための要件「Is fully accessible」

![見出し「Is fully accessible」のもと、すべての操作がWCAG 2.0を満たすことと、a要素とbutton要素の例が書かれた英文ページ](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/edfe7d9160d234889d8e9f22b1641841.png)

## PWA 版の Twitter でスクリーンリーダー検証してみよう

- スクリーンリーダー＝画面の読み上げソフトウェア
- 検証ツール
  - Android の Talkback

## ユーザーページでの読み上げ順を確認

<Video src="https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/8dfc265df62b5b3864b4abe674dc2d11.mp4" title="ユーザーページでの読み上げ順を確認" controls />

### 前へ・次へ？

<Video src="https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/4d34fd55a75951bfdcdcdda9a00326a8.mp4" title="前へ・次への読み上げ" controls />

- サブナビゲーション内に謎のボタン
- `role="button"`と指定されている`div`が存在していた
- `aria-disabled="true"`で無効になっている
- 使用用途は分からない…

### 内部のコンテンツがすべて読み上げられる

<Video src="https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/c030ea410732362f51ef03fe3812160e.mp4" title="内部のコンテンツがすべて読み上げられる様子" controls />

- ![PWA版Twitterで、ツイート全体がdivとして青枠で選ばれ、本文からいいねと共有アイコンまで含まれている画面](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/55cfaeaec40b5830422a03443b7fecad.png)
  - ![ChromeのAccessibilityパネル。ツイートのarticleにrole="article"が付き、Nameに本文や「1 like」まで入っている](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/362e77040a0c4e7c33d3cb638fda17cf.png)
  - `aria-labelledby`で関連する ID が紐付けられている

### 代替テキストの設定

<Video src="https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/95eb8ac158aaa492d0f70b14f8e70f4a.mp4" title="代替テキストの設定" controls />

- ![Twitterの画像投稿でALTタブが選ばれ、階段にいる黒猫の写真の下に「詳細」欄と「代替テキストとは？」がある画面](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/42e3164d5c0bdadffd5d1556182f6145.png)
- 画像投稿
- 「件の説明を追加」
- 挿入すると画像の読み上げをしてくれる

## 内部実装を見てみる

- WAI-ARIA をバリバリ使っている
  - ただしタグの上書きをしている箇所もある
    - `<h2 role="heading" aria-level="2">`
    - `<a role="link" href="/settings/profile">`
  - React Native for Web のレンダリング結果のため？

```jsx
<Text accessibilityRole="heading" /> /* <h1> */
<Text accessibilityRole="heading" accessibilityLevel={2} /> /* <h2> */
```

- 開閉部分
  - ![ツイートのメニュー（Delete、Pin to your profile、Embed Tweetなど）が開き、role="menu"のdivが見える画面](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/50fd6beab5719ef71f3e259a67469553.png)
    - メニュー
  - ![同じツイートメニューが開いた状態で、HTML上にrole="dialog"のdivがあり、その中にmenuが並んでいる画面](https://images.yamanoku.net/add-verify-pwa-twitter-with-a-screen-reader/d2a7d47eeef5a8efc6e9e1203f06b1ff.png)
    - ダイアログ

## まとめ

- 読み上げてみて目では見えない何かが見えてきた
- 画像にも代替テキストを
- スクリーンリーダーを使う場合はネイティブアプリ側がやりやすそう…
  - そこはプログレッシブということで（？）
