[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Thermal Map Cold to Hot Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-thermal-map/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-thermal-map) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-thermal-map.svg)](https://www.npmjs.com/package/@tsparticles/palette-thermal-map) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-thermal-map)](https://www.npmjs.com/package/@tsparticles/palette-thermal-map) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for thermal map - cold to hot.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Colors

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-thermal-map@3/tsparticles.palette.thermal-map.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadThermalMapPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "thermal-map",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

```javascript
tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      shape: {
        type: "square", // starting from v2, this require the square shape script
      },
    },
    palette: "thermal-map",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadThermalMapPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadThermalMapPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/presets>
- Main docs: <https://particles.js.org/docs/>
---

```mermaid
flowchart TD

subgraph pr [Palettes]
pathermalMap[Thermal Map Cold to Hot]
end

e[tsParticles Engine] --> pathermalMap
```
