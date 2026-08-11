# Número de partículas

`particles.number` controla cuántas partículas están activas.

## Ejemplo

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: cantidad base de partículas.
- `density.enable`: adapta el recuento al tamaño del lienzo.
- `density.area`: área de referencia utilizada para el escalado.

## Consejo de rendimiento

Baje `value` primero cuando baje el FPS.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
