---
title: 動的な変更をスクリーンリーダーに伝えるNuxtAnnouncerの紹介
description: Nuxt 4.4より導入されたNuxtAnnouncer機能について紹介します
date: 2026-03-13
author: yamanoku
source: zenn.dev
noindex: true
---

## 動的な変更をスクリーンリーダーに伝える技術

以前の記事で、Nuxt 3.12から導入された `<NuxtRouteAnnouncer>` と `useRouteAnnouncer` について紹介しました。

[SPAのアクセシビリティを強化するNuxtのRoute Announcer機能](./feat-nuxt-route-announcer)

これらはSPAにおけるページ遷移時にスクリーンリーダーへページタイトルを自動通知するコンポーネントとコンポーザブルで、クライアントサイドルーティングのアクセシビリティ課題を解消するものでした。

しかし、ページ遷移以外にもスクリーンリーダーに伝えるべき動的な変更は多く存在します。たとえば、フォームバリデーションのエラーメッセージ、トースト通知、ローディング状態の変化などです。これらを実現するためには自前で `aria-live` を使って実装する必要がありました。

Nuxt 4.4[^1]より、これらのユースケースに対応する `<NuxtAnnouncer>` コンポーネントと `useAnnouncer` コンポーザブルが導入されました。

https://github.com/nuxt/nuxt/pull/34318

[^1]: Nuxt 3系の場合、Nuxt 3.17に同梱されています。

