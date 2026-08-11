# Particles Rotate

`particles.rotate` controls per-particle rotation behavior.

## Example

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`: clockwise or counter-clockwise.
- `animation.speed`: angular speed.
- `animation.sync`: shared vs independent rotation timing.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
