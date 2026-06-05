---
title: Svelte インテグレーション
description: @tsparticles/svelte を使用して tsParticles を Svelte および SvelteKit アプリケーションに統合するためのステップバイステップガイド。
---

# Svelte インテグレーション

`@tsparticles/svelte` パッケージは、tsParticles のネイティブ Svelte コンポーネントを提供します。このガイドでは、Svelte（Vite 使用）と SvelteKit について、リアクティブオプション、イベント処理、複数インスタンスを含めて説明します。

---

## インストール

```bash
npm install @tsparticles/svelte @tsparticles/engine
```

完全なバンドルまたはプリセットの場合:

```bash
npm install tsparticles
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
```

---

## 基本的な使い方

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let engineInitialised = false;

  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
    engineInitialised = true;
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d47a1",
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: "out",
      },
    },
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={particlesInit}
/>
```

---

## エンジンの初期化

アプリに必要なプラグインとプリセットをロードするために、`on:init` イベントハンドラーを渡します:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    const engine = event.detail;
    await loadFull(engine);
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
/>
```

または、マウント前に `initParticlesEngine` ユーティリティを使用します:

```svelte
<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import { onMount } from "svelte";

  let ready = false;

  onMount(async () => {
    await initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
    ready = true;
  });
</script>

{#if ready}
  <Particles id="tsparticles" options={options} />
{/if}
```

---

## 雪エフェクト

```bash
npm install @tsparticles/preset-snow
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadSnowPreset } from "@tsparticles/preset-snow";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadSnowPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "snow",
    background: {
      color: "#1a1a2e",
    },
  };
</script>

<Particles
  id="snow"
  {options}
  on:init={handleInit}
/>
```

追加オプションをマージしてプリセットの動作をカスタマイズします:

```svelte
<script lang="ts">
  const options: ISourceOptions = {
    preset: "snow",
    background: { color: "#0f0f23" },
    particles: {
      move: {
        speed: 1.5,  // より遅い降雪
      },
      opacity: {
        value: 0.8,  // より目立つフレーク
      },
    },
  };
</script>
```

---

## 星エフェクト

```bash
npm install @tsparticles/preset-stars
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadStarsPreset } from "@tsparticles/preset-stars";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadStarsPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "stars",
    background: {
      color: "#000000",
    },
  };
</script>

<Particles
  id="stars"
  {options}
  on:init={handleInit}
/>
```

---

## インタラクティブパーティクル

