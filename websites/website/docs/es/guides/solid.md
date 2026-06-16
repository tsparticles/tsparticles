---
title: Integración con SolidJS
description: Guía paso a paso para integrar tsParticles en una aplicación SolidJS usando el wrapper oficial @tsparticles/solid.
---

# Integración con SolidJS

Esta guía cubre la integración de tsParticles en un proyecto **SolidJS** usando el wrapper oficial `@tsparticles/solid`. El modelo de reactividad de grano fino de SolidJS funciona bien con tsParticles — los cambios en las opciones activan actualizaciones específicas del canvas sin reinicialización completa.

## Instalación

Instala el wrapper de SolidJS y el paquete del motor de tu elección:

```bash
npm install @tsparticles/solid tsparticles
```

Para un paquete más pequeño, usa `@tsparticles/slim` en su lugar:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Uso Básico

SolidJS se ejecuta completamente en el navegador (sin SSR), por lo que no necesitas protegerte contra el renderizado del servidor. Sin embargo, el motor debe inicializarse de forma asíncrona antes de renderizar partículas.

Usa `initParticlesEngine` dentro de `onMount` para cargar las funcionalidades del motor, luego renderiza condicionalmente el componente `<Particles>` con `<Show>`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

El componente `<Show>` asegura que el elemento `<Particles>` solo se inserte en el DOM después de que el motor esté listo.

## Inicialización del Motor

La función `initParticlesEngine` acepta un callback que recibe la instancia de `Engine`. Usa este callback para registrar las funcionalidades que tu configuración necesita:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Mínimo — solo formas básicas y movimiento
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Motor listo (slim)");
});

// Completo — todas las funcionalidades incluidas
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Motor listo (completo)");
});

// Solo preset — solo las funcionalidades necesarias para un preset específico
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Preset de confeti cargado");
});
```

Llama a `initParticlesEngine` una vez en tu aplicación — normalmente en el `onMount` del componente raíz. La instancia del motor se almacena en caché, por lo que las llamadas posteriores vuelven inmediatamente.

## Renderizado Condicional

Usa el flujo de control `<Show>` de SolidJS para diferir el renderizado hasta que el motor esté inicializado:

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>Cargando partículas...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

La propiedad `fallback` muestra un indicador de carga mientras el motor se inicializa.

## Uso de Presets

Usa `@tsparticles/configs` para configuraciones rápidas y prediseñadas:

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

Las configuraciones disponibles incluyen: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links` y más.

## Partículas Interactivas

Añade interacciones de clic y hover configurando la sección `interactivity`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **Modos de hover**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Modos de clic**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Configuración Personalizada

Una configuración personalizada completa con múltiples formas de partículas, paletas de colores y ajustes de movimiento:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## Ejemplo TypeScript Completo

Un componente tipado completo con referencia al contenedor, inicialización del motor y controles manuales:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c?: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "Reanudar" : "Pausar"}
      </button>
    </Show>
  );
};

export default App;
```

## Opciones Dinámicas con Señales

Una de las fortalezas de SolidJS es la reactividad de grano fino — puedes usar señales para manejar las opciones de partículas y el canvas se actualizará de manera eficiente:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // las opciones son un objeto normal — se leerán reactivamente a través
  // del seguimiento interno del componente Particles
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          Color:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Cantidad:
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

Debido a que `options` es una función que accede a señales, cada vez que `color()` o `particleCount()` cambian, el componente `<Particles>` recibe un nuevo objeto de opciones y aplica solo las propiedades cambiadas al canvas existente.

## Preset con Personalizaciones

Carga un preset, luego combina personalizaciones para un efecto a medida:

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // Sobrescribe el color de la nieve a azul
      color: { value: "#88ccff" },
      // Aumenta el número de copos
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

El preset proporciona valores por defecto para cada opción, y tus personalizaciones se fusionan encima — solo necesitas especificar las propiedades que quieres cambiar.


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solución de Problemas

| Síntoma                             | Causa                                           | Solución                                                                  |
| ----------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| Elemento DOM en blanco              | Motor no inicializado antes del renderizado     | Envuelve `<Particles>` en `<Show when={initialized()}>`                   |
| No se ven partículas                | Falta `move.enable` o `number.value`            | Asegúrate de `particles.move.enable: true` y `particles.number.value > 0` |
| Canvas detrás del contenido         | Falta `zIndex` en fullScreen                    | Usa `fullScreen: { zIndex: -1 }`                                          |
| El cambio de opciones no se refleja | La referencia del objeto no cambia              | Envuelve las opciones en una función o store; evita objetos estáticos     |
| Motor no encontrado                 | Falta la importación de `loadFull` o `loadSlim` | Instala `tsparticles` o `@tsparticles/slim` y llama a `loadFull(engine)`  |

## Próximos Pasos

- Explora el [Playground de Configuraciones](/playground/configs) para configuraciones listas para usar.
- Lee la [Referencia de Opciones](/options/) para la lista completa de parámetros.
- Navega por el [código fuente de SolidJS](https://github.com/tsparticles/solid) en GitHub para conocer los detalles internos del wrapper.
