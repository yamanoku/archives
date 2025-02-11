# generate-og-imageにまつわる仕様書

## 概要

```sh
.
|-- README.md ... 仕様書
|-- generate-og-image.mjs ... 実行ファイル
|-- template.html ... OGP画像用のテンプレートファイル
`-- lib/ ... ライブラリディレクトリ
    `-- tests/ ... テストディレクトリ
```

## 挙動について

1. `git status`を実行して新たに追加（unstage）された`src/archives`配下のマークダウンファイルを取得する
    - 存在しない場合は処理を終了する
1. `puppeteer`を起動する
1. マークダウンファイルを配列として取得してくる
    1. マークダウンファイルのfrontmatterから`title`を取得する
    1. テンプレートファイル（`ogp/template.html`）を開く
    1. `title`を`budoux`の`loadDefaultJapaneseParser()`でparseする
    1. テンプレートファイルの`<h1>`要素へparseされた`title`を挿入する
    1. スクリーンショットを撮る
    1. スクリーンショットを撮ったファイルについてをコンソールで表示する
1. `puppeteer`を終了する

## 使用するライブラリ

- budoux
    - さまざまなプラットフォームで読みやすいテキスト折り返し（改行）を行う
    - `tests/budoux.test.mjs`にてスナップショットテストを行っている
- gray-matter
    - マークダウンファイルのfrontmatterを取得する
    - `getPostTitle`で使用している
- puppeteer
    - OGP画像を生成するために使用する
    - `tests/puppeteer.test.mjs`で必要な挙動をテストしている
- Tailwind CSS
    - テンプレートファイルのスタイリングに使用する
    - CDN経由で読み込む

## テストについて

Node.jsのテストランナーを活用しています。

スナップショットテストを行うため `--experimental-test-snapshots` オプションを使用しています。v22.3.0以降で使用可能です。
