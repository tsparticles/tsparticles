[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Colored Smoke Purple Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-colored-smoke-purple/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-colored-smoke-purple) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-colored-smoke-purple.svg)](https://www.npmjs.com/package/@tsparticles/palette-colored-smoke-purple) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-colored-smoke-purple)](https://www.npmjs.com/package/@tsparticles/palette-colored-smoke-purple) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for colored smoke purple.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/atmosphere/coloredSmokePurple/images/sample.png)](https://particles.js.org/samples/palettes/colored-smoke-purple)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#110022"><rect width="32" height="32" fill="#110022" /></svg><br />
        <code>#110022</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#330055"><rect width="32" height="32" fill="#330055" /></svg><br />
        <code>#330055</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#550088"><rect width="32" height="32" fill="#550088" /></svg><br />
        <code>#550088</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#8811AA"><rect width="32" height="32" fill="#8811AA" /></svg><br />
        <code>#8811AA</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#BB33CC"><rect width="32" height="32" fill="#BB33CC" /></svg><br />
        <code>#BB33CC</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#EE77FF"><rect width="32" height="32" fill="#EE77FF" /></svg><br />
        <code>#EE77FF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#040010"><rect width="40" height="40" fill="#040010" /></svg><br />
        <strong>Background</strong><br />
        <code>#040010</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-colored-smoke-purple@4/tsparticles.palette-colored-smoke-purple.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadColoredSmokePurplePalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "colored-smoke-purple",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadColoredSmokePurplePalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
