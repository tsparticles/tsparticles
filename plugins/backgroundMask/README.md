[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Background Mask Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-background-mask/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-background-mask)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-background-mask.svg)](https://www.npmjs.com/package/@tsparticles/plugin-background-mask)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-background-mask)](https://www.npmjs.com/package/@tsparticles/plugin-background-mask) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling background mask feature.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.backgroundMask.min.js` file will export the function to load the plugin:

```javascript
loadBackgroundMaskPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadBackgroundMaskPlugin(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/plugin-background-mask
```

or

```shell
$ yarn add @tsparticles/plugin-background-mask
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadBackgroundMaskPlugin } = require("@tsparticles/plugin-background-mask");

(async () => {
  await loadBackgroundMaskPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadBackgroundMaskPlugin } from "@tsparticles/plugin-background-mask";

(async () => {
  await loadBackgroundMaskPlugin(tsParticles);
})();
```

## Option mapping

- Primary options key: `backgroundMask`

```json
{
  "backgroundMask": {}
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadBackgroundMaskPlugin(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Dynamic Mask Sources (since 4.3.0)

The `cover` object now supports two dynamic sources: `element` (auto-draw external visual source) and `draw` (custom callback). When either is set, the static cover (color/image) is skipped.

### Layer order

```
clear()                            ← canvas pixel clear
cover.element auto-draw            ← ctx.drawImage() of external element (if set)
cover.draw callback                ← custom draw function on main context (if set)
static cover (color/image)         ← fallback, only if neither element nor draw is set
globalCompositeOperation           ← activated by drawSettingsSetup (unchanged)
particles                          ← unmasked particles (unchanged)
```

### `cover.element`

Type: `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`

Auto-draws an external element onto the canvas every frame via `ctx.drawImage()`, before the mask composite mode is applied. The element's rendering/playback is managed by external code — the plugin only reads its visual content.

```typescript
// JS config — direct canvas reference
const animCanvas = document.getElementById("myAnimation") as HTMLCanvasElement;

await tsParticles.load({
  id: "tsparticles",
  options: {
    backgroundMask: {
      enable: true,
      cover: {
        element: animCanvas,
        opacity: 1,
      },
    },
  },
});
```

```jsonc
// JSON config — CSS selector for a video element in the DOM
{
  "backgroundMask": {
    "enable": true,
    "cover": {
      "element": "#webcam",
      "opacity": 0.8,
    },
  },
}
```

### `cover.draw`

Type: `(context: BackgroundDrawContext, delta: IDelta) => void`

Custom draw callback executed every frame during `canvasPaint()`. Receives the **main canvas context** (never the element context). Note: `delta` is currently a fallback `{ value: 0, factor: 1 }` since `canvasPaint()` does not receive a real delta.

```typescript
// JS config — animated gradient as mask
await tsParticles.load({
  id: "tsparticles",
  options: {
    backgroundMask: {
      enable: true,
      cover: {
        draw: (ctx, delta) => {
          const t = performance.now() * 0.001;
          ctx.fillStyle = `hsl(${(t * 50) % 360}, 70%, 50%)`;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        },
      },
    },
  },
});
```

### Using both `element` and `draw`

If both are set, `element` is auto-drawn first, then `draw` is called. Both layers are independent.

### Legacy behavior unchanged

Configs without `element` or `draw` work identically to before (static color/image cover).

### Element resolution rules

- Direct reference (`HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`): stored directly
- CSS selector string: resolved via `document.querySelector()` in DOM environments
  - Matched drawable element → stored
  - Matched non-drawable element → warning logged once (`mask-element-not-supported`)
  - No match → warning logged once (`mask-element-not-found`)
- `undefined`/`null`: skipped, static cover used

### Environment notes

- Non-DOM environments safely skip CSS selector resolution
- `drawImage()` auto-scales the element to fill the canvas
- Video frame playback is managed externally (plugin reads current frame only)
- `OffscreenCanvas` must be controlled externally

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
