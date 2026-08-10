# Web Components

Usa tsParticles con Web Components nativos a través del paquete `@tsparticles/webcomponents`. Este enfoque no requiere framework — solo JavaScript vanilla y elementos personalizados.

## Instalación

### Vía CDN

Incluye el núcleo de tsParticles y el paquete de Web Components:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Vía npm + Build

```bash
npm install @tsparticles/webcomponents tsparticles
```

Luego importa en tu paquete JavaScript:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Inicialización del Motor

Antes de que el elemento `<web-particles>` pueda renderizar, el motor debe inicializarse con las funcionalidades que necesitas. Llama a `initParticlesEngine` con un callback que cargue los plugins deseados:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **¿Por qué `loadFull`?** Registra todas las formas incorporadas (círculo, cuadrado, polígono, imagen, etc.), interacciones (hover, clic) y actualizadores (opacidad, tamaño, color, etc.). Para un paquete más pequeño, usa `tsparticles-slim` o elige plugins individuales.

## Definiendo el Elemento Personalizado

Después de la inicialización del motor, registra el elemento personalizado `<web-particles>`:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Esto registra la etiqueta `web-particles` en el `CustomElementRegistry` del navegador. Es seguro llamarlo múltiples veces — los registros duplicados se ignoran.

## Uso Básico

Una vez que tanto `initParticlesEngine` como `defineParticlesElement` se han ejecutado, usa el elemento directamente en HTML:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## Configuración Personalizada

El elemento `<web-particles>` acepta configuración a través de la propiedad `options` (objeto JavaScript) o mediante JSON en el atributo `options`.

### Vía Propiedad JavaScript

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### Vía Atributo HTML (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> Cuando usas el atributo `options`, el valor debe ser JSON válido. La asignación de propiedades es preferible para configuraciones complejas.

## Creación Dinámica

Puedes crear elementos `<web-particles>` completamente en JavaScript y añadirlos al DOM en cualquier momento:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// Uso
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Extendiendo el Elemento Personalizado

Puedes crear una subclase de `ParticlesElement` para crear tu propio elemento personalizado con configuración incorporada:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

Uso:

```html
<my-particles-bg></my-particles-bg>
```

## Acceso y Control del Contenedor

El elemento personalizado expone la instancia de `Container` de tsParticles para control imperativo:

```javascript
const el = document.querySelector("web-particles");

// Accede al contenedor (disponible después de connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Destruir y limpiar
el.dispose();
```

## Ejemplo Completo

Una página HTML completa usando el módulo de Web Components con scripts CDN:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo de tsParticles Web Components</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Elementos personalizados nativos, sin framework necesario.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
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
    </script>
  </body>
</html>
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Referencia de API

| Export / Propiedad              | Tipo                     | Descripción                                                  |
| ------------------------------- | ------------------------ | ------------------------------------------------------------ |
| `initParticlesEngine(callback)` | `function`               | Inicializa el motor tsParticles con cargadores de plugins    |
| `defineParticlesElement()`      | `function`               | Registra el elemento personalizado `<web-particles>`         |
| `ParticlesElement`              | `class`                  | Clase base que puedes extender para elementos personalizados |
| `element.options`               | `ISourceOptions`         | Obtiene/establece el objeto de configuración de partículas   |
| `element.container`             | `Container \| undefined` | Referencia de solo lectura al `Container` subyacente         |
| `element.dispose()`             | `function`               | Destruye la instancia de partículas y libera recursos        |
