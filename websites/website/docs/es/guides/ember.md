---
title: Guía de Ember
description: Guía completa para integrar tsParticles con aplicaciones Ember.js.
---

# Guía de Ember

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Inicialización del Motor](#inicialización-del-motor)
3. [Uso Básico](#uso-básico)
4. [Configuración Personalizada](#configuración-personalizada)
5. [Manejo de Eventos](#manejo-de-eventos)
6. [Renderizado Condicional](#renderizado-condicional)
7. [Ejemplo TypeScript](#ejemplo-typescript)

---

## Instalación

Instala el addon de Ember y el motor tsParticles a través de ember-cli:

```bash
ember install @tsparticles/ember
```

Esto instalará el addon y su dependencia pares `tsparticles`. Opcionalmente puedes añadir paquetes de preset:

```bash
npm install @tsparticles/slim
```

---

## Inicialización del Motor

El addon exporta una utilidad `initParticlesEngine` que llamas una vez a nivel de aplicación. Recibe un callback asíncrono donde cargas las funcionalidades, presets o formas que tu app necesita.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Llama esto durante el arranque de la aplicación
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Las ubicaciones típicas para esta llamada son el hook `beforeModel` de la ruta de la aplicación, el constructor de un controlador de aplicación, o un inicializador de instancia. El singleton del motor se inicializa una vez y se comparte entre todos los componentes `<Particles>` en tu aplicación.

---

## Uso Básico

Después de inicializar el motor, usa el componente `<Particles>` en cualquier plantilla. Pasa tu configuración de partículas a través del argumento `@options`.

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
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
}
```

---

## Configuración Personalizada

Construye una configuración más rica con interactividad, múltiples formas y densidad adaptable.

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
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
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## Manejo de Eventos

El componente `<Particles>` dispara una acción `@particlesLoaded` cuando el contenedor ha terminado de inicializarse y el primer frame se ha renderizado. Úsalo para acceder a la instancia de `Container` para control programático.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Partículas cargadas", container.id);

    // Ejemplo de control programático:
    setTimeout(() => {
      container.pause();
      console.log("Partículas pausadas después de 5 segundos");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

También puedes usar el patrón de callback en línea con un helper de plantilla si prefieres no definir una acción separada.

---

## Renderizado Condicional

Usa el helper `{{if}}` de Ember junto con una propiedad `@tracked` para controlar cuándo se renderiza el componente `<Particles>`. Esto es útil cuando la inicialización del motor es asíncrona y quieres evitar renderizar el componente antes de que el motor esté listo.

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>Cargando partículas...</p>
{{/if}}
```

El decorador `@tracked` asegura que la plantilla se vuelva a renderizar automáticamente una vez que la promesa se resuelve.

---

## Ejemplo TypeScript

A continuación se muestra un controlador de aplicación Ember tipado completo que demuestra el patrón de integración completo con preset slim, interactividad y gestión del ciclo de vida.

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

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

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container: Container): void {
    this.container = container;
    console.log("Partículas cargadas en el contenedor:", container.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>Inicializando el motor de partículas...</p>
  </div>
{{/if}}
```

---

Ahora tienes todo lo necesario para integrar tsParticles en una aplicación Ember.js. Cada ejemplo es autónomo y está listo para copiar en tu proyecto.
