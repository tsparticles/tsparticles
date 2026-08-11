# Inclinação de partículas

`particles.tilt` controla o ângulo de inclinação e a animação de inclinação.

## Exemplo

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

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Tilt.md>
