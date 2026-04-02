[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Stars Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-stars/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-stars) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-stars.svg)](https://www.npmjs.com/package/@tsparticles/preset-stars) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-stars)](https://www.npmjs.com/package/@tsparticles/preset-stars) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for creating a starry night effect with blinking stars.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/stars/images/sample.png)](https://particles.js.org/samples/presets/stars)

## Quick checklist

1. Load `@tsparticles/engine`
2. Call `loadStarsPreset(tsParticles)` before `tsParticles.load(...)`
3. Use `preset: "stars"` in your options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-stars@3/tsparticles.preset.stars.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadStarsPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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
    preset: "stars",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Common pitfalls

- Calling `tsParticles.load(...)` before `loadStarsPreset(tsParticles)`
- Changing shape type without loading required shape package

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadStarsPreset` function instead
of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Related docs

- Root presets catalog: <https://github.com/tsparticles/presets>
- Main tsParticles docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Basic]
end

subgraph pr [Presets]
prst[Stars]
end

bb --> prst
```
