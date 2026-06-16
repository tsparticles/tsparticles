---
title: Vue 3 インテグレーション
description: "@tsparticles/vue3 を使用して tsParticles を Vue 3 アプリケーションに統合するためのステップバイステップガイド。"
---

# Vue 3 インテグレーション

`@tsparticles/vue3` パッケージは、tsParticles のネイティブ Vue 3 コンポーネントとプラグインシステムを提供します。このガイドでは、基本的なセットアップから動的テーマ切り替えやカスタムプリセットなどの高度なパターンまでをカバーします。

---

## インストール

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

オプションでプリセットまたは完全なバンドルをインストールします:

```bash
# 完全バンドル（すべての機能）
npm install tsparticles

# 特定のプリセット
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# ユーティリティ設定
npm install @tsparticles/configs
```

---

## 基本的な使い方

アプリのエントリーポイントでプラグインを登録し、その後任意の場所で `<vue-particles>` コンポーネントを使用します。

### アプリエントリー（`main.ts`）

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

app.use(ParticlesPlugin, {
  init: async (engine: Engine) => {
    await loadFull(engine);
  },
});

app.mount("#app");
```

### コンポーネント（`App.vue`）

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

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
      direction: "none",
      random: false,
      straight: false,
      outModes: "out",
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
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />
</template>
```

---


## イベント

コンポーネントはいくつかのライフサイクルイベントを発行します:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## クラッカーエフェクト

お祝いにクラッカープリセットを使用します:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" />
</template>

> **注意:** アプリのエントリーポイントでプラグインの `init` コールバックを介して `loadConfettiPreset` を登録してください（[基本的な使い方](#基本的な使い方)を参照）。

1回限りのバーストの場合は、プリセットをロードした後、メソッド内でプログラム的に `tsParticles.load()` を呼び出します。

---

## 花火エフェクト

花火プリセットはインパクトのあるパーティクル爆発を作成します:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" />
</template>

> **注意:** アプリのエントリーポイントでプラグインの `init` コールバックを介して `loadFireworksPreset` を登録してください（[基本的な使い方](#基本的な使い方)を参照）。

> **ヒント:** 花火プリセットはリソースを多く消費します。コンポーネントにバインドした `v-if` を切り替えて、ユーザーインタラクション（例: ボタンクリック）でトリガーしてください。

---

## 雪エフェクト

雪プリセットで降雪をシミュレートします:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" />
</template>

> **注意:** アプリのエントリーポイントでプラグインの `init` コールバックを介して `loadSnowPreset` を登録してください（[基本的な使い方](#基本的な使い方)を参照）。

---

## インタラクティブパーティクル

ホバーとクリックのインタラクティビティモードを追加します:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#00ff00",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff00",
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

<template>
  <vue-particles id="interactive" :options="options" />
</template>
```

利用可能なインタラクションモード: `grab`、`repulse`、`bubble`、`connect`、`push`、`remove`、`trail`、`attract`、`light`。

---

## テーマ切り替え

リアクティブな options オブジェクトを更新して、実行時にパーティクルテーマを動的に切り替えます:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ISourceOptions } from "@tsparticles/engine";

const isDark = ref(true);

const options = ref<ISourceOptions>({
  background: {
    color: "#000000",
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
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
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  options.value = {
    ...options.value,
    background: {
      color: isDark.value ? "#000000" : "#f0f0f0",
    },
    particles: {
      ...options.value.particles,
      color: {
        value: isDark.value ? "#ffffff" : "#333333",
      },
      links: {
        ...(options.value.particles?.links as object),
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  };
};
</script>

<template>
  <div>
    <button @click="toggleTheme">Switch to {{ isDark ? "light" : "dark" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

`<vue-particles>` コンポーネントは、ゼロコンフィグ切り替えのための `theme` プロパティもサポートしています。`theme` プロパティが変わると、コンテナを破棄して再作成することなく新しいテーマが適用されます：

```vue
<template>
  <vue-particles id="tsparticles" :options="options" :theme="currentTheme" />
</template>
```

> **注意:** `theme` プロパティを使用するには、オプションの [`@tsparticles/plugin-themes`](https://www.npmjs.com/package/@tsparticles/plugin-themes) パッケージが必要です。このパッケージがない場合、`theme` プロパティは安全に無視されます — エラーは発生しませんが、テーマの変更は適用されません。

---

## @tsparticles/configs のカスタムプリセット

`@tsparticles/configs` パッケージは、既成の設定オブジェクトをエクスポートします:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";
import particlesConfig from "@tsparticles/configs/particles.json";

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" />
</template>

> **注意:** アプリのエントリーポイントでプラグインの `init` コールバックを介して `loadLinksPreset` を登録してください（[基本的な使い方](#基本的な使い方)を参照）。

`@tsparticles/configs` パッケージで利用可能な設定を参照して、すぐに使えるレイアウトを確認してください。

---

## エンジン初期化のアプローチ

エンジンを初期化するには2つの方法があります:

### 1. グローバルプラグイン（推奨）

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App)
  .use(ParticlesPlugin, {
    init: async (engine: Engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
```

エンジンはグローバルに利用可能になり、すべての `<vue-particles>` インスタンスがそれを共有します。

### 2. Particles Provider（Composition API）

プロバイダーを使用して、プログラム的にエンジンにアクセスします:

```vue
<script setup lang="ts">
import { useParticlesProvider } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticlesProvider();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## 名前付きエクスポート + TypeScript

すべての要素を組み合わせた完全な TypeScript の例:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const particlesContainer = ref<Container | null>(null);

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffd700",
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 2, max: 8 },
      random: true,
    },
    links: {
      enable: true,
      distance: 200,
      color: "#ffd700",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 0.3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  detectRetina: true,
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("Container ready", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
</template>
```

---

## API リファレンス

| プロップ  | タイプ                              | デフォルト      | 説明                       |
| --------- | ----------------------------------- | --------------- | -------------------------- |
| `id`      | `string`                            | `"tsparticles"` | キャンバス要素 ID          |
| `options` | `ISourceOptions`                    | `{}`            | パーティクル設定           |
| `url`     | `string`                            | —               | JSON 設定をロードする URL  |
| `theme`   | `string`                            | —               | テーマ名（`@tsparticles/plugin-themes` が必要；欠落時は安全に無視） |

| イベント            | ペイロード  | 説明                                   |
| ------------------- | ----------- | -------------------------------------- |
| `@particles-loaded` | `Container` | コンテナが完全に初期化されたときに発生 |

---

## トラブルシューティング

- **エラー: `tsparticles is not defined`** — コンポーネントがレンダリングされる前に、`init` コールバック内で `tsparticles`（または必要なプリセット）がロードされていることを確認してください。
- **キャンバスが表示されない** — 親コンテナにゼロ以外の高さがあることを確認してください。`#tsparticles { height: 100vh; }` のような CSS ルールを追加します。
- **パフォーマンスの問題** — ローエンドデバイスでは `fpsLimit` を下げ、`particles.number.value` を減らすか、`detectRetina` を無効にします。
- **SSR（Nuxt）** — `<vue-particles>` コンポーネントはクライアント専用です。`<ClientOnly>` でラップするか、`client:only` ディレクティブを使用します。
