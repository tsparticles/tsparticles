---
title: React 指南
description: 使用 @tsparticles/react 将 tsParticles 与 React 集成的完整指南。
---

# React 指南

## 目录

1. [安装](#installation)
2. [基本使用](#basic-usage)
3. [五彩纸屑效果](#confetti-effect)
4. [烟花效果](#fireworks-effect)
5. [下雪效果](#snow-effect)
6. [交互式连线](#interactive-links)
7. [主题切换](#theme-switching)
8. [ParticlesProvider](#particlesprovider)
9. [性能优化](#performance-optimization)
10. [自定义配置](#custom-configuration)

---

## 安装

```bash
npm install @tsparticles/react tsparticles
```

或者使用 Yarn：

```bash
yarn add @tsparticles/react tsparticles
```

`@tsparticles/react` 是官方 React 封装。`tsparticles` 包是核心引擎。

---

## 基本使用

最简单的设置：使用选项对象渲染 `<Particles />` 组件。

```jsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function App() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("粒子容器已加载", container);
  }, []);

  const options = {
    fpsLimit: 120,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: 2,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#0d1117" },
  };

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

**重要**：`<Particles />` 组件需要先初始化引擎。使用 `@tsparticles/react` 中的 `initParticlesEngine` 或 `<ParticlesProvider>` 在渲染组件之前加载预设。

---

## 五彩纸屑效果

使用五彩纸屑预设渲染纸屑爆发效果。

```jsx
import Particles from "@tsparticles/react";

export default function Confetti() {
  const options = {
    preset: "confetti",
    fullScreen: { enable: true, zIndex: -1 },
    confetti: {
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    },
  };

  return <Particles id="confetti" options={options} />;
}
```

确保已加载五彩纸屑预设：

```bash
npm install @tsparticles/preset-confetti
```

然后在应用入口注册：

```jsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

initParticlesEngine(async (engine) => {
  await loadConfettiPreset(engine);
});
```

---

## 烟花效果

全屏烟花展示。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Fireworks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("烟花已加载", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks",
      fullScreen: { enable: true, zIndex: -1 },
      fireworks: {
        background: "#000000",
        brightness: 100,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        intensity: 30,
        life: { min: 4, max: 8 },
        traces: 20,
        explosion: { min: 30, max: 60 },
      },
    }),
    [],
  );

  return <Particles id="fireworks" particlesLoaded={particlesLoaded} options={options} />;
}
```

安装预设：

```bash
npm install @tsparticles/preset-fireworks
```

---

## 下雪效果

使用雪花预设的柔和飘雪效果。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Snow() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("雪花已加载", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "snow",
      fullScreen: { enable: true, zIndex: -1 },
      snow: {
        color: "#ffffff",
        opacity: { min: 0.3, max: 0.9 },
        size: { min: 1, max: 4 },
        speed: { min: 0.5, max: 2 },
        wobble: true,
      },
    }),
    [],
  );

  return <Particles id="snow" particlesLoaded={particlesLoaded} options={options} />;
}
```

安装预设：

```bash
npm install @tsparticles/preset-snow
```

---

## 交互式连线

一个连接的节点网络，支持鼠标悬停抓取和点击推送。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function InteractiveLinks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("交互式连线已加载", container);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.8 } },
          push: { quantity: 4 },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  return <Particles id="interactive-links" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

## 主题切换

定义多个主题并通过按钮点击切换。

```jsx
import { useCallback, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";

export default function ThemeSwitcher() {
  const containerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 60 },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 2, max: 5 } },
        links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
        move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
      },
      background: { color: "#0d1117" },
      themes: [
        {
          name: "dark",
          default: { value: true },
          options: {
            background: { color: "#0d1117" },
            particles: { color: { value: "#00d4ff" }, links: { color: "#00d4ff" } },
          },
        },
        {
          name: "light",
          options: {
            background: { color: "#f5f5f5" },
            particles: { color: { value: "#e74c3c" }, links: { color: "#333333" } },
          },
        },
        {
          name: "forest",
          options: {
            background: { color: "#1a3a1a" },
            particles: { color: { value: "#7ec850" }, links: { color: "#7ec850" } },
          },
        },
      ],
    }),
    [],
  );

  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    if (containerRef.current) {
      containerRef.current.loadTheme(theme);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Particles id="theme-switcher" particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={() => switchTheme("dark")} style={btnStyle(currentTheme === "dark")}>
          深色
        </button>
        <button onClick={() => switchTheme("light")} style={btnStyle(currentTheme === "light")}>
          浅色
        </button>
        <button onClick={() => switchTheme("forest")} style={btnStyle(currentTheme === "forest")}>
          森林
        </button>
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  background: active ? "#333" : "#666",
  color: "#fff",
  cursor: "pointer",
});
```

---

## ParticlesProvider

使用 `ParticlesProvider` 在应用根目录初始化引擎一次。当你有多个粒子组件或使用自定义预设时，这是推荐的方式。

```jsx
// App.jsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Home from "./Home";

const engineInit = async (engine) => {
  await loadSlim(engine);
  // 在此处加载其他预设：
  // await loadConfettiPreset(engine);
  // await loadFireworksPreset(engine);
  // await loadSnowPreset(engine);
};

export default function App() {
  return (
    <ParticlesProvider load={engineInit}>
      <Home />
    </ParticlesProvider>
  );
}
```

```jsx
// Home.jsx
import Particles from "@tsparticles/react";

export default function Home() {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          color: { value: "#ff6b6b" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 6 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      }}
    />
  );
}
```

当用 `ParticlesProvider` 包装你的组件树时，每个子 `<Particles />` 组件都继承同一个引擎实例。这避免了在每次挂载时重新初始化引擎。

---

## 性能优化

始终对回调和选项进行记忆化，以防止不必要的重新渲染。

```jsx
import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";

