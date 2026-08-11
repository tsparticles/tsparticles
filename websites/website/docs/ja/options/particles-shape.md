# 粒子の形状

`particles.shape` は、パーティクルの描画方法を定義します。

## 例

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: 1 つの図形または図形のリスト。
- 共通値: `circle`、`square`、`triangle`、`polygon`、`image`、`emoji`、`text`。

## オプションあり

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
