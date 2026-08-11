# Partículas Girar

`particles.rotate` controla el comportamiento de rotación por partícula.

## Ejemplo

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`: en sentido horario o antihorario.
- `animation.speed`: velocidad angular.
- `animation.sync`: sincronización de rotación compartida vs independiente.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
