[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Rust & Corrosion Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-rust-and-corrosion/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-rust-and-corrosion) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-rust-and-corrosion.svg)](https://www.npmjs.com/package/@tsparticles/palette-rust-and-corrosion) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-rust-and-corrosion)](https://www.npmjs.com/package/@tsparticles/palette-rust-and-corrosion) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for rust & corrosion.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/presets/main/palettes/rustAndCorrosion/images/sample.png)](https://particles.js.org/samples/palettes/rust-and-corrosion)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#1A0800"><rect width="32" height="32" fill="#1A0800" /></svg><br />
        <code>#1A0800</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#441400"><rect width="32" height="32" fill="#441400" /></svg><br />
        <code>#441400</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#883300"><rect width="32" height="32" fill="#883300" /></svg><br />
        <code>#883300</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#AA4400"><rect width="32" height="32" fill="#AA4400" /></svg><br />
        <code>#AA4400</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CC6622"><rect width="32" height="32" fill="#CC6622" /></svg><br />
        <code>#CC6622</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#EE8833"><rect width="32" height="32" fill="#EE8833" /></svg><br />
        <code>#EE8833</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#DDAA66"><rect width="32" height="32" fill="#DDAA66" /></svg><br />
        <code>#DDAA66</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#100800"><rect width="40" height="40" fill="#100800" /></svg><br />
        <strong>Background</strong><br />
        <code>#100800</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-rust-and-corrosion@3/tsparticles.palette.rust-and-corrosion.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadRustAndCorrosionPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "rust-and-corrosion",
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
    palette: "rust-and-corrosion",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadRustAndCorrosionPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadRustAndCorrosionPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/presets>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
parustAndCorrosion[Rust & Corrosion]
end

e[tsParticles Engine] --> parustAndCorrosion
```
