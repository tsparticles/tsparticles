[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Bokeh Pastel Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-bokeh-pastel/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-bokeh-pastel) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-bokeh-pastel.svg)](https://www.npmjs.com/package/@tsparticles/palette-bokeh-pastel) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-bokeh-pastel)](https://www.npmjs.com/package/@tsparticles/palette-bokeh-pastel) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for bokeh pastel optics.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/optics/bokehPastel/images/sample.png)](https://particles.js.org/samples/palettes/bokeh-pastel)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFCCFF"><rect width="32" height="32" fill="#FFCCFF" /></svg><br />
        <code>#FFCCFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCFFFF"><rect width="32" height="32" fill="#CCFFFF" /></svg><br />
        <code>#CCFFFF</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFCC"><rect width="32" height="32" fill="#FFFFCC" /></svg><br />
        <code>#FFFFCC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CCFFCC"><rect width="32" height="32" fill="#CCFFCC" /></svg><br />
        <code>#CCFFCC</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFFFFF"><rect width="32" height="32" fill="#FFFFFF" /></svg><br />
        <code>#FFFFFF</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFBBDD"><rect width="32" height="32" fill="#FFBBDD" /></svg><br />
        <code>#FFBBDD</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#BBDDFF"><rect width="32" height="32" fill="#BBDDFF" /></svg><br />
        <code>#BBDDFF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0a0010"><rect width="40" height="40" fill="#0a0010" /></svg><br />
        <strong>Background</strong><br />
        <code>#0a0010</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <strong>Blend mode:</strong> <code>color-dodge</code> | <strong>Fill:</strong> <code>true</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-bokeh-pastel@4/tsparticles.palette-bokeh-pastel.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadBokehPastelPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "bokeh-pastel",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadBokehPastelPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
