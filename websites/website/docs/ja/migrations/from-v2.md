# v2.x からの移行

`v2.x` から現在のバージョンへの移行では、通常 2 つの主要な破壊的変更があります。

1. `tsParticles.load(...)` のシグネチャ移行。
2. オプションキーの移行（特に color と stroke）。

## Load API の移行（重要）

モダンなバージョンでは `load` は **単一のパラメータオブジェクト** を受け取ります。

以前（`v2.x` の位置引数スタイル）:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

以後（単一オブジェクト）:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

同じオブジェクトで `element`、`url`、`index` を渡すこともできます。

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## 主なオプションの移行

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

以前:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

以後:

```ts
particles: {
  paint: {
    fill: { value: "#00ffcc" },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## 推奨手順

1. すべての `@tsparticles/*` パッケージをまとめて更新します。
2. ラッパー（React/Vue/Angular など）のバージョンが同じメジャーラインにあることを確認します。
3. すべての `tsParticles.load(id, options)` 呼び出しをオブジェクトパラメータに変換します。
4. 既知のキー（`color`、`stroke`）を `paint.fill`/`paint.stroke` に移行します。
5. 最も複雑な設定で視覚的リグレッションを実行します。

## チェックリスト

- lockfile に混在したメジャーバージョンがないことを確認します。
- 選択したバンドル（`basic`、`slim`、`all`）が有効な機能と一致していることを確認します。
- canvas のライフサイクルフック（`loaded`、`particlesLoaded`、クリーンアップ経路）を再テストします。

## 便利なオプション資料

- 改名マトリクス: [`/migrations/option-rename-matrix`](/ja/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ja/options/particles-paint)
- `particles.color` の移行メモ: [`/options/particles-color`](/ja/options/particles-color)
- `particles.stroke` の移行メモ: [`/options/particles-stroke`](/ja/options/particles-stroke)

## 参考リンク

- バージョン整合のルール: [`/migrations/releases`](/ja/migrations/releases)
- リポジトリのリリース: <https://github.com/tsparticles/tsparticles/releases>
