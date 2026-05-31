# Particle Fill

Controls how particles are filled with an inner color. This document mirrors the `IFill`/`Fill` options used by the engine.

Properties

- `enable` (boolean) — Default: `true`
  - When `true`, the particle interior is filled. When `false`, only stroke (outline) is used.
- `color` (IAnimatableColor | IRangeColor)
  - Fill color. Can be an `IAnimatableColor` (allows color animation) or an `IRangeColor` for randomized ranges.
- `opacity` (number | RangeValue) — Default: `1`
  - Fill opacity (0..1). Accepts static values or range objects used by engine utilities.

Default behavior

- `enable` defaults to `true` in `Fill` class constructor.
- `opacity` defaults to `1`.
- If `paint.fill` is omitted, the engine historically uses filled particles (white) unless overridden by `paint.stroke` or palettes.

Notes

- `paint` groups both `fill` and `stroke` options; palettes may supply default `fill` values when `particles.palette` is used.
- Use `IAnimatableColor` when you want color animations (see `AnimatableColor` options documentation).

Example

```json
{
  "particles": {
    "paint": {
      "fill": {
        "enable": true,
        "color": { "value": "#ff0000" },
        "opacity": 0.9
      }
    }
  }
}
```
