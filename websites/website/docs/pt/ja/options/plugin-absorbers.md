# プラグイン オプション: アブソーバー

`absorbers` はプラグイン オプションであり、バンドル/セットアップでアブソーバー機能が利用可能である必要があります。

## 例

```ts
absorbers: {
  position: {
    x: 50,
    y: 50,
  },
  size: {
    value: 20,
  },
}
```

## 注意事項

- アブソーバー オプションを使用する前に、プラグインの可用性を検証します。
- 1 つのアブソーバー インスタンスから始めて、徐々にスケールします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Absorbers.md>
