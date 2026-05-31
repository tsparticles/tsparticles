# Plugin Option: Path Generators

`paths` provides path generator packages that define custom movement paths for particles, selected via `particles.move.path.generator`.

## Available path generators

| Package | Generator name | Description |
| ------- | -------------- | ----------- |
| `path-branches` | `branches` | Branching tree-like paths |
| `path-brownian` | `brownian` | Brownian random walk |
| `path-curl-noise` | `curlNoise` | Curl noise paths |
| `path-curves` | `curves` | Curved paths |
| `path-fractal-noise` | `fractalNoise` | Fractal noise |
| `path-grid` | `grid` | Grid movement |
| `path-levy` | `levy` | Levy flight |
| `path-perlin-noise` | `perlinNoise` | Perlin noise |
| `path-polygon` | `polygon` | Polygon path |
| `path-random` | `random` | Random changes |
| `path-simplex-noise` | `simplexNoise` | Simplex noise |
| `path-spiral` | `spiral` | Spiraling motion |
| `path-svg` | `svg` | SVG path following |
| `path-zigzag` | `zigzag` | Zigzag movement |

## Notes

- Configured via `particles.move.path.generator`.
- Each path may accept additional options under `particles.move.path.options`.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PathGenerators.md>
