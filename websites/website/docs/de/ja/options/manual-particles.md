# 手動パーティクル

`manualParticles` は、固定位置に明示的なパーティクルを追加します。

## 例

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## いつ使用するか

- アンカー付き視覚マーカー。
- 固定パーティクルと動的パーティクルを混合したハイブリッド エフェクト。
- デモまたはチュートリアルでの初期状態の制御。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
