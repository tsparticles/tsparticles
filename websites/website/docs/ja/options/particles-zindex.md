# パーティクル ZIndex

`particles.zIndex` は、描画レイヤーとオプションの Z インデックス アニメーションを制御します。

## 例

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## 実践的な指導

- Z インデックスの変化を使用して、奥行き感を作り出します。
- 視覚的な一貫性を保つために範囲を適度に保ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
