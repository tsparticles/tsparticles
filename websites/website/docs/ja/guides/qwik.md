---
title: Qwik
description: Integrate tsParticles with Qwik using the official @tsparticles/qwik wrapper.
---

# Qwik Integration

The `@tsparticles/qwik` package provides a `<Particles>` component optimized for Qwik's resumability model. It uses `useVisibleTask$` for lazy initialization and signals for reactive updates.

## Installation

```bash
npm install @tsparticles/qwik @tsparticles/engine tsparticles
```

TypeScript declarations are included — no additional type packages required.

## Engine Initialization

Create and initialize the engine inside a `useVisibleTask$` block to ensure it runs only on the client (never during SSR). Keep the ready engine in a signal and mark it with noSerialize:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={{}} />}</>;
});
```

## Basic Usage

Once the engine is ready, render the `<Particles>` component with your configuration:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  const options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
      },
    },
  };

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={options} />}</>;
});
```

## Conditional Rendering

The `readyEngine` signal pattern ensures the `<Particles>` component is only mounted after the engine is fully initialized. This prevents hydration mismatches between server and client:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();
  const loading = useSignal(true);

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
      loading.value = false;
    },
    { strategy: "document-ready" },
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {loading.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#888",
          }}
        >
          Loading particles...
        </div>
      )}
      {readyEngine.value && (
        <Particles
          engine={readyEngine.value}
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
              color: { value: "#58a6ff" },
              links: { enable: true, color: "#58a6ff", distance: 150 },
              move: { enable: true, speed: 2 },
              number: { value: 80 },
            },
          }}
        />
      )}
    </div>
  );
});
```

## Interactive Particles

Enable hover and click interactions by adding the `interactivity` section to your options:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  const options = {
    background: { color: "#0d1117" },
    fullScreen: { enable: true },
    particles: {
      color: { value: "#58a6ff" },
      links: { enable: true, color: "#58a6ff", distance: 150 },
      move: { enable: true, speed: 1.5 },
      number: { value: 100 },
      size: { value: { min: 1, max: 4 } },
      opacity: { value: 0.6 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
  };

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={options} />}</>;
});
```

## Custom Configuration

A complete configuration with animations, multiple colors, and rich interactivity:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine, type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  const options: ISourceOptions = {
    background: { color: "#0d1117" },
    fpsLimit: 60,
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff", "#f3f333"],
      },
      links: {
        color: "random",
        enable: true,
        opacity: 0.3,
        distance: 120,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
      },
      number: {
        value: 120,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 0.5,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={options} />}</>;
});
```

## TypeScript

The `@tsparticles/qwik` package exports full types. Use `ISourceOptions` for type-safe configurations and `Engine` for the client-side signal:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine, type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  const options: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
    },
  };

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={options} />}</>;
});
```

## Lazy Loading

Import the Full bundle dynamically inside the visible task to defer loading it until the task runs in the browser:

```tsx
import { component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine } from "@tsparticles/engine";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const { loadFull } = await import("tsparticles");
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  return <>{readyEngine.value && <Particles engine={readyEngine.value} id="tsparticles" options={{}} />}</>;
});
```

Use the `$` suffix convention for Qwik-optimized event handlers when wiring callbacks:

```tsx
import { $, component$, noSerialize, useSignal, useVisibleTask$, type NoSerialize } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { createEngine, type Engine, type Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<NoSerialize<Engine>>();

  useVisibleTask$(
    async () => {
      const particlesEngine = createEngine();
      await initParticlesEngine(particlesEngine, loadFull);
      readyEngine.value = noSerialize(particlesEngine);
    },
    { strategy: "document-ready" },
  );

  const handleParticlesLoaded = $(async (container?: Container) => {
    console.log("Particles loaded:", container?.id);
  });

  return (
    <>
      {readyEngine.value && (
        <Particles
          engine={readyEngine.value}
          id="tsparticles"
          options={{ background: { color: "#0d1117" } }}
          loaded={handleParticlesLoaded}
        />
      )}
    </>
  );
});
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.
