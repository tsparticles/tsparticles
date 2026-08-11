# 粒子の軌道

`particles.orbit` はパーティクルを軌道中心の周りで回転させます。

## 例

```ts
particles: {
  orbit: {
    enable: true,
    radius: 30,
    rotation: {
      value: 45,
    },
  },
}
```

- `enable`: 軌道動作をアクティブ化します。
- `radius`: 軌道距離。
- `rotation`: 軌道角度制御。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Orbit.md>
