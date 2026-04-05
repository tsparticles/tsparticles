# Particles Collisions

Controls how particles interact when they intersect each other.

## Properties

| Key       | Type      | Example                               | Notes                                           |
| --------- | --------- | ------------------------------------- | ----------------------------------------------- |
| `enable`  | `boolean` | `true` / `false`                      | Enables particle-to-particle collision handling |
| `mode`    | `string`  | `"bounce"` / `"destroy"` / `"absorb"` | Collision behavior                              |
| `bounce`  | `object`  |                                       | Bounce tuning options, see {@link IBounce}      |
| `overlap` | `object`  |                                       | Initial spawn overlap handling                  |

## Collision modes

| Mode        | Behavior                                                  |
| ----------- | --------------------------------------------------------- |
| `"bounce"`  | Particles bounce off each other preserving both particles |
| `"destroy"` | One particle is removed after impact                      |
| `"absorb"`  | One particle absorbs another, increasing size/mass effect |

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

## Common pitfalls

- Enabling collisions with very high particle counts can be expensive in large canvases
- Using `mode: "destroy"` without emitters can reduce particle count quickly
- Setting `overlap.enable: false` with low `retries` can still allow occasional overlaps in crowded scenes

## Related docs

- Particles root: [Particles](../Particles.md)
- Move and bounce behavior: [Move](./Move.md)
- Options root: [Options](../../Options.md)
