# Particles Shape

`particles.shape` defines how particles are drawn.

## Example

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: one shape or a list of shapes.
- common values: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## With options

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
