# Particles Palette

`particles.palette` imports a named palette and applies particle color defaults.

## Example

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## What it changes

- Sets `particles.paint.fill` or `particles.paint.stroke` based on palette configuration.
- If the palette has multiple color variants, `particles.paint` is imported as an array of variants.
- Enables `particles.blend` with the palette blend mode.
- Keeps your config compact when reusing color sets.

## New palette format (for custom palettes)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` can be either:

- a single variant object (`{ fill?, stroke? }`)
- an array of variant objects (each variant can define `fill`, `stroke`, or both)

## Notes

- Unknown palette ids are ignored.
- Explicit `particles.paint.fill`, `particles.paint.stroke`, or `particles.blend` values override imported defaults.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
