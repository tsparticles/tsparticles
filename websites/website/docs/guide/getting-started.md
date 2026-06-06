# Getting Started

tsParticles is a JavaScript/TypeScript library for creating particle animations, confetti, fireworks, and more. It works in any modern browser and is available as both an npm package and via CDN with `<script>` tags.

## Architecture: engine + bundle

`@tsparticles/engine` alone **does nothing visible**. It contains only the core engine (animation loop, canvas, event management) but **no shapes, no interactions, no visual effects**. To see something you must load at least a **bundle** or individual **plugins**.

| Concept                                                                                | Role                                                                                   |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                                  | Core engine. Exports `tsParticles`, types, options. Alone it draws nothing.            |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, etc.)                               | Pre-assembled package that registers shapes, interactions, and updaters on the engine. |
| Individual plugins (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, etc.) | Single packages you can combine for a custom bundle.                                   |

## Choose your path

### Path A — npm/pnpm/yarn (modern projects with bundler)

Install the engine + a bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Then in your code:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Register all slim bundle features on the engine
  await loadSlim(tsParticles);

  // 2. Create the animation
  await tsParticles.load({
    id: "tsparticles", // HTML container ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

The HTML container:

```html
<div id="tsparticles"></div>
```

### Path B — CDN with `<script>` tags (no bundler, vanilla HTML)

Load the engine first, then the bundle. CDN files expose everything on `window` — no `import` needed.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Slim bundle (exposes loadSlim globally) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim is available globally from the CDN bundle
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **Note**: even with CDN bundles you MUST call `loadSlim(tsParticles)` (or `loadBasic` / `loadFull` / `loadAll`) before `tsParticles.load()`. CDN bundles expose the loader function globally but do NOT auto-call it.

Same pattern applies to `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Path C — Specialized bundles with dedicated API (confetti, fireworks, particles)

Some bundles have their own simplified API, no need to use `tsParticles.load()`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

Same for `fireworks()`, `particles()`, `ribbons()`.

## Which bundle to choose?

| Bundle                   | npm                      | When to use                                                                                                  |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | Minimum: circles, movement, opacity, size. No interactions.                                                  |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **Recommended for most projects.** Adds interactions (click/hover), particle links, images, stars, polygons. |
| `tsparticles`            | `loadFull(tsParticles)`  | Full official feature set: emitters, absorbers, text shapes, roll, wobble, trail.                            |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **Everything** in the repo: every shape, interaction, effect, easing, path, export. Prototyping only.        |
| `@tsparticles/confetti`  | `confetti(options)`      | Confetti in one function call. Dedicated API.                                                                |
| `@tsparticles/fireworks` | `fireworks(options)`     | Fireworks in one function call. Dedicated API.                                                               |
| `@tsparticles/particles` | `particles(options)`     | Simplified particle background. Dedicated API.                                                               |
| `@tsparticles/ribbons`   | `ribbons(options)`       | Ribbon effect. Dedicated API.                                                                                |

More details: [`/guide/bundles`](/guide/bundles).

## Using presets

The `@tsparticles/configs` package contains dozens of ready-made configurations (absorbers, bubbles, snow, stars, gravity, collisions, etc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

With CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Quick references

- Options documentation: [`/options/`](/options/)
- Bundle guide: [`/guide/bundles`](/guide/bundles)
- Presets catalog: [`/demos/presets`](/demos/presets)
- Palettes catalog: [`/demos/palettes`](/demos/palettes)
- Shapes catalog: [`/demos/shapes`](/demos/shapes)
- Framework wrappers: [`/guide/wrappers`](/guide/wrappers)
- Color formats: [`/guide/color-formats`](/guide/color-formats)
- Container lifecycle: [`/guide/container-lifecycle`](/guide/container-lifecycle)
- Plugins & customization: [`/guide/plugins-customization`](/guide/plugins-customization)

## Troubleshooting

| Problem                                               | Likely cause                                                              | Solution                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Blank screen, no particles                            | `#tsparticles` doesn't exist in the DOM when calling `tsParticles.load()` | Ensure the DIV exists before the script, or use `DOMContentLoaded`                              |
| Blank screen, no particles                            | Installed only `@tsparticles/engine`                                      | Also install a bundle (`@tsparticles/slim`) or plugins — engine alone has no shapes to draw     |
| "loadBasic/loadSlim/loadFull is not a function" error | Bundle not installed or wrong import                                      | `pnpm add @tsparticles/slim` and import `{ loadSlim }`                                          |
| Particles don't move                                  | `move.enable` not set to `true`                                           | Add `move: { enable: true, speed: 2 }`                                                          |
| Missing feature (e.g. links, collisions)              | Chosen bundle doesn't include it                                          | Switch to a richer bundle (`@tsparticles/slim` or `tsparticles`) or install the specific plugin |
| TypeScript type errors                                | Package versions out of sync                                              | Keep engine and bundle on the same major/minor version                                          |
