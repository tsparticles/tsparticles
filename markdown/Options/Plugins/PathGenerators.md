# Path Generator Plugins

The `paths/` directory contains path generator packages that define custom movement paths for particles, selected via `particles.move.path.generator`.

## Available path generator packages

| Package                           | Generator name | Description                   |
| --------------------------------- | -------------- | ----------------------------- |
| `@tsparticles/path-branches`      | `branches`     | Branching tree-like paths     |
| `@tsparticles/path-brownian`      | `brownian`     | Brownian (random walk) motion |
| `@tsparticles/path-curl-noise`    | `curlNoise`    | Curl noise-based paths        |
| `@tsparticles/path-curves`        | `curves`       | Curved paths                  |
| `@tsparticles/path-fractal-noise` | `fractalNoise` | Fractal noise paths           |
| `@tsparticles/path-grid`          | `grid`         | Grid-based movement           |
| `@tsparticles/path-levy`          | `levy`         | Levy flight paths             |
| `@tsparticles/path-perlin-noise`  | `perlinNoise`  | Perlin noise paths            |
| `@tsparticles/path-polygon`       | `polygon`      | Polygon path                  |
| `@tsparticles/path-random`        | `random`       | Random direction changes      |
| `@tsparticles/path-simplex-noise` | `simplexNoise` | Simplex noise paths           |
| `@tsparticles/path-spiral`        | `spiral`       | Spiraling motion              |
| `@tsparticles/path-svg`           | `svg`          | SVG path following            |
| `@tsparticles/path-zigzag`        | `zigzag`       | Zigzag movement               |

## Usage

```json
{
  "particles": {
    "move": {
      "enable": true,
      "path": {
        "enable": true,
        "generator": "simplexNoise"
      }
    }
  }
}
```

Each path generator may accept additional options via `particles.move.path.options`.

## Related docs

- Move options: [Move](../Particles/Move.md)
- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
