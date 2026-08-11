# パーティクルリンク

`particles.links` は、近くのパーティクル間に接続線を描画します。

## 例

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: リンクの最大距離。
- `opacity`: 線の視覚的な強さ。
- `color`: 線の色。
- `width`: ストロークの太さ。

## パフォーマンスのヒント

パーティクル数が多いと、リンクのコストが高くなる可能性があります。 `number.value` と `distance` を一緒に調整します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
