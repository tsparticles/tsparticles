[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Confetti Pastel Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-confetti-pastel/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-confetti-pastel) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-confetti-pastel.svg)](https://www.npmjs.com/package/@tsparticles/palette-confetti-pastel) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-confetti-pastel)](https://www.npmjs.com/package/@tsparticles/palette-confetti-pastel) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for confetti pastel.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/confetti/confettiPastel/images/sample.png)](https://particles.js.org/samples/palettes/confetti-pastel)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFB3C1"><rect width="32" height="32" fill="#FFB3C1" /></svg><br />
        <code>#FFB3C1</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFD59E"><rect width="32" height="32" fill="#FFD59E" /></svg><br />
        <code>#FFD59E</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFF4A0"><rect width="32" height="32" fill="#FFF4A0" /></svg><br />
        <code>#FFF4A0</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#B8F0B8"><rect width="32" height="32" fill="#B8F0B8" /></svg><br />
        <code>#B8F0B8</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#ADD8FF"><rect width="32" height="32" fill="#ADD8FF" /></svg><br />
        <code>#ADD8FF</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#D8B8FF"><rect width="32" height="32" fill="#D8B8FF" /></svg><br />
        <code>#D8B8FF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFB3E6"><rect width="32" height="32" fill="#FFB3E6" /></svg><br />
        <code>#FFB3E6</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#B8FFF5"><rect width="32" height="32" fill="#B8FFF5" /></svg><br />
        <code>#B8FFF5</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="40" height="40" fill="#FFFFFF" /></svg><br />
        <strong>Background</strong><br />
        <code>#FFFFFF</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-confetti-pastel@4/tsparticles.palette-confetti-pastel.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadConfettiPastelPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "confetti-pastel",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadConfettiPastelPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
