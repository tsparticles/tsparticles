[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Confetti Falling Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-confetti-falling/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-confetti-falling) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-confetti-falling.svg)](https://www.npmjs.com/package/@tsparticles/preset-confetti-falling) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-confetti-falling)](https://www.npmjs.com/package/@tsparticles/preset-confetti-falling) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for confetti launched from a draggable falling, using
the [confetti palette](https://github.com/tsparticles/presets/tree/main/palettes/confetti#readme).

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/confettiFalling/images/sample.png)](https://particles.js.org/samples/presets/confettiFalling)

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadConfettiFallingPreset(engine)` **before** `tsParticles.load(...)`
3. Set `preset: "confettiFalling"` in options

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-confetti-falling@4/tsparticles.preset.confettiFalling.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async engine => {
  await loadConfettiFallingPreset(engine);

  await engine.load({
    options: {
      preset: "confettiFalling", // or "confetti-falling"
    },
  });
})(tsParticles);
```

### Customization

```javascript
tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      color: {
        value: ["#0000ff", "#00ff00"],
      },
    },
    preset: "confettiFalling", // or "confetti-falling"
  },
});
```

Like in the sample above, the white and red colors will be replaced by blue and lime.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadConfettiFallingPreset` function instead
of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

### Common pitfalls

- Calling `tsParticles.load(...)` before `loadConfettiFallingPreset(engine)`
- The effect uses a transparent background; set `background.color` if you need a solid backdrop
- Overriding `move.direction` without checking that the particles still fall as expected

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
    pli[Interactivity]
    plm[Motion]
  end

  bb --> pl

  subgraph s [Shapes]
    ssq[Square]
  end

  bb --> s

  subgraph u [Updaters]
    ul[Life]
    urol[Roll]
    urot[Rotate]
    uti[Tilt]
    uw[Wobble]
  end

  bb --> u

  subgraph pr [Presets]
    prcc[Confetti Falling]
  end

  bb & ple & pli & plm & ssq & ul & urol & urot & uti & uw --> prcc
```
