# 背景とキャンバス

このセクションは、キャンバス レイヤと全画面動作を制御します。

## レイヤー順序（後ろから前へ）

1. **CSS背景** (`color`, `image`, `position`, `repeat`, `size`) — DOMキャンバススタイルとして適用
2. **`clear()`** — 毎フレームのキャンバスピクセルクリア
3. **`background.element` 自動描画** — 設定されている場合、`ctx.drawImage(element, ...)` で外部要素を合成
4. **`background.draw` コールバック** — 設定されている場合、メイン描画コンテキスト + delta で呼び出し
5. **パーティクル** — 上に描画

`element` と `draw` は **独立したレイヤー** です。両方ともオプションで、一緒にも別々にも使用できます。

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

| キー       | 型                                                                                           | 説明                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `color`    | `string` / `object`                                                                          | キャンバスの背景色。                                                                 |
| `opacity`  | `number`                                                                                     | 背景色のアルファチャネル、`0` から `1`。                                             |
| `image`    | `string`                                                                                     | CSS `background-image` 値（例 `url('...')`）。                                       |
| `position` | `string`                                                                                     | CSS `background-position` 値。                                                       |
| `repeat`   | `string`                                                                                     | CSS `background-repeat` 値。                                                         |
| `size`     | `string`                                                                                     | CSS `background-size` 値。                                                           |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | 毎フレーム `drawImage` で自動描画される外部要素。エンジン管理外。                    |
| `draw`     | `(context, delta) => void`                                                                   | メインキャンバスコンテキストでのカスタム背景描画のためのフレームごとのコールバック。 |

### `element`

`element` が設定されている場合、要素の現在のビジュアルコンテンツが毎フレーム `ctx.drawImage()` でメインキャンバスに描画されます。要素は **エンジンによって管理されません** — 外部コードがそのレンダリングを処理します。

サポートされている要素タイプ：

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement`（現在のフレームを描画）
- `HTMLImageElement`
- DOM内で上記のいずれかにマッチするCSSセレクター文字列

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// 外部<video>要素を背景として自動描画
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

カスタム背景レンダリングのためのフレームごとのコールバック。常に**メインキャンバスコンテキスト**（`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`）を受け取り、要素のコンテキストは受け取りません。

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

（TypeScriptは関数参照を使用し、文字列は使用しません。）

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### 要素 + Draw の組み合わせ

両方のレイヤーが毎フレーム独立して実行されます。要素が最初に描画され、次にdrawコールバックが実行されます：

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: キャンバスをフル ビューポートにします。
- `zIndex`: コンテンツの後ろにパーティクルを配置するのに便利です。

埋め込みプレイグラウンドとインライン ドキュメント プレビューの場合は、次のように設定します：

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
