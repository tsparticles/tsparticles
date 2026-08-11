パーティクルの衝突数

`particles.collisions` は、パーティクル間の衝突動作を制御します。

## 例

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: 衝突を有効にします。
- `mode`: 衝突動作 (`bounce` が最も一般的)。

## パフォーマンスのヒント

パーティクル数が多い場合、衝突のコストが高くなる可能性があります。最初に `particles.number` を使用して調整します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
