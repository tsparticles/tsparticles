# Partículas Vida

`particles.life` controla el recuento del ciclo de vida y la duración por partícula.

## Ejemplo

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

- `count`: cuántos ciclos de vida tiene cada partícula.
- `duration`: cuánto dura cada ciclo.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
