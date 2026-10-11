# [archives.yamanoku.net](https://archives.yamanoku.net/)

[yamanoku](https://github.com/yamanoku) archive contents. (Japanese text only)

## Architecture

Markdown 記事を Vite + [@ox-content/vite-plugin](https://github.com/ox-content/ox-content) で静的サイトにビルドし、Vercel へ配信する構成。

```mermaid
flowchart TB
  subgraph content["Content"]
    MD["src/archives/*.md<br/>frontmatter + Markdown"]
    PUBLIC["public/<br/>favicon, og-images, …"]
    STYLES["src/styles/global.css"]
    CONFIG["src/config.ts"]
  end

  subgraph tools["Offline tools"]
    OGP["tools/ogp<br/>OG 画像生成"]
    CAT["tools/categories<br/>カテゴリ分類"]
  end

  subgraph build["Build (Vite)"]
    OX["@ox-content/vite-plugin<br/>MD → HTML / SSG / search-index"]
    SITE["plugins/archives-site<br/>pretty URL / CSS / feeds"]
    THEME["theme/<br/>Home · Article · NotFound"]
    SEARCH["src/search-client.ts<br/>クライアント検索"]
    XF["transformers<br/>footnotes · MD link rewrite"]
  end

  subgraph dist["dist/ (static)"]
    HTML["/{slug}/index.html"]
    ASSETS["assets/ · styles.css"]
    FEEDS["rss.xml · sitemap*.xml<br/>llms.txt · search-index.json"]
  end

  HOST["Vercel<br/>archives.yamanoku.net"]

  MD --> OX
  CONFIG --> OX
  THEME --> OX
  XF --> OX
  OX --> HTML
  OX --> FEEDS
  SITE --> HTML
  SITE --> ASSETS
  SITE --> FEEDS
  PUBLIC --> SITE
  STYLES --> SITE
  SEARCH --> ASSETS
  OGP -.->|og-images| PUBLIC
  CAT -.->|frontmatter| MD
  HTML --> HOST
  ASSETS --> HOST
  FEEDS --> HOST
```

| レイヤ | 役割 |
| --- | --- |
| `src/archives/` | 記事本体（Markdown） |
| `theme/` | ページレイアウトと共通コンポーネント |
| `plugins/` | ox-content 設定・脚注・フィード・ビルド後処理 |
| `tools/` | OG 画像生成・カテゴリ分類（ビルド外） |
| `dist/` | 静的成果物（Vercel へデプロイ） |

## Build Setup

```bash
# install dependencies
$ npm ci

# setup serve
$ npm run dev

# generate static project
$ npm run build
```
