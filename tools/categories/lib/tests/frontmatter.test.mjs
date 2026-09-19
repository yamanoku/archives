import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { upsertFrontmatterFields } from '../frontmatter.mjs';

describe('upsertFrontmatterFields', () => {
  it('source のあと、noindex の前に category と topic を挿入する', () => {
    const input = `---
title: 動的な変更をスクリーンリーダーに伝えるNuxtAnnouncerの紹介
description: Nuxt 4.4より導入されたNuxtAnnouncer機能について紹介します
date: 2026-03-13
author: yamanoku
source: zenn.dev
noindex: true
---

本文
`;
    const result = upsertFrontmatterFields(input, {
      category: 'tech',
      topic: 'accessibility',
    });
    assert.equal(
      result,
      `---
title: 動的な変更をスクリーンリーダーに伝えるNuxtAnnouncerの紹介
description: Nuxt 4.4より導入されたNuxtAnnouncer機能について紹介します
date: 2026-03-13
author: yamanoku
source: zenn.dev
category: tech
topic: accessibility
noindex: true
---

本文
`,
    );
  });

  it('既存の category と topic を置き換える', () => {
    const input = `---
title: Demo
source: zenn.dev
category: essay
topic: life
---

body
`;
    const result = upsertFrontmatterFields(input, {
      category: 'event',
      topic: 'frontend',
    });
    assert.equal(
      result,
      `---
title: Demo
source: zenn.dev
category: event
topic: frontend
---

body
`,
    );
  });

  it('noindex が無い記事は末尾に追加する', () => {
    const input = `---
title: CodeClimateで.vueファイルも判定させる
tags: CodeClimate Vue.js JavaScript YAML
date: 2017-08-29
author: yamanoku
source: qiita.com
---

## 概要
`;
    const result = upsertFrontmatterFields(input, {
      category: 'tech',
      topic: 'frontend',
    });
    assert.equal(
      result,
      `---
title: CodeClimateで.vueファイルも判定させる
tags: CodeClimate Vue.js JavaScript YAML
date: 2017-08-29
author: yamanoku
source: qiita.com
category: tech
topic: frontend
---

## 概要
`,
    );
  });
});
