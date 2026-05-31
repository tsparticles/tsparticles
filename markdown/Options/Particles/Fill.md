# Particle Fill

Controls how particles are filled with color. This document describes the options referenced by the engine
interfaces (`IFill`) and is included from option interface documentation.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `true` | When `true`, the particle interior is filled. When `false`, only stroke (outline) is used. |
| `color` | `IAnimatableColor` / `IRangeColor` | `#ffffff` | The base fill color. Can be an animatable color object or a color range for randomization. |
| `opacity` | `number` / `RangeValue` | `1` | Fill opacity (0..1). Can be animated when using animatable color/opacity settings. |

Notes

- The `paint.fill` option aggregates fill settings for palettes and paint presets.
- When `paint.fill.enable` is omitted, the engine falls back to historical default (`true`).
- Use palette imports (`particles.palette`) to apply coordinated `fill`/`stroke` defaults from registered palettes.

Examples

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

