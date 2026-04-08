[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Meteor Impact Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-meteor-impact/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-meteor-impact) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-meteor-impact.svg)](https://www.npmjs.com/package/@tsparticles/palette-meteor-impact) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-meteor-impact)](https://www.npmjs.com/package/@tsparticles/palette-meteor-impact) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for meteor impact.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/impact/meteorImpact/images/sample.png)](https://particles.js.org/samples/palettes/meteor-impact)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF6600"><rect width="32" height="32" fill="#FF6600" /></svg><br />
        <code>#FF6600</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF3300"><rect width="32" height="32" fill="#FF3300" /></svg><br />
        <code>#FF3300</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CC2200"><rect width="32" height="32" fill="#CC2200" /></svg><br />
        <code>#CC2200</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#882200"><rect width="32" height="32" fill="#882200" /></svg><br />
        <code>#882200</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#441100"><rect width="32" height="32" fill="#441100" /></svg><br />
        <code>#441100</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCAA77"><rect width="32" height="32" fill="#CCAA77" /></svg><br />
        <code>#CCAA77</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#887744"><rect width="32" height="32" fill="#887744" /></svg><br />
        <code>#887744</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#010104"><rect width="40" height="40" fill="#010104" /></svg><br />
        <strong>Background</strong><br />
        <code>#010104</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-meteor-impact@4/tsparticles.palette-meteor-impact.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadMeteorImpactPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "meteor-impact",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadMeteorImpactPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
