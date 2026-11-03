# Particles Collisions

`particles.collisions` controls particle-to-particle collision behavior.

## Example

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: activates collisions.
- `mode`: collision behavior (`bounce` is the most common).

## Collision modes

| Mode        | Behavior                                                               |
| ----------- | ---------------------------------------------------------------------- |
| `"bounce"`  | Particles bounce off each other preserving both particles              |
| `"destroy"` | One particle is removed after impact                                   |
| `"absorb"`  | One particle absorbs another, increasing size/mass effect              |
| `"fluid"`   | Particles behave like a fluid, spreading and flowing around each other |

The `fluid` mode is mutually exclusive with the other modes. It replaces the pairwise impulse
resolution with a neighborhood solver, because a fluid response depends on the local density of the
surrounding particles and not on a single contact.

## Fluid options

| Key             | Type                    | Default | Notes                                                                     |
| --------------- | ----------------------- | ------- | ------------------------------------------------------------------------- |
| `radius`        | `number` / `RangeValue` | `30`    | Neighborhood radius, in pixels, all the nearby particles affect the fluid |
| `stiffness`     | `number` / `RangeValue` | `0.5`   | Repulsion applied when the local density is above the rest density        |
| `nearStiffness` | `number` / `RangeValue` | `0.5`   | Extra repulsion applied to the closest neighbors                          |
| `restDensity`   | `number` / `RangeValue` | `3`     | Local density that is considered neutral                                  |
| `maxForce`      | `number` / `RangeValue` | `2.5`   | Maximum displacement force, keeps the fluid stable                        |
| `maxNeighbors`  | `number`                | `64`    | Maximum number of neighbors used by a single particle                     |

## Fluid example

```json
{
  "collisions": {
    "enable": true,
    "mode": "fluid",
    "fluid": {
      "radius": 26,
      "stiffness": 1.5,
      "nearStiffness": 1.5,
      "restDensity": 8,
      "maxForce": 30,
      "maxNeighbors": 64
    }
  }
}
```

The `radius` should be larger than the particle contact distance (`2 * size`), otherwise the
particles closest to each other are outside the neighborhood and the fluid cannot shape them. The
pair `stiffness` / `restDensity` sets how tightly the fluid packs, while `maxForce` limits the
per-frame displacement, so a low `maxForce` lets a strong gravity win and the particles sink towards
the bottom.

Overlaps are prevented by a non-penetration constraint and not by these values, so raising
`nearStiffness` / `maxForce` to fight an overlap only adds energy, spreading the fluid out like a
gas. To get visible gaps between the particles, raise `restDensity` instead, keeping in mind that a
dense fluid needs room: with `size` and `number` fixed, too many particles cannot fit with gaps and
will settle into a compact packed layer.

Any [out mode](/options/particles-move) still applies on top of the fluid, and `bounce` is the one to
pick: it lets a pool slide along the canvas border and settle against it, instead of piling up on
the exact edge of the canvas.

## Migrating from the experimental fluid draft

Fluid is not a standalone options group nor a separate plugin anymore. The old `particles.fluid`
options must be moved inside the collisions options, using the `fluid` mode:

```json
{
  "particles": {
    "collisions": {
      "enable": true,
      "mode": "fluid",
      "fluid": {
        "radius": 30
      }
    }
  }
}
```

The dedicated fluid loader must be removed: loading the particles collisions interaction is enough.

## Performance tip

Collisions can be costly at high particle counts. Tune with `particles.number` first. Using
`mode: "fluid"` with a big `radius` or a high `maxNeighbors` costs more than the other modes.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
