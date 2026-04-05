[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fire Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-fire/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-fire) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-fire.svg)](https://www.npmjs.com/package/@tsparticles/preset-fire) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-fire)](https://www.npmjs.com/package/@tsparticles/preset-fire) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for a faded red to black background with particles
colored like fire and ash sparks.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/presets/fire/images/sample.png)](https://particles.js.org/samples/presets/fire)

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadFirePreset(tsParticles)` **before** `tsParticles.load(...)`
3. Set `preset: "fire"` in options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-fire@3/tsparticles.preset.fire.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFirePreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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
    preset: "fire",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadFirePreset` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadFirePreset(tsParticles)`
- Changing particle shape without loading the corresponding shape package
- Forgetting the dark radial-gradient background is part of the preset; override `background.image` if you want a different background

## Related docs

- All presets catalog: <https://github.com/tsparticles/presets>
- Color formats: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- Main tsParticles docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Basic]
end

subgraph i [Interactions]

subgraph ie [Externals]
iep[Push]
end

end

bb --> i

subgraph pl [Plugins]
pli[Interactivity]
end

bb --> pl

subgraph pr [Presets]
prf[Fire]
end

bb & iep & pli --> prf
```
