# Bundle: tsparticles（Full）

`tsparticles`（npm: `tsparticles`、ローダー: `loadFull`）は公式のフルバンドルです。Slim のすべてに加え、エミッター、アブソーバー、テキスト形状、高度なアニメーション（ウィブル、ロール、ティルト、トゥインクル、デストロイ）を含みます。

## 含まれる機能

`@tsparticles/slim` のすべてを継承し、さらに:

**追加形状:** テキスト（カスタムフォント対応）

**追加外部インタラクション:**
- drag（マウスでパーティクルをドラッグ）
- trail（マウス後方のパーティクルトレイル）

**追加アップデーター:**
- destroy（パーティクル破壊アニメーション）
- roll（回転）
- tilt（3D 傾き）
- twinkle（断続的なきらめき）
- wobble（振動）

**プラグイン:**
- アブソーバー（パーティクルを吸い込むブラックホール）
- エミッター（継続的なパーティクル生成源）
- emitters-shape-circle、emitters-shape-square（エミッター形状）

## 使用すべきケース

- エミッター（パーティクルの継続的生成）が必要
- アブソーバー（パーティクルの吸い込み）が必要
- カスタムフォントを使用したテキスト形状が必要
- 高度なアニメーション（ウィブル、ティルト、ロール、トゥインクル）が必要
- 個別プラグインに進む前の良いステップ

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## `tsparticles` と `@tsparticles/all` の違い

| 項目 | `tsparticles`（full） | `@tsparticles/all` |
|---|---|---|
| サイズ | 中程度 | 非常に大きい |
| 形状 | 円、四角、星、多角形、線、画像、絵文字、テキスト | すべての形状（ハート、カード、矢印、スパイラル、cog、角丸四角など） |
| インタラクション | Slim + drag + trail | すべて（cannon、light、pop、particle、repulse） |
| パス | Quad イージングのみ | 14 のパスジェネレーター |
| エフェクト | なし | 5 エフェクト（バブル、フィルター、シャドウなど） |
| エクスポート | なし | 画像、JSON、動画 |
| 追加プラグイン | アブソーバー、エミッター | すべて（sounds、themes、trail、zoom、polygon-mask、canvas-mask、background-mask など） |
| イージング | Quad | 15 のイージング |

## よくある間違い

- `tsparticles` と `@tsparticles/all` を混同する — これらは異なるパッケージです。
- `loadFull(tsParticles)` より前に `tsParticles.load()` を呼ぶ。
- npm パッケージは `tsparticles`（`@tsparticles/full` ではありません）、ローダーは `loadFull` です。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [インストールガイド](/ja/guide/installation)
