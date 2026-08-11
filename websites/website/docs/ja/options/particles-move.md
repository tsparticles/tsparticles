パーティクルの移動数

`particles.move` は、方向、速度、キャンバス外の動作を定義します。

## 例

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: 移動をオンにします。
- `speed`: 主に知覚される動きの強度。
- `direction`: 固定方向または自由移動。
- `outModes`: キャンバス境界での動作。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
