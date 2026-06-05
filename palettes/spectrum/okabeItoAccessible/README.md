[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles OkabeItoAccessible Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-okabeItoAccessible/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-okabeItoAccessible) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-okabeItoAccessible.svg)](https://www.npmjs.com/package/@tsparticles/palette-okabeItoAccessible) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-coloredSmokeAmber)](https://www.npmjs.com/package/@tsparticles/palette-okabeItoAccessible) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for colored smoke amber.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/spectrum/okabeItoAccessible/images/sample.png)](https://particles.js.org/samples/palettes/okabeItoAccessible)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#E69F00"><rect width="32" height="32" fill="#E69F00" /></svg><br />
        <code>#E69F00</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#56B4E9"><rect width="32" height="32" fill="#56B4E9" /></svg><br />
        <code>#56B4E9</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#009E73"><rect width="32" height="32" fill="#009E73" /></svg><br />
        <code>#009E73</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F0E442"><rect width="32" height="32" fill="#F0E442" /></svg><br />
        <code>#F0E442</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0072B2"><rect width="32" height="32" fill="#0072B2" /></svg><br />
        <code>#0072B2</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#D55E00"><rect width="32" height="32" fill="#D55E00" /></svg><br />
        <code>#D55E00</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CC79A7"><rect width="32" height="32" fill="#CC79A7" /></svg><br />
        <code>#CC79A7</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#000000"><rect width="32" height="32" fill="#000000" /></svg><br />
        <code>#000000</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F7F7F7"><rect width="40" height="40" fill="#F7F7F7" /></svg><br />
        <strong>Background</strong><br />
        <code>#F7F7F7</code>
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
2. Load a base package (for example `@tsparticles/basic`) and call `loadOkabeItoAccessiblePalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-okabeItoAccessible@4/tsparticles.palette-coloredSmokeAmber.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async engine => {
  await loadBasic(engine);
  await loadOkabeItoAccessiblePalette(engine);

  const options = {
    particles: {
      number: { value: 200 },
      shape: { type: "circle" },
      size: { value: { min: 10, max: 15 } },
      move: {
        enable: true,
        speed: 2,
      },
    },
    palette: "okabeItoAccessible",
  };

  await engine.load({
    id: "tsparticles",
    options,
  });
})(tsParticles);
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadOkabeItoAccessiblePalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
