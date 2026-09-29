# Absorbers

Defines absorber entities that pull nearby particles and can consume them.

## Properties

| Key               | Type               | Example                       | Notes                                                                                   |
| ----------------- | ------------------ | ----------------------------- | --------------------------------------------------------------------------------------- |
| `color`           | `color object`     |                               | Absorber color, see {@link IColor}                                                      |
| `opacity`         | `number`           | `0...1`                       | Absorber opacity                                                                        |
| `position`        | `object`           | `{ "x": 50, "y": 50 }`        | Position in canvas percent values                                                       |
| `size.value`      | `number` / `range` | `50` / `{ min: 10, max: 50 }` | Absorber radius                                                                         |
| `size.density`    | `number`           | `5`                           | Attraction intensity                                                                    |
| `size.limit`      | `number`           | `100`                         | Maximum absorber radius                                                                 |
| `size.limit.mass` | `number`           | `100`                         | Maximum absorber mass, a `0` value means no limit                                       |
| `split.enable`    | `boolean`          | `false`                       | Splits the absorber when it reaches one of its `size.limit` values, disabled by default |
| `split.quantity`  | `number`           | `4`                           | Particles generated at the absorber position when it splits, `0` generates no particles |

## Splitting

An absorber grows while it absorbs particles, and it stops growing when it reaches `size.limit`. With
`split.enable` enabled, reaching the limit **splits** the absorber instead of only stopping its growth:

1. `split.quantity` particles are created at the absorber position
2. the original absorber is removed
3. a brand new absorber, with the same options and the original `size.value`, is created in its place

The replacement starts growing again from scratch, so it must absorb particles once more before it can
split again. This prevents an infinite splitting loop on configurations that start above the limit.

`split.quantity` is truncated to an integer and clamped between `0` and `1000`, invalid values such as
`NaN` or `Infinity` are ignored and the default value is kept.

Absorbers can also be split manually, using the [`absorber-split`](../Interactivity/Modes.md) click
interactivity mode.

## Quick example

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
