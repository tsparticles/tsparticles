# Bundle: Particles

`@tsparticles/particles` は、インタラクティブなパーティクル背景を作成するための簡略化された API を提供します。`@tsparticles/basic` よりもリッチな代替手段で、手動のエンジン設定ではなく専用 API を使用します。

## 含まれる機能

**形状:** 円（basic から）

**内部プラグイン:** interactivity（リンク、衝突）

**インタラクション:** リンク（パーティクル接続）、衝突

**API:** `particles(options)` または `particles(canvasId, options)`

## 使用すべきケース

- Web サイトのパーティクル背景
- パーティクルリンク付き背景（ノード風エフェクト）
- エンジンを手動で設定したくない

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// リンク付き背景
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// 特定のキャンバス上で
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// カスタムカラーで
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### 主要パラメーター

| パラメーター | 型                 | デフォルト | 説明               |
| ------------ | ------------------ | ---------- | ------------------ |
| `count`      | number             | 50         | パーティクルの数   |
| `radius`     | number             | 3          | パーティクルの半径 |
| `speed`      | number             | 2          | 移動速度           |
| `opacity`    | number             | 0.8        | 不透明度（0-1）    |
| `color`      | string \| string[] | "#ffffff"  | パーティクルの色   |
| `links`      | boolean            | false      | リンクを表示       |
| `linksColor` | string             | "#ffffff"  | リンクの色         |
| `linksWidth` | number             | 1          | リンクの太さ       |
| `shape`      | string[]           | ["circle"] | パーティクルの形状 |

## よくある間違い

- `@tsparticles/particles` が `tsParticles` をエクスポートしていると思う — していません。
- 同じ canvas ID を意図せず再利用する。
- 高度な形状（星、多角形）を期待する — particles バンドルは basic ベースで円のみを使用します。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [はじめに](/ja/guide/getting-started)
