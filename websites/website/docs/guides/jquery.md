# jQuery Integration

Integrate tsParticles into your jQuery-based projects with the official jQuery plugin wrapper.

## Installation

### Via CDN

Include jQuery, tsParticles, and the jQuery plugin via script tags:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Via npm + Build

Install the required packages:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Import into your project:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Engine Initialization

Before particles can be rendered, the tsParticles engine must be initialized with the features you need. This is done via `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Why is this needed?** tsParticles uses a modular architecture. `loadFull` registers all built-in shapes, interactions, and updaters. You can import smaller bundles (e.g., `tsparticles-slim`) to reduce bundle size.

## Basic Usage

Once the engine is initialized and the DOM is ready, select a container element and call `.particles().load()`:

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

The container element must exist in the DOM:

```html
<div id="tsparticles"></div>
```

## Custom Configuration

The `.load()` method accepts the full `ISourceOptions` object. Here is a comprehensive example:

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

## Preset Loading

If you have installed a preset package (e.g. `tsparticles-preset-stars`), load it during engine initialization and reference it in the configuration:

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

## Event Handling and Container Control

`.particles()` returns a jQuery plugin instance. To access the underlying tsParticles `Container` and call methods like `play()`, `pause()`, or `destroy()`:

```javascript
const $container = $("#tsparticles");

// Load particles
$container.particles().load({
  /* options */
});

// Play/pause after a few seconds
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Full Example

Below is a complete, self-contained HTML page that loads tsParticles via CDN and renders a particle scene with interactive effects:

```html
<!DOCTYPE html>
<html lang="en">
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

## API Reference

| Method                             | Description                                              |
| ---------------------------------- | -------------------------------------------------------- |
| `$.particles.init(fn)`             | Initialize the engine with a loader callback             |
| `$(el).particles()`                | Create a particles plugin instance on the element        |
| `$(el).particles().load(opts)`     | Load and start the particle configuration                |
| `$(el).particles().destroy()`      | Destroy the particle instance and clean up               |
| `$(el).particles().getContainer()` | Return the underlying `Container` for imperative control |
