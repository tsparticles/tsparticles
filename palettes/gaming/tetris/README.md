[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Tetris Palette

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/palette-tetris/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/palette-tetris) [![npmjs](https://badge.fury.io/js/%40tsparticles%2Fpalette-tetris.svg)](https://www.npmjs.com/package/@tsparticles/palette-tetris) [![npmjs](https://img.shields.io/npm/dt/%40tsparticles%2Fpalette-tetris)](https://www.npmjs.com/package/@tsparticles/palette-tetris) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) palette featuring all 7 classic Tetris tetromino colors.

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles) <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/tsparticles/palettes/main/palettes/gaming/tetris/images/sample.png)](https://particles.js.org/samples/palettes/tetris)

## Colors

All 7 classic tetromino colors:

<table>
  <tbody>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#6CE9ED"><rect width="32" height="32" fill="#6CE9ED" /></svg><br />
        <code>#6CE9ED</code><br />
        I piece (Cyan)
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0000E2"><rect width="32" height="32" fill="#0000E2" /></svg><br />
        <code>#0000E2</code><br />
        J piece (Blue)
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#E5A238"><rect width="32" height="32" fill="#E5A238" /></svg><br />
        <code>#E5A238</code><br />
        L piece (Orange)
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#F0F14F"><rect width="32" height="32" fill="#F0F14F" /></svg><br />
        <code>#F0F14F</code><br />
        O piece (Yellow)
      </td>
    </tr>
    <tr>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#6DEA46"><rect width="32" height="32" fill="#6DEA46" /></svg><br />
        <code>#6DEA46</code><br />
        S piece (Green)
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#911CE7"><rect width="32" height="32" fill="#911CE7" /></svg><br />
        <code>#911CE7</code><br />
        T piece (Purple)
      </td>
      <td align="center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#D92F20"><rect width="32" height="32" fill="#D92F20" /></svg><br />
        <code>#D92F20</code><br />
        Z piece (Red)
      </td>
      <td align="center">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="#0B0B1A"><rect width="40" height="40" fill="#0B0B1A" /></svg><br />
        <strong>Background</strong><br />
        <code>#0B0B1A</code>
      </td>
    </tr>
    <tr>
      <td colspan="4" align="center">
        <strong>Blend mode:</strong> <code>screen</code> | <strong>Fill:</strong> <code>true</code>
      </td>
    </tr>
  </tbody>
</table>

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Load a base package (for example `@tsparticles/basic`) and call `loadTetrisPalette` before `tsParticles.load(...)`
3. Apply the palette plus a minimal particles configuration in your options

A palette defines colors, not complete behavior, so pair it with a runtime package and particle options.

## How to use it

### CDN / Vanilla JS / jQuery

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/palette-tetris@4/tsparticles.palette-palette-tetris.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async engine => {
  await loadBasic(engine);
  await loadTetrisPalette(engine);

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
    palette: "tetris",
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

Checkout the documentation in the component library repository and call the `loadTetrisPalette` function.

## Related docs

- Presets and palettes catalog: <https://github.com/tsparticles/palettes>
- Main docs: <https://particles.js.org/docs/>
