[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Big Circles Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-big-circles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-big-circles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-big-circles.svg)](https://www.npmjs.com/package/@tsparticles/preset-big-circles) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-big-circles)](https://www.npmjs.com/package/@tsparticles/preset-big-circles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for big colored circles on a white background.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/bigCircles/images/sample.png)](https://particles.js.org/samples/presets/bigCircles)

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-big-circles@3/tsparticles.preset.bigCircles.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadBigCirclesPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bigCircles", // also "big-circles" is accepted
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
    preset: "bigCircles", // also "big-circles" is accepted
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadBigCirclesPreset` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Basic]
end

subgraph pr [Presets]
prbi[Big Circles]
end

bb --> prbi
```
