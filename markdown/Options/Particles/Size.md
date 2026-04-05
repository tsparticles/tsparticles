# Particles Size

Controls the visual size of particles, including animated grow/shrink effects.

## Properties

| Key                    | Type               | Example                    | Notes                                                    |
| ---------------------- | ------------------ | -------------------------- | -------------------------------------------------------- |
| `value`                | `number` / `range` | `4` / `{ min: 1, max: 8 }` | Base radius in pixels                                    |
| `animation.enable`     | `boolean`          | `true` / `false`           | Animates size over time                                  |
| `animation.speed`      | `number`           | `3`                        | Rate of change as a function of other size values        |
| `animation.startValue` | `string`           | `min` / `max` / `random`   | Starting point of the animation                          |
| `animation.sync`       | `boolean`          | `true` / `false`           | When `true`, all particles resize in sync                |
| `animation.destroy`    | `string`           | `min` / `max` / `none`     | Destroys the particle when size reaches the chosen bound |

## Quick examples

### Fixed size

```json
{
  "size": {
    "value": 4
  }
}
```

### Random size per particle

```json
{
  "size": {
    "value": { "min": 1, "max": 6 }
  }
}
```

### Pulsing effect (grow and shrink)

```json
{
  "size": {
    "value": { "min": 2, "max": 8 },
    "animation": {
      "enable": true,
      "speed": 2,
      "startValue": "random",
      "sync": false
    }
  }
}
```

### Shrink to destruction (e.g. for emitter-based effects)

```json
{
  "size": {
    "value": 6,
    "animation": {
      "enable": true,
      "speed": 1,
      "startValue": "max",
      "destroy": "min"
    }
  }
}
```

## Common pitfalls

- Using `destroy: "min"` without an emitter to replenish particles will result in an empty canvas
- `animation.sync: true` is ignored when `startValue` is `random`
- Retina devices multiply `value` by `devicePixelRatio`; combine with `detectRetina: true` for consistent results

## Related docs

- Particles root: [Particles](../Particles.md)
- Opacity (same animation shape): [Opacity](./Opacity.md)
- Options root: [Options](../../Options.md)
