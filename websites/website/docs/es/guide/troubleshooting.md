---
title: Troubleshooting & FAQ
description: Solutions to common tsParticles issues — particles not showing, performance problems, SSR errors, and more.
---

# Troubleshooting & FAQ

## Particles not showing up

**Particles fail to render** even though you followed the quick-start example.

Check the following:

1. **Engine not initialized** — You must call a `load*` function (e.g. `loadFull`, `loadSlim`, `loadBasic`) before `tsParticles.load()`. Without it the engine has no shapes, moves, or interactions registered.

   ```typescript
   import { tsParticles } from "@tsparticles/engine";
   import { loadBasic } from "@tsparticles/basic";

   await loadBasic(tsParticles);
   await tsParticles.load({
     id: "tsparticles",
     options: {/* ... */},
   });
   ```

2. **Container element missing** — The element with the `id` you pass must exist in the DOM _before_ you call `load`.

3. **Zero particle count** — Check `particles.number.value` in your options. The default is `0` in some configs.

4. **Canvas fully transparent** — If particles use `opacity: 0` or a color that matches the background, they become invisible.

5. **Errors in browser console** — Open DevTools and look for error messages. Most issues log a clear description.

## SSR (Server-Side Rendering) errors

**Next.js, Nuxt, or other SSR frameworks throw `window is not defined` or `document is not defined`.**

tsParticles depends on browser APIs (`window`, `document`, `canvas`). You must:

- **Next.js**: Use `dynamic(() => import(...), { ssr: false })` to load the particles component.
- **Nuxt**: Register the tsParticles plugin in a client-only context (`plugins/` with `mode: 'client'`).
- **Astro**: Use the `client:only` directive on the component.
- **VitePress / Vitepress**: tsParticles components should be used in `.vue` files with `<ClientOnly>` wrapper.

See the [Next.js guide](/guides/nextjs), [Nuxt guide](/guides/nuxt), or [Astro guide](/guides/astro) for framework-specific solutions.

## Slow performance or low FPS

Particles animation is GPU-heavy. Here is how to keep it smooth:

- **Lower particle count** — `particles.number.value`. Start with `50` and increase gradually.
- **Reduce size** — Smaller particles use less fill work. Set `particles.size.value` between `2` and `5`.
- **Disable move** or use slow speed — `particles.move.speed: 0.5` instead of `2`.
- **Reduce link distance** — `particles.links.distance` and `particles.links.opacity` affect link rendering cost.
- **Use the `@tsparticles/plugin-motion` plugin** — the `motion.reduce.value` option serves a lighter config when the user prefers reduced motion. The plugin is included in `@tsparticles/all` only; for other bundles load it separately.
- **Set FPS limit via options** — use `fpsLimit` in the root options object (default `120`).

## TypeScript type errors

**Cannot find `@tsparticles/react` types** or similar.

Install the engine types as a dev dependency:

```bash
npm install @tsparticles/engine --save-dev
```

Then import types from the engine:

```typescript
import type { ISourceOptions, Engine } from "@tsparticles/engine";
```

## How do I access the container instance?

The `load` method returns a `Promise<Container>`. Save the reference:

```typescript
const container = await tsParticles.load({ id: "myParticles", options });

// Later
container.pause();
container.play();
container.refresh();
```

In framework wrappers, use the callback or ref:

- **React**: `<Particles id="tsparticles" options={...} particlesLoaded={async (container) => { /* ... */ }} />`
- **Vue 3**: The component emits `@particles-loaded`.
- **Angular**: The `(particlesLoaded)` output event.

## How do I handle click / hover events?

Use the `interactivity` options in the config:

```typescript
interactivity: {
  events: {
    onClick: { enable: true, mode: "push" },
    onHover: { enable: true, mode: "repulse" },
  },
  modes: {
    push: { quantity: 4 },
    repulse: { distance: 100 },
  },
},
```

If you need a custom callback, listen on the engine:

```typescript
tsParticles.addEventListener("click", () => {
  // your logic
});
```

The engine emits these event types: `configAdded`, `containerInit`, `particlesSetup`, `containerStarted`, `containerStopped`, `containerDestroyed`, `containerPaused`, `containerPlay`, `containerBuilt`, `particleAdded`, `particleDestroyed`, `particleRemoved`.

## Images not appearing as particles

1. **Load the image shape plugin** — The `preload` option and the `image` shape require the `@tsparticles/shape-image` plugin. It is included in `@tsparticles/slim` and above.

2. **Set the shape to `image`**:

   ```typescript
   particles: {
     shape: { type: "image" },
   },
   ```

3. **Preload images** so they are ready before rendering:

   ```typescript
   preload: [
     { src: "path/to/image.png", width: 32, height: 32 },
   ],
   ```

4. **Images must be accessible** — check for CORS errors in the console if the image is on a different origin.

## How do I make particles responsive?

Use the `responsive` array in the options. This requires loading the `@tsparticles/plugin-responsive` plugin (included in `@tsparticles/all` only):

```typescript
responsive: [
  {
    maxWidth: 768,
    options: {
      particles: { number: { value: 30 } },
    },
  },
],
```

You can also use the `@tsparticles/plugin-motion` plugin to serve a reduced config when the user's device prefers reduced motion:

```typescript
motion: {
  disable: false,
  reduce: {
    value: true,       // use reduced config when prefers-reduced-motion is set
    factor: 0.5,       // multiplies number.value by this factor
  },
},
```

## How do I update options after initialization?

Call `tsParticles.load()` again with the new options. The engine will replace the existing container configuration:

```typescript
await tsParticles.load({ id: "tsparticles", options: newOptions });
```

In React, simply pass new options via props — the component handles it automatically.

## Why does `loadFull` make the bundle so large?

`loadFull` loads **every** shape, updater, interaction, and plugin. If you only need a subset, use `loadSlim` or `loadBasic` and import only what you need:

```typescript
import { loadSlim } from "@tsparticles/slim"; // common features
import { loadBasic } from "@tsparticles/basic"; // minimal

// Then add specific plugins
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
```

See the [Bundles overview](/guide/bundles) for a detailed comparison.

## How do I install a specific version?

```bash
npm install tsparticles@4.2.0
npm install @tsparticles/react@4.2.0
```

Check the [Releases page](/migrations/releases) for version history and changelogs.
