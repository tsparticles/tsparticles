---
title: Nuxt インテグレーション
description: tsParticles を Nuxt 3 / Nuxt 4 アプリケーションに統合するためのステップバイステップガイド。
---

# Nuxt インテグレーション

このガイドでは、公式の `@tsparticles/vue3` ラッパーを使用して **Nuxt 3**（および Nuxt 4）プロジェクトに tsParticles を統合する方法を説明します。Nuxt はサーバーサイドとクライアントサイドの両方で実行されるため、SSR からパーティクルコンポーネントを保護する必要があります。

## インストール

Vue 3 ラッパーと選択したエンジンバンドルをインストールします:

```bash
npm install @tsparticles/vue3 tsparticles
```

より小さなバンドルには、`tsparticles` の代わりに `@tsparticles/slim` をインストールします:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## 基本的な使い方

Nuxt はデフォルトでコンポーネントをサーバー上でレンダリングします。tsParticles はブラウザの `canvas` API を必要とするため、`<vue-particles>` コンポーネントを `<client-only>` タグでラップする必要があります:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>My Nuxt App</h1>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: {
    zIndex: -1,
  },
  background: {
    color: "#0d47a1",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true },
    size: { value: 3 },
  },
};

const particlesLoaded = (container?: Container) => {
  console.log("Particles container ready", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

`<client-only>` ラッパーにより、`<vue-particles>` コンポーネントがブラウザでのみマウントされ、ハイドレーションの不一致を防ぎます。

## 設定

タイプセーフな設定には完全な `ISourceOptions` 型を使用します。オプションはインラインで定義するか、別の設定ファイルからインポートできます:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 8 },
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
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
};
</script>
```

## 雪エフェクト

雪プリセットを使用して冬の降雪エフェクトを作成します:

```bash
npm install @tsparticles/preset-snow
```

```vue
<template>
  <client-only>
    <vue-particles id="snow" :options="options" @particles-loaded="onLoad" />
  </client-only>
</template>

<script setup lang="ts">
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";

// コンポーネントがマウントされる前にプリセットをロード
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Snow effect ready", container?.id);
};
</script>
```

プリセットが `<script setup>` 内でトップレベルの `await` でロードされるため、コンポーネントがレンダリングされる前に準備が整っていることが保証されます。

## インタラクティブパーティクル

インタラクティビティモードを追加して、クリックとホバーのインタラクションを有効にします:

```vue
<template>
  <client-only>
    <vue-particles id="interactive" :options="options" />
  </client-only>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 50 },
    links: {
      enable: true,
      distance: 150,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab", // パーティクルがカーソルに接続
      },
      onClick: {
        enable: true,
        mode: "push", // クリックでパーティクルを追加
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};
</script>
```

利用可能なインタラクションモード: `grab`、`bubble`、`connect`、`repulse`、`push`、`remove`、`attract`、`slow`。

## イベント処理

`<vue-particles>` コンポーネントはいくつかのライフサイクルイベントを発行します:

```vue
<template>
  <client-only>
    <vue-particles
      id="event-demo"
      :options="options"
      @particles-loaded="onLoaded"
      @particles-init="onInit"
      @particles-destroy="onDestroy"
    />
  </client-only>
</template>

<script setup lang="ts">
import type { Container, Engine } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onInit = (engine: Engine) => {
  console.log("Engine initialized", engine);
};

const onLoaded = (container: Container) => {
  console.log("Container loaded", container.id);
};

const onDestroy = () => {
  console.log("Container destroyed");
};
</script>
```

| イベント               | ペイロード   | 説明                                                  |
| -------------------- | ----------- | ------------------------------------------------------------ |
| `@particles-init`    | `Engine`    | tsParticles エンジンが初期化されたときに1回発生           |
| `@particles-loaded`  | `Container` | コンテナのロードまたはリロードが完了するたびに発生 |
| `@particles-destroy` | なし        | コンテナが破棄されたときに発生                        |

## 完全な TypeScript の例

明示的なインポートとライフサイクル認識を備えた、完全な型付けされたコンポーネント:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles
        id="full-example"
        :options="options"
        @particles-loaded="onParticlesLoaded"
        @particles-init="onParticlesInit"
      />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Resume" : "Pause" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const containerRef = ref<Container | undefined>(undefined);
const paused = ref(false);

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#0a0a23" },
  particles: {
    color: { value: "#00ff00" },
    number: { value: 80 },
    links: { enable: true, color: "#00ff00", distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 4 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 120 },
    },
  },
};

const onParticlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const onParticlesLoaded = (container: Container) => {
  containerRef.value = container;
};

const togglePause = () => {
  if (containerRef.value) {
    if (paused.value) {
      containerRef.value.play();
    } else {
      containerRef.value.pause();
    }
    paused.value = !paused.value;
  }
};
</script>

<style scoped>
.particles-wrapper {
  position: relative;
  min-height: 100vh;
}
.controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
</style>
```

