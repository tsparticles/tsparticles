# Particles Shadow

`particles.shadow` adds a shadow around particles.

## Example

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## Practical guidance

- Shadows improve depth but can be expensive on dense scenes.
- Use low blur first and benchmark on mobile.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
