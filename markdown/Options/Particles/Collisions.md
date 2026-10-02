# Particles Collisions

Controls how particles interact when they intersect each other.

## Properties

| Key       | Type      | Example                                           | Notes                                              |
| --------- | --------- | ------------------------------------------------- | -------------------------------------------------- |
| `enable`  | `boolean` | `true` / `false`                                  | Enables particle-to-particle collision handling    |
| `mode`    | `string`  | `"bounce"` / `"destroy"` / `"absorb"` / `"fluid"` | Collision behavior                                 |
| `bounce`  | `object`  |                                                   | Bounce tuning options, see {@link IBounce}         |
| `fluid`   | `object`  |                                                   | Fluid tuning options, see {@link ICollisionsFluid} |
| `overlap` | `object`  |                                                   | Initial spawn overlap handling                     |

## Collision modes

| Mode        | Behavior                                                               |
| ----------- | ---------------------------------------------------------------------- |
| `"bounce"`  | Particles bounce off each other preserving both particles              |
| `"destroy"` | One particle is removed after impact                                   |
| `"absorb"`  | One particle absorbs another, increasing size/mass effect              |
| `"fluid"`   | Particles behave like a fluid, spreading and flowing around each other |

The `fluid` mode is mutually exclusive with the other modes, it replaces the pairwise impulse
resolution with a neighborhood solver, since a fluid response depends on the local density of the
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

The solver pushes particles apart when the local density is higher than `restDensity`, pulling them
together when it's lower, and it keeps them inside the canvas bounds, so a fluid rests on the borders
instead of sliding out of the canvas. Any [out mode](./OutModes.md) still applies on top of that, and
`bounce` is the one to pick for a fluid: it is what lets a pool slide along the border and settle
against it, instead of piling up on the exact edge of the canvas.

A fluid also needs the particles to come to rest once it has settled. The non-penetration projection
only corrects positions, so gravity would keep feeding a resting particle frame after frame, leaving
it still in place but with a velocity that grows without bound, bouncing on the spot forever. A
particle supported by enough of its neighbors therefore bleeds off its velocity, while one in free
fall, having no support, keeps accelerating until its own speed limit. The number of contacts that
counts as supported is a balance between the two ways it can go wrong: too low and a falling cloud is
damped before it lands and hangs in mid air, too high and the pool keeps the agitation of an
undamped one.

The density response is a soft force, so on its own it can never guarantee that particles do not
overlap. A hard non-penetration constraint is applied on top of it: every pair closer than the sum of
their radii is projected back to exactly the contact distance. Each particle moves only itself and
cleans up its own overlaps right after, so a particle solved later in the frame cannot undo the pairs
already resolved.

That per particle solve cannot converge on its own inside a very dense pool, where pushing a particle
out of a neighbor immediately wedges it into another one, so a small share of pairs may stay slightly
interpenetrating when the packing is tight. Raising `stiffness` and `maxForce` does not close the gap,
it only injects enough energy to turn the pool into a chaotic gas.

## Quick examples

### Basic bounce collisions

```json
{
  "collisions": {
    "enable": true,
    "mode": "bounce"
  }
}
```

### Arcade-style destructive collisions

```json
{
  "collisions": {
    "enable": true,
    "mode": "destroy"
  }
}
```

### Absorb collisions

```json
{
  "collisions": {
    "enable": true,
    "mode": "absorb"
  }
}
```

## Fluid interactions

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
the bottom. Overlaps are prevented by the non-penetration constraint and not by these values, so
raising `nearStiffness` / `maxForce` to fight an overlap only adds energy, spreading the fluid out
like a gas. To get visible gaps between the particles, raise `restDensity` instead, keeping in mind
that a dense fluid needs room: with `size` and `number` fixed, too many particles cannot fit with
gaps and will settle into a compact packed layer.

## Overlap options

Controls how initial particles are placed when collisions are enabled.

| Key       | Type      | Example          | Notes                                                       |
| --------- | --------- | ---------------- | ----------------------------------------------------------- |
| `enable`  | `boolean` | `true` / `false` | If `false`, overlapping at spawn is prevented               |
| `retries` | `number`  | `1`              | Number of attempts to find a non-overlapping spawn position |

### Spawn without overlaps

```json
{
  "collisions": {
    "enable": true,
    "overlap": {
      "enable": false,
      "retries": 5
    }
  }
}
```

## Migration from the experimental fluid draft

Fluid is not a standalone options group nor a separate plugin anymore, the old `particles.fluid`
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

The dedicated fluid loader must be removed, loading the particles collisions interaction is enough.

## Common pitfalls

- Enabling collisions with very high particle counts can be expensive in large canvases
- Using `mode: "destroy"` without emitters can reduce particle count quickly
- Setting `overlap.enable: false` with low `retries` can still allow occasional overlaps in crowded scenes
- Using `mode: "fluid"` with a big `radius` or a high `maxNeighbors` costs more than the other modes

## Related docs

- Particles root: [Particles](../Particles.md)
- Move and bounce behavior: [Move](./Move.md)
- Options root: [Options](../../Options.md)
