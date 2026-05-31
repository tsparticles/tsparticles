# インストール

このページは `tsParticles` メイン README のインストールマトリクスを反映しています。

公式リファレンス: <https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation>

## 導入パスを選ぶ

- **高速デフォルト**: `@tsparticles/engine` + `@tsparticles/slim`
- **より軽いカスタム runtime**: `@tsparticles/engine` + 必要な plugins のみ
- **用途別 API**: `@tsparticles/particles`、`@tsparticles/confetti`、`@tsparticles/fireworks`、`@tsparticles/ribbons`
- **全機能入り**: `@tsparticles/all`

## ホスティング / CDN

以下のプロバイダーを利用できます（またはビルド済みファイルを self-host）。

### jsDelivr

- <https://www.jsdelivr.com/package/npm/@tsparticles/confetti>
- <https://www.jsdelivr.com/package/npm/@tsparticles/particles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/engine>
- <https://www.jsdelivr.com/package/npm/@tsparticles/fireworks>
- <https://www.jsdelivr.com/package/npm/@tsparticles/basic>
- <https://www.jsdelivr.com/package/npm/@tsparticles/slim>
- <https://www.jsdelivr.com/package/npm/tsparticles>
- <https://www.jsdelivr.com/package/npm/@tsparticles/all>

### cdnjs

- <https://cdnjs.com/libraries/tsparticles>

### unpkg

- <https://unpkg.com/@tsparticles/confetti/>
- <https://unpkg.com/@tsparticles/particles/>
- <https://unpkg.com/@tsparticles/engine/>
- <https://unpkg.com/@tsparticles/fireworks/>
- <https://unpkg.com/@tsparticles/basic/>
- <https://unpkg.com/@tsparticles/slim/>
- <https://unpkg.com/tsparticles/>
- <https://unpkg.com/@tsparticles/all/>

## package manager でインストール

### npm

```bash
npm install @tsparticles/engine
```

### yarn

```bash
yarn add @tsparticles/engine
```

### pnpm

```bash
pnpm add @tsparticles/engine
```

## import と require

```ts
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

## 最小 runtime セットアップ（`@tsparticles/slim`）

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      move: {
        enable: true,
      },
      number: {
        value: 60,
      },
    },
  },
});
```

## 関連ページ

- [`/guide/getting-started`](/ja/guide/getting-started)
- [`/guide/wrappers`](/ja/guide/wrappers)
- [`/demos/presets`](/ja/demos/presets)
- [`/migrations/particles-js`](/ja/migrations/particles-js)

## legacy 互換

既存の particles.js 統合を移行する場合は、互換パッケージを利用してください。

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>
