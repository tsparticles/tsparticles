[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles RGB Primaries Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-rgb-primaries/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-rgb-primaries) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-rgb-primaries.svg)](https://www.npmjs.com/package/@tsparticles/palette-rgb-primaries) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-rgb-primaries)](https://www.npmjs.com/package/@tsparticles/palette-rgb-primaries) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for rgb primaries.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/palettes/rgbPrimaries/images/sample.png)](https://particles.js.org/samples/palettes/rgb-primaries)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#ff0000"><rect width="32" height="32" fill="#ff0000" /></svg><br />
        <code>#ff0000</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#00ff00"><rect width="32" height="32" fill="#00ff00" /></svg><br />
        <code>#00ff00</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0000ff"><rect width="32" height="32" fill="#0000ff" /></svg><br />
        <code>#0000ff</code>
      </td>
    </tr>
    <tr>
      <td colspan="3" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#000000"><rect width="40" height="40" fill="#000000" /></svg><br />
        <strong>Background</strong><br />
        <code>#000000</code>
      </td>
    </tr>
    <tr>
      <td colspan="3" align="center">
        <strong>Blend mode:</strong> <code>lighter</code> | <strong>Fill:</strong> <code>true</code>
      </td>
    </tr>
  </tbody>
</table>

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-rgb-primaries@3/tsparticles.palette.rgb-primaries.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadRgbPrimariesPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "rgb-primaries",
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
    palette: "rgb-primaries",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadRgbPrimariesPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadRgbPrimariesPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/presets>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
pargbPrimaries[RGB Primaries]
end

e[tsParticles Engine] --> pargbPrimaries
```
