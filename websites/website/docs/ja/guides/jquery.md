# jQuery インテグレーション

公式の jQuery プラグラインラッパーを使用して、tsParticles を jQuery ベースのプロジェクトに統合します。

## インストール

### CDN 経由

スクリプトタグを使用して、jQuery、tsParticles、および jQuery プラグインをインクルードします:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### npm + ビルド経由

必要なパッケージをインストールします:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

プロジェクトにインポートします:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## エンジンの初期化

パーティクルをレンダリングする前に、tsParticles エンジンに必要な機能を初期化する必要があります。これは `$.particles.init` を介して行われます:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **なぜこれが必要なのですか？** tsParticles はモジュラーアーキテクチャを採用しています。`loadFull` はすべての組み込みシェイプ、インタラクション、アップデーターを登録します。より小さなバンドル（例: `tsparticles-slim`）をインポートして、バンドルサイズを削減できます。

## 基本的な使い方

エンジンが初期化され、DOM の準備ができたら、コンテナ要素を選択して `.particles().load()` を呼び出します:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

コンテナ要素は DOM に存在する必要があります:

```html
<div id="tsparticles"></div>
```

## カスタム設定

`.load()` メソッドは完全な `ISourceOptions` オブジェクトを受け入れます。以下は包括的な例です:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## プリセットのロード

プリセットパッケージ（例: `tsparticles-preset-stars`）をインストールした場合、エンジン初期化時にロードして設定内で参照します:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## イベント処理とコンテナ制御

`.particles()` は jQuery プラグインインスタンスを返します。基礎となる tsParticles の `Container` にアクセスして `play()`、`pause()`、`destroy()` などのメソッドを呼び出すには:

```javascript
const $container = $("#tsparticles");

// パーティクルをロード
$container.particles().load({
  /* options */
});

// 数秒後に再生/一時停止
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## 完全な例

以下は、CDN 経由で tsParticles をロードし、インタラクティブエフェクト付きのパーティクルシーンをレンダリングする、完全な自己完結型 HTML ページです:

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
            fpsLimit: 60,
            particles: {
              number: { value: 100 },
              color: { value: "#ffffff" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: "out",
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 200, links: { opacity: 0.5 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```

## API リファレンス

| メソッド                            | 説明                                                       |
| ---------------------------------- | -------------------------------------------------------- |
| `$.particles.init(fn)`             | ローダーコールバックでエンジンを初期化します                    |
| `$(el).particles()`                | 要素上にパーティクルプラグインインスタンスを作成します            |
| `$(el).particles().load(opts)`     | パーティクル設定をロードして開始します                        |
| `$(el).particles().destroy()`      | パーティクルインスタンスを破棄してクリーンアップします           |
| `$(el).particles().getContainer()` | 命令的な制御のための基礎となる `Container` を返します          |
