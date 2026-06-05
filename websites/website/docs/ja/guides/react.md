---
title: React ガイド
description: "@tsparticles/react を使用して tsParticles を React と統合するための完全ガイド。"
---

# React ガイド

## 目次

1. [インストール](#installation)
2. [基本的な使い方](#basic-usage)
3. [クラッカーエフェクト](#confetti-effect)
4. [花火エフェクト](#fireworks-effect)
5. [雪エフェクト](#snow-effect)
6. [インタラクティブリンク](#interactive-links)
7. [テーマ切り替え](#theme-switching)
8. [ParticlesProvider](#particlesprovider)
9. [パフォーマンス最適化](#performance-optimization)
10. [カスタム設定](#custom-configuration)

---

## インストール

```bash
npm install @tsparticles/react tsparticles
```

または Yarn を使用:

```bash
yarn add @tsparticles/react tsparticles
```

`@tsparticles/react` は公式の React ラッパーです。`tsparticles` パッケージはコアエンジンです。

---

## 基本的な使い方

最もシンプルな設定: options オブジェクトを使用して `<Particles />` コンポーネントをレンダリングします。

```jsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function App() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded", container);
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

**重要**: `<Particles />` コンポーネントは、最初にエンジンを初期化する必要があります。`@tsparticles/react` の `initParticlesEngine` または `<ParticlesProvider>` を使用して、コンポーネントをレンダリングする前にプリセットをロードします。

---

## クラッカーエフェクト

クラッカープリセットを使用してクラッカーバーストをレンダリングします。

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

クラッカープリセットがロードされていることを確認してください:

```bash
npm install @tsparticles/preset-confetti
```

次に、アプリのエントリーポイントで登録します:

```jsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

initParticlesEngine(async (engine) => {
  await loadConfettiPreset(engine);
});
```

---

## 花火エフェクト

フルスクリーンの花火ディスプレイ。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Fireworks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Fireworks loaded", container);
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

プリセットをインストールします:

```bash
npm install @tsparticles/preset-fireworks
```

---

## 雪エフェクト

雪プリセットを使用した優しい降雪。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Snow() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Snow loaded", container);
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

プリセットをインストールします:

```bash
npm install @tsparticles/preset-snow
```

---

## インタラクティブリンク

マウスホバーでのグラブとクリックでのプッシュを備えた接続ノードネットワーク。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function InteractiveLinks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Interactive links loaded", container);
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

## テーマ切り替え

複数のテーマを定義し、ボタンクリックで切り替えます。

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
          Dark
        </button>
        <button onClick={() => switchTheme("light")} style={btnStyle(currentTheme === "light")}>
          Light
        </button>
        <button onClick={() => switchTheme("forest")} style={btnStyle(currentTheme === "forest")}>
          Forest
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

`ParticlesProvider` を使用して、アプリのルートでエンジンを1回初期化します。これは、複数のパーティクルコンポーネントがある場合やカスタムプリセットを使用する場合に推奨されるアプローチです。

```jsx
// App.jsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Home from "./Home";

const engineInit = async (engine) => {
  await loadSlim(engine);
  // ここで追加のプリセットをロード:
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

ツリーを `ParticlesProvider` でラップすると、すべての子 `<Particles />` コンポーネントは同じエンジンインスタンスを継承します。これにより、マウントごとにエンジンを再初期化する必要がなくなります。

---

## パフォーマンス最適化

不要な再レンダリングを防ぐために、コールバックとオプションを常にメモ化します。

```jsx
import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";

export default function PerformanceExample() {
  const [visible, setVisible] = useState(true);

  // コールバックをメモ化 — レンダリング間で安定した参照
  const particlesLoaded = useCallback(async (container) => {
    // コンテナマウントごとに1回呼び出される
    console.log("Container ready", container.id);
  }, []);

  // オプションオブジェクトをメモ化 — 依存関係が変更されたときのみ再計算
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

  // 低電力デバイスでキャンバス解像度を下げる
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
      <button onClick={() => setVisible((v) => !v)}>{visible ? "Hide" : "Show"} Particles</button>
      {visible && <Particles id="perf-particles" particlesLoaded={particlesLoaded} options={responsiveOptions} />}
    </div>
  );
}
```

**重要なヒント**:

- 常に `useMemo` を `options` オブジェクトに使用します。
- 常に `useCallback` を `particlesLoaded` ハンドラーに使用します。
- モバイルでは `fpsLimit` を下げます。
- 2倍を超えるピクセル比のデバイスでは `detectRetina: false` を設定してキャンバスサイズを半分にします。
- 画面外のときは条件付きで `<Particles />` をアンマウントします。

---

## カスタム設定

複数のシェイプ、インタラクティビティ、テーマ、グラデーション背景を組み合わせた完全なカスタム例。

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function CustomConfig() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Custom config loaded", container);
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

これで、React で tsParticles を使用するためのコアパターンをカバーしました。各例は自己完結型で、コンポーネントファイルにすぐに追加できます。
