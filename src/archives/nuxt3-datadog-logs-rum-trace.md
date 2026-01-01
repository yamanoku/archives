---
title: Nuxt 3 SSRでの@datadog/browser-logs、@datadog/browser-rum、dd-traceの設定方法
description: Nuxt 3 SSRでの@datadog/browser-logs、@datadog/browser-rum、dd-traceの設定方法について
date: 2025-03-26
author: yamanoku
source: qiita.com
noindex: true
---

こんにちは。技術戦略部門でフロントエンドエンジニアをしております @okuto_oyama です。

現在、株式会社Schooでは[Datadog](https://www.datadoghq.com/ja/)を導入し各種サービスのオブザーバビリティを高めるためにメトリクス、トレース、ログの収集を行っています。各サービスでログ収集やトレース計装を進めており、フロントエンドではNuxt 3のSSRアプリケーションにもDatadogのライブラリ導入を進めております。

ライブラリの導入に際して引っかかった点があったのですが、それに関する解決記事が見当たらなかったので、今回はその内容を共有いたします。

## 最初にまとめ

- `@datadog/browser-logs`はNuxt pluginsに設置してクライアントで使う
- `@datadog/browser-rum`もNuxt pluginsに設置してクライアントで使う
- `dd-trace`だけはNuxtのバンドラーに含めずサーバー側で直接実行する

## 本記事で触れないこと

- オブザーバビリティそのものに関する紹介
- Datadogの各アプリケーションの詳細について（Datadog APM、Datadog RUMなど）
- Datadogの各ライブラリの詳細な設定内容について

## `@datadog/browser-rum`と`@datadog/browser-logs`の設置

最初に、[Datadog RUM](https://docs.datadoghq.com/ja/real_user_monitoring/browser/)のライブラリの`@datadog/browser-rum`と、Datadogにてブラウザのエラーログを収集できるライブラリの`@datadog/browser-logs`の設置について紹介します。

いずれも[Nuxt plugins](https://nuxt.com/docs/guide/directory-structure/plugins)に設定して実行するようにしております。

クライアント側で実行されるものなので明示的に`.client.ts`のsuffixをつけることをオススメします。

以下提示されてある設定値はサンプルとなりますので、参考にする際は各アプリケーション環境に応じて必要となるものを設定してください。

### `@datadog/browser-rum`

```ts
import { datadogRum } from "@datadog/browser-rum";

export default defineNuxtPlugin(() => {
  datadogRum.init({
    applicationId: "************************************",
    clientToken: "************************************",
    site: "ap1.datadoghq.com",
    service: "frontend-app-sample",
    env: "production",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
  });
});
```

### `@datadog/browser-logs`

```ts
import { datadogLogs } from "@datadog/browser-logs";

export default defineNuxtPlugin(() => {
  datadogLogs.init({
    clientToken: "************************************",
    site: "ap1.datadoghq.com",
    service: "frontend-app-sample",
    forwardErrorsToLogs: true, // 明示的に true を指定しないと console.error が Datadog に送信されない
  });
  return {
    provide: {
      datadogLogs,
    },
  };
});
```

`@datadog/browser-logs`で、一点ポイントとなるのがreturnされる`provide`に`datadaogLogs`を設定しておくことで、以下のようにNuxtアプリケーション内部でもDatadogへログ送信するヘルパー関数が扱えるようになります。

```html
<script setup lang="ts">
const { $datadogLogs } = useNuxtApp();

$datadogLogs.logger.info("datadog info logger");
$datadogLogs.logger.warn("datadog warn logger");
$datadogLogs.logger.error("datadoge error logger");
</script>
```

`datadogLogs`の型も効くようになります。

![VS Code上で$datadogLogs.logger.infoのメソッドにホバーしてパラメーターや返り値の型情報が表示されている。](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3871108/6d90cc51-826e-428b-a750-7fd378d55f13.png)

## `dd-trace`の設置について

上記RUMとログの設置はNuxt Pluginsで動作できたのですが、Node.js APM Tracer Libraryの`dd-trace`をpluginsに含めてみたところ、下記Issueにあるエラーが発生したためうまく動作しませんでした。

https://github.com/DataDog/dd-trace-js/issues/2413

要約すると、`dd-trace`側で使用されているGraphQLモジュールの依存関係が解消できていないことが起因しており、バンドラーやコンソール上でそのエラーが発生するといったものです。

[Webpackでの解決法](https://github.com/DataDog/dd-trace-js/issues/2413#issuecomment-1273138710)はありそうなのですが、Nuxt 3は内部のバンドラーにViteを使用しているため、どう回避すればいいのかが不明でした（いくつか依存関係にまつわるオプションで除外してみましたが、いずれも効果はありませんでした…）。

Datadogのカスタマーエンジニアにも本件問い合わせたところ、2025年3月現在、dd-traceではNuxt 3をサポートしていないとのことだったので、バンドラーに含めないやり方で対応することになりました。

### 対応方法

改めての紹介となりますが、今回計装したいのはNuxt 3のSSRアプリケーションになります。

Nuxt 3のSSRアプリケーションではビルド後にサーバーを起動するのですが、
`.output/server/index.mjs` をNode.js上で動かすようにしています。

そのため、SSRアプリケーション起動時に、以下ファイルを読み込んでおくようにしました。

```js
import tracer from "dd-trace";

tracer.init({
  hostname: process.env.DD_AGENT_HOST,
  service: process.env.DD_SERVICE,
  logInjection: true,
});

export default tracer;
```

設定が完了したら以下コマンドで動かせるようにします [^1] 。

```json
"preview": "node --import datadog-tracer.mjs .output/server/index.mjs"
```

[^1]: dd-traceを読み込むファイルがCJSの場合は`--import`の代わりに`--require`を使用します

また、環境変数として以下を設定します。

```sh
# Datadog APM
DD_TRACE_ENABLED=true
DD_AGENT_HOST=************************************ #IPアドレス、ドメイン名など記載
DD_SERVICE="frontend-app-sample"
```

これでNuxt 3のSSRアプリケーションで計装ができるようになりました！

## 最後にもう一度まとめ
- `@datadog/browser-logs`はNuxt pluginsに設置してクライアントで使う
- `@datadog/browser-rum`もNuxt pluginsに設置してクライアントで使う
- `dd-trace`だけはNuxtのバンドラーに含めずサーバー側で直接実行する

Nuxt 3のSSR環境でのDatadogライブラリの設置についてお困りの人に届けば幸いです！
