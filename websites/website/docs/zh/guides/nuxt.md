---
title: Nuxt 集成
description: 将 tsParticles 集成到 Nuxt 3 / Nuxt 4 应用中的分步指南。
---

# Nuxt 集成

本指南涵盖了使用官方 `@tsparticles/vue3` 封装将 tsParticles 集成到 **Nuxt 3**（及 Nuxt 4）项目中的方法。Nuxt 同时在服务端和客户端运行，因此你必须保护粒子组件免受 SSR 的影响。

## 安装

安装 Vue 3 封装和你选择的引擎包：

```bash
npm install @tsparticles/vue3 tsparticles
```

为了更小的打包体积，请安装 `@tsparticles/slim` 而不是 `tsparticles`：

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## 基本使用

Nuxt 默认在服务端渲染组件。由于 tsParticles 需要浏览器的 `canvas` API，你必须将 `<vue-particles>` 组件包裹在 `<client-only>` 标签中：

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>我的 Nuxt 应用</h1>
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
  console.log("粒子容器就绪", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

`<client-only>` 包装器确保 `<vue-particles>` 组件仅在浏览器中挂载，防止水合不匹配。

## 配置

使用完整的 `ISourceOptions` 类型进行类型安全的配置。你可以内联定义选项或从单独的配置文件导入：

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

## 下雪效果

使用雪花预设创建冬日飘雪效果：

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

// 在组件挂载前加载预设
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("下雪效果就绪", container?.id);
};
</script>
```

由于预设是在 `<script setup>` 中使用顶级 `await` 加载的，因此在组件渲染之前保证已就绪。

## 交互式粒子

通过添加交互模式来启用点击和悬停交互：

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
        mode: "grab", // 粒子连接到光标
      },
      onClick: {
        enable: true,
        mode: "push", // 点击时添加粒子
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

可用的交互模式包括：`grab`、`bubble`、`connect`、`repulse`、`push`、`remove`、`attract` 和 `slow`。

## 事件处理

`<vue-particles>` 组件会触发多个生命周期事件：

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
  console.log("引擎已初始化", engine);
};

const onLoaded = (container: Container) => {
  console.log("容器已加载", container.id);
};

const onDestroy = () => {
  console.log("容器已销毁");
};
</script>
```

| 事件                 | 负载类型    | 描述                             |
| -------------------- | ----------- | -------------------------------- |
| `@particles-init`    | `Engine`    | tsParticles 引擎初始化时触发一次 |
| `@particles-loaded`  | `Container` | 容器完成加载或重新加载时触发     |
| `@particles-destroy` | 无          | 容器销毁时触发                   |

## 完整 TypeScript 示例

一个完整的、带类型标注的组件，包含显式导入和生命周期感知：

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
      <button @click="togglePause">{{ paused ? "恢复" : "暂停" }}</button>
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

## 页面集成

通过在页面的模板中放置组件，将粒子背景添加到特定的 Nuxt 页面：

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>关于页面</h1>
      <p>此内容位于粒子画布之上。</p>
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

如果你希望粒子出现在**每个**页面上，请将组件添加到 `layouts/default.vue` 而不是单个页面。

## Nuxt 4 说明

Nuxt 4 保持与 Nuxt 3 的 `<client-only>` 和 `<script setup>` 模式的向后兼容性。以上所有示例在 Nuxt 4 中无需修改即可使用。

Nuxt 4 的关键考虑因素：

- **Nitropack 2**：服务端引擎已升级，但不影响像 `<vue-particles>` 这样的客户端专用组件。
- **Vue 3.5+**：Nuxt 4 附带更新的 Vue 版本——`@tsparticles/vue3` 兼容 Vue 3.3+，无需担心。
- **更严格的 SSR 检查**：如果你看到水合警告，请确保 `<vue-particles>` 始终位于 `<client-only>` 内部，且绝不在服务端渲染。
- **混合渲染**：如果对某些页面使用了 `ssr: false` 的路由规则，你可以在这些页面上省略 `<client-only>`，但始终包含它更安全。

如果你从带有 `@tsparticles/vue` 包（Vue 2）的 Nuxt 2 升级，你必须迁移到 `@tsparticles/vue3` 用于 Nuxt 3 / 4——API 不兼容。

## 预设库

将上述模式与以下任一官方预设结合使用：

| 预设     | 包                              | 效果           |
| -------- | ------------------------------- | -------------- |
| 五彩纸屑 | `@tsparticles/preset-confetti`  | 彩色纸屑爆发   |
| 烟花     | `@tsparticles/preset-fireworks` | 烟花爆炸       |
| 雪花     | `@tsparticles/preset-snow`      | 飘落的雪花     |
| 星星     | `@tsparticles/preset-stars`     | 闪烁的夜空     |
| 连线     | `@tsparticles/preset-links`     | 连接的节点网络 |
| 气泡     | `@tsparticles/preset-bubbles`   | 浮动气泡       |

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

## 故障排除

| 症状                  | 原因                           | 解决方法                                                  |
| --------------------- | ------------------------------ | --------------------------------------------------------- |
| 黑屏 / 水合错误       | `<vue-particles>` 在服务端渲染 | 包裹在 `<client-only>` 中                                 |
| 预设无效果            | 组件挂载前未加载预设           | 在 `<script setup>` 中使用顶级 await 调用 `loadXPreset()` |
| 画布未填满视口        | 未启用 `fullScreen`            | 在选项中添加 `fullScreen: { zIndex: -1 }`                 |
| 控制按钮无法暂停/恢复 | 未设置容器引用                 | 在 `@particles-loaded` 处理程序中分配容器                 |

## 下一步

- 探索[交互式演示](/demos/)以获取现成的 Vue 配置。
- 阅读[选项参考](/options/)以获取完整的粒子参数列表。
- 访问[预设页面](/demos/presets)获取更多预构建效果。
