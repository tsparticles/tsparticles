# はじめに

tsParticles は、パーティクルアニメーション、紙吹雪、花火などを生成するための JavaScript/TypeScript ライブラリです。最新のブラウザで動作し、npm パッケージとしても CDN の `<script>` タグでも利用できます。

## Quick start

CLI を使用するのが最も簡単な方法です：

```bash
npm create tsparticles@latest
```

インタラクティブなプロンプトに従ってテンプレートとフレームワークを選択してください。
カレントディレクトリに tsParticles が事前設定された新しいプロジェクトが作成されます。

---

## アーキテクチャ: engine + bundle

`@tsparticles/engine` 単体では**何も表示されません**。コアエンジン（アニメーションループ、キャンバス、イベント管理）のみを含み、**形状、インタラクション、視覚効果は含まれません**。何かを表示するには、少なくとも**バンドル**または個別の**プラグイン**を読み込む必要があります。

| 概念                                                                               | 役割                                                                                   |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                              | コアエンジン。`tsParticles`、型、オプションをエクスポート。単体では何も描画しません。  |
| バンドル（`@tsparticles/basic`、`@tsparticles/slim` など）                         | エンジンに形状、インタラクション、アップデーターを登録する、事前構成済みのパッケージ。 |
| 個別プラグイン（`@tsparticles/shape-circle`、`@tsparticles/updater-opacity` など） | カスタムバンドル用に組み合わせられる単一パッケージ。                                   |

## パスの選択

### パス A — npm/pnpm/yarn（モダンプロジェクト、バンドラー使用）

エンジン + バンドルをインストール:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

コード内で:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. slim バンドルの全機能をエンジンに登録
  await loadSlim(tsParticles);

  // 2. アニメーションを作成
  await tsParticles.load({
    id: "tsparticles", // HTML コンテナ ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
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
    },
  });
})();
```

HTML コンテナ:

```html
<div id="tsparticles"></div>
```

### パス B — CDN `<script>` タグ（バンドラーなし、vanilla HTML）

最初にエンジン、次にバンドルを読み込みます。CDN ファイルはすべてを `window` に公開するため、`import` は不要です。

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Slim bundle（loadSlim をグローバルに公開） -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim は CDN バンドルからグローバルに利用可能
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **注意**: CDN バンドルでも、`tsParticles.load()` の前に `loadSlim(tsParticles)`（または `loadBasic` / `loadFull` / `loadAll`）を呼び出す必要があります。CDN バンドルはローダー関数をグローバルに公開しますが、自動実行はしません。

`@tsparticles/basic` → `loadBasic`、`tsparticles` → `loadFull`、`@tsparticles/all` → `loadAll` も同様のパターンです。

### パス C — 専用 API を持つ特化バンドル（confetti、fireworks、particles）

一部のバンドルは独自の簡略化 API を持ち、`tsParticles.load()` を使用する必要はありません:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

`fireworks()`、`particles()`、`ribbons()` も同様です。

## どのバンドルを選ぶべきか

| バンドル                 | npm                      | 使用すべきケース                                                                                                           |
| ------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | 最小構成: 円、移動、不透明度、サイズ。インタラクションなし。                                                               |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **ほとんどのプロジェクトに推奨。** クリック/ホバー操作、リンク、画像、星、多角形を追加。                                   |
| `tsparticles`            | `loadFull(tsParticles)`  | 公式機能をフルセット: エミッター、アブソーバー、テキスト形状、ロール、ウィブル、トレイル。                                 |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **リポジトリのすべて:** あらゆる形状、インタラクション、エフェクト、イージング、パス、エクスポート。プロトタイピング専用。 |
| `@tsparticles/confetti`  | `confetti(options)`      | 1 関数呼び出しで紙吹雪。専用 API。                                                                                         |
| `@tsparticles/fireworks` | `fireworks(options)`     | 1 関数呼び出しで花火。専用 API。                                                                                           |
| `@tsparticles/particles` | `particles(options)`     | 簡略化されたパーティクル背景。専用 API。                                                                                   |
| `@tsparticles/ribbons`   | `ribbons(options)`       | リボンエフェクト。専用 API。                                                                                               |

詳細: [`/ja/guide/bundles`](/ja/guide/bundles)。

## プリセットの使用

`@tsparticles/configs` パッケージには、数十種類の既成設定（アブソーバー、バブル、雪、星、重力、衝突など）が含まれています。

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

CDN の場合:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## クイックリファレンス

- オプションのドキュメント: [`/ja/options/`](/ja/options/)
- バンドルガイド: [`/ja/guide/bundles`](/ja/guide/bundles)
- プリセットカタログ: [`/ja/demos/presets`](/ja/demos/presets)
- パレットカタログ: [`/ja/demos/palettes`](/ja/demos/palettes)
- 形状カタログ: [`/ja/demos/shapes`](/ja/demos/shapes)
- フレームワークラッパー: [`/ja/guide/wrappers`](/ja/guide/wrappers)
- カラー形式: [`/ja/guide/color-formats`](/ja/guide/color-formats)
- コンテナライフサイクル: [`/ja/guide/container-lifecycle`](/ja/guide/container-lifecycle)
- プラグインとカスタマイズ: [`/ja/guide/plugins-customization`](/ja/guide/plugins-customization)

## トラブルシューティング

| 問題                                                   | 原因                                                                 | 解決策                                                                                                         |
| ------------------------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 画面が真っ白、パーティクルなし                         | `tsParticles.load()` 呼び出し時に `#tsparticles` が DOM に存在しない | DIV がスクリプトの前に存在することを確認するか、`DOMContentLoaded` を使用                                      |
| 画面が真っ白、パーティクルなし                         | `@tsparticles/engine` のみインストールしている                       | バンドル（`@tsparticles/slim`）またはプラグインもインストールする — エンジン単体では描画する形状がない         |
| "loadBasic/loadSlim/loadFull is not a function" エラー | バンドルがインストールされていない、またはインポートが間違っている   | `pnpm add @tsparticles/slim` して `{ loadSlim }` をインポート                                                  |
| パーティクルが動かない                                 | `move.enable` が `true` になっていない                               | `move: { enable: true, speed: 2 }` を追加                                                                      |
| 機能（リンク、衝突など）がない                         | 選択したバンドルに含まれていない                                     | よりリッチなバンドル（`@tsparticles/slim` または `tsparticles`）に切り替えるか、特定のプラグインをインストール |
| TypeScript の型エラー                                  | パッケージバージョンの不一致                                         | エンジンとバンドルを同じメジャー/マイナーバージョンに揃える                                                    |
