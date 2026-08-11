# Integración con jQuery

Integra tsParticles en tus proyectos basados en jQuery con el wrapper oficial del plugin jQuery.

## Instalación

### Vía CDN

Incluye jQuery, tsParticles y el plugin jQuery a través de etiquetas script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Vía npm + Build

Instala los paquetes necesarios:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Importa en tu proyecto:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Inicialización del Motor

Antes de que las partículas puedan renderizarse, el motor tsParticles debe ser inicializado con las funcionalidades que necesitas. Esto se hace a través de `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **¿Por qué es necesario?** tsParticles utiliza una arquitectura modular. `loadFull` registra todas las formas, interacciones y actualizadores incorporados. Puedes importar paquetes más pequeños (ej., `tsparticles-slim`) para reducir el tamaño del paquete.

## Uso Básico

Una vez que el motor está inicializado y el DOM está listo, selecciona un elemento contenedor y llama a `.particles().load()`:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

El elemento contenedor debe existir en el DOM:

```html
<div id="tsparticles"></div>
```

## Configuración Personalizada

El método `.load()` acepta el objeto `ISourceOptions` completo. Aquí hay un ejemplo completo:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## Carga de Presets

Si has instalado un paquete de preset (ej. `tsparticles-preset-stars`), cárgalo durante la inicialización del motor y haz referencia a él en la configuración:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## Manejo de Eventos y Control del Contenedor

`.particles()` devuelve una instancia del plugin jQuery. Para acceder al `Container` subyacente de tsParticles y llamar a métodos como `play()`, `pause()` o `destroy()`:

```javascript
const $container = $("#tsparticles");

// Cargar partículas
$container.particles().load({/* opciones */});

// Reproducir/pausar después de unos segundos
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Ejemplo Completo

A continuación se muestra una página HTML completa y autónoma que carga tsParticles vía CDN y renderiza una escena de partículas con efectos interactivos:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
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
            background: { color: "#0d47a1" },
          });
      });
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

| Método                             | Descripción                                                |
| ---------------------------------- | ---------------------------------------------------------- |
| `$.particles.init(fn)`             | Inicializa el motor con un callback de carga               |
| `$(el).particles()`                | Crea una instancia del plugin de partículas en el elemento |
| `$(el).particles().load(opts)`     | Carga e inicia la configuración de partículas              |
| `$(el).particles().destroy()`      | Destruye la instancia de partículas y limpia               |
| `$(el).particles().getContainer()` | Devuelve el `Container` subyacente para control imperativo |