## ページ統合

特定の Nuxt ページにパーティクル背景を追加するには、ページのテンプレートにコンポーネントを配置します:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>About Page</h1>
      <p>This content sits above the particle canvas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 50 },
    color: { value: "#e94560" },
    links: { enable: true, color: "#e94560" },
    move: { enable: true },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
}
</style>
```

**すべての** ページにパーティクルを表示したい場合は、個々のページではなく `layouts/default.vue` にコンポーネントを追加します。

## Nuxt 4 の注意点

Nuxt 4 は Nuxt 3 の `<client-only>` および `<script setup>` パターンとの後方互換性を維持しています。上記の例はすべて Nuxt 4 でも変更なしで動作します。

Nuxt 4 の主な考慮事項:

- **Nitropack 2**: サーバーエンジンがアップグレードされていますが、`<vue-particles>` のようなクライアント専用コンポーネントには影響しません。
- **Vue 3.5+**: Nuxt 4 には新しいバージョンの Vue が同梱されています — `@tsparticles/vue3` は問題なく Vue 3.3+ と互換性があります。
- **より厳格な SSR チェック**: ハイドレーション警告が表示される場合は、`<vue-particles>` が常に `<client-only>` 内にあり、サーバー上でレンダリングされないことを確認してください。
- **ハイブリッドレンダリング**: 特定のページに `ssr: false` のルートルールを使用する場合、それらのページでは `<client-only>` を省略できますが、常に含める方が安全です。

Nuxt 2 から `@tsparticles/vue` パッケージ（vue 2）を使用してアップグレードする場合は、Nuxt 3/4 用に `@tsparticles/vue3` に移行する必要があります — API は互換性がありません。

## プリセットギャラリー

上記のパターンを任意の公式プリセットと組み合わせます:

| プリセット  | パッケージ                          | エフェクト              |
| --------- | -------------------------------- | ----------------------- |
| Confetti  | `@tsparticles/preset-confetti`   | カラフルなクラッカーバースト |
| Fireworks | `@tsparticles/preset-fireworks`  | 花火の爆発               |
| Snow      | `@tsparticles/preset-snow`       | 降る雪の結晶             |
| Stars     | `@tsparticles/preset-stars`      | きらめく夜空             |
| Links     | `@tsparticles/preset-links`      | 接続されたノードネットワーク |
| Bubbles   | `@tsparticles/preset-bubbles`    | 浮遊する泡               |

```vue
<template>
  <client-only>
    <vue-particles id="preset-demo" :options="{ preset: 'stars' }" />
  </client-only>
</template>

<script setup lang="ts">
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { tsParticles } from "@tsparticles/engine";

await loadStarsPreset(tsParticles);
</script>
```

## トラブルシューティング

| 症状                           | 原因                                    | 修正                                                           |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| 空白画面 / ハイドレーションエラー | `<vue-particles>` がサーバー上でレンダリング | `<client-only>` でラップ                                       |
| プリセットが効果を発揮しない     | コンポーネントマウント前にプリセットがロードされていない | `<script setup>` でトップレベル await を使用して `loadXPreset()` を呼び出す |
| キャンバスがビューポートを埋めない | `fullScreen` が有効になっていない         | オプションに `fullScreen: { zIndex: -1 }` を追加               |
| コントロールで一時停止/再開できない | コンテナ参照が設定されていない             | `@particles-loaded` ハンドラーでコンテナを割り当て              |

## 次のステップ

- [インタラクティブデモ](/demos/) で既成の Vue 設定を探索してください。
- パーティクルパラメーターの完全なリストについては、[オプションリファレンス](/options/) をお読みください。
- より多くのプリセットエフェクトについては、[プリセットページ](/demos/presets) をご覧ください。
