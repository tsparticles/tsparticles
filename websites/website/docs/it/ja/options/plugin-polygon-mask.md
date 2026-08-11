# プラグインオプション: ポリゴンマスク

`polygonMask` は、パーティクルを SVG またはポリゴンベースの領域に制限します。

## 例

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## 注意事項

- 実行時のパフォーマンスを向上させるために、最適化された SVG パスを使用します。
- パスの読み込みとフォールバックの動作を検証します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
