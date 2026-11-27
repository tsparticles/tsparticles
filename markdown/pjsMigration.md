# Migrating from Particles.js

tsParticles is compatible with particles.js, and migration can be done in a few steps.

## Quick checklist

1. Replace `particles.min.js` with `tsparticles.min.js`
2. Update canvas CSS class names (`particles-js` -> `tsparticles`)
3. Replace `particlesJS(...)` APIs with calls on an explicit engine instance
4. Gradually migrate deprecated options (`snake_case` -> `camelCase`)

## 1) Migrate script and CSS

```html
<script src="particles.min.js"></script>
```

becomes:

```html
<script src="tsparticles.min.js"></script>
```

If you had custom CSS on the canvas:

```css
.particles-js-canvas-element {
  /* custom CSS */
}
```

becomes:

```css
.tsparticles-canvas-element {
  /* custom CSS */
}
```

## 2) Migrate JavaScript API

### Quick mapping

| particles.js                               | tsParticles                               |
| ------------------------------------------ | ----------------------------------------- |
| `particlesJS("id", options)`               | `engine.load({ id: "id", options })`      |
| `particlesJS.load("id", "path", callback)` | `engine.loadJSON("id", "path").then(...)` |

### Practical example

Before:

```js
particlesJS.load("particles-js", "assets/particles.json", () => {
  console.log("callback - particles.js config loaded");
});
```

After:

```js
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);

engine.loadJSON("tsparticles", "assets/particles.json").then(container => {
  console.log("callback - tsParticles config loaded", container);
});
```

Or with inline options:

```js
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);

engine.load({
  id: "tsparticles",
  options: {/* options */},
});
```

Note: `loadJSON` does not use callback as a third parameter; use `then(...)`.

## 3) Update options

Many legacy options still work, but updating them is recommended:

- `line_linked` -> `links`
- `retina_detect` -> `detectRetina`
- in general, `snake_case` -> `camelCase`

If you see console warnings, use them as a guide to update your configuration file.

## Common migration pitfalls

- Updating script names but keeping old DOM ids/classes in templates
- Migrating API calls but forgetting to convert option keys to camelCase
- Using `loadJSON` with a callback argument instead of `then(...)`
- Applying too many config changes at once instead of migrating incrementally

## 4) Next step

- Root options and config structure: [Options](./Options.md)
- Ready-to-use presets: <https://github.com/tsparticles/presets>
