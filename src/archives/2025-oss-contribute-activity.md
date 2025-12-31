---
title: 2025年オープンソースコントリビュート活動振り返り
description: 2025年のOSSコントリビュート活動の振り返りについて
date: 2025-12-31
author: yamanoku
source: zenn.dev
---

2025年もまもなく終わりですね。みなさんは今年どれくらいオープンソースにコントリビュートできたでしょうか？（唐突）

というわけで私の2025年のOSSコントリビュート活動の振り返りをしてみようと思います。2025年以前の活動は[Notion](https://www.notion.so/yamanoku/170f2fefa69c80959582f75f6e5b4b3f)にてまとめております。

## fedify-dev/hollo

Holloは、[Fedify](https://github.com/fedify-dev/fedify)で構築された単一ユーザー向けのフェディバース（ActivityPub対応）マイクロブログソフトウェア。Mastodon互換APIを実装しており、専用のWebインターフェースなしでMastodonクライアントから利用可能。

https://github.com/fedify-dev/hollo/pull/100

HTMLの `<figure>`/`<figcaption>` 要素の不適切な使用を修正。画像のaltテキストにfigcaptionを使うのは不適切であるため削除。

https://github.com/fedify-dev/hollo/pull/105

ページネーションのパラメータ名を `cont` から `page` に変更し、前のページに戻るリンク（Newer link）を追加。存在しないページ番号にアクセスした際の404エラー処理も実装。

https://github.com/fedify-dev/hollo/pull/106

アカウントのフィールド情報テーブルのレスポンシブ対応修正。画面縮小時に横スクロールが発生する問題を[Pico CSS](https://picocss.com/)の `overflow-auto` クラスで解決。

https://github.com/fedify-dev/hollo/pull/110

[#100](https://github.com/fedify-dev/hollo/pull/100)で画像のALTテキストを `<details>` 要素で展開表示できる機能を追加。

## stackblitz/alien-signals

最軽量のSignalライブラリ。Push-Pullベースのリアクティブシステムを探求するプロジェクトで、Vue 3.4のリアクティブシステムの約400%のパフォーマンスを実現。Vue 3.6でも採用されている。

https://github.com/stackblitz/alien-signals/pull/53

READMEのEffect Scopeサンプルコードを修正。未定義の `effect` 関数の修正と `count(2)` の宣言位置を適切に変更。

## elk-zone/elk

Mastodon向けのWebクライアント。Vue.js/Nuxtで構築されたモダンなフェディバースクライアント。

https://github.com/elk-zone/elk/pull/3254

モーダルダイアログの位置を画面中央から上部に変更。OSのオンスクリーンキーボードが表示された際にダイアログが隠れる問題を解決するため、`items-center` から `items-start` に変更。

## web-platform-dx/web-features

Web Platform DXプロジェクトによる、Webプラットフォームの機能とそのBaselineステータスを管理するリポジトリ。

https://github.com/web-platform-dx/web-features/pull/2877

自作の[Baseline MCP Server](https://github.com/yamanoku/baseline-mcp-server)[^1]をBaseline in the wild（Baselineを活用しているプロジェクト一覧）に追加。

https://github.com/punkpeye/awesome-mcp-servers/pull/653

関連してMCPサーバーのキュレーションリスト（Awesome List）の[awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)にも[Baseline MCP Server](https://github.com/yamanoku/baseline-mcp-server)を追加。

[^1]: MCPサーバーの詳細は[Baseline MCP Serverを公開しました！](https://zenn.dev/yamanoku/articles/baseline-mcp-server)を参照。

## chibivue-land/japanese-companies-using-vuejs

日本でVue.jsを使用している企業の一覧リポジトリ。Vue.jsコミュニティの可視化と企業間の情報共有を目的としている。

https://github.com/chibivue-land/japanese-companies-using-vuejs

yamanokuの所属企業である[株式会社Schoo](https://corp.schoo.jp/)を企業一覧に追加。

## chibivue-land/chibivue

[ubugeeei](https://github.com/ubugeeei)さん作のVue.jsを自作で実装しながら学ぶ教育コンテンツ。Vue.jsの内部実装を理解するためのハンズオンチュートリアル。

https://github.com/chibivue-land/chibivue/pull/605

[vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms)を使用してllms.txtとllms-full.txtを生成する機能を追加。NotebookLMなどのツールでドキュメントを理解・活用できるように。

https://github.com/chibivue-land/chibivue/pull/606

NotebookLMで生成した[音声ファイル](https://book.chibivue.land/notebooklm-audio.wav)（ポッドキャスト形式）を追加。

## wattanx/button.dev

[wattanx](https://github.com/wattanx)さん作のボタン要素に関する開発者向けツール/デモサイト。Nuxt製。

https://github.com/wattanx/button.dev/pull/1

SelectFieldコンポーネントと `<button>` 要素のtype属性選択機能を追加。

## mdn/content

MDN Web Docsの英語コンテンツリポジトリ。Web開発者向けのリファレンスドキュメント。

https://github.com/mdn/content/pull/41056

`::column` 疑似要素の誤記を修正。

https://github.com/mdn/translated-content/pull/28792

併せて日本語ドキュメントも同様の修正。

## nitrojs/nitro

Nuxtで使用されているサーバーエンジン。ユニバーサルなTypeScript製のサーバーフレームワーク。

https://github.com/nitrojs/nitro/pull/3570

ドキュメントの `compatibilityDate` 値の形式誤りを修正（`YY-MM-DD` → `YYYY-MM-DD`）。DateString型の正しいフォーマットに訂正。

## ryoppippi/ccusage

[ryoppippi](https://github.com/ryoppippi)さんのClaude Codeの使用量を可視化・分析するツール。

https://github.com/ryoppippi/ccusage/pull/695

Monthly Reportsページにログ保持期間のデフォルト値（30日）に関する注意事項をNOTICEブロックで追加。設定ファイルの `cleanupPeriodDays` を変更することで1ヶ月以上のログを確認できることを案内。

## angular/angular

Googleが開発するTypeScriptベースのWebアプリケーションフレームワーク。

https://github.com/angular/angular/pull/65604

ドキュメントの誤字修正（`W3` → `W3C`）。World Wide Web Consortiumの正式名称に訂正。