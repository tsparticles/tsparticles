[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Squares Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-squares/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-squares) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-squares.svg)](https://www.npmjs.com/package/@tsparticles/preset-squares) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-squares)](https://www.npmjs.com/package/@tsparticles/preset-squares) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset creating a squares effect with falling particles.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/squares/images/sample.png)](https://particles.js.org/samples/presets/squares)

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-squares@3/tsparticles.preset.squares.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadSquaresPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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
        type: "circle", // starting from v2, this require the circle shape script
      },
    },
    preset: "squares",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadSquaresPreset` function instead
of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Engine]
end

subgraph pl [Plugins]
ple[Emitters]
pli[Interactivity]
end

bb --> pl

subgraph s [Shapes]
ssq[Square]
end

bb --> s

subgraph u [Updaters]
urot[Rotate]
usi[Size]
usc[Stroke Color]
end

bb --> u

subgraph pr [Presets]
prsn[Squares]
end

bb & ple & pli & ssq & urot & usi & usc --> prsn
```
