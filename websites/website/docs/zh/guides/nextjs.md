---
title: Next.js Integration
description: Step-by-step guide to integrating tsParticles into a Next.js application using the App Router.
---

# Next.js Integration

This guide covers integrating tsParticles into a Next.js project using the **App Router** (Next.js 13+). For the legacy Pages Router, see the [Legacy Pages Router](#legacy-pages-router) section at the bottom.

## Installation

Install the `@tsparticles/react` wrapper and the full `tsparticles` engine (or a slim bundle for smaller builds):

```bash
npm install @tsparticles/react tsparticles
```

If you prefer the smaller `@tsparticles/slim` bundle:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Basic Usage (App Router)

Next.js App Router components are server-side by default. Since tsParticles requires the browser `canvas` API, you must mark the component with the `"use client"` directive.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Particles loaded", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Create this as `components/particles-background.tsx` and import it into any page or layout. Because the file starts with `"use client"`, it will be rendered on the client — exactly where tsParticles needs to be.

## Theme Switching

Combine tsParticles with Next.js theme toggles by deriving the options from the current theme state:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </>
  );
}
```

The `options` object is recreated via `useMemo` whenever `theme` changes, so the canvas updates automatically.

## Confetti Effect

Use the `@tsparticles/preset-confetti` to trigger celebratory confetti on events like button clicks:

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        Celebrate!
      </button>
    </>
  );
}
```

The `init` callback loads the confetti preset into the engine before the particles are created.

## Fireworks Effect

Similarly, the fireworks preset creates a spectacular firework display:

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## Full TypeScript Example with Container Ref

Access the `Container` instance to control the animation programmatically (play, pause, destroy, export image):

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
}
```

Key points:

- `particlesInit` loads the engine features (only runs once per component mount).
- `particlesLoaded` fires every time the container is fully initialized.
- `containerRef` holds the `Container` instance so you can call its methods later.

## Performance: useMemo and useCallback

Always wrap static or rarely-changing options in `useMemo` and event handlers in `useCallback` to prevent unnecessary re-renders of the canvas:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Stable callback — never recreates unless deps change
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Container ready", container?.id);
  }, []);

  // Stable options object — prevents canvas re-initialization
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>Add 20 particles</button>
    </div>
  );
}
```

Without these optimizations, every parent re-render would create a new `options` object, causing the canvas to be recreated.

## Page Integration

Add a particle background to a page layout without affecting the page content:

```tsx
// app/layout.tsx (server component)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Use `dynamic()` with `ssr: false` to ensure the component never runs during server-side rendering. The particle canvas sits behind the main content via CSS `z-index`.

## Multiple Instances

You can render several independent `Particles` components on the same page, each with its own configuration:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

Each `Particles` component creates an independent canvas with its own animation loop. Set `fullScreen: false` and give each a fixed height so they coexist in the document flow.

## Legacy Pages Router

If you are using the Next.js **Pages Router** (`pages/` directory), the approach is similar but without the `"use client"` directive. Instead, you can use a dynamic import in the page component:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Welcome</h1>
    </div>
  );
};

export default Home;
```

The component itself (`components/particles-component.tsx`) is a plain React component:

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Note that the Pages Router does **not** require `"use client"` because page components are already client-rendered by default.

## Troubleshooting

| Symptom                      | Cause                                   | Fix                                                              |
| ---------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| Blank white page             | SSR rendering a canvas-dependent module | Use `dynamic(..., { ssr: false })` or wrap in a client component |
| Canvas not showing           | Container has zero height               | Set `fullScreen: { zIndex: -1 }` or give it explicit dimensions  |
| Options change not reflected | New object reference not created        | Use `useMemo` with proper dependency array                       |
| Preset not working           | Preset not loaded before container init | Call `loadXPreset(engine)` inside the `init` callback            |
| Theme change ignored         | `@tsparticles/plugin-themes` not loaded | Install and register the plugin during engine initialization     |

## Reactive Behavior

The `<Particles>` component reacts to prop changes:

- **`id`**, **`options`**, or **`url`** change → destroy current container and reload with new values.
- **`theme`** change → `loadTheme` on the existing container (requires `@tsparticles/plugin-themes`; safe no-op otherwise).

On component unmount, the particles container is automatically destroyed.

## Next Steps

- Browse the [Interactive Demos](/demos/) for ready-made configurations.
- Read the full [Options Reference](/options/) for every available parameter.
- Check the [Presets](/demos/presets) page for more pre-built presets like snow, stars, and firefly.
