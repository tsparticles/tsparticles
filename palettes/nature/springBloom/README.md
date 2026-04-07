[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Spring Bloom Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-spring-bloom/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-spring-bloom) [![npmjs](https://badge.fury.io/js/@tsparticles/palette-spring-bloom.svg)](https://www.npmjs.com/package/@tsparticles/palette-spring-bloom) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/palette-spring-bloom)](https://www.npmjs.com/package/@tsparticles/palette-spring-bloom) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette for spring bloom.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/springBloom/images/sample.png)](https://particles.js.org/samples/palettes/spring-bloom)

## Colors

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FF8FAB"><rect width="32" height="32" fill="#FF8FAB" /></svg><br />
        <code>#FF8FAB</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFC2D1"><rect width="32" height="32" fill="#FFC2D1" /></svg><br />
        <code>#FFC2D1</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFD6A5"><rect width="32" height="32" fill="#FFD6A5" /></svg><br />
        <code>#FFD6A5</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FDFFB6"><rect width="32" height="32" fill="#FDFFB6" /></svg><br />
        <code>#FDFFB6</code>
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#CAFFBF"><rect width="32" height="32" fill="#CAFFBF" /></svg><br />
        <code>#CAFFBF</code>
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#9BF6FF"><rect width="32" height="32" fill="#9BF6FF" /></svg><br />
        <code>#9BF6FF</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#FFF8F2"><rect width="40" height="40" fill="#FFF8F2" /></svg><br />
        <strong>Background</strong><br />
        <code>#FFF8F2</code>
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
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-spring-bloom@3/tsparticles.palette.spring-bloom.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadSpringBloomPalette(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      palette: "spring-bloom",
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
    palette: "spring-bloom",
  },
});
```

Like in the sample above, the circles will be replaced by squares.

### Frameworks with a tsParticles component library

Checkout the documentation in the component library repository and call the `loadSpringBloomPalette` function instead of `loadFull`, `loadSlim` or similar functions.

The options shown above are valid for all the component libraries.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadSpringBloomPalette(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>

---

```mermaid
flowchart TD

subgraph pr [Palettes]
paspringBloom[Spring Bloom]
end

e[tsParticles Engine] --> paspringBloom
```
