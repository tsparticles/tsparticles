---
title: Ember ガイド
description: tsParticles を Ember.js アプリケーションに統合するための完全ガイド。
---

# Ember ガイド

## 目次

1. [インストール](#installation)
2. [エンジンの初期化](#engine-initialization)
3. [基本的な使い方](#basic-usage)
4. [カスタム設定](#custom-configuration)
5. [イベント処理](#event-handling)
6. [条件付きレンダリング](#conditional-rendering)
7. [TypeScript の例](#typescript-example)

---

## インストール

ember-cli を使用して Ember アドオンと tsParticles エンジンをインストールします:

```bash
ember install @tsparticles/ember
```

これにより、アドオンとそのピア依存関係である `tsparticles` がインストールされます。オプションでプリセットパッケージを追加できます:

```bash
npm install @tsparticles/slim
```

---

## エンジンの初期化

このアドオンは、アプリケーションレベルで1回呼び出す `initParticlesEngine` ユーティリティをエクスポートします。アプリが必要とする機能、プリセット、またはシェイプをロードする非同期コールバックを受け取ります。

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// アプリケーションブートストラップ時にこれを呼び出す
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

この呼び出しの典型的な場所は、アプリケーションルートの `beforeModel` フック、アプリケーションコントローラーのコンストラクター、またはインスタンス初期化子です。エンジンシングルトンは1回初期化され、アプリ内のすべての `<Particles>` コンポーネント間で共有されます。

---

## 基本的な使い方

エンジンを初期化した後、任意のテンプレートで `<Particles>` コンポーネントを使用します。パーティクル設定は `@options` 引数で渡します。

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

## カスタム設定

インタラクティビティ、複数のシェイプタイプ、レスポンシブ密度を備えた、よりリッチな設定を構築します。

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

## イベント処理

`<Particles>` コンポーネントは、コンテナの初期化が完了し、最初のフレームがレンダリングされたときに `@particlesLoaded` アクションを発生させます。これを使用して、プログラム制御のために `Container` インスタンスにアクセスします。

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Particles loaded", container.id);

    // プログラム制御の例:
    setTimeout(() => {
      container.pause();
      console.log("Particles paused after 5 seconds");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

個別のアクションを定義したくない場合は、テンプレートヘルパーを使用してインラインでコールバックパターンを使用することもできます。

---

## 条件付きレンダリング

Ember の `{{if}}` ヘルパーを `@tracked` プロパティと組み合わせて使用し、`<Particles>` コンポーネントがレンダリングされるタイミングを制御します。これは、エンジンの初期化が非同期であり、エンジンの準備ができる前にコンポーネントがレンダリングされるのを防ぎたい場合に便利です。

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
  <p>Loading particles...</p>
{{/if}}
```

`@tracked` デコレーターにより、プロミスが解決されるとテンプレートが自動的に再レンダリングされます。

---

## TypeScript の例

以下は、スリムプリセット、インタラクティビティ、およびライフサイクル管理を使用した完全な統合パターンを示す、型付けされた完全な Ember アプリケーションコントローラーです。

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
  private handleParticlesLoaded(container: Container): void {
    this.container = container;
    console.log("Particles loaded in container:", container.id);
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
    <p>Initializing particle engine...</p>
  </div>
{{/if}}
```

---

これで、tsParticles を Ember.js アプリケーションに統合するために必要なすべてが揃いました。各例は自己完結型で、プロジェクトにコピーしてすぐに使用できます。
