[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fireworks Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-fireworks/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-fireworks) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-fireworks.svg)](https://www.npmjs.com/package/@tsparticles/preset-fireworks) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-fireworks)](https://www.npmjs.com/package/@tsparticles/preset-fireworks) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for fireworks effect.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/fireworks/images/sample.png)](https://particles.js.org/samples/presets/fireworks)

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadFireworksPreset(tsParticles)` **before** `tsParticles.load(...)`
3. Set `preset: "fireworks"` in options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-fireworks@3/tsparticles.preset.fireworks.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFireworksPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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
    preset: "fireworks",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadFireworksPreset` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

### Common pitfalls

- Calling `tsParticles.load(...)` before `loadFireworksPreset(tsParticles)`
- Changing particle shape to one not included in the bundle without importing the shape package
- Forgetting that the fireworks preset requires emitter, sounds, and trail packages — use the bundle to avoid missing dependencies

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

subgraph pl [Plugins]
ple[Emitters]
plis[Emitters Shape Square]
plh[Hex Color]
plhs[HSL Color]
pli[Interactivity]
plr[RGB Color]
pls[Sounds]
end

bb --> pl

subgraph ef [Effects]
eft[Trail]
end

bb --> ef

subgraph s [Shapes]
sl[Line]
end

bb --> s

subgraph u [Updaters]
ud[Destroy]
ul[Life]
ur[Rotate]
ust[Stroke Color]
end

bb --> u

subgraph pr [Presets]
prfw[Fireworks]
end

bb & ple & plis & plh & plhs & pli & plr & pls & eft & sl & ud & ul & ur & ust --> prfw
```
