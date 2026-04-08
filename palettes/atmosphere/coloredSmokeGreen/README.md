[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Colored Smoke Green Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-colored-smoke-green/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-colored-smoke-green) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-colored-smoke-green.svg)](https://www.npmjs.com/package/@tsparticles/palette-colored-smoke-green) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-colored-smoke-green)](https://www.npmjs.com/package/@tsparticles/palette-colored-smoke-green) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for colored smoke green.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/atmosphere/coloredSmokeGreen/images/sample.png)](https://particles.js.org/samples/palettes/colored-smoke-green)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#001100"><rect width="32" height="32" fill="#001100" /></svg><br />
        <code>#001100</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#003300"><rect width="32" height="32" fill="#003300" /></svg><br />
        <code>#003300</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#005500"><rect width="32" height="32" fill="#005500" /></svg><br />
        <code>#005500</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#117722"><rect width="32" height="32" fill="#117722" /></svg><br />
        <code>#117722</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#33AA55"><rect width="32" height="32" fill="#33AA55" /></svg><br />
        <code>#33AA55</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#77DD88"><rect width="32" height="32" fill="#77DD88" /></svg><br />
        <code>#77DD88</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#010802"><rect width="40" height="40" fill="#010802" /></svg><br />
        <strong>Background</strong><br />
        <code>#010802</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-colored-smoke-green@4/tsparticles.palette-colored-smoke-green.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadColoredSmokeGreenPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "colored-smoke-green",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadColoredSmokeGreenPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
