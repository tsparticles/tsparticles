[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Blood & Gore Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-blood-and-gore/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-blood-and-gore) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-blood-and-gore.svg)](https://www.npmjs.com/package/@tsparticles/palette-blood-and-gore) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-blood-and-gore)](https://www.npmjs.com/package/@tsparticles/palette-blood-and-gore) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for blood & gore.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Colors

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-blood-and-gore@3/tsparticles.palette.blood-and-gore.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadBloodAndGorePalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "blood-and-gore",
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
    palette: "blood-and-gore",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadBloodAndGorePalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

---

```mermaid
flowchart TD

subgraph pr [Palettes]
pabloodAndGore[Blood & Gore]
end

e[tsParticles Engine] --> pabloodAndGore
```
