# Particles

Root section for all particle appearance and behavior settings.

Each property controls one aspect of a particle's life cycle.  
Use the links below to navigate to the detailed page for each sub-option.

## Sub-options

| Property           | Description                                                                 | Docs                                    |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------- |
| `bounce`           | Bounce behavior when particles hit each other or the canvas edge            | {@link IParticlesBounce}                |
| `collisions`       | Collision detection and response between particles                          | [Collisions](./Particles/Collisions.md) |
| `color`            | Base particle color                                                         | {@link IAnimatableColor}                |
| `destroy`          | What happens when a particle reaches end of life                            | [Destroy](./Particles/Destroy.md)       |
| `groups`           | Define named groups with different settings applied to subsets of particles | —                                       |
| `life`             | Lifespan and delay for finite-lifetime particles                            | [Life](./Particles/Life.md)             |
| `links`            | Lines drawn between nearby particles                                        | [Links](./Particles/Links.md)           |
| `move`             | Movement direction, speed, and path                                         | [Move](./Particles/Move.md)             |
| `number`           | How many particles exist and density rules                                  | [Number](./Particles/Number.md)         |
| `opacity`          | Transparency and animated fading                                            | [Opacity](./Particles/Opacity.md)       |
| `orbit`            | Orbital rotation around a center point                                      | {@link IOrbit}                          |
| `reduceDuplicates` | When `true`, picks particle configs sequentially instead of randomly        | —                                       |
| `repulse`          | Mutual repulsion between particles                                          | {@link IParticlesRepulse}               |
| `roll`             | 3D-like rolling effect                                                      | [Roll](./Particles/Roll.md)             |
| `rotate`           | Rotation angle and speed                                                    | [Rotate](./Particles/Rotate.md)         |
| `shadow`           | Drop shadow behind particles                                                | [Shadow](./Particles/Shadow.md)         |
| `shape`            | Particle visual shape (circle, square, image, emoji, …)                     | [Shape](./Particles/Shape.md)           |
| `size`             | Particle radius and animated grow/shrink                                    | [Size](./Particles/Size.md)             |
| `stroke`           | Outline stroke color and width                                              | [Stroke](./Particles/Stroke.md)         |
| `tilt`             | Tilt angle and animation                                                    | [Tilt](./Particles/Tilt.md)             |
| `twinkle`          | Random opacity flicker effect                                               | [Twinkle](./Particles/Twinkle.md)       |
| `wobble`           | Lateral wobble movement                                                     | [Wobble](./Particles/Wobble.md)         |
| `zIndex`           | Depth sorting of particles                                                  | [ZIndex](./Particles/ZIndex.md)         |

## Minimal practical example

```json
{
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "enable": true,
      "color": "#ffffff",
      "distance": 150,
      "opacity": 0.4
    },
    "move": {
      "enable": true,
      "speed": 1.5
    },
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "area": 800
      }
    },
    "opacity": {
      "value": 0.5
    },
    "shape": {
      "type": "circle"
    },
    "size": {
      "value": { "min": 1, "max": 3 }
    }
  }
}
```

## groups

Particle groups let you define subsets of particles with different configs applied to a fraction of the total count.

```json
{
  "particles": {
    "number": { "value": 100 },
    "groups": {
      "small": {
        "number": { "value": 60 },
        "size": { "value": 2 },
        "color": { "value": "#aaaaff" }
      },
      "large": {
        "number": { "value": 40 },
        "size": { "value": 8 },
        "color": { "value": "#ff4444" }
      }
    }
  }
}
```

## reduceDuplicates

When `true`, particles cycle through configs sequentially instead of picking randomly — useful for guaranteed even distribution.

## Common pitfalls

- Enabling `links` without `@tsparticles/slim` or higher
- Setting `move.enable: false` and expecting particles to appear animated
- Forgetting `number.density.enable: true` on responsive layouts — particle count stays fixed regardless of screen size
- Using a shape type without loading the corresponding shape package

## Related docs

- Options root: [Options](../Options.md)
- Number: [Number](./Particles/Number.md)
- Move: [Move](./Particles/Move.md)
- Links: [Links](./Particles/Links.md)
- Shape: [Shape](./Particles/Shape.md)
