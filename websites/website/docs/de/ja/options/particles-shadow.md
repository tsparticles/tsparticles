# パーティクルシャドウ

`particles.shadow` はパーティクルの周囲に影を追加します。

## 例

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## 実践的な指導

- シャドウは奥行きを向上させますが、密度の高いシーンではコストがかかる可能性があります。
- 最初に低ブラーを使用し、モバイルでベンチマークを実行します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
