# Particles Links

Draws lines between nearby particles, creating a web-like effect.

> Requires `@tsparticles/slim` or higher (not available in `@tsparticles/basic`).

## Properties

| Key         | Type                  | Example          | Notes                                                                      |
| ----------- | --------------------- | ---------------- | -------------------------------------------------------------------------- |
| `enable`    | `boolean`             | `true` / `false` | Activates link drawing                                                     |
| `distance`  | `number`              | `150`            | Max px distance between particles for a link to appear                     |
| `color`     | color object / string | `"#ffffff"`      | See {@link IColor}                                                         |
| `opacity`   | `number`              | `0.4`            | Link line opacity (0–1)                                                    |
| `width`     | `number`              | `1.5`            | Link line width in pixels                                                  |
| `blink`     | `boolean`             | `true` / `false` | When `color` is `"random"`, makes links blink with different random colors |
| `consent`   | `boolean`             | `true` / `false` | When `color` is `"random"`, all links share one common random color        |
| `id`        | `string`              | `"group1"`       | Only particles with the same `id` are linked                               |
| `warp`      | `boolean`             | `true` / `false` | Links wrap around canvas edges                                             |
| `shadow`    | `object`              |                  | See [Links Shadow](#links-shadow)                                          |
| `triangles` | `object`              |                  | See [Links Triangles](#links-triangles)                                    |

## Quick examples

### Basic links web

```json
{
  "links": {
    "enable": true,
    "distance": 150,
    "color": "#ffffff",
    "opacity": 0.4,
    "width": 1
  }
}
```

### Colored random-blink links

```json
{
  "links": {
    "enable": true,
    "distance": 120,
    "color": "random",
    "blink": true,
    "opacity": 0.6
  }
}
```

### Links with triangles fill

```json
{
  "links": {
    "enable": true,
    "distance": 150,
    "color": "#4f46e5",
    "triangles": {
      "enable": true,
      "color": "#4f46e5",
      "opacity": 0.1
    }
  }
}
```

### Grouped links (only within same id)

```json
{
  "particles": {
    "groups": {
      "teamA": {
        "links": { "enable": true, "id": "teamA", "color": "#ff0000" }
      },
      "teamB": {
        "links": { "enable": true, "id": "teamB", "color": "#0000ff" }
      }
    }
  }
}
```

## Links Shadow

Adds a blur glow effect to link lines.

| Key      | Type                  | Example          | Notes                 |
| -------- | --------------------- | ---------------- | --------------------- |
| `enable` | `boolean`             | `true` / `false` | Activates shadow      |
| `blur`   | `number`              | `4`              | Blur radius in pixels |
| `color`  | string / color object | `"#ffffff"`      | Shadow color          |

```json
{
  "links": {
    "enable": true,
    "shadow": {
      "enable": true,
      "blur": 5,
      "color": "#00ffff"
    }
  }
}
```

## Links Triangles

Fills triangles formed by three nearby linked particles.

| Key       | Type                  | Example          | Notes                   |
| --------- | --------------------- | ---------------- | ----------------------- |
| `enable`  | `boolean`             | `true` / `false` | Activates triangle fill |
| `color`   | string / color object | `"#ffffff"`      | Triangle fill color     |
| `opacity` | `number`              | `0.1`            | Fill opacity (0–1)      |

## Common pitfalls

- Using `links` without loading a bundle that includes it (`@tsparticles/slim` or higher)
- Setting `distance` too low — with few particles spread across a large canvas, no links will appear
- Using `blink: true` and `consent: true` at the same time — `consent` takes precedence
- Setting `id` without configuring groups — standalone particles won't link at all

## Related docs

- Particles root: [Particles](../Particles.md)
- Color formats: [Color](../../Color.md)
- Options root: [Options](../../Options.md)
