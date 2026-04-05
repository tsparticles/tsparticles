# Particles Color

Controls the base color of particles and optional HSL animation over time.

## Properties

| Key           | Type                          | Example                                                                    | Notes                                        |
| ------------- | ----------------------------- | -------------------------------------------------------------------------- | -------------------------------------------- |
| `value`       | `string` / `array` / `object` | `"#ffffff"` / `["#ff0000", "#00ff00"]` / `{ "h": 200, "s": 100, "l": 50 }` | Same color model described in {@link IColor} |
| `animation.h` | `object`                      |                                                                            | Hue animation options (0-360)                |
| `animation.s` | `object`                      |                                                                            | Saturation animation options (0-100)         |
| `animation.l` | `object`                      |                                                                            | Lightness animation options (0-100)          |

## Quick examples

### Static solid color

```json
{
  "color": {
    "value": "#ffffff"
  }
}
```

### Random color per particle from a palette

```json
{
  "color": {
    "value": ["#f43f5e", "#06b6d4", "#84cc16", "#f59e0b"]
  }
}
```

### HSL hue animation (rainbow effect)

```json
{
  "color": {
    "value": { "h": 0, "s": 100, "l": 50 },
    "animation": {
      "h": {
        "enable": true,
        "speed": 40,
        "sync": false
      }
    }
  }
}
```

### Gentle saturation/lightness breathing

```json
{
  "color": {
    "value": { "h": 200, "s": 60, "l": 50 },
    "animation": {
      "s": {
        "enable": true,
        "speed": 5,
        "offset": { "min": 10, "max": 30 },
        "sync": false
      },
      "l": {
        "enable": true,
        "speed": 4,
        "offset": { "min": 10, "max": 25 },
        "sync": false
      }
    }
  }
}
```

## Color animation properties (`animation.h`, `animation.s`, `animation.l`)

| Key          | Type      | Example          | Notes                                                                                      |
| ------------ | --------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `enable`     | `boolean` | `true` / `false` | Enables animation for the selected channel                                                 |
| `offset.min` | `number`  | `20`             | Minimum random phase offset                                                                |
| `offset.max` | `number`  | `60`             | Maximum random phase offset                                                                |
| `speed`      | `number`  | `40`             | Rate of change per second; `0` keeps the initial `value`                                   |
| `sync`       | `boolean` | `true` / `false` | If `true`, particles animate in lockstep; if `false`, each particle animates independently |

## Common pitfalls

- Using HSL animation with extremely high `speed` values can look like flicker
- Animating all three channels (`h`, `s`, `l`) at high speed can make colors unstable and hard to control
- Setting `sync: true` for all channels can produce a flat global pulse instead of natural variation

## Related docs

- Color formats and models: [Color](../../Color.md)
- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
