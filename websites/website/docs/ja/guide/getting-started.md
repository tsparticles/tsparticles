# はじめに

このパスは、2026 年の `tsParticles` に対する最も迅速で信頼性の高いセットアップです。

## 簡単なチェックリスト

1. `@tsparticles/engine` をインストールします。
2. ランタイム パスを 1 つ選択します (`@tsparticles/slim`、`@tsparticles/all`、`@tsparticles/particles` などの重点 API、またはカスタム パッケージのみ)。
3. バンドルを一度ロードします。
4. 手動オプション、構成オブジェクト、またはプリセットから始めます。

## 1) エンジン + バンドル プリセットをインストールする

デフォルトのサイズと機能のバランスを適切にするには、`@tsparticles/engine` と `@tsparticles/slim` を使用します。

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

CDN リンク、`npm`/`yarn` バリアント、または `require(...)` サンプルが必要ですか?

- [`/guide/installation`](/ja/guide/installation) を参照してください。

## 2) HTMLでコンテナを作成する

```html
<div id="tsparticles"></div>
```

## 3) tsParticles を初期化します

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) 適切なバンドルを選択する

- `@tsparticles/slim`: ほとんどのアプリはここから開始する必要があります。
- `@tsparticles/basic`: 非常に軽いセットアップ向けの小さな機能セット。
- `@tsparticles/all`: すべてが含まれており、迅速なプロトタイピングが容易です。

直接の `tsParticles` セットアップではなく、集中的な API が必要な場合:

- `@tsparticles/particles`: 簡素化されたパーティクル バックグラウンド API
- `@tsparticles/confetti`: 1 回の呼び出しで使える紙吹雪 API
- `@tsparticles/fireworks`: 1 回の呼び出しで使える花火 API

## 5) 速度が必要な場合はプリセット/構成を使用します

事前に構築されたエフェクトを希望する場合:

```bash
pnpm add @tsparticles/configs
```

次に、[`demo/vite` アプリ](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts) のように、キーによって 1 つの構成を読み込みます。

プリセット名ベースのセットアップを希望する場合は、[`/demos/presets`](/ja/demos/presets) の公式プリセット カタログを使用してください。

## クイックドキュメントマップ

- ルートオプション: [`/options/`](/ja/options/)
- ラッパーリファレンス: [`/guide/wrappers`](/ja/guide/wrappers)
- プリセットカタログ: [`/demos/presets`](/ja/demos/presets)
- パレット カタログ: [`/demos/palettes`](/ja/demos/palettes)
- シェイプ カタログ: [`/demos/shapes`](/ja/demos/shapes)
- particles.js からの移行: [`/migrations/particles-js`](/ja/migrations/particles-js)
- カラー形式: [`/guide/color-formats`](/ja/guide/color-formats)
- コンテナのライフサイクル: [`/guide/container-lifecycle`](/ja/guide/container-lifecycle)
- プラグインとカスタマイズ: [`/guide/plugins-customization`](/ja/guide/plugins-customization)

## トラブルシューティング

- 空白の画面: `tsParticles.load` を呼び出す前に、`#tsparticles` が存在することを確認してください。
- 不足している機能: 別のプラグイン/パッケージ (形状、インタラクション、アップデーター) が必要になる可能性があります。
- オプションの入力エラー: パッケージを同じメジャー/マイナー バージョンに合わせてください。
