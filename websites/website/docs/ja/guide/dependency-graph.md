# 依存関係グラフ

これは、メインの `tsParticles` README で公開されているパッケージ階層化の実用的なマップです。

完全かつ網羅的なグラフについては、以下を参照してください。

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## 高レベルのパッケージ フロー

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## このマップの使用方法

- ほとんどの実稼働アプリでは、`engine` + `slim` から開始します。
- 追加の組み込みインタラクション/プラグインが必要な場合は、`tsparticles` に移動してください。
- 完全な機能セットが必要な場合にのみ、`all` に移動してください。
- 焦点を絞ったエフェクトには専用のバンドル (`confetti`、`fireworks`、`particles`) を使用します。

## 関連ページ

- [`/guide/getting-started`](/ja/guide/getting-started)
- [`/guide/installation`](/ja/guide/installation)
- [`/options/performance`](/ja/options/performance)
