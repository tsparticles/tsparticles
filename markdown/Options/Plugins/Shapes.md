# Shape Plugins

The `shapes/` directory contains individual shape packages that extend the built-in shape types. Each package registers a new shape name that can be used in `particles.shape.type`.

## Available shape packages

| Package                              | Shape name           | Description                      |
| ------------------------------------ | -------------------- | -------------------------------- |
| `@tsparticles/shape-arrow`           | `arrow`              | Arrow shape                      |
| `@tsparticles/shape-cards`           | `cards`              | Playing card shape               |
| `@tsparticles/shape-circle`          | `circle`             | Circle (also available built-in) |
| `@tsparticles/shape-cog`             | `cog`                | Cog/gear shape                   |
| `@tsparticles/shape-emoji`           | `emoji`              | Emoji character                  |
| `@tsparticles/shape-heart`           | `heart`              | Heart shape                      |
| `@tsparticles/shape-image`           | `image` / `images`   | External image or SVG            |
| `@tsparticles/shape-infinity`        | `infinity`           | Infinity symbol                  |
| `@tsparticles/shape-line`            | `line`               | Straight line                    |
| `@tsparticles/shape-matrix`          | `matrix`             | Matrix-style character rain      |
| `@tsparticles/shape-path`            | `path`               | Custom SVG path                  |
| `@tsparticles/shape-polygon`         | `polygon`            | Regular polygon with N sides     |
| `@tsparticles/shape-ribbon`          | `ribbon`             | Ribbon shape                     |
| `@tsparticles/shape-rounded-polygon` | `rounded-polygon`    | Polygon with rounded corners     |
| `@tsparticles/shape-rounded-rect`    | `rounded-rect`       | Rectangle with rounded corners   |
| `@tsparticles/shape-spiral`          | `spiral`             | Spiral shape                     |
| `@tsparticles/shape-square`          | `square`             | Square (also available built-in) |
| `@tsparticles/shape-squircle`        | `squircle`           | Square-circle hybrid shape       |
| `@tsparticles/shape-star`            | `star`               | Star with N points               |
| `@tsparticles/shape-text`            | `character` / `char` | Text character                   |

## Usage

```json
{
  "particles": {
    "shape": {
      "type": "heart"
    }
  }
}
```

Each shape may accept additional options under `particles.shape.options.<shapeName>`. See [Shape](../Particles/Shape.md) for the generic shape configuration.

## Related docs

- Shape options: [Shape](../Particles/Shape.md)
- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
