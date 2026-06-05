# Bundle: Confetti

`@tsparticles/confetti` は、1 回の関数呼び出しで紙吹雪エフェクトを作成するための簡略化された API を提供します。`tsParticles` を直接操作する必要はありません。

## 含まれる機能

**形状:** 円、ハート、カード（フランスのスート: ハート、ダイヤ、クラブ、スペード）、絵文字、画像、多角形、四角、星

**内部プラグイン:** エミッター、motion（ユーザーの動作軽減設定を尊重）

**アップデーター:** life、roll、rotate、tilt、wobble

**API:** `confetti(options)` または `confetti(canvasId, options)`

## 使用すべきケース

- 「おめでとう！」や「ハッピーバースデー！」ボタン
- 簡単な祝賀エフェクト
- エンジンを手動で設定したくない

## インストール

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// 基本的なエフェクト
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// 特定のキャンバス上で
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN（script タグ）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### 主要パラメーター

| パラメーター    | 型       | デフォルト   | 説明                                               |
| --------------- | -------- | ------------ | -------------------------------------------------- |
| `particleCount` | number   | 50           | 紙吹雪の数                                         |
| `spread`        | number   | 60           | 拡散角度（度）                                     |
| `angle`         | number   | 90           | 方向（度、90 = 下向き）                            |
| `startVelocity` | number   | 30           | 初速度                                             |
| `colors`        | string[] | —            | 紙吹雪の色                                         |
| `origin`        | { x, y } | { 0.5, 0.5 } | 発生点（0-1）                                      |
| `drift`         | number   | 0            | 水平方向のドリフト                                 |
| `shapes`        | string[] | —            | 形状: "circle"、"heart"、"square"、"star"、"cards" |

## よくある間違い

- `@tsparticles/confetti` が `tsParticles` をエクスポートしていると思う — していません。
- 同じ canvas ID を意図せず再利用する。
- パフォーマンスを管理せずにループ内で `confetti` を呼ぶ — 適切な間隔を設定するか、アニメーション完了時に停止してください。

## 関連ページ

- [バンドル概要](/ja/guide/bundles)
- [Fireworks バンドル](/ja/guide/bundles-fireworks)
