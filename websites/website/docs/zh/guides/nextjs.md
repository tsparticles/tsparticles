---
title: Next.js 集成
description: 将 tsParticles 集成到使用 App Router 的 Next.js 应用中的分步指南。
---

# Next.js 集成

本指南涵盖了将 tsParticles 集成到使用 **App Router**（Next.js 13+）的 Next.js 项目中的方法。对于传统的 Pages Router，请参阅底部的 [Legacy Pages Router](#legacy-pages-router) 部分。

## 安装

安装 `@tsparticles/react` 封装和完整的 `tsparticles` 引擎（或使用 slim 包以减小构建体积）：

```bash
npm install @tsparticles/react tsparticles
```

如果你偏好更小的 `@tsparticles/slim` 包：

```bash
npm install @tsparticles/react @tsparticles/slim
```

## 基本使用（App Router）

Next.js App Router 组件默认在服务端运行。由于 tsParticles 需要浏览器的 `canvas` API，你必须使用 `"use client"` 指令标记组件。

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("粒子已加载", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

创建此文件为 `components/particles-background.tsx`，然后导入到任何页面或布局中。由于文件以 `"use client"` 开头，它将在客户端渲染——这正是 tsParticles 需要的位置。

## 主题切换

通过从当前主题状态派生出选项，将 tsParticles 与 Next.js 主题切换结合：

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        切换到{theme === "dark" ? "浅色" : "深色"}模式
      </button>
    </>
  );
}
```

每当 `theme` 变化时，`options` 对象通过 `useMemo` 重新创建，画布会自动更新。

## 五彩纸屑效果

使用 `@tsparticles/preset-confetti` 在按钮点击等事件上触发庆祝性的五彩纸屑效果：

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        庆祝！
      </button>
    </>
  );
}
```

`init` 回调查在创建粒子之前将五彩纸屑预设加载到引擎中。

## 烟花效果

同样，烟花预设可以创建壮观的烟花展示：

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## 带容器引用的完整 TypeScript 示例

访问 `Container` 实例以编程方式控制动画（播放、暂停、销毁、导出图片）：

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>暂停</button>
        <button onClick={handlePlay}>播放</button>
      </div>
    </div>
  );
}
```

关键点：

- `particlesInit` 加载引擎功能（每个组件挂载只运行一次）。
- `particlesLoaded` 在容器完全初始化时触发。
- `containerRef` 保存 `Container` 实例，以便稍后调用其方法。

## 性能优化：useMemo 和 useCallback

始终将静态或少变化的选项包裹在 `useMemo` 中，将事件处理函数包裹在 `useCallback` 中，以防止画布不必要的重新渲染：

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // 稳定的回调——除非依赖项变化，否则不会重新创建
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("容器就绪", container?.id);
  }, []);

  // 稳定的选项对象——防止画布重新初始化
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>增加 20 个粒子</button>
    </div>
  );
}
```

如果没有这些优化，每次父组件重新渲染都会创建新的 `options` 对象，导致画布被重新创建。

## 页面集成

将粒子背景添加到页面布局中，而不影响页面内容：

```tsx
// app/layout.tsx（服务端组件）
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

使用 `dynamic()` 配合 `ssr: false` 确保组件永远不会在服务端渲染期间运行。粒子画布通过 CSS `z-index` 位于主内容之后。

## 多个实例

你可以在同一页面渲染多个独立的 `Particles` 组件，每个组件有自己的配置：

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

每个 `Particles` 组件创建一个独立的画布，拥有自己的动画循环。设置 `fullScreen: false` 并为每个组件指定固定高度，使它们共存于文档流中。

## Legacy Pages Router

如果你使用的是 Next.js **Pages Router**（`pages/` 目录），方法类似但不需要 `"use client"` 指令。相反，你可以在页面组件中使用动态导入：

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>欢迎</h1>
    </div>
  );
};

export default Home;
```

组件本身（`components/particles-component.tsx`）是一个纯 React 组件：

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

请注意，Pages Router **不**需要 `"use client"`，因为页面组件默认已在客户端渲染。

## 故障排除

| 症状           | 原因                         | 解决方法                                                 |
| -------------- | ---------------------------- | -------------------------------------------------------- |
| 空白白屏       | SSR 渲染了依赖 canvas 的模块 | 使用 `dynamic(..., { ssr: false })` 或包裹在客户端组件中 |
| 画布不显示     | 容器高度为零                 | 设置 `fullScreen: { zIndex: -1 }` 或指定明确尺寸         |
| 选项更改未反映 | 未创建新的对象引用           | 使用带正确依赖数组的 `useMemo`                           |
| 预设不生效     | 容器初始化前未加载预设       | 在 `init` 回调中调用 `loadXPreset(engine)`               |


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## 下一步

- 浏览[交互式演示](/demos/)以获取现成的配置。
- 阅读完整的[选项参考](/options/)了解每个可用参数。
- 查看[预设](/demos/presets)页面获取更多预构建预设，如雪花、星星和萤火虫。
