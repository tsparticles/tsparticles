# Inclinación de partículas

`particles.tilt` controla el ángulo de inclinación y la animación de inclinación.

## Ejemplo

```ts
particles: {
  tilt: {
    enable: true,
    direction: "clockwise",
    value: {
      min: 0,
      max: 360,
    },
    animation: {
      enable: true,
      speed: 15,
      sync: false,
    },
  },
}
```

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Tilt.md>
