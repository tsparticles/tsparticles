[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles ColoredSmokeTeal Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-coloredSmokeTeal/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-coloredSmokeTeal) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-coloredSmokeTeal.svg)](https://www.npmjs.com/package/@tsparticles/palette-coloredSmokeTeal) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-coloredSmokeAmber)](https://www.npmjs.com/package/@tsparticles/palette-coloredSmokeTeal) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for colored smoke amber.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles) <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/atmosphere/coloredSmokeTeal/images/sample.png)](https://particles.js.org/samples/palettes/coloredSmokeTeal)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#003322"><rect width="32" height="32" fill="#003322" /></svg><br />
        <code>#003322</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#006644"><rect width="32" height="32" fill="#006644" /></svg><br />
        <code>#006644</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#00AA77"><rect width="32" height="32" fill="#00AA77" /></svg><br />
        <code>#00AA77</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#00DDAA"><rect width="32" height="32" fill="#00DDAA" /></svg><br />
        <code>#00DDAA</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AAFFEE"><rect width="32" height="32" fill="#AAFFEE" /></svg><br />
        <code>#AAFFEE</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#020c0a"><rect width="40" height="40" fill="#020c0a" /></svg><br />
        <strong>Background</strong><br />
        <code>#020c0a</code>
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
2. Load a base package (for example `@tsparticles/basic`) and call `loadColoredSmokeTealPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-coloredSmokeTeal@4/tsparticles.palette-coloredSmokeAmber.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async engine => {
  await loadBasic(engine);
  await loadColoredSmokeTealPalette(engine);

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
    palette: "coloredSmokeTeal",
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

Checkout the documentation in the component library repository and call the `loadColoredSmokeTealPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
