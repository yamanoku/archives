# archives カテゴライズ

[`src/archives/`](../../src/archives/) の記事を、TypeSafe AI の Choice で **形式** と **主題** の2軸に振り分ける。

結果は `results.json` に出し、記事 frontmatter へも書き戻す。

- 形式 (`form`) → `category`
- 主題 (`topic`) → `topic`

## ジャンル

### 形式 (`form`)

記事の書き方で選ぶ。主題は見ない。

| id              | 意味                                      |
| --------------- | ----------------------------------------- |
| `tech`          | 技術解説・実装・ツール/機能紹介・お知らせ |
| `event`         | カンファレンス・勉強会の参加/登壇レポート |
| `retrospective` | 年次・期間の活動や生態系の振り返り        |
| `essay`         | 個人の考え、生活、自戒、エッセイ          |
| `other`         | 上のどれにも当てはまらないとき            |

イベントレポートは、Vue やアクセシビリティの話が出ていても `event`。年次の活動まとめは `retrospective`。

### 主題 (`topic`)

記事が主に何についてのものかで選ぶ。

| id              | 意味                                                         |
| --------------- | ------------------------------------------------------------ |
| `accessibility` | Webアクセシビリティ、支援技術、インクルーシブ                |
| `frontend`      | Vue/Nuxt/Svelte、HTML/CSS/JS、ブラウザ、フロントエンドツール |
| `work`          | 仕事、組織、イネイブルメント、キャリア                       |
| `life`          | 生活、趣味、育児、個人の日常                                 |
| `other`         | 上のどれにも当てはまらないとき                               |

Vue/Nuxt 上のアクセシビリティ機能の紹介は `accessibility`。Vue Fes の参加レポートは形式が `event`、主題は `frontend`。

判定例:

- `feat-nuxt-announcer` → form=`tech`, topic=`accessibility`
- `report-vue-fes-japan-2024` → form=`event`, topic=`frontend`
- `gaad-japan-2022` → form=`event`, topic=`accessibility`
- `reviewing-2025-from-frontend-ecosystems-updates` → form=`retrospective`, topic=`frontend`
- `value-of-enablement` → form=`essay`, topic=`work`
- `yuri-sommelier-picks-yuri-manga` → form=`essay`, topic=`life`

criteria の本文は [`categories.json`](./categories.json) にある。Jev 向けに英語で書いてある。

## 実行

リポジトリルートで `TYPESAFE_API_KEY` を渡す。`.env` に書いてもよい（リポジトリにはコミットしない）。

```bash
export TYPESAFE_API_KEY=...
node tools/categories/classify.mjs
```

先に少数だけ試す場合:

```bash
node tools/categories/classify.mjs --limit=5
```

1記事につき TypeSafe へ1リクエストし、形式と主題の Choice を同時に聞く。429 / 529 は指数バックオフで再試行する。分類後、各記事の frontmatter に `category` と `topic` を足す。

キャッシュだけあるときは API キーなしで書き戻せる。

```bash
node tools/categories/apply-frontmatter.mjs
```

## 出力

- `results.json` — 全件の振り分け。`form` / `topic` とそれぞれの confidence、確率分布
- `cache.json` — API 応答のキャッシュ。再実行時はここを読んでリクエストを飛ばす。gitignore 済み
- `src/archives/*.md` — frontmatter の `category` と `topic`

confidence が 0.6 未満の記事は、実行時に一覧を出す。
