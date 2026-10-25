# Plugin Option: Absorbers

`absorbers` is a plugin option and requires absorber features to be available in your bundle/setup.

## Example

```ts
absorbers: {
  position: {
    x: 50,
    y: 50,
  },
  size: {
    value: 20,
  },
}
```

## Splitting

An absorber grows while it absorbs particles, and it stops growing when it reaches `size.limit`. With
`split.enable` enabled, reaching the limit **splits** the absorber instead of only stopping its growth:

| Key              | Type      | Default | Notes                                                                                   |
| ---------------- | --------- | ------- | --------------------------------------------------------------------------------------- |
| `split.enable`   | `boolean` | `false` | Splits the absorber when it reaches one of its `size.limit` values                      |
| `split.quantity` | `number`  | `4`     | Particles generated at the absorber position when it splits, `0` generates no particles |

When it splits:

1. the absorber is consumed, it is not replaced by a new one
2. `split.quantity` particles are released on its rim, sharing the mass it had accumulated

The released particles are worth slightly less mass than the absorber was holding, so every split
drains a slice out of the system instead of manufacturing particles out of nothing. That drained
slice is what makes a split terminate.

`split.quantity` is truncated to an integer and clamped between `0` and `1000`, invalid values such as
`NaN` or `Infinity` are ignored and the default value is kept.

Absorbers can also be split manually, using the `absorber-split` click interactivity mode.

## Manual split example

```json
{
  "absorbers": {
    "color": {
      "value": "#f59e0b"
    },
    "opacity": 0.7,
    "position": {
      "x": 50,
      "y": 50
    },
    "size": {
      "value": 30,
      "density": 6,
      "limit": 120
    },
    "split": {
      "enable": true,
      "quantity": 10
    }
  },
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "absorber-split"
      }
    }
  }
}
```

## Multiple absorbers and orbits

A canvas can hold more than one absorber, and every one of them influences the same particle. Their
forces are composed as vectors once per frame, so two absorbers pulling in opposite directions cancel
each other out instead of one overwriting the other. The force falls off with the square of the
distance and is weighted by the absorber mass, which grows as it absorbs particles.

An absorber with `orbits: true` binds captured particles to a circle. When several absorbers orbit at
the same time they build a single attraction-weighted field, and the particle orbits that field,
following the heaviest and closest absorbers without jumping between them. The composed force is
resolved on the orbit axes: the radial component changes the orbit radius while the tangential
component changes how fast the particle turns around the field.

## Notes

- Validate plugin availability before using absorber options.
- Start with one absorber instance, then scale gradually.
- With `split.enable` disabled (default), the absorber simply stops growing at its `size.limit`.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Absorbers.md>
