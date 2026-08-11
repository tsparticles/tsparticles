# Bundle: Basic

`@tsparticles/basic` は最も軽量なバンドルです。アニメーション可能な不透明度とサイズを持つ円が移動する、必要最小限の機能のみを含みます。

## 含まれる機能

**形状:** 円

**アップデーター:**

- paint（色）
- 不透明度
- out-modes（画面外での動作）
- サイズ

**プラグイン:**

- move
- blend（色のブレンド）
- HEX、HSL、RGB カラープラグイン

**含まれないもの:**

- マウス/タッチインタラクション
- パーティクルリンク
- その他の形状（四角、星、画像、多角形など）
- エミッター、アブソーバー、サウンド
- 回転、life、roll、tilt、wobble

## 使用すべきケース

- バンドルサイズが最優先
- 動くドットだけが必要
- インタラクションや複雑な形状は不要

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## よくある間違い

- 含まれていない機能（例: `links`、マウスインタラクション）を期待する — これらは上位のバンドルが必要です。
- `loadBasic(tsParticles)` より前に `tsParticles.load()` を呼ぶ — 形状とアップデーターがまだ登録されていません。
- バンドルなしで `@tsparticles/engine` だけをインストールする — エンジン単体では何も描画しません。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [インストールガイド](/ja/guide/installation)