マウスホバーとクリックのインタラクティビティを追加します:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    particles: {
      number: { value: 100 },
      color: { value: "#00d8ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 120,
        color: "#00d8ff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.5 },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };
</script>

<Particles
  id="interactive"
  {options}
  on:init={handleInit}
/>
```

---

## イベント処理

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Container, Engine } from "@tsparticles/engine";

  let container: Container;

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    container = event.detail;
    console.log("Container loaded", container);
  };

  const pause = () => container?.pause();
  const resume = () => container?.play();
  const destroy = () => container?.destroy();
</script>

<div>
  <button on:click={pause}>Pause</button>
  <button on:click={resume}>Resume</button>
  <button on:click={destroy}>Destroy</button>
</div>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

| イベント               | 詳細        | 発生タイミング                        |
| -------------------- | ----------- | ---------------------------------- |
| `on:init`            | `Engine`    | エンジンが初期化された後              |
| `on:particlesLoaded` | `Container` | コンテナが完全に準備できた後          |

---

## TypeScript の例

完全な型付けコンポーネント:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type {
    Container,
    Engine,
    ISourceOptions,
  } from "@tsparticles/engine";

  let particlesContainer: Container | undefined;

  const options: ISourceOptions = {
    background: {
      color: "#1e1e2e",
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
      },
    },
    detectRetina: true,
  };

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    particlesContainer = event.detail;
  };
</script>

<Particles
  id="tsparticles"
  {options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

---

## 動的オプション

リアクティブオプションは、インスタンスを再作成せずにパーティクルを更新します:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let color = "#ff0000";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  $: options = {
    background: {
      color: "#000000",
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: color,
        enable: true,
        distance: 150,
      },
      number: {
        value: 60,
      },
      move: {
        enable: true,
        speed: 2,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  } satisfies ISourceOptions;
</script>

<div>
  <label>
    Particle Color:
    <input type="color" bind:value={color} />
  </label>
</div>

<Particles
  id="dynamic"
  {options}
  on:init={handleInit}
/>
```

`$:` リアクティブ宣言は、`color` が変更されるたびに `options` を再計算し、`Particles` コンポーネントが新しい設定を自動的に取得します。

---

## 複数のインスタンス

同じページに複数の独立したパーティクルシステムをレンダリングします:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const fireOptions: ISourceOptions = {
    background: { color: "#1a0000" },
    particles: {
      color: { value: "#ff4500" },
      number: { value: 40 },
      move: { enable: true, speed: 1 },
      size: { value: { min: 2, max: 6 } },
      opacity: { value: 0.8 },
    },
  };

  const waterOptions: ISourceOptions = {
    background: { color: "#000d1a" },
    particles: {
      color: { value: "#00bfff" },
      number: { value: 60 },
      move: { enable: true, speed: 0.5, direction: "top" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
  };
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh;">
  <div style="position: relative;">
    <Particles id="fire" options={fireOptions} on:init={handleInit} />
  </div>
  <div style="position: relative;">
    <Particles id="water" options={waterOptions} on:init={handleInit} />
  </div>
</div>
```

各 `<Particles>` コンポーネントは、独自の `id`、キャンバス、およびエンジンコンテキストを取得します。

---

## SvelteKit での使用

SvelteKit では、キャンバスはブラウザ環境を必要とします。コンポーネントの SSR を無効にします:

```svelte
<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Component: typeof import("@tsparticles/svelte").default;

  onMount(async () => {
    if (browser) {
      const module = await import("@tsparticles/svelte");
      Component = module.default;
    }
  });
</script>

{#if Component}
  <svelte:component this={Component} id="tsparticles" options={options} />
{/if}
```

または、インポートをクライアント専用コンポーネントでラップします。SvelteKit 2+ では、`vite-plugin-svelte` SSR 除外を使用することもできます。

---

## API リファレンス

| プロップ    | タイプ             | デフォルト         | 説明                   |
| --------- | ---------------- | --------------- | ----------------------------- |
| `id`      | `string`         | `"tsparticles"` | キャンバス要素 ID             |
| `options` | `ISourceOptions` | `{}`            | パーティクル設定オブジェクト |
| `url`     | `string`         | —               | リモート JSON 設定の URL   |

| イベント              | 詳細        | 説明                                                |
| -------------------- | ----------- | ---------------------------------------------------------- |
| `on:init`            | `Engine`    | エンジンが初期化されたときに発生（プラグインをロードするために使用） |
| `on:particlesLoaded` | `Container` | コンテナが完全に準備できたときに発生                    |

---

## トラブルシューティング

- **キャンバスが表示されない** — 親コンテナに明示的な寸法（`height: 100%`、`height: 100vh`、または固定ピクセル値）があることを確認してください。
- **`loadFull is not a function`** — `tsparticles` がインストールされていて、`loadFull` を `tsparticles`（`@tsparticles/engine` ではない）からインポートしていることを確認してください。
- **リアクティビティが機能しない** — `options` がリアクティブ変数（`$:` またはリアクティブソースにバインドされた `let`）であることを確認してください。プレーンな `const` 値は更新されません。
- **SvelteKit の空白画面** — `@tsparticles/svelte` を動的にインポートするか、上記の SvelteKit セクションに示すように `browser` ガードを使用してください。
- **`event.detail` の TypeScript エラー** — イベントハンドラーに `CustomEvent<Engine>` および `CustomEvent<Container>` 型を使用してください。
