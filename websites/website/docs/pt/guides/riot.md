---
title: Riot Guide
description: Complete guide for integrating tsParticles with Riot.js components.
---

# Riot Guide

## Table of Contents

1. [Installation](#installation)
2. [Engine Initialization](#engine-initialization)
3. [Basic Usage](#basic-usage)
4. [Conditional Rendering](#conditional-rendering)
5. [Preset Usage](#preset-usage)
6. [Custom Configuration](#custom-configuration)
7. [Full Component](#full-component)

---

## Installation

Install the Riot wrapper and the tsParticles engine via npm:

```bash
npm install riot @tsparticles/riot @tsparticles/engine @tsparticles/slim tsparticles
```

Optionally install preset configs for quick setup:

```bash
npm install @tsparticles/configs
```

---

## Engine Initialization

The Riot wrapper exports an `initParticlesEngine` function. Create an application-owned engine and pass it to the initializer. Call the initializer in your component's `onBeforeMount` lifecycle hook to prepare the engine before the particles component renders.

```html
<my-component>
  <script>
    import { createEngine } from "@tsparticles/engine";
    import { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    const engine = createEngine();

    export default {
      onBeforeMount() {
        if (typeof window !== "undefined") {
          void initParticlesEngine(engine, loadSlim);
        }
      },
    };
  </script>
</my-component>
```

Pass the same engine to each `<riot-particles>` instance that should share the same registrations.

---

## Basic Usage

After initializing the engine, use the `<riot-particles>` component in your template. Pass the engine and the configuration object as component props.

```html
<my-component>
  <riot-particles engine="{engine}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import { createEngine } from "@tsparticles/engine";
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    const engine = createEngine();

    export default {
      components: { "riot-particles": RiotParticles },
      engine,
      particlesConfig: {
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
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          void initParticlesEngine(engine, loadSlim);
        }
      },
    };
  </script>
</my-component>
```

---

## Conditional Rendering

Use Riot's `if={}` directive with a state property to delay rendering the particles component until the engine has finished initializing. This avoids layout shifts and ensures the component receives a ready engine.

```html
<my-component>
  <riot-particles engine="{engine}" if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import { createEngine } from "@tsparticles/engine";
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    const engine = createEngine();

    export default {
      components: { "riot-particles": RiotParticles },
      engine,
      particlesConfig: {
        particles: {
          number: { value: 50 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(engine, loadSlim).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Calling `this.update()` triggers a re-render so the `<riot-particles>` tag appears once the promise resolves.

---

## Preset Usage

The `@tsparticles/configs` package provides pre-built configurations for common effects like confetti, fireworks, snow, and stars. Use them directly as your options object.

```html
<my-component>
  <riot-particles engine="{engine}" if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import { createEngine } from "@tsparticles/engine";
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadFull } from "tsparticles";
    import configs from "@tsparticles/configs";

    const engine = createEngine();

    export default {
      components: { "riot-particles": RiotParticles },
      engine,
      particlesConfig: configs.basic,
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(engine, loadFull).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Available configurations include `basic`, `confetti`, `fireworks`, `snow`, `stars`, and more. If a configuration names a preset, register that preset on the same engine as well. For example, `configs.fireworks` requires `loadFireworksPreset`.

---

## Custom Configuration

Build a custom configuration with interactivity, multiple shapes, and advanced animation options.

```html
<my-component>
  <riot-particles engine="{engine}" if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import { createEngine } from "@tsparticles/engine";
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    const engine = createEngine();

    export default {
      components: { "riot-particles": RiotParticles },
      engine,
      particlesConfig: {
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
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(engine, loadSlim).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

---

## Full Component

Below is a complete `.riot` file that ties everything together: engine initialization in `onBeforeMount`, conditional rendering with state, and a configuration with hover and click interaction.

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    <riot-particles engine="{engine}" if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />
    <p if="{!state.particlesInitialized}">Loading particle engine...</p>
  </div>

  <script>
    import { createEngine } from "@tsparticles/engine";
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    const engine = createEngine();

    export default {
      components: { "riot-particles": RiotParticles },
      engine,
      state: {
        particlesInitialized: false,
      },
      particlesConfig: {
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
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(engine, loadSlim).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>

  <style scoped>
    .particles-wrapper {
      position: relative;
      min-height: 100vh;
    }
    .particles-wrapper h1 {
      position: relative;
      z-index: 1;
      color: #fff;
      text-align: center;
      padding-top: 2rem;
    }
    .particles-wrapper p {
      position: relative;
      z-index: 1;
      color: #aaa;
      text-align: center;
    }
  </style>
</my-component>
```

---

## Component API

| Prop      | Type             | Default         | Description                                                               |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | Canvas element id. Change triggers destroy+reload.                        |
| `options` | `ISourceOptions` | `{}`            | Particle configuration object. Change triggers destroy+reload.            |
| `url`     | `string`         | —               | Remote JSON config URL. Change triggers destroy+reload.                   |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

## Reactive Behavior

The `<riot-particles>` tag reloads particles when `id`, `options`, or `url` props change. The `theme` prop applies via `loadTheme` without a full reload — this requires the optional `@tsparticles/plugin-themes` package (safe no-op otherwise).

## Cleanup

When the `<riot-particles>` element is unmounted, the container is automatically destroyed — no orphan animations remain.

---

You now have everything needed to integrate tsParticles into a Riot.js application. Each example is self-contained and ready to be copied into your project.
