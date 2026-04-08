[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fireworks Copper Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-fireworks-copper/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-fireworks-copper) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-fireworks-copper.svg)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-copper) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-fireworks-copper)](https://www.npmjs.com/package/@tsparticles/palette-fireworks-copper) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for fireworks copper.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/fireworks/fireworksCopper/images/sample.png)](https://particles.js.org/samples/palettes/fireworks-copper)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFEECC"><rect width="32" height="32" fill="#FFEECC" /></svg><br />
        <code>#FFEECC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#DDAA55"><rect width="32" height="32" fill="#DDAA55" /></svg><br />
        <code>#DDAA55</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#BB7722"><rect width="32" height="32" fill="#BB7722" /></svg><br />
        <code>#BB7722</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#883300"><rect width="32" height="32" fill="#883300" /></svg><br />
        <code>#883300</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#551100"><rect width="32" height="32" fill="#551100" /></svg><br />
        <code>#551100</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#220800"><rect width="32" height="32" fill="#220800" /></svg><br />
        <code>#220800</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#040100"><rect width="40" height="40" fill="#040100" /></svg><br />
        <strong>Background</strong><br />
        <code>#040100</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-fireworks-copper@4/tsparticles.palette-fireworks-copper.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFireworksCopperPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "fireworks-copper",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadFireworksCopperPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
