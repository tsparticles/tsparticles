---
title: Riot ガイド
description: tsParticles を Riot.js コンポーネントと統合するための完全ガイド。
---

# Riot ガイド

## 目次

1. [インストール](#installation)
2. [エンジンの初期化](#engine-initialization)
3. [基本的な使い方](#basic-usage)
4. [条件付きレンダリング](#conditional-rendering)
5. [プリセットの使用](#preset-usage)
6. [カスタム設定](#custom-configuration)
7. [完全なコンポーネント](#full-component)

---

## インストール

npm を使用して Riot ラッパーと tsParticles エンジンをインストールします:

```bash
npm install @tsparticles/riot tsparticles
```

オプションで、クイックセットアップ用のプリセット設定をインストールします:

```bash
npm install @tsparticles/configs
npm install @tsparticles/slim
```

---

## エンジンの初期化

Riot ラッパーは `initParticlesEngine` 関数をエクスポートします。パーティクルコンポーネントがレンダリングされる前にエンジンを準備するために、コンポーネントの `onBeforeMount` ライフサイクルフックで呼び出します。

```html
<my-component>
  <script>
    import { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

エンジンは1回初期化され、アプリ内のすべての `<riot-particles>` インスタンス間で共有されます。

---

## 基本的な使い方

エンジンを初期化した後、テンプレートで `<riot-particles>` コンポーネントを使用します。設定は JSON 文字列化された options オブジェクトまたはコンポーネントのプロパティへの参照として渡します。

```html
<my-component>
  <riot-particles id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        fpsLimit: 60,
        particles: {
          number: { value: 80 },
          color: { value: "#00d4ff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 2, max: 5 } },
          links: {
            enable: true,
            distance: 150,
            color: "#00d4ff",
            opacity: 0.3,
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
        background: { color: "#0d1117" },
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

---

## 条件付きレンダリング

Riot の `if={}` ディレクティブを状態プロパティとともに使用して、エンジンの初期化が完了するまでパーティクルコンポーネントのレンダリングを遅延させます。これにより、レイアウトシフトを回避し、コンポーネントが準備完了のエンジンを受け取ることを保証します。

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        particles: {
          number: { value: 50 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

`this.update()` を呼び出すと再レンダリングがトリガーされ、プロミスが解決されると `<riot-particles>` タグが表示されます。

---

## プリセットの使用

`@tsparticles/configs` パッケージは、クラッカー、花火、雪、星などの一般的なエフェクト用の構築済み設定を提供します。これらを options オブジェクトとして直接使用します。

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadFull } from "tsparticles";
    import configs from "@tsparticles/configs";

    export default {
      particlesConfig: configs.basic,
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadFull(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

利用可能なプリセットには、`basic`、`confetti`、`fireworks`、`snow`、`stars` などがあります。各プリセットは、エンジンコールバックに対応するプリセットパッケージをロードする必要があります。たとえば、`configs.fireworks` には `loadFireworksPreset` が必要です。

---

## カスタム設定

インタラクティビティ、複数のシェイプタイプ、高度なアニメーションオプションを備えたカスタム設定を構築します。

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true, width: 800, height: 800 },
          },
          color: {
            value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
          },
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
        background: { color: "#0f0f23" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## 完全なコンポーネント

以下は、すべてをまとめた完全な `.riot` ファイルです: `onBeforeMount` でのエンジン初期化、状態による条件付きレンダリング、インタラクティビティを備えたリッチな設定、およびロードされたイベントのサポートを介した `particlesLoaded` コールバック。

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    {#if state.particlesInitialized}
    <riot-particles id="tsparticles" options="{particlesConfig}" />
    {:else}
    <p>Loading particle engine...</p>
    {/if}
  </div>

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      state: {
        particlesInitialized: false,
      },
      particlesConfig: {
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: "#6366f1" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.3, max: 0.7 } },
          size: { value: { min: 2, max: 6 } },
          links: {
            enable: true,
            distance: 160,
            color: "#6366f1",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.6 } },
            push: { quantity: 3 },
          },
        },
        background: { color: "#0a0a1a" },
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>

  <style scoped>
    .particles-wrapper {
      position: relative;
      min-height: 100vh;
    }
    .particles-wrapper h1 {
      position: relative;
      z-index: 1;
      color: #fff;
      text-align: center;
      padding-top: 2rem;
    }
    .particles-wrapper p {
      position: relative;
      z-index: 1;
      color: #aaa;
      text-align: center;
    }
  </style>
</my-component>
```

---

これで、tsParticles を Riot.js アプリケーションに統合するために必要なすべてが揃いました。各例は自己完結型で、プロジェクトにコピーしてすぐに使用できます。
