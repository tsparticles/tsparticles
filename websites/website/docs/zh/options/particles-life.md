# Particles Life

`particles.life` controls lifecycle count and duration per particle.

## Example

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`: how many life cycles each particle has.
- `duration`: how long each cycle lasts.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
