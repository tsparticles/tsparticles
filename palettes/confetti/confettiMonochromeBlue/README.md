[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Confetti Monochrome Blue Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-confetti-monochrome-blue/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-confetti-monochrome-blue) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-confetti-monochrome-blue.svg)](https://www.npmjs.com/package/@tsparticles/palette-confetti-monochrome-blue) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-confetti-monochrome-blue)](https://www.npmjs.com/package/@tsparticles/palette-confetti-monochrome-blue) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for confetti monochrome blue.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/confetti/confettiMonochromeBlue/images/sample.png)](https://particles.js.org/samples/palettes/confetti-monochrome-blue)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#99BBFF"><rect width="32" height="32" fill="#99BBFF" /></svg><br />
        <code>#99BBFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#6699FF"><rect width="32" height="32" fill="#6699FF" /></svg><br />
        <code>#6699FF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#3366FF"><rect width="32" height="32" fill="#3366FF" /></svg><br />
        <code>#3366FF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#1133CC"><rect width="32" height="32" fill="#1133CC" /></svg><br />
        <code>#1133CC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#002299"><rect width="32" height="32" fill="#002299" /></svg><br />
        <code>#002299</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0044FF"><rect width="32" height="32" fill="#0044FF" /></svg><br />
        <code>#0044FF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCDDFF"><rect width="32" height="32" fill="#CCDDFF" /></svg><br />
        <code>#CCDDFF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#f0f4ff"><rect width="40" height="40" fill="#f0f4ff" /></svg><br />
        <strong>Background</strong><br />
        <code>#f0f4ff</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-confetti-monochrome-blue@4/tsparticles.palette-confetti-monochrome-blue.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadConfettiMonochromeBluePalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "confetti-monochrome-blue",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadConfettiMonochromeBluePalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
