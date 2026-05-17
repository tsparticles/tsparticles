# v3.x から移行

`v3.x` からの移行では、**オプション互換**と**パッケージ変更**が主なリスクです。

## 優先して確認する変更

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## パッケージの名称変更

一部の `v3.x` パッケージは名称変更または再構成されました：

| v3 パッケージ                       | 現在のパッケージ                | 備考                                     |
| ----------------------------------- | ------------------------------- | ---------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | 1つのプラグインに統合                    |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | 1つのプラグインに統合                    |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | paint システムに置き換え                 |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | paint システムに置き換え                 |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | `plugins/colors/hsv/` に移動、名前は同じ |

## オプション対応例

Before（`v3.x` スタイル）:

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

After（現在）:

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Load API 移行

Before（レガシー位置引数）:

```ts
await tsParticles.load("tsparticles", options);
```

After（オブジェクト引数）:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## 推奨手順

1. すべての `@tsparticles/*` パッケージを最新バージョンに揃える。
2. 非推奨のオプションキー（`particles.color`、`particles.stroke`）を `particles.paint.*` に置き換える。
3. 名称変更されたパッケージを `package.json` で更新する（上の表を参照）。
4. カスタムプラグイン/シェイプが `tsParticles.load(...)` の前に読み込まれていることを確認する。
5. インタラクションとパフォーマンス重視のシーンを再テストする。

## リソース

- 改名マトリクス: [`/migrations/option-rename-matrix`](/ja/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/ja/options/particles-paint)
