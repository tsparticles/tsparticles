---
title: Guía de Inferno
description: Guía completa para integrar tsParticles con aplicaciones Inferno.
---

# Guía de Inferno

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Uso Básico](#uso-básico)
3. [Inicialización del Motor](#inicialización-del-motor)
4. [Configuración Personalizada](#configuración-personalizada)
5. [Uso de Presets](#uso-de-presets)
6. [Patrón de Componente](#patrón-de-componente)
7. [Ejemplo TypeScript](#ejemplo-typescript)

---

## Instalación

Instala el wrapper de Inferno y el motor tsParticles a través de npm:

```bash
npm install @tsparticles/inferno tsparticles
```

Opcionalmente instala el preset slim para un paquete más pequeño:

```bash
npm install @tsparticles/slim
```

---

## Uso Básico

El paquete `@tsparticles/inferno` exporta dos elementos: `ParticlesProvider` y `Particles`. Envuelve tus componentes de partículas con `ParticlesProvider` que acepta un callback `init` para la configuración del motor, luego usa `<Particles>` para renderizar el canvas de partículas.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` debe ser un ancestro de cada componente `<Particles>`. Inicializa el motor una vez y lo proporciona a través del contexto a todos los hijos.

---

## Inicialización del Motor

El `ParticlesProvider` acepta una propiedad `init` que recibe la instancia del motor. Aquí es donde cargas las funcionalidades, formas, presets o actualizadores que tu aplicación necesita.

```tsx
// Ligero — partículas circulares, movimiento básico, enlaces
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// Conjunto completo de funcionalidades — todas las formas, interacciones, efectos
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// Preset específico — confeti, fuegos artificiales, nieve, estrellas
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

Usar `import()` dinámico dentro del callback permite la división de código: los módulos de preset o funcionalidades se cargan solo cuando el componente de partículas se monta.

---

## Configuración Personalizada

A continuación se muestra una configuración completa con interactividad, múltiples tipos de formas y un fondo degradado oscuro.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Uso de Presets

El paquete `@tsparticles/configs` ofrece configuraciones preconstruidas que puedes pasar directamente a la propiedad `options`. Combínalas con el cargador de preset correspondiente en el callback `init` de `ParticlesProvider`.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

Puedes cambiar `configs.confetti` por cualquier preset disponible: `configs.basic`, `configs.fireworks`, `configs.snow`, `configs.stars`, etc.

---

## Patrón de Componente

Para aplicaciones más grandes, estructura tu lógica de partículas en un componente dedicado con un callback `particlesLoaded` para acceder a la instancia de `Container`.

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("Partículas cargadas:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + Inferno</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Ejemplo TypeScript

Aquí hay una aplicación Inferno completa y tipada con una configuración de partículas adaptable y fondo de pantalla completa.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
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

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("Contenedor de tsParticles listo:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + Inferno</h1>
        <p>Integración completa TypeScript</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

Ahora tienes todo lo necesario para integrar tsParticles en una aplicación Inferno. Cada ejemplo es autónomo y está listo para copiar en tu proyecto.
