[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Mud & Dirt Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-mud-and-dirt/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-mud-and-dirt) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-mud-and-dirt.svg)](https://www.npmjs.com/package/@tsparticles/palette-mud-and-dirt) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-mud-and-dirt)](https://www.npmjs.com/package/@tsparticles/palette-mud-and-dirt) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for mud & dirt.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/mudAndDirt/images/sample.png)](https://particles.js.org/samples/palettes/mud-and-dirt)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#1A1000"><rect width="32" height="32" fill="#1A1000" /></svg><br />
        <code>#1A1000</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#3D2200"><rect width="32" height="32" fill="#3D2200" /></svg><br />
        <code>#3D2200</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#663300"><rect width="32" height="32" fill="#663300" /></svg><br />
        <code>#663300</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#8B4513"><rect width="32" height="32" fill="#8B4513" /></svg><br />
        <code>#8B4513</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#A0522D"><rect width="32" height="32" fill="#A0522D" /></svg><br />
        <code>#A0522D</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#C67A3C"><rect width="32" height="32" fill="#C67A3C" /></svg><br />
        <code>#C67A3C</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0a0700"><rect width="40" height="40" fill="#0a0700" /></svg><br />
        <strong>Background</strong><br />
        <code>#0a0700</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-mud-and-dirt@3/tsparticles.palette.mud-and-dirt.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadMudAndDirtPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "mud-and-dirt",
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
    palette: "mud-and-dirt",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadMudAndDirtPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadMudAndDirtPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
pamudAndDirt[Mud & Dirt]
end

e[tsParticles Engine] --> pamudAndDirt
```
