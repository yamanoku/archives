---
title: Baseline MCP Serverを公開しました！
description: Baseline MCP Serverを作成し、公開したので紹介
date: 2025-04-13
author: yamanoku
source: zenn.dev
---

Model Context Protocol（MCP）、最近流行っていますね。割と簡単に作れることが売りのようです。

というわけで私も勉強がてら、Web Platform APIからBaselineの状況を提供するMCPサーバーを作成し、OSSとして公開しました。

https://jsr.io/@yamanoku/baseline-mcp-server

使い方の詳細や実装内容については、下記にあるGitHubリポジトリを参照してください。READMEに設定方法やコードの説明を記載しています。

https://github.com/yamanoku/baseline-mcp-server

## Baseline MCP Serverとは何か

<img src="https://i.gyazo.com/493a6b8fc6775e8951df4c6c433c5c28.png" alt="Baseline MCP Serverのロゴ" width="350">

Baseline MCP Serverは、[Web Platform Dashboard](https://webstatus.dev/)のAPIを利用して、WebのAPI機能のBaselineステータス（ブラウザ対応状況）を取得できるMCPサーバーです。Claude DesktopやCline、VSCodeなどでMCPクライアントを通じてWeb機能のBaseline情報へアクセスできるようになります。

Baselineについての詳細は「[Baseline (互換性) - MDN Web Docs 用語集](https://developer.mozilla.org/ja/docs/Glossary/Baseline/Compatibility)」を参照してください。

例えば、「`<dialog>` 要素はどのブラウザでサポートされているの？」といった質問に対して、LLmがBaseline MCP Serverを通じて最新の対応状況を取得し、より正確に回答できるようになります。

![Claude Desktop上でdetails要素にまつわるBaseline情報を質問してMCPサーバーを経由してその結果が反映されている。](https://github.com/yamanoku/baseline-mcp-server/raw/main/screenshot_claude_desktop.png)

## なぜBaseline MCP Serverを開発したのか

LLMモデルは知識カットオフなどの制約があるため、コンテキストを都度提供しないと最新のブラウザ対応状況を把握できないという課題がありました。この問題を解決するために、リアルタイムでWeb Platform APIの対応状況を取得できるMCPサーバーが作れないかと思い、開発に着手しました。

また、フロントエンド開発において、MCPクライアントと連携したワークフローの効率化も目指していました。この機能はBaselineではどのステータスだったのか？ということをいちいちMDNやCan I Useなどから確認する手間を省き、AIエージェントにBaselineに関する使い方を把握してもらい命令させることで開発の生産性向上に貢献したいと考えています。

## なぜDenoから動作するようにしているのか

Baseline MCP ServerではランタイムとしてDenoをサポートしています。記事執筆時点ではNode.jsやBunでのサポートはありませんが、この選択にはセキュリティ上の理由があります。

MCPサーバーは本質的に外部からの入力を処理し、外部APIと通信するため、セキュリティリスクが存在します。Denoはデフォルトで安全なパーミッションモデルを採用しており、明示的に許可されたネットワークドメインにのみアクセスできるような制限が可能です。

```bash
deno run --allow-net=api.webstatus.dev jsr:@yamanoku/baseline-mcp-server
```

このように特定のドメイン（`api.webstatus.dev`）へのアクセスのみを許可することで、MCPサーバーが意図しないネットワーク通信をしてしまうリスクを大幅に低減させます。

対照的に、最近公開されている多くのMCPサーバーは以下のような方法で実行されています。

```bash
npx -y @organization/some-mcp-server
```

この `npx -y` アプローチには、パッケージのインストールと実行を無条件に許可するため、潜在的なセキュリティリスクがあります。公式ではない野良のMCPサーバーを無意識的に使ってしまうことで、ユーザーが知らないうちに悪意のあるコードを実行してしまいかねません。

MCPサーバーのセキュリティリスクについて詳しく知りたい方は、[MCPことはじめ / MCPサーバーのセキュリティリスク](https://findy-code.io/media/articles/modoku20250404-yusuktan)、[MCPサーバーを安全に動かすための工夫](https://blog.lai.so/crashing-mcp-server/)という記事を参照することをお勧めします。Baseline MCP Serverでは、これらのリスクを念頭に置いて、より安全に使用もらうことを推奨しています。

また、Docker環境がある場合は以下、Dockerfileから使うこともできます。

https://github.com/yamanoku/baseline-mcp-server/blob/919596d85371a0392124b911756b63bcbd19ab2f/Dockerfile

## まとめ

Baseline MCP Serverを使うことで、LLMモデルは常に最新のWeb Platform APIよりBaselineの状況へアクセスできるようになります。フロントエンドエンジニアがAIを活用する際、より信頼性の高い情報を得ることができるようになるでしょう。

MCPの可能性はまだまだ広がっており、今後もWeb開発者とAIの連携をより強化するツールを開発していきたいと考えています。セキュリティを考慮した実装アプローチによって、安全かつ実用的なツールとなることを目指しています。

ぜひBaseline MCP Serverを試してみて、フィードバックをいただければ幸いです。

https://github.com/yamanoku/baseline-mcp-server

## 謝辞

本記事は、Claude 3.7 Sonnetに記事作成を協力してもらい作成されました。感謝申し上げます。

## 追記 （2025-04-20）

[WebDX Community Group](https://www.w3.org/community/webdx/)が運営するBaselineホームページ内の[Baseline in the wild](https://web-platform-dx.github.io/web-features/baseline-in-the-wild/)にて、Baseline MCP ServerをBaselineの活用事例としてToolsのセクションに追加させてもらいました。

![Baselineサイトのスクリーンショット。画面の左半分にはBaselineのロゴと「Baseline gives you clear information about which web platform features work across browsers.」という説明文、その下には関連するリンク一覧がある。右半分には様々なBaselineに関連ツールやプロジェクトのリストがあり、赤枠で強調されている項目にはBaseline MCP Serverが載っていて、説明文には「Baseline MCP Server, a Model Context Protocol (MCP) server that provides Baseline information for web features.」と書かれている。](https://i.gyazo.com/32972dc3d6b79d703bfbebfd6c84e38b.png)

https://github.com/web-platform-dx/web-features/pull/2877
