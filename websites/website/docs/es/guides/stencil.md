---
title: Guía de Stencil
description: Guía completa para integrar tsParticles con componentes Stencil.
---

# Guía de Stencil

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Registro de Elementos Personalizados](#registro-de-elementos-personalizados)
3. [Uso Básico](#uso-básico)
4. [Inicialización del Motor](#inicialización-del-motor)
5. [Configuración Personalizada](#configuración-personalizada)
6. [Ciclo de Vida del Componente](#ciclo-de-vida-del-componente)
7. [Ejemplo TypeScript](#ejemplo-typescript)

---

## Instalación

Instala el wrapper de Stencil y el motor tsParticles a través de npm:

```bash
npm install @tsparticles/stencil tsparticles
```

Opcionalmente instala un paquete de preset para reducir la configuración manual:

```bash
npm install @tsparticles/slim
```

---

## Registro de Elementos Personalizados

El paquete `@tsparticles/stencil` proporciona una función `defineCustomElements` que registra el elemento personalizado `<stencil-particles>` en el navegador. Llámala una vez antes de usar el componente en cualquier parte de tu aplicación.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Registra el elemento <stencil-particles>
defineCustomElements();
```

Para proyectos Stencil que usan carga perezosa, llama esto dentro de `componentWillLoad` o en el componente raíz de tu aplicación para asegurar que el elemento esté disponible antes del renderizado.

---

## Uso Básico

Una vez que el elemento personalizado está registrado, puedes usar `<stencil-particles>` en tu JSX con una propiedad `options` y un callback `init` para cargar las funcionalidades del motor necesarias.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

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
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
  },
  background: { color: "#0d1117" },
};

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Inicialización del Motor

La propiedad `init` recibe la instancia del motor y te permite cargar las funcionalidades que necesitas. Este es el lugar recomendado para llamar a `loadSlim`, `loadFull` o plugins individuales de actualizadores/interacciones.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Opción A: ligero (círculos, movimiento básico, enlaces)
init={async engine => { await loadSlim(engine); }}

// Opción B: conjunto completo de funcionalidades (todas las formas, efectos, presets)
init={async engine => { await loadFull(engine); }}

// Opción C: presets (confeti, fuegos artificiales, nieve, estrellas)
init={async engine => { await loadConfettiPreset(engine); }}
```

La instancia del motor también es accesible después de la inicialización a través del atributo `container-id`, permitiéndote controlar programáticamente el sistema de partículas más tarde si es necesario.

---

## Configuración Personalizada

A continuación se muestra una configuración completa con interactividad, múltiples tipos de formas y modos de hover/clic.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Ciclo de Vida del Componente

En Stencil, el hook de ciclo de vida recomendado para la configuración única es `componentWillLoad`. Úsalo para registrar elementos personalizados y gestionar el estado de inicialización para que el componente `<stencil-particles>` solo se renderice cuando el motor esté preparado.

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

Usar `@State()` asegura que el componente se vuelva a renderizar cuando el motor esté listo, y el renderizado condicional evita que el contenedor de partículas se monte antes de que el elemento personalizado esté definido.

---

## Ejemplo TypeScript

Aquí hay un componente de aplicación Stencil completo y tipado que integra tsParticles con el preset slim, interactividad hover y un tema oscuro personalizado.

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "Bienvenido";

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

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("Contenedor de partículas cargado:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Desarrollado por tsParticles y Stencil</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

El evento `particlesLoaded` se dispara una vez que se renderiza el primer frame, dándote acceso a la instancia de `Container` para control programático (reproducir, pausar, detener, cambiar temas).

---

Ahora tienes todo lo necesario para integrar tsParticles en una aplicación Stencil. Cada ejemplo es autónomo y está listo para copiar en tu proyecto.
