---
title: Lit
description: Integrate tsParticles with Lit using the official @tsparticles/lit web component wrapper.
---

# Lit Integration

The `@tsparticles/lit` package provides a `<lit-particles>` custom element built with Lit, allowing you to use tsParticles declaratively in any Lit project or plain HTML page.

## Installation

```bash
npm install @tsparticles/lit tsparticles
```

The package is fully typed and includes Lit's reactive controller patterns for reactively updating particle options.

## Engine Initialization

Call `initParticlesEngine` before registering the `<lit-particles>` component or importing it in your application. This must happen exactly once.

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

For optimized bundle sizes, import only the features your project needs:

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadConfettiPreset(engine);
});
```

## Basic Usage

After the engine is initialized, use the `<lit-particles>` element in any Lit template or HTML file:

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

The `.options` syntax (with leading dot) is Lit's property binding, ensuring the object is passed by reference rather than serialized as an attribute.

## Plain HTML Usage

Once `@tsparticles/lit` is bundled or loaded, the element works in plain HTML too:

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

You can pass a minimal options object as a JSON attribute:

```html
<lit-particles
  id="tsparticles"
  options='{"background":{"color":"#000"},"particles":{"number":{"value":30}}}'
></lit-particles>
```

## Custom Configuration

Pass a full tsParticles configuration as a Lit property:

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

## Event Handling

Listen for the `particles-loaded` custom event dispatched by the `<lit-particles>` element:

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

## TypeScript Example

A fully typed Lit element with `initParticlesEngine`, reactive options, and event handling:

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

## Dynamic Updates

Because `<lit-particles>` uses Lit's reactive properties, changing the `options` property automatically updates the particles:

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

The component watches the `options` property and calls `refresh()` internally whenever it changes, seamlessly updating the particle configuration at runtime.
