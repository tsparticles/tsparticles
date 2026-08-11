# Частицы движутся

`particles.move` определяет направление, скорость и поведение за пределами холста.

## Пример

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

- `enable`: включает движение.
- `speed`: первичная воспринимаемая интенсивность движения.
- `direction`: фиксированное направление или свободное движение.
- `outModes`: поведение на границах холста.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
