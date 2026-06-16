---
title: Lit
description: 公式の @tsparticles/lit Web コンポーネントラッパーを使用して、Lit と tsParticles を統合します。
---

# Lit インテグレーション

`@tsparticles/lit` パッケージは、Lit で構築された `<lit-particles>` カスタム要素を提供し、任意の Lit プロジェクトまたはプレーン HTML ページで tsParticles を宣言的に使用できるようにします。

## インストール

```bash
npm install @tsparticles/lit tsparticles
```

このパッケージは完全に型付けされており、パーティクルオプションをリアクティブに更新するための Lit のリアクティブコントローラーパターンが含まれています。

## エンジンの初期化

`<lit-particles>` コンポーネントを登録またはアプリケーションにインポートする前に、`initParticlesEngine` を呼び出します。これは正確に1回実行する必要があります。

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

最適化されたバンドルサイズのために、プロジェクトに必要な機能のみをインポートします:

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadConfettiPreset(engine);
});
```

## 基本的な使い方

エンジンが初期化された後、任意の Lit テンプレートまたは HTML ファイルで `<lit-particles>` 要素を使用します:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      number: { value: 60 },
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
      },
      move: { enable: true, speed: 2 },
    },
  };

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

`.options` 構文（先頭のドット付き）は Lit のプロパティバインディングで、オブジェクトが属性としてシリアライズされるのではなく、参照によって渡されることを保証します。

## プレーン HTML での使用

`@tsparticles/lit` がバンドルまたはロードされると、この要素はプレーン HTML でも動作します:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="bundle.js"></script>
  </head>
  <body>
    <lit-particles id="tsparticles"></lit-particles>
  </body>
</html>
```

JSON 属性として最小限の options オブジェクトを渡すこともできます:

```html
<lit-particles
  id="tsparticles"
  options='{"background":{"color":"#000"},"particles":{"number":{"value":30}}}'
></lit-particles>
```

## カスタム設定

完全な tsParticles 設定を Lit プロパティとして渡します:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-particles")
class MyParticles extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff"],
      },
      links: {
        color: "#ffffff",
        enable: true,
        opacity: 0.3,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
      },
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
        },
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

## イベント処理

`<lit-particles>` 要素によってディスパッチされる `particles-loaded` カスタムイベントをリッスンします:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { Container } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private handleParticlesLoaded(e: CustomEvent<Container>) {
    const container = e.detail;
    console.log("Particles loaded:", container);
    container?.refresh();
  }

  render() {
    return html` <lit-particles id="tsparticles" @particles-loaded="${this.handleParticlesLoaded}"> </lit-particles> `;
  }
}
```

## TypeScript の例

`initParticlesEngine`、リアクティブオプション、およびイベント処理を備えた完全に型付けされた Lit 要素:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import "@tsparticles/lit";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

@customElement("particles-background")
class ParticlesBackground extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {};

  @property({ type: Boolean, attribute: "fullscreen" })
  fullscreen = true;

  protected onParticlesLoaded(e: CustomEvent<Container>) {
    console.log("Container ready:", e.detail.id);
  }

  render() {
    return html`
      <lit-particles
        id="particles-bg"
        .options="${this.options}"
        ?fullScreen="${this.fullscreen}"
        @particles-loaded="${this.onParticlesLoaded}"
      >
      </lit-particles>
    `;
  }
}
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## 動的更新

`<lit-particles>` は Lit のリアクティブプロパティを使用するため、`options` プロパティを変更するとパーティクルが自動的に更新されます:

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("dynamic-particles")
class DynamicParticles extends LitElement {
  @state()
  private theme: "light" | "dark" = "dark";

  private get options(): ISourceOptions {
    return this.theme === "dark"
      ? {
          background: { color: "#0d1117" },
          particles: { color: { value: "#58a6ff" } },
        }
      : {
          background: { color: "#ffffff" },
          particles: { color: { value: "#0969da" } },
        };
  }

  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
  }

  render() {
    return html`
      <button @click="${this.toggleTheme}">Switch to ${this.theme === "dark" ? "Light" : "Dark"}</button>
      <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles>
    `;
  }
}
```

コンポーネントは `options` プロパティを監視し、変更されるたびに内部的に `refresh()` を呼び出し、実行時にシームレスにパーティクル設定を更新します。
