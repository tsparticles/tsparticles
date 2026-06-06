---
title: Stencil 指南
description: 将 tsParticles 与 Stencil 组件集成的完整指南。
---

# Stencil 指南

## 目录

1. [安装](#installation)
2. [自定义元素注册](#custom-elements-registration)
3. [基本使用](#basic-usage)
4. [引擎初始化](#engine-initialization)
5. [自定义配置](#custom-configuration)
6. [组件生命周期](#component-lifecycle)
7. [TypeScript 示例](#typescript-example)

---

## 安装

通过 npm 安装 Stencil 封装和 tsParticles 引擎：

```bash
npm install @tsparticles/stencil tsparticles
```

可选安装预设包以减少手动配置：

```bash
npm install @tsparticles/slim
```

---

## 自定义元素注册

`@tsparticles/stencil` 包提供了一个 `defineCustomElements` 函数，用于向浏览器注册 `<stencil-particles>` 自定义元素。在应用中使用该组件之前调用一次。

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// 注册 <stencil-particles> 元素
defineCustomElements();
```

对于使用懒加载的 Stencil 项目，在 `componentWillLoad` 或应用根组件中调用此函数，以确保元素在渲染前可用。

---

## 基本使用

自定义元素注册后，你可以在 JSX 中使用 `<stencil-particles>`，并传入 `options` 属性和 `init` 回调来加载所需的引擎功能。

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
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

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## 引擎初始化

`init` 属性接收引擎实例，让你加载所需功能。这是调用 `loadSlim`、`loadFull` 或单个更新器/交互插件推荐的位置。

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// 选项 A：轻量级（圆形、基础移动、连线）
init={async engine => { await loadSlim(engine); }}

// 选项 B：完整功能集（所有形状、效果、预设）
init={async engine => { await loadFull(engine); }}

// 选项 C：预设（五彩纸屑、烟花、雪花、星星）
init={async engine => { await loadConfettiPreset(engine); }}
```

引擎实例在初始化后也可以通过 `container-id` 属性访问，允许你在需要时以编程方式控制粒子系统。

---

## 自定义配置

以下是一个包含交互功能、多种形状类型和悬停/点击模式的完整配置。

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## 组件生命周期

在 Stencil 中，推荐的用于一次性设置的 lifecycle 钩子是 `componentWillLoad`。使用它来注册自定义元素并管理初始化状态，以便 `<stencil-particles>` 组件仅在引擎准备就绪时渲染。

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

使用 `@State()` 确保组件在引擎就绪时重新渲染，条件渲染防止粒子容器在自定义元素定义之前挂载。

---

## TypeScript 示例

以下是一个完整的、带类型标注的 Stencil 应用组件，使用 slim 预设、悬停交互功能和自定义深色主题集成了 tsParticles。

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "欢迎";

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

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("粒子容器已加载：", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>由 tsParticles 和 Stencil 驱动</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

`particlesLoaded` 事件在第一帧渲染完成后触发，让你可以访问 `Container` 实例以进行程序化控制（播放、暂停、停止、切换主题）。

---

你现在已拥有将 tsParticles 集成到 Stencil 应用所需的全部内容。每个示例都是独立的，可直接复制到你的项目中。
