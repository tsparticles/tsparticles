---
title: Vanilla JS ガイド
description: tsParticles をプレーンな JavaScript と統合するための完全ガイド。
---

# Vanilla JS ガイド

## 目次

1. [はじめに](#getting-started)
2. [基本のパーティクル](#basic-particles)
3. [紙吹雪エフェクト](#confetti-effect)
4. [花火エフェクト](#fireworks-effect)
5. [リボンエフェクト](#ribbons-effect)
6. [雪エフェクト](#snow-effect)
7. [ネットワーク / リンクエフェクト](#network-links-effect)
8. [星エフェクト](#stars-effect)
9. [カスタム設定](#custom-configuration)
10. [複数コンテナ](#multiple-containers)
11. [動的コントロール](#dynamic-controls)

---

## はじめに

### CDN（クイックスタート）

HTML に `<div>` プレースホルダーと script タグを追加します。最低でもエンジンとバンドルが必要で、`tsParticles.load()` の前にローダーを呼び出す必要があります。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles – はじめに</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            /* ... */
          },
        });
      })();
    </script>
  </body>
</html>
```

### npm

```bash
npm install @tsparticles/engine @tsparticles/slim
```

次にインポートして使用します:

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* ... */
    },
  });
})();
```

> **注意:** `@tsparticles/engine` だけでは何も描画されません。バンドル（`@tsparticles/slim` 推奨）または個別のプラグインをインストールして、表示可能なシェイプを取得する必要があります。

---

## 基本のパーティクル

円形のシェイプ、ランダムな色、穏やかな動きで 100 個のパーティクルを描画する最小限の設定です。v4 では、パーティクルの色は以前の `color` プロパティではなく `paint` を使用して設定します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>基本のパーティクル</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 120,
            particles: {
              number: { value: 100 },
              paint: [
                {
                  fill: { color: { value: "#ff0000" }, enable: true },
                },
                {
                  fill: { color: { value: "#00ff00" }, enable: true },
                },
                {
                  fill: { color: { value: "#0000ff" }, enable: true },
                },
                {
                  fill: { color: { value: "#ffff00" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff00ff" }, enable: true },
                },
              ],
              shape: { type: "circle" },
              opacity: {
                value: { min: 0.3, max: 0.8 },
              },
              size: {
                value: { min: 2, max: 6 },
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" },
              },
            },
            background: { color: "#1a1a2e" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## 紙吹雪エフェクト

専用の `@tsparticles/confetti` バンドルを使用して、単一の関数呼び出しでお祝いの紙吹雪を表示します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>紙吹雪</title>
    <style>
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <canvas id="confetti"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
    <script>
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    </script>
  </body>
</html>
```

---

## 花火エフェクト

専用の `@tsparticles/fireworks` バンドルを使用した、効果音付きの花火ショーです。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>花火</title>
    <style>
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
    <script>
      fireworks({
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        sounds: true,
      });
    </script>
  </body>
</html>
```

---

## リボンエフェクト

専用の `@tsparticles/ribbons` バンドルを使用して、マウスの位置に反応する流れるようなリボンアニメーションを表示します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>リボン</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        background: #000;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js"></script>
    <script>
      ribbons({
        ribbonOptions: {
          count: 30,
          angle: 45,
          oscillationSpeed: 3,
          oscillationDistance: 40,
          particleDist: 8,
        },
      });
    </script>
  </body>
</html>
```

---

## 雪エフェクト

`@tsparticles/configs` プリセットカタログを使用した、優しく降り注ぐ雪の結晶です。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>雪エフェクト</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        background: #1a1a2e;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            preset: "snow",
          },
        });
      })();
    </script>
  </body>
</html>
```

または、スタンドアロンのプリセットパッケージを使用する方法:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-snow@4/tsparticles.preset.snow.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await loadSnowPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: { preset: "snow" },
    });
  })();
</script>
```

---

## ネットワーク / リンクエフェクト

マウスインタラクション付きの、古典的な連結ノードのビジュアルです。`@tsparticles/slim` バンドルにはリンクインタラクションとマウスグラブモードが含まれています。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ネットワーク / リンク</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 60,
            particles: {
              number: { value: 80, density: { enable: true } },
              paint: {
                color: "#00d4ff",
              },
              shape: { type: "circle" },
              opacity: { value: 0.6 },
              size: { value: { min: 1, max: 4 } },
              links: {
                enable: true,
                distance: 150,
                color: "#00d4ff",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                outModes: { default: "bounce" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 180, links: { opacity: 0.8 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d1117" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## 星エフェクト

`@tsparticles/configs` プリセットカタログを使用した星空の夜空です。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>星エフェクト</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            preset: "star",
          },
        });
      })();
    </script>
  </body>
</html>
```

または、スタンドアロンのプリセットパッケージを使用する方法:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-stars@4/tsparticles.preset.stars.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    await loadStarsPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: { preset: "stars" },
    });
  })();
</script>
```

---

## カスタム設定

slim バンドルを使用して、グラデーション背景、インタラクティブなホバーエフェクト、複数のシェイプタイプを備えた設定をゼロから構築します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>カスタム設定</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        font-family: sans-serif;
      }
      h1 {
        position: relative;
        z-index: 1;
        color: #fff;
        text-align: center;
        padding-top: 2rem;
      }
    </style>
  </head>
  <body>
    <h1>カスタム設定</h1>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fullScreen: { enable: true, zIndex: 0 },
            fpsLimit: 60,
            particles: {
              number: { value: 60, density: { enable: true, width: 800, height: 800 } },
              paint: [
                {
                  fill: { color: { value: "#ff6b6b" }, enable: true },
                },
                {
                  fill: { color: { value: "#feca57" }, enable: true },
                },
                {
                  fill: { color: { value: "#48dbfb" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff9ff3" }, enable: true },
                },
                {
                  fill: { color: { value: "#54a0ff" }, enable: true },
                },
              ],
              shape: {
                type: ["circle", "triangle", "polygon"],
                options: {
                  polygon: { sides: 6 },
                },
              },
              opacity: { value: { min: 0.4, max: 0.8 } },
              size: { value: { min: 3, max: 8 } },
              links: {
                enable: true,
                distance: 200,
                color: "#ffffff",
                opacity: 0.15,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
                attract: { enable: false },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "attract" },
                onClick: { enable: true, mode: "repulse" },
              },
              modes: {
                attract: { distance: 200, duration: 0.4, factor: 1 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            background: {
              color: "#0f0f23",
              opacity: 1,
            },
            themes: [
              {
                name: "light",
                default: { value: false },
                options: {
                  background: { color: "#f0f0f5" },
                  particles: {
                    paint: [
                      {
                        fill: { color: { value: "#e74c3c" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#2ecc71" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#3498db" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#f1c40f" }, enable: true },
                      },
                    ],
                    links: { color: "#333333", opacity: 0.2 },
                    opacity: { value: { min: 0.5, max: 0.9 } },
                  },
                },
              },
            ],
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## 複数コンテナ

同じページ上で複数の独立したパーティクルインスタンスを、それぞれ独自の設定で実行します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>複数コンテナ</title>
    <style>
      .particle-box {
        width: 45%;
        height: 300px;
        float: left;
        margin: 1%;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
      }
      body {
        margin: 0;
        background: #1a1a2e;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="particle-box" id="box1"></div>
    <div class="particle-box" id="box2"></div>
    <div class="particle-box" id="box3"></div>
    <div class="particle-box" id="box4"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        // コンテナ 1 – 円形、低速移動
        await tsParticles.load({
          id: "box1",
          options: {
            particles: {
              number: { value: 40 },
              paint: {
                color: "#ff6b6b",
              },
              shape: { type: "circle" },
              opacity: { value: 0.7 },
              size: { value: { min: 2, max: 5 } },
              move: { enable: true, speed: 1, outModes: { default: "bounce" } },
            },
            background: { color: "#2d2d44" },
          },
        });

        // コンテナ 2 – 三角形、リンク付き
        await tsParticles.load({
          id: "box2",
          options: {
            particles: {
              number: { value: 30 },
              paint: {
                color: "#48dbfb",
              },
              shape: { type: "triangle" },
              opacity: { value: 0.6 },
              size: { value: { min: 3, max: 7 } },
              links: { enable: true, distance: 120, color: "#48dbfb", opacity: 0.3 },
              move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
            },
            background: { color: "#1a1a2e" },
          },
        });

        // コンテナ 3 – 紙吹雪のようなバースト
        await tsParticles.load({
          id: "box3",
          options: {
            particles: {
              number: { value: 50 },
              paint: [
                {
                  fill: { color: { value: "#feca57" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff9ff3" }, enable: true },
                },
                {
                  fill: { color: { value: "#54a0ff" }, enable: true },
                },
                {
                  fill: { color: { value: "#5f27cd" }, enable: true },
                },
              ],
              shape: { type: ["circle", "square"] },
              opacity: { value: 0.8 },
              size: { value: { min: 2, max: 6 } },
              move: {
                enable: true,
                speed: 3,
                direction: "top",
                outModes: { default: "destroy" },
              },
            },
            background: { color: "#222f3e" },
          },
        });

        // コンテナ 4 – ゆっくり浮かぶ星
        await tsParticles.load({
          id: "box4",
          options: {
            particles: {
              number: { value: 20 },
              paint: {
                color: "#ffffff",
              },
              shape: { type: "star" },
              opacity: { value: { min: 0.2, max: 0.8 } },
              size: { value: { min: 1, max: 4 } },
              move: { enable: true, speed: 0.4, direction: "none", outModes: { default: "bounce" } },
            },
            background: { color: "#0d1117" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## 動的コントロール

プログラムによる開始、停止、一時停止、およびテーマの切り替えを実行時に実行します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動的コントロール</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      .controls {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .controls button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        background: #222;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.2s;
      }
      .controls button:hover {
        background: #444;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>
    <div class="controls">
      <button id="play-btn">▶ 再生</button>
      <button id="pause-btn">⏸ 一時停止</button>
      <button id="stop-btn">⏹ 停止</button>
      <button id="theme-dark-btn">🌙 ダークテーマ</button>
      <button id="theme-light-btn">☀️ ライトテーマ</button>
      <button id="restart-btn">🔄 再起動</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        const container = await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 60,
            particles: {
              number: { value: 80 },
              paint: {
                color: "#00d4ff",
              },
              shape: { type: "circle" },
              opacity: { value: 0.6 },
              size: { value: { min: 2, max: 5 } },
              links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
              move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
            },
            background: { color: "#0d1117" },
            themes: [
              {
                name: "light",
                default: { value: false },
                options: {
                  background: { color: "#f5f5f5" },
                  particles: {
                    paint: {
                      color: "#e74c3c",
                    },
                    links: { color: "#333333" },
                  },
                },
              },
            ],
          },
        });

        document.getElementById("play-btn").addEventListener("click", () => container.play());
        document.getElementById("pause-btn").addEventListener("click", () => container.pause());
        document.getElementById("stop-btn").addEventListener("click", () => container.stop());
        document.getElementById("restart-btn").addEventListener("click", async () => {
          await container.destroy();
          tsParticles.load({ id: "tsparticles", options: container.options });
        });
        document.getElementById("theme-dark-btn").addEventListener("click", () => {
          container.loadTheme("default");
        });
        document.getElementById("theme-light-btn").addEventListener("click", () => {
          container.loadTheme("light");
        });
      })();
    </script>
  </body>
</html>
```

---

以上で、tsParticles v4 のすべての主要な Vanilla JS 統合パターンを網羅しました。各サンプルはスタンドアロンの HTML ファイルとして、ブラウザで開けば tsParticles の動作を確認できます。
