# モーション

`motion` は、モーションを減らした動作など、アニメーション レベルの制御が必要な場合に便利です。

## 基本構造

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: モーション関連の動作を停止します。
- `reduce`: 制約のあるデバイスまたは動きの少ないコンテキストでよりソフトなアニメーションを許可します。

## 実践的な指導

- アクセシビリティ/パフォーマンス要件がない限り、これをデフォルトのままにしておきます。
- 動きを抑えた設定とローエンドのデバイスを使用してテストします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
