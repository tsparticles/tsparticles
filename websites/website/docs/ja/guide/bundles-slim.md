# Bundle: Slim

`@tsparticles/slim` はほとんどのプロジェクトに推奨されるバンドルです。マウスインタラクション、複数の形状、パーティクルリンクを備えた、モダンなパーティクルアニメーションに必要なすべてを含みます。

## 含まれる機能

`@tsparticles/basic` のすべてを継承し、さらに:

**形状:** 円、四角、星、多角形、線、画像、絵文字

**外部インタラクション（マウス/タッチ）:**

- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**パーティクルインタラクション:**

- attract
- 衝突
- リンク（パーティクル接続）

**追加アップデーター:**

- life（ライフサイクル）
- 回転

**プラグイン:**

- interactivity
- easing-quad
- HEX、HSL、RGB カラープラグイン

## 使用すべきケース

- ほとんどのプロジェクトの推奨開始点
- 複数の形状（円、星、多角形、画像）が必要
- マウスインタラクション（クリック、ホバー、バブル、リパルス）が必要
- パーティクルリンクが必要
- バンドルサイズと機能のバランスが良い

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## よくある間違い

- `loadSlim(tsParticles)` より前に `tsParticles.load()` を呼ぶ。
- エンジンとバンドルのバージョンが異なる — バージョンを揃えてください。
- 上位バンドルの機能（エミッター、アブソーバー、テキスト、ウィブル）を期待する — `tsparticles`（full）または個別プラグインが必要です。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [インストールガイド](/ja/guide/installation)
