[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fog Morning Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-fog-morning/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-fog-morning) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-fog-morning.svg)](https://www.npmjs.com/package/@tsparticles/palette-fog-morning) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-fog-morning)](https://www.npmjs.com/package/@tsparticles/palette-fog-morning) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for morning fog atmosphere.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/atmosphere/fogMorning/images/sample.png)](https://particles.js.org/samples/palettes/fog-morning)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#E8EEF5"><rect width="32" height="32" fill="#E8EEF5" /></svg><br />
        <code>#E8EEF5</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#D4DCE8"><rect width="32" height="32" fill="#D4DCE8" /></svg><br />
        <code>#D4DCE8</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#C0CCDC"><rect width="32" height="32" fill="#C0CCDC" /></svg><br />
        <code>#C0CCDC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AABBD0"><rect width="32" height="32" fill="#AABBD0" /></svg><br />
        <code>#AABBD0</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F0F4FA"><rect width="32" height="32" fill="#F0F4FA" /></svg><br />
        <code>#F0F4FA</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#d4dce8"><rect width="40" height="40" fill="#d4dce8" /></svg><br />
        <strong>Background</strong><br />
        <code>#d4dce8</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-fog-morning@4/tsparticles.palette-fog-morning.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFogMorningPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "fog-morning",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadFogMorningPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
