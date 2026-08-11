# 粒子の反発

`particles.repulse` は、粒子間の相互作用における反発動作を制御します。

## 例

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## 実践的な指導

- 突然の動きのジャンプを避けるために適度な距離を保ちます。
- `interactivity.modes.repulse` が両方ともアクティブな場合は、一緒に調整します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
