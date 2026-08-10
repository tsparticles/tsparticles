# Partículas manuales

`manualParticles` agrega partículas explícitas en posiciones fijas.

## Ejemplo

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## Cuándo usarlo

- Marcadores visuales anclados.
- Efectos híbridos que mezclan partículas fijas y dinámicas.
- Estados iniciales controlados en demos o tutoriales.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
