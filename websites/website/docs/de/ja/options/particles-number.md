# 粒子数

`particles.number` は、アクティブなパーティクルの数を制御します。

## 例

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: パーティクルの基本量。
- `density.enable`: カウントをキャンバス サイズに適応させます。
- `density.area`: スケーリングに使用される参照領域。

## パフォーマンスのヒント

FPS が低下した場合は、最初に `value` を下げます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
