[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Glass Burst Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-glass-burst/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-glass-burst) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-glass-burst.svg)](https://www.npmjs.com/package/@tsparticles/palette-glass-burst) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-glass-burst)](https://www.npmjs.com/package/@tsparticles/palette-glass-burst) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for glass burst impact.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/impact/glassBurst/images/sample.png)](https://particles.js.org/samples/palettes/glass-burst)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#DDEEFF"><rect width="32" height="32" fill="#DDEEFF" /></svg><br />
        <code>#DDEEFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AACCFF"><rect width="32" height="32" fill="#AACCFF" /></svg><br />
        <code>#AACCFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#88AACC"><rect width="32" height="32" fill="#88AACC" /></svg><br />
        <code>#88AACC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#5577AA"><rect width="32" height="32" fill="#5577AA" /></svg><br />
        <code>#5577AA</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#334466"><rect width="32" height="32" fill="#334466" /></svg><br />
        <code>#334466</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#EEFFFF"><rect width="32" height="32" fill="#EEFFFF" /></svg><br />
        <code>#EEFFFF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#111122"><rect width="40" height="40" fill="#111122" /></svg><br />
        <strong>Background</strong><br />
        <code>#111122</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <strong>Blend mode:</strong> <code>screen</code> | <strong>Fill:</strong> <code>true</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-glass-burst@4/tsparticles.palette-glass-burst.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadGlassBurstPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "glass-burst",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadGlassBurstPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
