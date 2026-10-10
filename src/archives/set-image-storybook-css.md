---
title: StorybookでCSSに画像を指定をしたい時
description: storybook CSS package.json
date: 2017-08-30
author: yamanoku
source: qiita.com
category: tech
topic: frontend
---

小ネタ。

CSS での画像指定の仕方がイマイチわからず webpack 上でなんとかするのかと思っていました。

## 解決法

単純に<strong>「静的ディレクトリから参照してくる」</strong>というのを設定してあげればいいだけの話でした。

### 指定方法

https://storybook.js.org/configurations/default-config/#image-and-static-file-support

> storybook also has a way to mention static directories via the -s option of the start-storybook and build-storybook commands.

```bash
-s {static directories}
```

`-s`オプションを追加して指定の静的ディレクトリを指定してあげるだけ。ね、簡単でしょ。

#### `./dist` が output 先だとしている場合

```json
"scripts" {
   "storybook": "start-storybook -p 6006 -s ./dist"
}
```

こんな感じになります。

### 動かしてみる

```bash
yarn storybook
```

動かしてみて、以下ルートのディレクトリから画像を取得すると想定します。

```
dist/
└── img/
    └── ic-arrow_right.png  < これ
```

#### コード例

```tsx
import * as React from 'react';

export class Hogehoge extends React.Component {
  render() {
    return <div className="hogehoge">画像が見れる</div>;
  }
}
```

```css
.hogehoge {
  width: 100%;
  height: 30px;
  background-image: url('/img/ic-arrow_back.png'); /* 画像指定 */
}
```

#### 結果

ちなみに `<img>` の src 読み込みでも同じこと出来ます。

```tsx
import * as React from 'react';

export class Hogehoge extends React.Component {
  render() {
    return (
      <div className="hogehoge">
        <img src="/img/ic-arrow_back.png" />
        画像が見れる
      </div>
    );
  }
}
```

### 参考 URL

- https://storybook.js.org/configurations/serving-static-files/#2-via-a-directory
- https://github.com/storybooks/storybook/issues/37#issuecomment-205744157
