---
title: Integración con Next.js
description: Guía paso a paso para integrar tsParticles en una aplicación Next.js usando el App Router.
---

# Integración con Next.js

Esta guía cubre la integración de tsParticles en un proyecto Next.js usando el **App Router** (Next.js 13+). Para el Pages Router heredado, consulta la sección [Pages Router Heredado](#pages-router-heredado) al final.

## Instalación

Instala el wrapper `@tsparticles/react` y el motor completo `tsparticles` (o un paquete slim para builds más pequeños):

```bash
npm install @tsparticles/react tsparticles
```

Si prefieres el paquete más pequeño `@tsparticles/slim`:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Uso Básico (App Router)

Los componentes del App Router de Next.js son del lado del servidor por defecto. Dado que tsParticles requiere la API `canvas` del navegador, debes marcar el componente con la directiva `"use client"`.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Partículas cargadas", container);
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

Crea esto como `components/particles-background.tsx` e impórtalo en cualquier página o layout. Como el archivo comienza con `"use client"`, se renderizará en el cliente — exactamente donde tsParticles necesita estar.

## Cambio de Tema

Combina tsParticles con alternadores de tema de Next.js derivando las opciones del estado actual del tema:

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
        Cambiar a modo {theme === "dark" ? "Claro" : "Oscuro"}
      </button>
    </>
  );
}
```

El objeto `options` se recrea mediante `useMemo` cada vez que `theme` cambia, por lo que el canvas se actualiza automáticamente.

## Efecto Confeti

Usa el preset `@tsparticles/preset-confetti` para lanzar confeti de celebración en eventos como clics de botón:

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
        ¡Celebrar!
      </button>
    </>
  );
}
```

El callback `init` carga el preset de confeti en el motor antes de que se creen las partículas.

## Efecto Fuegos Artificiales

Del mismo modo, el preset de fuegos artificiales crea un espectacular despliegue de fuegos artificiales:

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

## Ejemplo TypeScript Completo con Referencia al Contenedor

Accede a la instancia de `Container` para controlar la animación programáticamente (reproducir, pausar, destruir, exportar imagen):

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
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handlePlay}>Reanudar</button>
      </div>
    </div>
  );
}
```

Puntos clave:

- `particlesInit` carga las funcionalidades del motor (solo se ejecuta una vez por montaje del componente).
- `particlesLoaded` se dispara cada vez que el contenedor se inicializa completamente.
- `containerRef` mantiene la instancia de `Container` para que puedas llamar a sus métodos más tarde.

## Rendimiento: useMemo y useCallback

Siempre envuelve opciones estáticas o que cambian raramente en `useMemo` y los manejadores de eventos en `useCallback` para evitar renderizaciones innecesarias del canvas:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Callback estable — nunca se recrea a menos que las dependencias cambien
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Contenedor listo", container?.id);
  }, []);

  // Objeto de opciones estable — evita la reinicialización del canvas
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
      <button onClick={() => setParticlesCount((c) => c + 20)}>Añadir 20 partículas</button>
    </div>
  );
}
```

Sin estas optimizaciones, cada rerenderizado del padre crearía un nuevo objeto `options`, provocando que el canvas se recreara.

## Integración en Páginas

Añade un fondo de partículas a un layout de página sin afectar el contenido de la página:

```tsx
// app/layout.tsx (componente servidor)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Usa `dynamic()` con `ssr: false` para asegurar que el componente nunca se ejecute durante el renderizado del lado del servidor. El canvas de partículas se sitúa detrás del contenido principal mediante CSS `z-index`.

## Múltiples Instancias

Puedes renderizar varios componentes `Particles` independientes en la misma página, cada uno con su propia configuración:

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

Cada componente `Particles` crea un canvas independiente con su propio bucle de animación. Establece `fullScreen: false` y asigna a cada uno una altura fija para que coexistan en el flujo del documento.

## Pages Router Heredado

Si estás usando el **Pages Router** de Next.js (directorio `pages/`), el enfoque es similar pero sin la directiva `"use client"`. En su lugar, puedes usar una importación dinámica en el componente de la página:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Bienvenido</h1>
    </div>
  );
};

export default Home;
```

El componente en sí (`components/particles-component.tsx`) es un componente React normal:

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

Ten en cuenta que el Pages Router **no** requiere `"use client"` porque los componentes de página ya se renderizan en el cliente por defecto.

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solución de Problemas

| Síntoma                             | Causa                                                           | Solución                                                                    |
| ----------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Página blanca vacía                 | SSR renderizando un módulo dependiente de canvas                | Usa `dynamic(..., { ssr: false })` o envuélvelo en un componente de cliente |
| Canvas no se muestra                | El contenedor tiene altura cero                                 | Establece `fullScreen: { zIndex: -1 }` o asígnale dimensiones explícitas    |
| El cambio de opciones no se refleja | No se creó una nueva referencia del objeto                      | Usa `useMemo` con el arreglo de dependencias adecuado                       |
| El preset no funciona               | El preset no se cargó antes de la inicialización del contenedor | Llama a `loadXPreset(engine)` dentro del callback `init`                    |

## Próximos Pasos

- Explora las [Demostraciones Interactivas](/demos/) para configuraciones listas para usar.
- Lee la [Referencia de Opciones](/options/) para cada parámetro disponible.
- Consulta la página de [Presets](/demos/presets) para más presets preconstruidos como nieve, estrellas y luciérnagas.
