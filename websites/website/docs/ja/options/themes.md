# テーマ

`themes` を使用すると、名前付きオプション セット (ライトとダークなど) を定義し、実行時に切り替えることができます。

## 例

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## 実践的な指導

- 安定した基本オプション オブジェクトを維持します。
- テーマごとに異なるもののみをオーバーライドします。
- アプリレベルのダークモード状態とペアリングします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
