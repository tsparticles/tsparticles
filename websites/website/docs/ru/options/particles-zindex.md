# Particles ZIndex

`particles.zIndex` controls draw layering and optional z-index animation.

## Example

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## Practical guidance

- Use z-index variation to create depth perception.
- Keep ranges moderate to preserve visual consistency.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
