# Particles Palette

Use `particles.palette` to import a named palette and quickly assign consistent colors.

## Type

- `string` (palette id)

## What it configures

When a matching palette is registered, the engine imports particle defaults:

- `paint.fill.enable`: copied from the palette settings
- `paint.fill.color.value`: set to palette colors when fill is enabled
- `paint.stroke`: generated from palette colors when fill is disabled
- `blend.enable`: set to `true`
- `blend.mode`: copied from palette blend mode

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
