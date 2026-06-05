---
title: Vue 3 集成
description: 使用 @tsparticles/vue3 将 tsParticles 集成到 Vue 3 应用中的分步指南。
---

# Vue 3 集成

`@tsparticles/vue3` 包为 tsParticles 提供了原生的 Vue 3 组件和插件系统。本指南涵盖从基本设置到高级模式（如动态主题切换和自定义预设）的所有内容。

---

## 安装

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

可选安装预设或完整包：

```bash
# 完整包（所有功能）
npm install tsparticles

# 特定预设
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# 工具配置
npm install @tsparticles/configs
```

---

## 基本使用

在应用入口注册插件，然后在任何地方使用 `<vue-particles>` 组件。

### 应用入口（`main.ts`）

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

### 组件（`App.vue`）

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

## 在组件中使用 `particlesInit`

如果你不希望使用全局插件，直接传递 `init` 回调：

```vue
<script setup lang="ts">
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" />
</template>
```

---

## 事件

组件会触发多个生命周期事件：

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("粒子容器已加载", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("引擎已初始化");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## 五彩纸屑效果

使用五彩纸屑预设进行庆祝：

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadConfettiPreset(engine);
};

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" :init="particlesInit" />
</template>
```

对于一次性爆发效果，可加载预设后在方法内部以编程方式调用 `tsParticles.load()`。

---

## 烟花效果

烟花预设可创建高冲击力的粒子爆炸效果：

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFireworksPreset(engine);
};

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" :init="particlesInit" />
</template>
```

> **提示：** 烟花预设消耗资源较多。通过切换绑定到组件的 `v-if`，在用户交互（如按钮点击）时触发。

---

## 下雪效果

使用雪花预设模拟下雪：

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSnowPreset(engine);
};

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" :init="particlesInit" />
</template>
```

---

## 交互式粒子

添加悬停和点击交互模式：

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

可用的交互模式：`grab`、`repulse`、`bubble`、`connect`、`push`、`remove`、`trail`、`attract`、`light`。

---

## 主题切换

通过更新响应式选项对象在运行时动态切换粒子主题：

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
    <button @click="toggleTheme">切换到{{ isDark ? "浅色" : "深色" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

或者，使用内置的 [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) 选项和容器上的 `theme` 属性进行零配置切换。

---

## 来自 @tsparticles/configs 的自定义预设

`@tsparticles/configs` 包导出预制的配置对象：

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import particlesConfig from "@tsparticles/configs/particles.json";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadLinksPreset(engine);
};

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" :init="particlesInit" />
</template>
```

浏览 `@tsparticles/configs` 包中的可用配置，获取即用型布局。

---

## 引擎初始化方式

有两种初始化引擎的方式：

### 1. 全局插件（推荐）

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

引擎随后全局可用，所有 `<vue-particles>` 实例共享它。

### 2. 组件级别初始化

为每个 `<vue-particles>` 实例传递一个 `:init` 回调。当不同组件需要不同的插件集时很有用：

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider（组合式 API）

使用 provider 以编程方式访问引擎：

```vue
<script setup lang="ts">
import { useParticles } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticles();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## 命名导出 + TypeScript

将所有部分组合在一起的完整 TypeScript 示例：

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

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

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("容器就绪", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## API 参考

| 属性      | 类型                                | 默认值          | 描述                   |
| --------- | ----------------------------------- | --------------- | ---------------------- |
| `id`      | `string`                            | `"tsparticles"` | 画布元素 ID            |
| `options` | `ISourceOptions`                    | `{}`            | 粒子配置               |
| `init`    | `(engine: Engine) => Promise<void>` | —               | 引擎初始化回调         |
| `url`     | `string`                            | —               | 要加载 JSON 配置的 URL |

| 事件                | 负载类型    | 描述                 |
| ------------------- | ----------- | -------------------- |
| `@particles-loaded` | `Container` | 容器完全初始化时触发 |
| `@particles-init`   | `Engine`    | 引擎初始化后触发     |

---

## 故障排除

- **错误：`tsparticles is not defined`** — 确保在组件渲染之前，在 `init` 回调中加载了 `tsparticles`（或所需的预设）。
- **画布不显示** — 确认父容器有非零高度。添加 CSS 规则如 `#tsparticles { height: 100vh; }`。
- **性能问题** — 降低 `fpsLimit`、减少 `particles.number.value`，或在低端设备上禁用 `detectRetina`。
- **SSR（Nuxt）** — `<vue-particles>` 组件仅限客户端。将其包裹在 `<ClientOnly>` 中或使用 `client:only` 指令。
