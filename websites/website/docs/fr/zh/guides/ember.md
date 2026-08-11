---
title: Ember 指南
description: 将 tsParticles 与 Ember.js 应用集成的完整指南。
---

# Ember 指南

## 目录

1. [安装](#installation)
2. [引擎初始化](#engine-initialization)
3. [基本使用](#basic-usage)
4. [自定义配置](#custom-configuration)
5. [事件处理](#event-handling)
6. [条件渲染](#conditional-rendering)
7. [TypeScript 示例](#typescript-example)

---

## 安装

通过 ember-cli 安装 Ember 插件和 tsParticles 引擎：

```bash
ember install @tsparticles/ember
```

这将安装插件及其对等依赖 `tsparticles`。你也可以选择添加预设包：

```bash
npm install @tsparticles/slim
```

---

## 引擎初始化

该插件导出一个 `initParticlesEngine` 工具函数，在应用级别调用一次。它接收一个异步回调，在其中加载应用所需的功能、预设或形状。

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// 在应用启动时调用
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

调用的典型位置是应用路由的 `beforeModel` 钩子、应用控制器的构造函数或实例初始化器。引擎单例初始化一次，并在应用中所有 `<Particles>` 组件之间共享。

---

## 基本使用

初始化引擎后，在任何模板中使用 `<Particles>` 组件。通过 `@options` 参数传入粒子配置。

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
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
  };
}
```

---

## 自定义配置

构建一个更丰富的配置，包含交互功能、多种形状和响应式密度。

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
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
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## 事件处理

`<Particles>` 组件在容器完成初始化并渲染第一帧时触发 `@particlesLoaded` 动作。使用此事件访问 `Container` 实例以进行程序化控制。

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {/* ... */};

  @action
  loadedCallback(container: Container) {
    console.log("粒子已加载", container?.id);

    // 程序化控制示例：
    setTimeout(() => {
      container.pause();
      console.log("粒子在 5 秒后暂停");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

如果你不想单独定义一个动作，也可以使用模板辅助函数内联使用回调模式。

---

## 条件渲染

使用 Ember 的 `{{if}}` 辅助函数配合 `@tracked` 属性来控制 `<Particles>` 组件的渲染时机。当引擎初始化是异步且你希望在引擎就绪前避免渲染组件时，这非常有用。

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>正在加载粒子...</p>
{{/if}}
```

`@tracked` 装饰器确保 Promise 解析后模板会自动重新渲染。

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## TypeScript 示例

以下是一个完整的、带类型标注的 Ember 应用控制器，演示了使用 slim 预设、交互功能和生命周期管理的完整集成模式。

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

  private container?: Container;

  private readonly options: ISourceOptions = {
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
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container?: Container): void {
    this.container = container;
    console.log("粒子已在容器中加载：", container?.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>正在初始化粒子引擎...</p>
  </div>
{{/if}}
```

---

你现在已拥有将 tsParticles 集成到 Ember.js 应用所需的全部内容。每个示例都是独立的，可直接复制到你的项目中。
