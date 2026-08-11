# Particles Bounce

`particles.bounce` customizes rebound behavior when collisions or boundaries apply bounce logic.

## Example

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Practical guidance

- Values around `1` keep natural rebounds.
- Higher values can look energetic but less realistic.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
