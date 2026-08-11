# Particles Number

`particles.number` controls how many particles are active.

## Example

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: base amount of particles.
- `density.enable`: adapts count to canvas size.
- `density.area`: reference area used for scaling.

## Performance tip

Lower `value` first when FPS drops.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
