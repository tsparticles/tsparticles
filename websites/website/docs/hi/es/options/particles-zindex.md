# Partículas ZIndex

`particles.zIndex` controla las capas de dibujo y la animación de índice z opcional.

## Ejemplo

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## Orientación práctica

- Utilice la variación del índice z para crear una percepción de profundidad.
- Mantenga los rangos moderados para preservar la coherencia visual.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
