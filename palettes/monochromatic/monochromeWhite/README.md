[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Monochrome White Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-monochrome-white/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-monochrome-white) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-monochrome-white.svg)](https://www.npmjs.com/package/@tsparticles/palette-monochrome-white) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-monochrome-white)](https://www.npmjs.com/package/@tsparticles/palette-monochrome-white) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for monochrome white.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/monochromatic/monochromeWhite/images/sample.png)](https://particles.js.org/samples/palettes/monochrome-white)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F5F5F5"><rect width="32" height="32" fill="#F5F5F5" /></svg><br />
        <code>#F5F5F5</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#E0E0E0"><rect width="32" height="32" fill="#E0E0E0" /></svg><br />
        <code>#E0E0E0</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCCCCC"><rect width="32" height="32" fill="#CCCCCC" /></svg><br />
        <code>#CCCCCC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AAAAAA"><rect width="32" height="32" fill="#AAAAAA" /></svg><br />
        <code>#AAAAAA</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#888888"><rect width="32" height="32" fill="#888888" /></svg><br />
        <code>#888888</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#111111"><rect width="40" height="40" fill="#111111" /></svg><br />
        <strong>Background</strong><br />
        <code>#111111</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-monochrome-white@4/tsparticles.palette-monochrome-white.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadMonochromeWhitePalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "monochrome-white",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadMonochromeWhitePalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
