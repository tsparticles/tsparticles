# Forma de partículas

`particles.shape` define cómo se dibujan las partículas.

## Ejemplo

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: una forma o una lista de formas.
- valores comunes: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## Con opciones

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

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
