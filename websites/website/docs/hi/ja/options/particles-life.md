# 粒子の寿命

`particles.life` は、パーティクルごとのライフサイクル数と継続時間を制御します。

## 例

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`: 各パーティクルのライフサイクル数。
- `duration`: 各サイクルの持続時間。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
