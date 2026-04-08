[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fireworks Neon Stroke Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-fireworks-neon-stroke/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-fireworks-neon-stroke) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-fireworks-neon-stroke.svg)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-neon-stroke) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-fireworks-neon-stroke)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-neon-stroke) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for fireworks neon stroke.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/fireworks/fireworksNeonStroke/images/sample.png)](https://particles.js.org/samples/palettes/fireworks-neon-stroke)

## Colors

See the palette source for stroke layer details.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-fireworks-neon-stroke@4/tsparticles.palette-fireworks-neon-stroke.bundle.min.js"></script>
```

### Usage

```javascript
(async () => {
  await loadFireworksNeonStrokePalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: { palette: "fireworks-neon-stroke" },
  });
})();
```

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
