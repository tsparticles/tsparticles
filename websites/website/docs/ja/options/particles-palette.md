# パーティクルパレット

`particles.palette` は、名前付きパレットをインポートし、パーティクル カラーのデフォルトを適用します。

## 例

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## 何が変わるのか

- パレット構成に基づいて `particles.paint.fill` または `particles.paint.stroke` を設定します。
- パレットに複数のカラー バリエーションがある場合、`particles.paint` はバリエーションの配列としてインポートされます。
- パレット ブレンド モードで `particles.blend` を有効にします。
- カラーセットを再利用するときに構成をコンパクトに保ちます。

## 新しいパレット形式 (カスタム パレット用)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` は次のいずれかになります。

- 単一のバリアント オブジェクト (`{ fill?, stroke? }`)
- バリアント オブジェクトの配列 (各バリアントは `fill`、`stroke`、またはその両方を定義できます)

## 注意事項

- 不明なパレット ID は無視されます。
- 明示的な `particles.paint.fill`、`particles.paint.stroke`、または `particles.blend` 値は、インポートされたデフォルトをオーバーライドします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
