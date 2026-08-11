# Colisiones de partículas

`particles.collisions` controla el comportamiento de colisión entre partículas.

## Ejemplo

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: activa colisiones.
- `mode`: comportamiento de colisión (`bounce` es el más común).

## Consejo de rendimiento

Las colisiones pueden resultar costosas con un elevado número de partículas. Sintonice primero con `particles.number`.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
