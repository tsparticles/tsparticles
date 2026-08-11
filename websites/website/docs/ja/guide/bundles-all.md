# Bundle: All

`@tsparticles/all` は tsParticles リポジトリの**すべて**（あらゆる形状、インタラクション、アップデーター、エフェクト、パス、イージング、プラグイン、エクスポート）を読み込みます。最大のバンドルで、プロトタイピングとデモ向けです。

## 含まれる機能

`tsparticles`（full）のすべてを継承し、さらに:

**すべての形状:** 矢印、カード、cog、ハート、infinity、matrix、path、リボン、角丸多角形、角丸四角、スパイラル、スクワークル

**すべての外部インタラクション:** cannon、light、particle、pop、particles-repulse

**すべてのエフェクト:** バブル、フィルター、パーティクル、シャドウ、トレイル

**すべてのパスジェネレーター:** branches、brownian、curl-noise、curves、fractal-noise、grid、levy、perlin-noise、polygon、random、simplex-noise、spiral、svg、zig-zag

**すべてのイージング:** back、bounce、circ、cubic、elastic、expo、gaussian、linear、quad、quart、quint、sigmoid、sine、smoothstep

**すべてのカラープラグイン:** HEX、HSL、RGB、HSV、HWB、LAB、LCH、Named、OKLAB、OKLCH

**すべてのプラグイン:** アブソーバー、background-mask、canvas-mask、エミッター（全形状）、イージング（全種類）、export-image、export-json、export-video、infection、manual-particles、motion、poisson-disc、polygon-mask、responsive、sounds、themes、trail、zoom

**すべてのアップデーター:** destroy、gradient、life、opacity、orbit、out-modes、paint、roll、rotate、size、tilt、twinkle、wobble

## 使用すべきケース

- 可能性を探るための迅速なプロトタイピング
- デモやショーケース
- サイズが重要でない開発環境
- **本番環境には非推奨** — よりターゲットを絞ったバンドルを使用してください

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## `tsparticles` と `@tsparticles/all` の違い

詳細な比較表は[バンドル full ページ](/ja/guide/bundles-full)を参照してください。

## よくある間違い

- 本番環境で使用する — より小さいバンドル（`@tsparticles/slim` または `tsparticles`）を優先してください。
- `loadAll(tsParticles)` より前に `tsParticles.load()` を呼ぶ。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [インストールガイド](/ja/guide/installation)
