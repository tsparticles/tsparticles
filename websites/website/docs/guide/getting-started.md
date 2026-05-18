# Getting Started

This path is the quickest reliable setup for `tsParticles` in 2026.

## Quick checklist

1. Install `@tsparticles/engine`.
2. Pick one runtime path (`@tsparticles/slim`, `@tsparticles/all`, focused APIs like `@tsparticles/particles`, or custom packages only).
3. Load your bundle once.
4. Start with manual options, a config object, or a preset.

## 1) Install the engine + a bundle preset

Use `@tsparticles/engine` plus `@tsparticles/slim` for a great default size/features balance.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Need CDN links, `npm`/`yarn` variants, or `require(...)` examples?

- See [`/guide/installation`](/guide/installation).

## 2) Create a container in HTML

```html
<div id="tsparticles"></div>
```

## 3) Initialize tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
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
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Pick the right bundle

- `@tsparticles/slim`: most apps should start here.
- `@tsparticles/basic`: smaller feature set for very light setups.
- `@tsparticles/all`: everything included, easiest for fast prototyping.

If you need a focused API instead of direct `tsParticles` setup:

- `@tsparticles/particles`: simplified particles background API
- `@tsparticles/confetti`: one-call confetti API
- `@tsparticles/fireworks`: one-call fireworks API

## 5) Use presets/configs when you need speed

If you prefer prebuilt effects:

```bash
pnpm add @tsparticles/configs
```

Then load one config by key, like the [`demo/vite` app](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

If you prefer preset-name based setups, use the official presets catalog in [`/demos/presets`](/demos/presets).

## Quick documentation map

- Root options: [`/options/`](/options/)
- Wrappers reference: [`/guide/wrappers`](/guide/wrappers)
- Presets catalog: [`/demos/presets`](/demos/presets)
- Palettes catalog: [`/demos/palettes`](/demos/palettes)
- Shapes catalog: [`/demos/shapes`](/demos/shapes)
- Migration from particles.js: [`/migrations/particles-js`](/migrations/particles-js)
- Color formats: [`/guide/color-formats`](/guide/color-formats)
- Container lifecycle: [`/guide/container-lifecycle`](/guide/container-lifecycle)
- Plugins and customization: [`/guide/plugins-customization`](/guide/plugins-customization)

## Troubleshooting

- Blank screen: verify `#tsparticles` exists before calling `tsParticles.load`.
- Missing feature: you likely need another plugin/package (shape, interaction, updater).
- Type errors on options: keep your packages aligned to the same major/minor version.
