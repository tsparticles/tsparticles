[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Hyperspace Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-hyperspace/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-hyperspace) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-hyperspace.svg)](https://www.npmjs.com/package/@tsparticles/preset-hyperspace) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-hyperspace)](https://www.npmjs.com/package/@tsparticles/preset-hyperspace) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for creating a starry night effect with blinking
hyperspace.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/presets/hyperspace/images/sample.png)](https://particles.js.org/samples/presets/hyperspace)

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadHyperspacePreset(tsParticles)` **before** `tsParticles.load(...)`
3. Set `preset: "hyperspace"` in options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-hyperspace@3/tsparticles.preset.hyperspace.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadHyperspacePreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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
    preset: "hyperspace",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadHyperspacePreset` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Dependencies

This preset loads and combines the following packages:

| Package                                     | Role in this preset                           | README                                                                    |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| `@tsparticles/basic`                        | Base runtime bundle used by the preset        | <https://www.npmjs.com/package/@tsparticles/basic>                        |
| `@tsparticles/engine`                       | tsParticles engine and preset registration    | <https://www.npmjs.com/package/@tsparticles/engine>                       |
| `@tsparticles/plugin-emitters`              | Spawns particles from configurable emitters   | <https://www.npmjs.com/package/@tsparticles/plugin-emitters>              |
| `@tsparticles/plugin-emitters-shape-square` | Adds square emitter areas for launches/bursts | <https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-square> |
| `@tsparticles/plugin-trail`                 | Adds persistent canvas trail rendering        | <https://www.npmjs.com/package/@tsparticles/plugin-trail>                 |
| `@tsparticles/updater-life`                 | Controls particle life-cycle stages           | <https://www.npmjs.com/package/@tsparticles/updater-life>                 |

If you want to customize one specific behavior, start from the related package README above.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadHyperspacePreset(tsParticles)`
- Changing particle shape without loading the corresponding shape package
- The preset uses a dark background by default; override `background.color` to change it

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

subgraph pl [Plugins]
ple[Emitters]
ples[Emitters Shape Square]
pli[Interactivity]
plt[Trail]
end

bb --> pl

subgraph u [Updaters]
ul[Life]
end

bb --> u

subgraph pr [Presets]
prhs[Hyperspace]
end

bb & ple & ples & pli & plt & ul --> prhs
```
