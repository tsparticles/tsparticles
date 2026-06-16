---
title: Riot 指南
description: 将 tsParticles 与 Riot.js 组件集成的完整指南。
---

# Riot 指南

## 目录

1. [安装](#installation)
2. [引擎初始化](#engine-initialization)
3. [基本使用](#basic-usage)
4. [条件渲染](#conditional-rendering)
5. [预设使用](#preset-usage)
6. [自定义配置](#custom-configuration)
7. [完整组件](#full-component)

---

## 安装

通过 npm 安装 Riot 封装和 tsParticles 引擎：

```bash
npm install @tsparticles/riot tsparticles
```

可选安装预设配置以便快速设置：

```bash
npm install @tsparticles/configs
npm install @tsparticles/slim
```

---

## 引擎初始化

Riot 封装导出一个 `initParticlesEngine` 函数。在组件的 `onBeforeMount` 生命周期钩子中调用它，在粒子组件渲染之前准备引擎。

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

引擎初始化一次，并在应用中所有 `<riot-particles>` 实例之间共享。

---

## 基本使用

初始化引擎后，在模板中使用 `<riot-particles>` 组件。将配置作为 JSON 字符串化的选项对象或组件属性的引用传递。

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

## 条件渲染

使用 Riot 的 `if={}` 指令配合状态属性来延迟渲染粒子组件，直到引擎完成初始化。这可以避免布局偏移，并确保组件接收到准备好的引擎。

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

调用 `this.update()` 会触发重新渲染，因此在 Promise 解析后 `<riot-particles>` 标签就会出现。

---

## 预设使用

`@tsparticles/configs` 包为常见效果（如五彩纸屑、烟花、雪花和星星）提供了预构建配置。直接用作你的选项对象。

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

可用的预设包括 `basic`、`confetti`、`fireworks`、`snow`、`stars` 等。每个预设都需要在引擎回调中加载相应的预设包。例如，`configs.fireworks` 需要 `loadFireworksPreset`。

---

## 自定义配置

构建一个包含交互功能、多种形状和高级动画选项的自定义配置。

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

## 完整组件

以下是一个完整的 `.riot` 文件，将所有内容整合在一起：`onBeforeMount` 中的引擎初始化、带状态的条件渲染、丰富的交互配置以及通过组件内置支持的加载事件的 `particlesLoaded` 回调。

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    {#if state.particlesInitialized}
    <riot-particles id="tsparticles" options="{particlesConfig}" />
    {:else}
    <p>正在加载粒子引擎...</p>
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

你现在已拥有将 tsParticles 集成到 Riot.js 应用所需的全部内容。每个示例都是独立的，可直接复制到你的项目中。
