# Particles Links

`particles.links` draws connection lines between nearby particles.

## Example

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: max distance for a link.
- `opacity`: visual strength of the line.
- `color`: line color.
- `width`: stroke thickness.

## Performance tip

Links can get expensive with high particle counts. Tune `number.value` and `distance` together.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
