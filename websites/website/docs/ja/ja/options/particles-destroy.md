# パーティクルの破壊

`particles.destroy` は、パーティクルが破壊されたときに何が起こるかを制御します。

## 例

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## 実践的な指導

- 複雑なスプリット チェーンの前に、単純な `mode` セットアップから始めます。
- 大きな分割数を使用する場合のパフォーマンスを再確認します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
