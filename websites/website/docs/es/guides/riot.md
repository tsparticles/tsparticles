---
title: Guía de Riot
description: Guía completa para integrar tsParticles con componentes Riot.js.
---

# Guía de Riot

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Inicialización del Motor](#inicialización-del-motor)
3. [Uso Básico](#uso-básico)
4. [Renderizado Condicional](#renderizado-condicional)
5. [Uso de Presets](#uso-de-presets)
6. [Configuración Personalizada](#configuración-personalizada)
7. [Componente Completo](#componente-completo)

---

## Instalación

Instala el wrapper de Riot y el motor tsParticles a través de npm:

```bash
npm install @tsparticles/riot tsparticles
```

Opcionalmente instala configuraciones de preset para una configuración rápida:

```bash
npm install @tsparticles/configs
npm install @tsparticles/slim
```

---

## Inicialización del Motor

El wrapper de Riot exporta una función `initParticlesEngine`. Llámala en el hook de ciclo de vida `onBeforeMount` de tu componente para preparar el motor antes de que el componente de partículas se renderice.

```html
<my-component>
  <script>
    import { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

El motor se inicializa una vez y se comparte entre todas las instancias de `<riot-particles>` en tu aplicación.

---

## Uso Básico

Después de inicializar el motor, usa el componente `<riot-particles>` en tu plantilla. Pasa la configuración como un objeto de opciones en formato JSON o una referencia a una propiedad de tu componente.

```html
<my-component>
  <riot-particles id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
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
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

---

## Renderizado Condicional

Usa la directiva `if={}` de Riot con una propiedad de estado para retrasar el renderizado del componente de partículas hasta que el motor haya terminado de inicializarse. Esto evita cambios de layout y asegura que el componente reciba un motor listo.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
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
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Llamar a `this.update()` activa un rerenderizado para que la etiqueta `<riot-particles>` aparezca una vez que la promesa se resuelve.

---

## Uso de Presets

El paquete `@tsparticles/configs` proporciona configuraciones preconstruidas para efectos comunes como confeti, fuegos artificiales, nieve y estrellas. Úsalos directamente como tu objeto de opciones.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadFull } from "tsparticles";
    import configs from "@tsparticles/configs";

    export default {
      particlesConfig: configs.basic,
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadFull(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Los presets disponibles incluyen `basic`, `confetti`, `fireworks`, `snow`, `stars` y más. Cada preset requiere que su paquete de preset correspondiente se cargue en el callback del motor. Por ejemplo, `configs.fireworks` requiere `loadFireworksPreset`.

---

## Configuración Personalizada

Construye una configuración personalizada con interactividad, múltiples formas y opciones de animación avanzadas.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
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
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Componente Completo

A continuación se muestra un archivo `.riot` completo que une todo: inicialización del motor en `onBeforeMount`, renderizado condicional con estado, una configuración enriquecida con interactividad y un callback `particlesLoaded` a través del soporte integrado del componente para eventos de carga.

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    {#if state.particlesInitialized}
    <riot-particles id="tsparticles" options="{particlesConfig}" />
    {:else}
    <p>Cargando motor de partículas...</p>
    {/if}
  </div>

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
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
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
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

Ahora tienes todo lo necesario para integrar tsParticles en una aplicación Riot.js. Cada ejemplo es autónomo y está listo para copiar en tu proyecto.
