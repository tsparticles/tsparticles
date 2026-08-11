# Manual Particles

`manualParticles` adds explicit particles at fixed positions.

## Example

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## When to use it

- Anchored visual markers.
- Hybrid effects mixing fixed and dynamic particles.
- Controlled initial states in demos or tutorials.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
