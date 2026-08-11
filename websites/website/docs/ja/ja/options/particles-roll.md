# パーティクルロール

`particles.roll` はローリング動作を適用し、奥行きのような視覚的な動きを作成できます。

## 例

```ts
particles: {
  roll: {
    enable: true,
    speed: 12,
    darken: {
      enable: true,
      value: 20,
    },
  },
}
```

## 実践的な指導

- 最初は適度な速度で使用してください。
- 読みやすくするために、`tilt` および `rotate` と慎重に組み合わせてください。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Roll.md>
