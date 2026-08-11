# パーティクルが回転する

`particles.rotate` は、パーティクルごとの回転動作を制御します。

## 例

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`: 時計回りまたは反時計回り。
- `animation.speed`: 角速度。
- `animation.sync`: 共有回転タイミングと独立回転タイミング。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
