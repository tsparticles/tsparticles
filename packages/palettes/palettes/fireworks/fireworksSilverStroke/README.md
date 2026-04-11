[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fireworks Silver Stroke Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-fireworks-silver-stroke/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-fireworks-silver-stroke) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-fireworks-silver-stroke.svg)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-silver-stroke) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-fireworks-silver-stroke)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-silver-stroke) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for fireworks silver stroke.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/fireworks/fireworksSilverStroke/images/sample.png)](https://particles.js.org/samples/palettes/fireworks-silver-stroke)

## Colors

See the palette source for stroke layer details.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadFireworksSilverStrokePalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-fireworks-silver-stroke@4/tsparticles.palette-fireworks-silver-stroke.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async engine => {
  await loadBasic(engine);
  await loadFireworksSilverStrokePalette(engine);

  const options = {
    particles: {
      number: { value: 200 },
      shape: { type: "circle" },
      size: { value: { min: 10, max: 15 } },
      move: {
        enable: true,
        speed: 2,
      },
    },
    palette: "fireworks-silver-stroke",
  };

  await engine.load({
    id: "tsparticles",
    options,
  });
})(tsParticles);
```

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
