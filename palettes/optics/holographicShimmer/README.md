[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Holographic Shimmer Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-holographic-shimmer/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-holographic-shimmer) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-holographic-shimmer.svg)](https://www.npmjs.com/package/@tsparticles/palette-holographic-shimmer) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-holographic-shimmer)](https://www.npmjs.com/package/@tsparticles/palette-holographic-shimmer) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for holographic shimmer optics.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/optics/holographicShimmer/images/sample.png)](https://particles.js.org/samples/palettes/holographic-shimmer)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF88FF"><rect width="32" height="32" fill="#FF88FF" /></svg><br />
        <code>#FF88FF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#88FFFF"><rect width="32" height="32" fill="#88FFFF" /></svg><br />
        <code>#88FFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFF88"><rect width="32" height="32" fill="#FFFF88" /></svg><br />
        <code>#FFFF88</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF88CC"><rect width="32" height="32" fill="#FF88CC" /></svg><br />
        <code>#FF88CC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#88CCFF"><rect width="32" height="32" fill="#88CCFF" /></svg><br />
        <code>#88CCFF</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCAAFF"><rect width="32" height="32" fill="#CCAAFF" /></svg><br />
        <code>#CCAAFF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#050510"><rect width="40" height="40" fill="#050510" /></svg><br />
        <strong>Background</strong><br />
        <code>#050510</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <strong>Blend mode:</strong> <code>color-dodge</code> | <strong>Fill:</strong> <code>true</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-holographic-shimmer@4/tsparticles.palette-holographic-shimmer.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadHolographicShimmerPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "holographic-shimmer",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadHolographicShimmerPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
