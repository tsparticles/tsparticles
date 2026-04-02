[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Sea Anemone Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-sea-anemone/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-sea-anemone.svg)](https://www.npmjs.com/package/@tsparticles/preset-sea-anemone) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-sea-anemone)](https://www.npmjs.com/package/@tsparticles/preset-sea-anemone) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for creating a beautiful sea anemone like effect with
particles spawned in the canvas center.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/seaAnemone/images/sample.png)](https://particles.js.org/samples/presets/seaAnemone)

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadSeaAnemonePreset(tsParticles)` **before** `tsParticles.load(...)`
3. Set `preset: "seaAnemone"` in options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-sea-anemone@3/tsparticles.preset.seaAnemone.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadSeaAnemonePreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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
    preset: "seaAnemone",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadSeaAnemonePreset` function instead
of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

### Common pitfalls

- Calling `tsParticles.load(...)` before `loadSeaAnemonePreset(tsParticles)`
- Changing particle shape without loading the corresponding shape package
- Particles spawn from the canvas center by default; override `emitters.position` to change the origin

## Related docs

- All presets catalog: <https://github.com/tsparticles/presets>
- Emitter options: <https://particles.js.org/docs/classes/Plugins_Emitters_Options_Classes_Emitter.Emitter.html>
- Main tsParticles docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Basic]
end

subgraph pa [Paths]
pac[Curves]
end

bb --> pa

subgraph pl [Plugins]
ple[Emitters]
pli[Interactivity]
plt[Trail]
end

bb --> pl

subgraph pr [Presets]
prsa[Sea Anemone]
end

bb & pac & ple & pli & plt --> prsa
```
