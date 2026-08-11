# 全画面表示

`fullScreen` を使用して、キャンバスがビューポート全体を使用するかどうかを制御します。

## 一般的なセットアップ

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: フルビューポートの動作を切り替えます。
- `zIndex`: アプリ コンテンツの背後にパーティクルを保持するのに役立ちます。

## 埋め込みセクション

ドキュメントのプレビュー、カード、プレイグラウンド パネルの場合:

```ts
fullScreen: {
  enable: false,
}
```

これにより、ページ レイアウトや他のキャンバスとの重複が回避されます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
