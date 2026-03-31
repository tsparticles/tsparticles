[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Triangles Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-triangles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-triangles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-links.svg)](https://www.npmjs.com/package/@tsparticles/preset-links) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-triangles)](https://www.npmjs.com/package/@tsparticles/preset-triangles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) preset for creating a particles web created by link lines
between them.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/tsparticles/main/presets/triangles/images/sample.png)](https://particles.js.org/samples/presets/triangles)

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-triangles@3/tsparticles.preset.triangles.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadTrianglesPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "triangles",
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
    preset: "triangles",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadTrianglesPreset` function instead
of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

---

```mermaid
flowchart TD

subgraph b [Bundles]
bb[tsParticles Basic]
end

subgraph i [Interactions]

subgraph ip [Particles]
ipl[Links]
end

end

bb --> i

subgraph pl [Plugins]
pli[Interactivity]
end

bb --> pl

subgraph pr [Presets]
prt[Triangles]
end

bb & ipl & pli --> prt
```
