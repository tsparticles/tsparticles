# Particles Repulse

`particles.repulse` controls repulsion behavior in particle-to-particle interactions.

## Example

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## Practical guidance

- Use moderate distances to avoid abrupt motion jumps.
- Tune together with `interactivity.modes.repulse` when both are active.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
