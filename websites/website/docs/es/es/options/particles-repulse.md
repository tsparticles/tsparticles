# Repulsión de partículas

`particles.repulse` controla el comportamiento de repulsión en las interacciones entre partículas.

## Ejemplo

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## Orientación práctica

- Utilice distancias moderadas para evitar saltos bruscos de movimiento.
- Sintoniza junto con `interactivity.modes.repulse` cuando ambos estén activos.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
