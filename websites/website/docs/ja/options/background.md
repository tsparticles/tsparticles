# 背景とキャンバス

このセクションは、キャンバス レイヤと全画面動作を制御します。

## 主なプロパティ

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`: キャンバスの背景色。
- `opacity`: 背景レイヤーのアルファ チャネル。
- `image`: オプションの背景画像。
- `position`、`repeat`、`size`: CSS のような動作。
- `element`: カスタム draw コールバック用のオプションの CSS セレクター、`HTMLCanvasElement` または `OffscreenCanvas`。省略するとパーティクルキャンバスが使用されます。
- `draw`: カスタム背景描画用のオプションのフレームごとのコールバック `(context, delta) => void`。

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: キャンバスをフル ビューポートにします。
- `zIndex`: コンテンツの後ろにパーティクルを配置するのに便利です。

埋め込みプレイグラウンドとインライン ドキュメント プレビューの場合は、次のように設定します。

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

HiDPI 画面でのレンダリングが向上しますが、GPU/CPU の負荷が増加します。

## 実践的なメモ

- ランディング ページの場合は、`fullScreen.enable: true` と `zIndex: -1` を使用します。
- モバイルで速度の低下が見られる場合は、`detectRetina: false` をお試しください。
- 構成が全画面用に設計されている場合は、境界付きセクションに埋め込む前に `fullScreen` を無効にします。
