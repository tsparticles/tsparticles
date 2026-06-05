# インストール

## パスの選択

| シナリオ | コマンド |
|---|---|
| クイックスタート（推奨） | `pnpm add @tsparticles/engine @tsparticles/slim` |
| 最小構成 | `pnpm add @tsparticles/engine @tsparticles/basic` |
| フル機能 | `pnpm add @tsparticles/engine tsparticles` |
| リポジトリのすべて | `pnpm add @tsparticles/engine @tsparticles/all` |
| 紙吹雪のみ | `pnpm add @tsparticles/confetti` |
| 花火のみ | `pnpm add @tsparticles/fireworks` |
| パーティクル背景 | `pnpm add @tsparticles/particles` |
| リボンエフェクト | `pnpm add @tsparticles/ribbons` |

> **重要**: `@tsparticles/engine` 単体では何も描画しません。必ずバンドル（形状とアニメーションを読み込むため）または個別のプラグインを追加してください。[バンドルガイド](/ja/guide/bundles)を参照してください。

## npm

```bash
# engine + slim（ほとんどのプロジェクトに推奨）
npm install @tsparticles/engine @tsparticles/slim

# engine + basic（最小）
npm install @tsparticles/engine @tsparticles/basic

# engine + full（tsparticles）
npm install @tsparticles/engine tsparticles

# engine + all
npm install @tsparticles/engine @tsparticles/all

# 専用 API バンドル（明示的な engine は不要）
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... 他のバンドルも同様のパターン
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... 他のバンドルも同様のパターン
```

## CDN（script タグ）

すべてのパッケージは jsDelivr、unpkg、cdnjs で利用可能です。

### jsDelivr

| バンドル | URL |
|---|---|
| Engine | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js` |
| Basic | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js` |
| Slim | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js` |
| Full（`tsparticles`） | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js` |
| All | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js` |
| Confetti | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js` |
| Fireworks | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js` |
| particles.js 互換 | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js` |

### unpkg

同じ構造: `https://unpkg.com/{package-name}@{version}/{filename}`

例:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## インポート例

### バンドラー使用（ES module インポート）

```ts
// Engine + バンドルローダー
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### CommonJS（require）

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### CDN（script タグ）

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. バンドル（loadBasic/loadSlim/loadFull/loadAll をグローバルに公開） -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. スクリプト -->
<script>
  (async () => {
    await loadSlim(tsParticles);  // 機能を登録
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

専用 API バンドルの場合:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## 関連ページ

- [はじめに](/ja/guide/getting-started)
- [バンドルガイド](/ja/guide/bundles)
- [フレームワークラッパー](/ja/guide/wrappers)