- [`<NuxtAnnouncer>` · Nuxt Components v4](https://nuxt.com/docs/4.x/api/components/nuxt-announcer)
- [useAnnouncer · Nuxt Composables v4](https://nuxt.com/docs/4.x/api/composables/use-announcer)

今回はこのコンポーネントとコンポーザブルについて紹介します。

## 基本的な使い方

### `<NuxtAnnouncer>` コンポーネントの設置

`app.vue` またはレイアウトファイルに `<NuxtAnnouncer>` を設置します。

```html
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtAnnouncer /> <!-- 追加 -->
    <NuxtPage />
  </div>
</template>
```

`<NuxtRouteAnnouncer>` と併用する場合は上記のように両方設置します。

### `useAnnouncer` で通知する

コンポーネント内やコンポーザブル関数にて `useAnnouncer` コンポーザブルを使い、スクリーンリーダーへメッセージを通知します。

```html
<script setup lang="ts">
import { useAnnouncer } from '#app';

const { polite, assertive } = useAnnouncer();

async function submitForm() {
  try {
    await $fetch('/api/contact', { method: 'POST', body: formData })
    polite('メッセージが送信されました');
  }
  catch (error) {
    assertive('メッセージの送信に失敗しました');
  }
}
</script>
```

## `<NuxtAnnouncer>` のProps

`<NuxtAnnouncer>` は以下のPropsを受け取ります。


```html
<template>
  <NuxtAnnouncer :atomic="true" politeness="polite" />
</template>
```

### `atomic`

- 型: `boolean`
- デフォルト: `true`

これはWAI-ARIAの `aria-atomic` 属性と連動するPropsです。スクリーンリーダーが変更部分のみを読み上げるか、要素全体を読み上げるかを制御します。`true` の場合は要素全体を、`false` の場合は変更された部分のみを読み上げます。

全体を読み上げるとはどういうことかというと、例えば以下のような要素があったとします。

```html
<div id="clock" role="timer" aria-live="polite" aria-atomic="true">
  <span id="hours">12</span>:
  <span id="minutes">00</span>
</div>
```

この要素内のテキストで `minutes` が動的に切り替わって `01` となったとき、`aria-atomic="true"` では `12:00` から `12:01` に変わったと読み上げられますが、`aria-atomic="false"` では `00` から `01` に変更されたと読み上げられます。

### `politeness`

- 型: `'off' | 'polite' | 'assertive'`
- デフォルト: `'polite'`

スクリーンリーダーの読み上げの優先度を設定します。

- `off` ... 通知を無効にする
- `polite` ... 他の読み上げがすべて終わった後に通知する
- `assertive` ... 他の読み上げを中断して即座に通知する

## `useAnnouncer` コンポーザブルの詳細

`useAnnouncer` からは以下のメソッドが利用できます。

```html
<script setup lang="ts">
import { useAnnouncer } from '#app';
const { set, polite, assertive } = useAnnouncer();
</script>
```

### `set(message, politeness)`

メッセージと `politeness` を指定して通知します。

```ts
set('5件の結果が見つかりました', 'polite');
```

### `polite(message)`

`politeness` を `polite` に設定して通知します。他の読み上げが終わるのを待ってから通知されるため、補足的な情報の通知に適しています。

```ts
polite('データの読み込みが完了しました');
```

### `assertive(message)`

`politeness` を `assertive` に設定して通知します。他の読み上げを中断して即座に通知されるため、緊急性の高い情報に適しています。

```ts
assertive('入力内容にエラーがあります');
```

### `polite` と `assertive` の使い分け

基本的には `polite` を使用し、ユーザーの即座の注意が必要な場合にのみ `assertive` を使用するようにしてください。`assertive` は他の読み上げを中断するため、多用するとユーザー体験を損なう可能性があります。

- `polite` が適切な場面 ... 検索結果の件数、データの読み込み完了、操作の成功通知
- `assertive` が適切な場面 ... フォームバリデーションエラー、セッション期限切れの警告、重要なエラー通知

## `<NuxtRouteAnnouncer>` と `<NuxtAnnouncer>` の違い

| | `<NuxtRouteAnnouncer>` | `<NuxtAnnouncer>` |
|---|---|---|
| 通知タイミング | ルート遷移時に自動 | 開発者が任意に制御 |
| 通知内容 | ページタイトル（`useHead` の `title`） | 任意のメッセージ |
| コンポーザブル | `useRouteAnnouncer` | `useAnnouncer` |
| 主な用途 | ページ遷移の通知 | フォームのエラー通知・トースト・ローディング等 |
| `atomic` のデフォルト値 | `false` | `true` |

`<NuxtRouteAnnouncer>` はルート変更時にページタイトルを**自動的に**通知するのに対し、`<NuxtAnnouncer>` は開発者が**任意のタイミングで任意のメッセージ**をスクリーンリーダーに通知できます。この性質の違いによって、それぞれの通知同士が競合することはありません。

それぞれのコンポーネントのソースを見ると構造はほとんど一緒ですが、クラス名が異なる（`nuxt-route-announcer` と `nuxt-announcer`）、`aria-atomic` のデフォルト値が異なる（`false` と `true`）などの差異はあります。

https://github.com/nuxt/nuxt/blob/b0cdb0af9b4634aebc283a876c0082e70cfedac2/packages/nuxt/src/app/components/nuxt-route-announcer.ts

https://github.com/nuxt/nuxt/blob/b0cdb0af9b4634aebc283a876c0082e70cfedac2/packages/nuxt/src/app/components/nuxt-announcer.ts

## 具体的なユースケース

以下は、`useAnnouncer` を利用した具体的なユースケースのサンプルです。

### フォームバリデーションエラーの通知

フォームの入力にエラーがある場合、`assertive` で即座にエラー内容を伝えます。

```html
<script setup lang="ts">
import { useAnnouncer, useId } from '#app';
import { ref } from 'vue';

const { assertive } = useAnnouncer();
const email = ref('');
const errorMessage = ref('');
const formId = useId();

function validateForm() {
  if (!email.value) {
    errorMessage.value = 'メールアドレスは必須です';
    assertive(errorMessage.value);
    return false;
  }
  return true;
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <label :for="formId">メールアドレス</label>
    <input :id="formId" v-model="email" type="email" />
   <button type="submit">送信</button>
  </form>
</template>
```

### ローディング状態のフィードバック

データ取得中の状態変化を `polite` で通知します。

```html
<script setup lang="ts">
import { useAnnouncer, useFetch } from '#app';
import { watch } from 'vue';

const { polite } = useAnnouncer();
const { data, status } = useFetch('/api/items');

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    polite('データを読み込んでいます');
  } else if (newStatus === 'success') {
    polite('データの読み込みが完了しました');
  } else if (newStatus === 'error') {
    polite('データの読み込みに失敗しました');
  }
});
</script>
```

### 検索結果の件数通知

検索後に結果の件数をスクリーンリーダーに伝えます。

```html
<script setup lang="ts">
import { useAnnouncer } from '#app';
import { ref } from 'vue';

const { polite } = useAnnouncer();
const query = ref('');
const results = ref([]);

async function search() {
  results.value = await $fetch('/api/search', {
    params: { q: query.value },
  });
  polite(`${results.value.length}件の検索結果が見つかりました`);
}
</script>

<template>
  <label>
    検索 <input v-model="query" type="search" @input="search" />
  </label>
  <ul>
    <li v-for="item in results" :key="item.id">{{ item.title }}</li>
  </ul>
</template>
```

## 注意点

`useAnnouncer` は、ページ内で発生する動的な変化をスクリーンリーダーに伝えるための仕組みとして設計されています。そのため、あらゆる通知を `useAnnouncer` に任せることは推奨されません。`<NuxtRouteAnnouncer>` と異なり、デフォルトで有効になっていないのも、必要な場面に限定して使うことを意図しているためです。

多くのケースでは、フォーカス移動やネイティブの `<form>` 要素のバリデーション[^2]だけで十分に情報を伝えられます。`useAnnouncer` の利用を検討すべきなのは、フォーカスを移動できない・移動させない要素の変化を伝えたい場合です。

また、スクリーンリーダーへの通知だけではなく、視覚的なフィードバックも必ず併用することが重要です。エラーメッセージを画面上に表示するなど、誰にとっても理解しやすいUIを提供することを忘れないようにしてください。

```html
<template>
  <form @submit.prevent="validateForm">
    <label :for="formId">メールアドレス</label>
    <input :id="formId" v-model="email" type="email" />
    <!-- 視覚的にもエラー情報を伝える -->
    <p v-if="errorMessage">{{ errorMessage }}</p>
   <button type="submit">送信</button>
  </form>
</template>
```

[^2]: [HTMLの標準機能で作るフォームバリデーション - ICS MEDIA](https://ics.media/entry/240418/)

## Nuxtアクセシビリティ改善ロードマップ

今回の対応は、Nuxtのアクセシビリティに関するロードマップの一部とされています。

[Accessibility roadmap · Issue #23255 · nuxt/nuxt](https://github.com/nuxt/nuxt/issues/23255)

DevTools上でアクセシビリティチェックが可能になる[@nuxt/a11y](https://github.com/nuxt/a11y)モジュールの開発も現在進行中で、Nuxt上でアクセシビリティを考慮した開発をやりやすくする方向へと進んでいます。今後もこのロードマップの進捗に期待を寄せています。

## VueUseへのコンポーザブル追加要望

余談ですが、私はこのNuxtから呼び出されるコンポーザブルを見たとき、Vue.js単体でも使えたらいいなと思いました。

そこで、[VueUse](https://github.com/vueuse/)という便利なコンポーザブル集にもこの `useAnnouncer` 相当のものを実装したいと思って[Issueで要望を出した](https://github.com/vueuse/vueuse/issues/5314)ところ、翌日にはすでに別の方が実装してくださっていました。

[feat(useLiveAnnouncer): new function by IceMooncake · Pull Request #5315 · vueuse/vueuse](https://github.com/vueuse/vueuse/pull/5315)

この記事の執筆時点ではまだマージされていませんが、これが本体に適用されるのを楽しみにしています。

## まとめ

この記事ではNuxt 3.12から `<NuxtRouteAnnouncer>` が導入されSPAのページ遷移の通知が実現し、Nuxt4.4からは `<NuxtAnnouncer>` が追加されたことでページ内の動的な変更の通知もフレームワークレベルでサポートされたことについて紹介しました。

これにより、開発者がアクセシビリティ対応のために自前で `aria-live` の実装をする負担が軽減されます。ぜひ `<NuxtAnnouncer>`、`useAnnouncer` を活用して、動的なUIでもアクセシビリティを考慮した開発を実現してください。

## 謝辞

本記事はClaude Opus 4.6に記事作成を協力してもらい作成されました。感謝申し上げます。
