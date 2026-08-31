# Particles Collisions

`particles.collisions` controls particle-to-particle collision behavior.

## Example

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: activates collisions.
- `mode`: collision behavior (`bounce` is the most common).

## Performance tip

Collisions can be costly at high particle counts. Tune with `particles.number` first.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
