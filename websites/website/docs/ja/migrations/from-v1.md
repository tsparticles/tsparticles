# v1.x からの移行

`v1.x` から現在のバージョンへ移行するには、通常、依存関係の完全な更新と設定の検証が必要です。

実務上よくある障害は次のとおりです。

1. 古いパッケージやインポートのパターン。
2. `tsParticles.load(...)` の呼び出し形式。
3. モダンなスキーマで更新されたオプションキー。

## Load API の移行

モダンな `load` は単一のパラメータオブジェクトを受け取ります。

以前（レガシーな位置引数スタイル）:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

以後:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

JSON から読み込む場合:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## 主なオプションの移行

まず設定内で次のキーを検索してください。

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

書き換え例:

```ts
// 以前
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// 以後
particles: {
  paint: {
    fill: { value: ["#ff6b6b", "#4ecdc4"] },
    stroke: { width: 0 }
  }
}
```

## 推奨手順

1. 古いパッケージ名を現在の `@tsparticles/*` パッケージに置き換えます。
2. `@tsparticles/engine` + `@tsparticles/slim` から始め、必要なプラグインを追加します。
3. 古い `load` 呼び出しをオブジェクトベースの `load({ ... })` に変換します。
4. 現在のドキュメントでオプションキーを検証し、名前変更・削除されたフィールドを修正します。
5. デスクトップとモバイルで見た目とパフォーマンスを確認します。

## チェックリスト

- 古いパッケージ構造の不要なインポートを削除します。
- インタラクション、リンク、カスタムシェイプが期待どおり動作することを確認します。
- `particles.js` スタイルの設定では互換レイヤーを検討してください。

## 便利なオプション資料

- 改名マトリクス: [`/migrations/option-rename-matrix`](/ja/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ja/options/particles-paint)
- `particles.color` の移行メモ: [`/options/particles-color`](/ja/options/particles-color)
- `particles.stroke` の移行メモ: [`/options/particles-stroke`](/ja/options/particles-stroke)

## 参考リンク

- レガシー互換性と particles.js ブリッジ: [`/migrations/particles-js`](/ja/migrations/particles-js)
- インストールマトリクス: [`/guide/installation`](/ja/guide/installation)
- リポジトリのリリース: <https://github.com/tsparticles/tsparticles/releases>
