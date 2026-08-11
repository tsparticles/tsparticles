# Частицы вращаются

`particles.rotate` управляет поведением вращения каждой частицы.

## Пример

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

- `direction`: по часовой стрелке или против часовой стрелки.
- `animation.speed`: угловая скорость.
- `animation.sync`: совместное и независимое время вращения.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
