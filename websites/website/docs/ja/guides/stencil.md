---
title: Stencil ガイド
description: tsParticles を Stencil コンポーネントと統合するための完全ガイド。
---

# Stencil ガイド

## 目次

1. [インストール](#installation)
2. [カスタム要素の登録](#custom-elements-registration)
3. [基本的な使い方](#basic-usage)
4. [エンジンの初期化](#engine-initialization)
5. [カスタム設定](#custom-configuration)
6. [コンポーネントライフサイクル](#component-lifecycle)
7. [TypeScript の例](#typescript-example)

---

## インストール

npm を使用して Stencil ラッパーと tsParticles エンジンをインストールします:

```bash
npm install @tsparticles/stencil tsparticles
```

オプションで、手動設定を減らすためのプリセットバンドルをインストールします:

```bash
npm install @tsparticles/slim
```

---

## カスタム要素の登録

`@tsparticles/stencil` パッケージは、`<stencil-particles>` カスタム要素をブラウザに登録する `defineCustomElements` 関数を提供します。アプリ内のどこかでコンポーネントを使用する前に、1回呼び出します。

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// <stencil-particles> 要素を登録
defineCustomElements();
```

Stencil プロジェクトで遅延読み込みを使用する場合、レンダリング前に要素が利用可能になるように、`componentWillLoad` 内またはアプリのルートコンポーネントでこれを呼び出します。

---

## 基本的な使い方

カスタム要素が登録されたら、JSX で `options` プロップと、必要なエンジン機能をロードするための `init` コールバックを指定して `<stencil-particles>` を使用できます。

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

## エンジンの初期化

`init` プロップはエンジンインスタンスを受け取り、必要な機能をロードできます。ここで `loadSlim`、`loadFull`、または個々のアップデーター/インタラクションプラグインを呼び出すことをお勧めします。

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// オプション A: 軽量（円、基本移動、リンク）
init={async engine => { await loadSlim(engine); }}

// オプション B: 完全な機能セット（すべてのシェイプ、エフェクト、プリセット）
init={async engine => { await loadFull(engine); }}

// オプション C: プリセット（クラッカー、花火、雪、星）
init={async engine => { await loadConfettiPreset(engine); }}
```

エンジンインスタンスは、初期化後にも `container-id` 属性を通じてアクセス可能で、必要に応じて後でパーティクルシステムをプログラムで制御できます。

---

## カスタム設定

以下は、インタラクティビティ、複数のシェイプタイプ、ホバー/クリックモードを備えた完全な設定です。

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

## コンポーネントライフサイクル

Stencil では、1回限りのセットアップに推奨されるライフサイクルフックは `componentWillLoad` です。これを使用してカスタム要素を登録し、初期化状態を管理して、`<stencil-particles>` コンポーネントがエンジンの準備ができたときにのみレンダリングされるようにします。

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

`@State()` を使用すると、エンジンの準備ができたときにコンポーネントが再レンダリングされ、条件付きレンダリングにより、カスタム要素が定義される前にパーティクルコンテナがマウントされるのを防ぎます。

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## TypeScript の例

以下は、スリムプリセット、ホバーインタラクティビティ、カスタムダークテーマを統合した、完全な型付けの Stencil アプリケーションコンポーネントです。

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

  @Prop() readonly title: string = "Welcome";

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
    console.log("Particles container loaded:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Powered by tsParticles and Stencil</p>

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

`particlesLoaded` イベントは最初のフレームがレンダリングされた後に発生し、プログラム制御（再生、一時停止、停止、テーマの切り替え）のために `Container` インスタンスへのアクセスを提供します。

---

これで、tsParticles を Stencil アプリケーションに統合するために必要なすべてが揃いました。各例は自己完結型で、プロジェクトにコピーしてすぐに使用できます。
