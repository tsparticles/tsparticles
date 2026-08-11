# プラグイン オプション: エミッター

`emitters` はパーティクルを動的に生成し、プラグイン駆動です。

## 例

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## 注意事項

- バーストエフェクトやダイナミックなパーティクル生成に最適です。
- パフォーマンスのスパイクを避けるために、排出率のバランスを保ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
