---
title: Qwik
description: Integra tsParticles con Qwik usando el wrapper oficial @tsparticles/qwik.
---

# Integración con Qwik

El paquete `@tsparticles/qwik` proporciona un componente `<Particles>` optimizado para el modelo de reanudación de Qwik. Usa `useVisibleTask$` para la inicialización perezosa y señales para actualizaciones reactivas.

## Instalación

```bash
npm install @tsparticles/qwik tsparticles
```

Las declaraciones TypeScript están incluidas — no se requieren paquetes de tipos adicionales.

## Inicialización del Motor

En Qwik, el motor debe inicializarse dentro de un bloque `useVisibleTask$` para asegurar que se ejecute solo en el cliente (nunca durante SSR). Usa una señal para rastrear la disponibilidad:

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

## Uso Básico

Una vez que el motor está listo, renderiza el componente `<Particles>` con tu configuración:

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

## Renderizado Condicional

El patrón de señal `engineReady` asegura que el componente `<Particles>` solo se monte después de que el motor esté completamente inicializado. Esto evita discrepancias de hidratación entre servidor y cliente:

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
          Cargando partículas...
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

## Partículas Interactivas

Habilita interacciones de hover y clic añadiendo la sección `interactivity` a tus opciones:

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

## Configuración Personalizada

Una configuración completa con animaciones, múltiples colores e interactividad enriquecida:

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

El paquete `@tsparticles/qwik` exporta tipos completos. Usa `ISourceOptions` para configuraciones seguras en cuanto a tipos y `Engine` para el callback de inicialización:

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


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Carga Perezosa

El modelo de reanudación de Qwik significa que el código de partículas solo se carga y ejecuta cuando el componente se vuelve visible en el viewport. El hook `useVisibleTask$` activa la inicialización del motor, y el componente `<Particles>` se divide automáticamente en código por Qwik cuando se importa:

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

Usa la convención del sufijo `$` para manejadores de eventos optimizados para Qwik al conectar callbacks:

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
    console.log("Partículas cargadas:", container?.id);
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

Este enfoque asegura que tus animaciones de partículas sean completamente separables del árbol y solo se envíen a los clientes cuando sea necesario.
