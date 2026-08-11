# Partículas giram

`particles.rotate` controla o comportamento de rotação por partícula.

## Exemplo

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

- `direction`: sentido horário ou anti-horário.
- `animation.speed`: velocidade angular.
- `animation.sync`: tempo de rotação compartilhado versus independente.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
