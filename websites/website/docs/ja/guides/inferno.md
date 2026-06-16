---
title: Inferno ガイド
description: tsParticles を Inferno アプリケーションに統合するための完全ガイド。
---

# Inferno ガイド

## 目次

1. [インストール](#installation)
2. [基本的な使い方](#basic-usage)
3. [エンジンの初期化](#engine-initialization)
4. [カスタム設定](#custom-configuration)
5. [プリセットの使用](#preset-usage)
6. [コンポーネントパターン](#component-pattern)
7. [TypeScript の例](#typescript-example)

---

## インストール

npm を使用して Inferno ラッパーと tsParticles エンジンをインストールします:

```bash
npm install @tsparticles/inferno tsparticles
```

オプションで、より小さなバンドルのためにスリムプリセットをインストールします:

```bash
npm install @tsparticles/slim
```

---

## 基本的な使い方

`@tsparticles/inferno` パッケージは、`ParticlesProvider` と `Particles` の2つのアイテムをエクスポートします。パーティクルコンポーネントを `ParticlesProvider` でラップします。これはエンジン設定用の `init` コールバックを受け入れ、その後 `<Particles>` を使用してパーティクルキャンバスをレンダリングします。

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` はすべての `<Particles>` コンポーネントの祖先である必要があります。エンジンを1回初期化し、コンテキストを介してすべての子に提供します。

---

## エンジンの初期化

`ParticlesProvider` は、エンジンインスタンスを受け取る `init` プロップを受け入れます。ここで、アプリが必要とする機能、シェイプ、プリセット、またはアップデーターをロードします。

```tsx
// 軽量 — 円形パーティクル、基本的な移動、リンク
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// 完全な機能セット — すべてのシェイプ、インタラクション、エフェクト
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// プリセット固有 — クラッカー、花火、雪、星
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

コールバック内で動的な `import()` を使用すると、コード分割が可能になります。プリセットまたは機能モジュールは、パーティクルコンポーネントがマウントされたときにのみロードされます。

---

## カスタム設定

以下は、インタラクティビティ、複数のシェイプタイプ、およびダークグラデーション背景を備えた完全な機能を備えた設定です。

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## プリセットの使用

`@tsparticles/configs` パッケージは、`options` プロップにそのまま渡すことができる構築済みの設定を提供します。`ParticlesProvider` の init コールバックで対応するプリセットローダーと組み合わせます。

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`configs.confetti` は利用可能な任意のプリセットと交換可能です: `configs.basic`、`configs.fireworks`、`configs.snow`、`configs.stars` など。

---

## コンポーネントパターン

大規模なアプリケーションでは、パーティクルロジックを専用のコンポーネントに構造化し、`Container` インスタンスにアクセスするための `particlesLoaded` コールバックを備えます。

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

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

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("Particles loaded:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + Inferno</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## TypeScript の例

以下は、レスポンシブなパーティクル設定とフルスクリーン背景を備えた、完全な型付けされた Inferno アプリケーションです。

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
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

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("tsParticles container ready:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + Inferno</h1>
        <p>Full TypeScript integration</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

これで、tsParticles を Inferno アプリケーションに統合するために必要なすべてが揃いました。各例は自己完結型で、プロジェクトにコピーしてすぐに使用できます。
