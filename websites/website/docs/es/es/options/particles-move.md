# Partículas se mueven

`particles.move` define la dirección, la velocidad y el comportamiento fuera del lienzo.

## Ejemplo

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: activa el movimiento.
- `speed`: intensidad de movimiento primaria percibida.
- `direction`: dirección fija o libre movimiento.
- `outModes`: comportamiento en los límites de la lona.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
