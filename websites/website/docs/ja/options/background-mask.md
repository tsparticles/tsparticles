# 背景マスク

`backgroundMask` を使用すると、パーティクルがマスクされた背景レイヤーを突き抜けたり、ブレンドしたりできます。

## 例

### 静的カバー (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### 動的ドローコールバック _(4.3.0 以降)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### 外部要素 _(4.3.0 以降)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## プロパティ

| プロパティ  | 型                         | 説明                                                       |
| ----------- | -------------------------- | ---------------------------------------------------------- |
| `enable`    | `boolean`                  | 背景マスキングを有効にします                               |
| `composite` | `GlobalCompositeOperation` | Canvas コンポジット操作（デフォルト: `"destination-out"`） |
| `cover`     | `BackgroundMaskCover`      | カバー設定                                                 |

### `cover` (BackgroundMaskCover)

| プロパティ | 型                                                                                           | 説明                                                                             |
| ---------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `color`    | `string` / `OptionsColor`                                                                    | カバーの色                                                                       |
| `image`    | `string`                                                                                     | カバー画像のURL                                                                  |
| `opacity`  | `number`                                                                                     | アルファレベル（0..1、デフォルト: `1`）                                          |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | 外部要素またはCSSセレクター（各フレーム自動描画）_(4.3.0 以降)_                  |
| `draw`     | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | メインcanvasコンテキストでのカスタム描画コールバック（各フレーム）_(4.3.0 以降)_ |

### レイヤー順序 _(4.3.0 以降)_

1. `clear()` — キャンバスのピクセルクリア
2. `cover.element` 自動描画（設定されている場合）
3. `cover.draw` コールバック（設定されている場合）
4. 静的カバー（色/画像）— フォールバック
5. グローバルコンポジット操作

## いつ使用するか

- スポットライトのような効果。
- コントラストの強いヒーローセクション。
- 暗い背景でのレイヤー化されたインタラクション。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