export default function PerformanceExample() {
  const [visible, setVisible] = useState(true);

  // 记忆化回调——在渲染间保持稳定引用
  const particlesLoaded = useCallback(async (container) => {
    // 每次容器挂载时调用一次
    console.log("容器就绪", container?.id);
  }, []);

  // 记忆化选项对象——仅当依赖项变化时重新计算
  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true } },
        color: { value: ["#ff6b6b", "#feca57", "#48dbfb"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 2, max: 5 } },
        links: {
          enable: true,
          distance: 120,
          color: "random",
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  // 在低功耗设备上降低画布分辨率
  const responsiveOptions = useMemo(
    () => ({
      ...options,
      detectRetina: window.devicePixelRatio <= 2,
      fpsLimit: window.innerWidth < 768 ? 30 : 60,
    }),
    [options],
  );

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>{visible ? "隐藏" : "显示"}粒子</button>
      {visible && <Particles id="perf-particles" particlesLoaded={particlesLoaded} options={responsiveOptions} />}
    </div>
  );
}
```

**关键提示**：

- 始终为 `options` 对象使用 `useMemo`。
- 始终为 `particlesLoaded` 处理程序使用 `useCallback`。
- 在移动设备上降低 `fpsLimit`。
- 在像素比 >2x 的设备上设置 `detectRetina: false`，可将画布大小减半。
- 在粒子不可见时有条件地卸载 `<Particles />`。

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## 自定义配置

一个完整的自定义示例，结合了多种形状、交互功能、主题和渐变背景。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function CustomConfig() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("自定义配置已加载", container);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, width: 800, height: 800 } },
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
      themes: [
        {
          name: "light",
          default: { value: false },
          options: {
            background: { color: "#f0f0f5" },
            particles: {
              color: { value: ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f"] },
              links: { color: "#333333", opacity: 0.2 },
              opacity: { value: { min: 0.5, max: 0.9 } },
            },
          },
        },
      ],
    }),
    [],
  );

  return <Particles id="custom-config" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

你现在已经涵盖了在 React 中使用 tsParticles 的核心模式。每个示例都是独立的，可直接放入组件文件中。
