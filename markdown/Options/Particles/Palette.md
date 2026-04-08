# Particles Palette

Use `particles.palette` to import a named palette and quickly assign consistent colors.

## Type

- `string` (palette id)

## What it configures

When a matching palette is registered, the engine imports particle defaults:

- `paint.fill.enable`: copied from the palette settings
- `paint.fill.color.value`: set to palette colors when fill is enabled
- `paint.stroke`: imported from palette stroke settings when present
- `paint`: can be a single object or an array when the palette defines multiple variants
- `blend.enable`: set to `true`
- `blend.mode`: copied from palette blend mode

## Palette data format (for custom palette authors)

Registered palettes use the `IPalette` structure:

```ts
{
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
}
```

`colors` can also be an array of variants mixing `fill` and/or `stroke` blocks.

## Example

```json
{
  "particles": {
    "palette": "sunset",
    "shape": {
      "type": "circle"
    }
  }
}
```

## Precedence notes

- If `particles.palette` points to an unknown id, no palette import is applied.
- Explicit values for `particles.paint.fill`, `particles.paint.stroke`, or `particles.blend` override imported palette defaults.
- `particles.palette` affects only particle-level style options; it does not replace root-level `preset` loading.
