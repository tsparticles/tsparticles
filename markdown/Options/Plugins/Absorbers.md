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

1. the absorber is consumed, it is not replaced by a new one
2. `split.quantity` particles are released on its rim, shared out of the mass it had accumulated

The released particles are worth slightly less mass than the absorber was holding, so every split
drains a slice out of the system instead of manufacturing particles out of nothing. That drained
slice is what makes a split terminate: since the absorbers do not consume the particles they absorb,
releasing exactly the accumulated mass would let the very same particles grow a new absorber back to
its limit and split it again, forever.

`split.quantity` is truncated to an integer and clamped between `0` and `1000`, invalid values such as
`NaN` or `Infinity` are ignored and the default value is kept.

Absorbers can also be split manually, using the [`absorber-split`](../Interactivity/Modes.md) click
interactivity mode.

## Multiple absorbers

A canvas can hold more than one absorber, and every one of them influences the same particle. The
forces are composed as **vectors**, once per frame, before the absorbers grow: two absorbers pulling
in opposite directions cancel each other out, exactly as they would on a particle of equal mass. An
absorber is never picked over the others, and no absorber overwrites the contribution of another one.

The force of a single absorber falls off with the square of the distance and is weighted by the
absorber `mass`, which grows as it absorbs particles. It is treated as a body with a radius rather than
a point mass, so a particle sitting exactly on the absorber centre gets a finite force instead of an
infinite one.

### Orbiting absorbers

An absorber with `orbits: true` binds the particles it captures to a circle instead of letting them
drift. When several absorbers orbit at the same time they don't compete for the particle: they build
a single **attraction weighted field**, and the particle orbits that field. Each `orbits` absorber
weighs in proportionally to the force it exerts, so the orbit follows the heaviest and closest ones
and it moves continuously as the absorbers grow, without jumping between them. Absorbers that don't
orbit don't move the geometry, but they still push the particle through their force.

In orbit mode the composed force is not discarded, it is resolved on the orbit axes:

- the **radial** component changes the orbit radius, pulling the particle in or pushing it out
- the **tangential** component changes how fast the particle turns around the field

So an absorber placed beside the orbit speeds the particle up or slows it down, rather than only
affecting how tight the circle is.

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
