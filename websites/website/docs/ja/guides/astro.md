# Astro インテグレーション

公式の `@tsparticles/astro` 統合パッケージを使用して、Astro サイトで tsParticles を使用します。

## インストール

パッケージマネージャーを使用して、Astro 統合パッケージと tsParticles コアをインストールします:

```bash
npm install @tsparticles/astro tsparticles
```

```bash
pnpm add @tsparticles/astro tsparticles
```

```bash
yarn add @tsparticles/astro tsparticles
```

## エンジンの初期化

tsParticles はモジュラーアーキテクチャを採用しています。パーティクルをレンダリングする前に、必要な機能でエンジンを初期化する必要があります。クライアントスクリプト（例: `src/scripts/particles-init.ts`）を作成するか、Astro コンポーネント内でインライン `<script>` を使用します:

```typescript
import { initParticlesEngine } from "@tsparticles/astro";

void initParticlesEngine(async (engine) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
});
```

> `initParticlesEngine` は、`<Particles>` コンポーネントがマウントされる前にエンジンの準備が整っていることを保証する `tsParticles.init()` のラッパーです。初期化が完了すると解決される `Promise` を返します。

## 基本的な使い方

任意の `.astro` テンプレートに `<Particles />` コンポーネントを配置します。設定は `options` プロップ経由で渡します:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true, speed: 2 },
  },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

> `id` プロップは、基礎となるキャンバスコンテナの `<div>` に渡されます。スタイリングや `document.getElementById()` を介した命令的なアクセスに使用します。

## TypeScript サポート

この統合パッケージは完全な TypeScript 宣言を提供します。`@tsparticles/engine` の `ISourceOptions` を使用して設定を型付けします:

```typescript
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: {
      value: 50,
      density: { enable: true },
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 200 },
    },
  },
};
```

## カスタム設定

以下は、任意の Astro ページにドロップインできる、より詳細な設定です:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  autoPlay: true,
  background: {
    color: "#0d47a1",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  backgroundMode: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: "#ffffff",
      animation: {
        enable: true,
        speed: 20,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: { enable: false },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
      animation: {
        enable: true,
        speed: 3,
        sync: false,
      },
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
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.5 },
      },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## プリセットの使用

手動で設定を構築する代わりに、エンジン初期化時にプリセットをロードし、オプションでそれを参照します:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "stars",
  background: { color: "#000000" },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });
</script>
```

## 他のフレームワークとの統合

Astro は React、Vue、Svelte、Solid などの UI フレームワークをサポートしているため、`.astro` ファイル内でフレームワーク固有の tsParticles コンポーネントを使用できます:

### Astro で React を使用

```astro
---
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" options={options} />
```

### Astro で Vue を使用

```astro
---
import Particles from "@tsparticles/vue3";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" :options="options" />
```

> `client:load` ディレクティブは、Astro にページ読み込み時にコンポーネントを即座にハイドレートするように指示します。遅延読み込みには `client:visible` を使用します。

## 完全なページ例

パーティクルがアニメーション背景として機能する完全な Astro ページ:

```astro
---
import Layout from "../layouts/Layout.astro";
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
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
};
---

<Layout title="Particles Background">
  <main>
    <h1>Welcome</h1>
    <p>This page has a particle background powered by tsParticles.</p>
  </main>
  <Particles id="bg-particles" options={options} />
</Layout>

<style is:global>
  #bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  main {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 20vh;
  }
</style>

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## コンポーネントプロップ

| プロップ             | タイプ           | デフォルト                | 説明                                          |
| -------------------- | ---------------- | ------------------------- | --------------------------------------------- |
| `id`                 | `string`         | `"tsparticles"`           | コンテナの DOM 要素 ID                        |
| `options`            | `ISourceOptions` | `{}`                      | 完全な tsParticles 設定オブジェクト           |
| `url`                | `string`         | —                         | リモート JSON URL から設定をロード            |
| `particlesClassName` | `string`         | `"tsparticles-canvas-el"` | キャンバス要素の CSS クラス                   |
| `container`          | `object`         | —                         | 既存の `Container` インスタンス（上級者向け） |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |
