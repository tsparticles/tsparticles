---
title: SolidJS 集成
description: 使用官方 @tsparticles/solid 封装将 tsParticles 集成到 SolidJS 应用中的分步指南。
---

# SolidJS 集成

本指南涵盖了使用官方 `@tsparticles/solid` 封装将 tsParticles 集成到 **SolidJS** 项目中的方法。SolidJS 的细粒度响应式模型与 tsParticles 配合良好——选项更改会触发针对性的画布更新，无需完全重新初始化。

## 安装

安装 SolidJS 封装和你选择的引擎包：

```bash
npm install @tsparticles/solid tsparticles
```

为了更小的打包体积，使用 `@tsparticles/slim` 替代：

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## 基本使用

SolidJS 完全在浏览器中运行（无 SSR），因此你不需要防范服务端渲染。但是，引擎必须在渲染粒子之前异步初始化。

在 `onMount` 中使用 `initParticlesEngine` 加载引擎功能，然后使用 `<Show>` 条件渲染 `<Particles>` 组件：

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

`<Show>` 组件确保 `<Particles>` 元素仅在引擎就绪后才插入 DOM。

## 引擎初始化

`initParticlesEngine` 函数接受一个接收 `Engine` 实例的回调。使用此回调注册配置所需的功能：

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// 最小化——仅基础形状和移动
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("引擎就绪（slim）");
});

// 完整——包含所有功能
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("引擎就绪（full）");
});

// 仅预设——只需特定预设所需的功能
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("五彩纸屑预设已加载");
});
```

在应用中调用一次 `initParticlesEngine`——通常在根组件的 `onMount` 中。引擎实例会被缓存，因此后续调用会立即返回。

## 条件渲染

使用 SolidJS 的 `<Show>` 控制流来延迟渲染，直到引擎初始化完成：

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>正在加载粒子...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

`fallback` 属性在引擎初始化时显示加载指示器。

## 预设使用

使用 `@tsparticles/configs` 快速获得预设计的配置：

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

可用的配置包括：`basic`、`bubbles`、`snow`、`stars`、`fireworks`、`confetti`、`links` 等。

## 交互式粒子

通过配置 `interactivity` 部分添加点击和悬停交互：

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
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

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **悬停模式**：`grab`、`bubble`、`repulse`、`attract`、`slow`、`connect`
- **点击模式**：`push`、`remove`、`repulse`、`bubble`、`attract`、`pause`

## 自定义配置

一个完整的自定义配置，包含多种粒子形状、颜色调色板和运动设置：

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## 完整 TypeScript 示例

一个完整的带类型标注的组件，包含容器引用、引擎初始化和手动控制：

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "恢复" : "暂停"}
      </button>
    </Show>
  );
};

export default App;
```

## 使用信号的动态选项

SolidJS 的优势之一是细粒度响应式——你可以使用信号驱动粒子选项，画布将高效更新：

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // options 是一个普通对象——通过 Particles 组件的内部跟踪进行响应式读取
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          颜色：
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          数量：
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

由于 `options` 是一个访问信号的函数，每次 `color()` 或 `particleCount()` 发生变化时，`<Particles>` 组件都会接收到新的选项对象，并仅将更改的属性应用到现有画布。

## 预设与自定义覆盖

加载预设，然后合并自定义覆盖以实现定制效果：

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // 将雪花颜色覆盖为蓝色
      color: { value: "#88ccff" },
      // 增加雪花数量
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

预设为每个选项提供默认值，你的覆盖值会合并到其上——你只需指定要更改的属性。

## 故障排除

| 症状                        | 原因                                   | 解决方法                                                              |
| --------------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| 空白 DOM 元素               | 渲染前引擎未初始化                     | 将 `<Particles>` 包裹在 `<Show when={initialized()}>` 中              |
| 没有可见粒子                | 缺少 `move.enable` 或 `number.value`   | 确保 `particles.move.enable: true` 且 `particles.number.value > 0`    |
| 画布在内容后面              | fullScreen 缺少 `zIndex`               | 使用 `fullScreen: { zIndex: -1 }`                                     |
| 选项更改未反映              | 对象引用未更改                         | 将选项包裹在函数或 store 中；避免使用静态对象                          |
| 引擎未找到                  | 缺少 `loadFull` 或 `loadSlim` 导入     | 安装 `tsparticles` 或 `@tsparticles/slim` 并调用 `loadFull(engine)`   |

## 下一步

- 探索[配置游乐场](/playground/configs)以获取现成的配置。
- 阅读[选项参考](/options/)以获取完整的参数列表。
- 在 GitHub 上浏览 [SolidJS 源码](https://github.com/tsparticles/solid) 了解封装内部实现。
