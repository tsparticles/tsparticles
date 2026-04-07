[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Sunrise Gold Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-sunrise-gold/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-sunrise-gold) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-sunrise-gold.svg)](https://www.npmjs.com/package/@tsparticles/palette-sunrise-gold) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-sunrise-gold)](https://www.npmjs.com/package/@tsparticles/palette-sunrise-gold) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for sunrise gold.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/palettes/sunriseGold/images/sample.png)](https://particles.js.org/samples/palettes/sunrise-gold)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#3A0CA3"><rect width="32" height="32" fill="#3A0CA3" /></svg><br />
        <code>#3A0CA3</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#7209B7"><rect width="32" height="32" fill="#7209B7" /></svg><br />
        <code>#7209B7</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F72585"><rect width="32" height="32" fill="#F72585" /></svg><br />
        <code>#F72585</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF7B00"><rect width="32" height="32" fill="#FF7B00" /></svg><br />
        <code>#FF7B00</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFB703"><rect width="32" height="32" fill="#FFB703" /></svg><br />
        <code>#FFB703</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFE066"><rect width="32" height="32" fill="#FFE066" /></svg><br />
        <code>#FFE066</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#130B2A"><rect width="40" height="40" fill="#130B2A" /></svg><br />
        <strong>Background</strong><br />
        <code>#130B2A</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-sunrise-gold@3/tsparticles.palette.sunrise-gold.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadSunriseGoldPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "sunrise-gold",
    },
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

```javascript
tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      shape: {
        type: "square", // starting from v2, this require the square shape script
      },
    },
    palette: "sunrise-gold",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadSunriseGoldPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadSunriseGoldPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/presets>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
pasunriseGold[Sunrise Gold]
end

e[tsParticles Engine] --> pasunriseGold
```
