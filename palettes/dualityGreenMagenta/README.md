[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Duality Green/Magenta Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-duality-green-magenta/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-duality-green-magenta) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-duality-green-magenta.svg)](https://www.npmjs.com/package/@tsparticles/palette-duality-green-magenta) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-duality-green-magenta)](https://www.npmjs.com/package/@tsparticles/palette-duality-green-magenta) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for duality - green/magenta.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/palettes/dualityGreenMagenta/images/sample.png)](https://particles.js.org/samples/palettes/duality-green-magenta)

## Colors

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-duality-green-magenta@3/tsparticles.palette.duality-green-magenta.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadDualityGreenMagentaPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "duality-green-magenta",
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
    palette: "duality-green-magenta",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadDualityGreenMagentaPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadDualityGreenMagentaPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/presets>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
padualityGreenMagenta[Duality Green/Magenta]
end

e[tsParticles Engine] --> padualityGreenMagenta
```
