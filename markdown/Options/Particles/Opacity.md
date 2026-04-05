# Particles Opacity

Controls the transparency of particles, including animated fading effects.

## Properties

| Key                    | Type               | Example                          | Notes                                                       |
| ---------------------- | ------------------ | -------------------------------- | ----------------------------------------------------------- |
| `value`                | `number` / `range` | `0.5` / `{ min: 0.1, max: 0.8 }` | Base opacity (0–1)                                          |
| `animation.enable`     | `boolean`          | `true` / `false`                 | Animates opacity over time                                  |
| `animation.speed`      | `number`           | `3`                              | Rate of change (% per second toward min/max)                |
| `animation.startValue` | `string`           | `min` / `max` / `random`         | Starting point of the animation                             |
| `animation.sync`       | `boolean`          | `true` / `false`                 | When `true`, all particles fade in sync                     |
| `animation.destroy`    | `string`           | `min` / `max` / `none`           | Destroys the particle when opacity reaches the chosen bound |

## Quick examples

### Static opacity

```json
{
  "opacity": {
    "value": 0.5
  }
}
```

### Random opacity per particle

```json
{
  "opacity": {
    "value": { "min": 0.2, "max": 0.8 }
  }
}
```

### Animated fade-in/out (twinkle-like effect)

```json
{
  "opacity": {
    "value": { "min": 0.1, "max": 1 },
    "animation": {
      "enable": true,
      "speed": 1,
      "startValue": "random",
      "sync": false
    }
  }
}
```

### Fade out and destroy

```json
{
  "opacity": {
    "value": 1,
    "animation": {
      "enable": true,
      "speed": 0.5,
      "startValue": "max",
      "destroy": "min"
    }
  }
}
```

## Common pitfalls

- Setting `animation.sync: true` with `startValue: random` — `sync` is ignored when `startValue` is `random`
- Using `destroy: "min"` without an emitter refilling particles leads to an empty canvas over time

## Related docs

- Particles root: [Particles](../Particles.md)
- Size (same animation shape): [Size](./Size.md)
- Options root: [Options](../../Options.md)
