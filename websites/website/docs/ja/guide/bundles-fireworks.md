# Bundle: Fireworks

`@tsparticles/fireworks` は、1 回の関数呼び出しで花火エフェクトを作成するための簡略化された API を提供します。サウンド、カスタムカラー、インスタンス制御（一時停止/再生）をサポートします。

## 含まれる機能

**形状:** 線、円（basic から）

**内部プラグイン:** エミッター、emitters-shape-square、blend（ブレンド）、sounds

**アップデーター:** destroy、life、paint、rotate

**API:** `fireworks(options)` — 制御可能なインスタンスを返します

## 使用すべきケース

- 新年や祝賀エフェクト
- 祝賀 UI
- エンジンを手動で設定したくない

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// 基本的なエフェクト
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// インスタンス制御
instance?.pause();
instance?.play();

// 特定のキャンバス上で
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // 即席花火
  fireworks();
</script>
```

### 主要パラメーター

| パラメーター | 型 | デフォルト | 説明 |
|---|---|---|---|
| `colors` | string[] | — | 爆発の色 |
| `rate` | number | — | 1 秒あたりの花火数 |
| `speed` | { min, max } | — | パーティクルの速度 |
| `sounds` | boolean | true | 効果音を有効にする |
| `gravity` | number | — | 重力（デフォルト: 0） |
| `opacity` | number | — | 不透明度（0-1） |
| `brightness` | { min, max } | — | 爆発の明るさ |

## よくある間違い

- `@tsparticles/fireworks` が `tsParticles` をエクスポートしていると思う — していません。
- インスタンスを管理せずに `fireworks()` をループ内で呼ぶ — エフェクトはすでに継続的です。
- ページ離脱時にインスタンスを停止しない — `instance?.pause()` または `instance?.stop()` を呼んでください。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [Confetti バンドル](/ja/guide/bundles-confetti)
