[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Dark Splatter Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-splatter-dark/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-splatter-dark) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-splatter-dark.svg)](https://www.npmjs.com/package/@tsparticles/palette-splatter-dark) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-splatter-dark)](https://www.npmjs.com/package/@tsparticles/palette-splatter-dark) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for dark splatter impact.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/impact/splatterDark/images/sample.png)](https://particles.js.org/samples/palettes/splatter-dark)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#220000"><rect width="32" height="32" fill="#220000" /></svg><br />
        <code>#220000</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#440000"><rect width="32" height="32" fill="#440000" /></svg><br />
        <code>#440000</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#880000"><rect width="32" height="32" fill="#880000" /></svg><br />
        <code>#880000</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AA1100"><rect width="32" height="32" fill="#AA1100" /></svg><br />
        <code>#AA1100</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CC2200"><rect width="32" height="32" fill="#CC2200" /></svg><br />
        <code>#CC2200</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#111111"><rect width="32" height="32" fill="#111111" /></svg><br />
        <code>#111111</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#222222"><rect width="32" height="32" fill="#222222" /></svg><br />
        <code>#222222</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#050505"><rect width="40" height="40" fill="#050505" /></svg><br />
        <strong>Background</strong><br />
        <code>#050505</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <strong>Blend mode:</strong> <code>source-over</code> | <strong>Fill:</strong> <code>true</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-splatter-dark@4/tsparticles.palette-splatter-dark.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadSplatterDarkPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "splatter-dark",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadSplatterDarkPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
