# Particle Gradient

Gradient color options for particles, provided by the `updaters/gradient` package. Particles can be filled with linear or radial gradients with animatable colors and angles.

## Core properties

| Key      | Type     | Example                 | Notes                                                 |
| -------- | -------- | ----------------------- | ----------------------------------------------------- |
| `type`   | `string` | `"linear"` / `"radial"` | Gradient type                                         |
| `angle`  | `object` |                         | Gradient angle — see [Angle](#gradient-angle)         |
| `colors` | `array`  |                         | Array of color stops — see [Colors](#gradient-colors) |

## Gradient Angle

| Key         | Type               | Example                               | Notes                  |
| ----------- | ------------------ | ------------------------------------- | ---------------------- |
| `value`     | `number` / `range` | `90` / `{ min: 0, max: 360 }`         | Angle value in degrees |
| `direction` | `string`           | `"clockwise"` / `"counter-clockwise"` | Rotation direction     |

## Gradient Colors

Each entry in the `colors` array:

| Key       | Type                | Example                  | Notes                                  |
| --------- | ------------------- | ------------------------ | -------------------------------------- |
| `value`   | `color object`      | `{ "value": "#ff0000" }` | Color value, see {@link IOptionsColor} |
| `stop`    | `number`            | `0` / `0.5` / `1`        | Color stop position (0 to 1)           |
| `opacity` | `number` / `object` | `1` / `{ "value": 0.5 }` | Opacity at this stop, can be animated  |

## Quick example

```json
{
  "particles": {
    "color": {
      "value": "#ff0000"
    },
    "gradient": [
      {
        "type": "linear",
        "angle": {
          "value": 90,
          "direction": "clockwise"
        },
        "colors": [
          { "stop": 0, "value": { "value": "#ff0000" } },
          { "stop": 0.5, "value": { "value": "#00ff00" } },
          { "stop": 1, "value": { "value": "#0000ff" } }
        ]
      }
    ]
  }
}
```

## Related docs

- Particles root: [Particles](../Particles.md)
- Color: [Color](./Color.md)
- Options root: [Options](../../Options.md)
