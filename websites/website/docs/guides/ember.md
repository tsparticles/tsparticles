---
title: Ember Guide
description: Complete guide for integrating tsParticles with Ember.js applications.
---

# Ember Guide

## Table of Contents

1. [Installation](#installation)
2. [Engine Initialization](#engine-initialization)
3. [Basic Usage](#basic-usage)
4. [Custom Configuration](#custom-configuration)
5. [Event Handling](#event-handling)
6. [Conditional Rendering](#conditional-rendering)
7. [TypeScript Example](#typescript-example)

---

## Installation

Install the Ember addon and the tsParticles engine via ember-cli:

```bash
ember install @tsparticles/ember
```

This will install the addon and its peer dependency `tsparticles`. You can optionally add preset packages:

```bash
npm install @tsparticles/slim
```

---

## Engine Initialization

The addon exports an `initParticlesEngine` utility that you call once at the application level. It receives an async callback where you load the features, presets, or shapes your app needs.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Call this during application bootstrap
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Typical locations for this call are the application route's `beforeModel` hook, an application controller's constructor, or an instance initializer. The engine singleton is initialized once and shared across all `<Particles>` components in your app.

---

## Basic Usage

After initializing the engine, use the `<Particles>` component in any template. Pass your particle configuration via the `@options` argument.

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

## Custom Configuration

Build a richer configuration with interactivity, multiple shapes, and responsive density.

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

## Event Handling

The `<Particles>` component fires a `@particlesLoaded` action when the container has finished initializing and the first frame is rendered. Use this to access the `Container` instance for programmatic control.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container?: Container) {
    console.log("Particles loaded", container?.id);

    // Programmatic control example:
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

You can also use the callback pattern inline with a template helper if you prefer not to define a separate action.

---

## Conditional Rendering

Use Ember's `{{if}}` helper together with a `@tracked` property to control when the `<Particles>` component renders. This is useful when the engine initialization is asynchronous and you want to avoid rendering the component before the engine is ready.

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

The `@tracked` decorator ensures the template re-renders automatically once the promise resolves.

---

## TypeScript Example

Below is a complete, typed Ember application controller demonstrating the full integration pattern with slim preset, interactivity, and lifecycle management.

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

## Reactive Behavior

The component reloads particles when `@options` or `@url` changes. Changes to `@theme` apply the theme via `loadTheme` without a full reload — this requires the optional `@tsparticles/plugin-themes` package (safe no-op otherwise).

## Cleanup

When the element is removed from the DOM, the particles container is automatically destroyed, stopping all animations and freeing resources.

---

You now have everything needed to integrate tsParticles into an Ember.js application. Each example is self-contained and ready to be copied into your project.
