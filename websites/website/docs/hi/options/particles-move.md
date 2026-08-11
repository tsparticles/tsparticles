# Particles Move

`particles.move` defines direction, speed, and out-of-canvas behavior.

## Example

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: turns movement on.
- `speed`: primary perceived motion intensity.
- `direction`: fixed direction or free movement.
- `outModes`: behavior at canvas bounds.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
