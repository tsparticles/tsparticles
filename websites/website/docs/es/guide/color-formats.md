# Color Formats

tsParticles accepts multiple color formats across options such as `background`, `particles.paint`, and plugin settings.

## Common formats

```ts
color: "#60a5fa";
```

```ts
color: {
  value: {
    r: 96,
    g: 165,
    b: 250,
  },
}
```

```ts
color: {
  value: "hsl(220, 90%, 70%)",
}
```

## Practical guidance

- Prefer hex for readability in docs and examples.
- Use arrays of colors for richer randomized scenes.
- Keep contrast high when effects are used behind text.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Color.md>
