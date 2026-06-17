---
title: Qwik
description: Integrate tsParticles with Qwik using the official @tsparticles/qwik wrapper.
---

# Qwik Integration

The `@tsparticles/qwik` package provides a `<Particles>` component optimized for Qwik's resumability model. It uses `useVisibleTask$` for lazy initialization and signals for reactive updates.

## Installation

```bash
npm install @tsparticles/qwik tsparticles
```

TypeScript declarations are included — no additional type packages required.

## Engine Initialization

In Qwik, the engine must be initialized inside a `useVisibleTask$` block to ensure it runs only on the client (never during SSR). Use a signal to track readiness:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return <>{engineReady.value && <Particles id="tsparticles" options={{}} />}</>;
});
```

## Basic Usage

Once the engine is ready, render the `<Particles>` component with your configuration:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

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

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Conditional Rendering

The `engineReady` signal pattern ensures the `<Particles>` component is only mounted after the engine is fully initialized. This prevents hydration mismatches between server and client:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const loading = useSignal(true);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
    loading.value = false;
  });

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
      {engineReady.value && (
        <Particles
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
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

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

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Custom Configuration

A complete configuration with animations, multiple colors, and rich interactivity:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

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
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        value: 120,
        density: { enable: true },
      },
      opacity: {
        value: 0.8,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
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

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## TypeScript

The `@tsparticles/qwik` package exports full types. Use `ISourceOptions` for type-safe configurations and `Engine` for the initialization callback:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Lazy Loading

Qwik's resumability model means the particles code is only loaded and executed when the component becomes visible in the viewport. The `useVisibleTask$` hook triggers engine initialization, and the `<Particles>` component itself is code-split automatically by Qwik when imported:

```tsx
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return (
    <div>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
          }}
        />
      )}
    </div>
  );
});
```

Use the `$` suffix convention for Qwik-optimized event handlers when wiring callbacks:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const containerRef = useSignal<Container | undefined>();

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const handleParticlesLoaded = $((container?: Container) => {
    containerRef.value = container;
    console.log("Particles loaded:", container?.id);
  });

  return (
    <>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{ background: { color: "#0d1117" } }}
          particlesLoaded={handleParticlesLoaded}
        />
      )}
    </>
  );
});
```

This approach ensures your particle animations are fully tree-shakeable and only shipped to clients when needed.

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.
