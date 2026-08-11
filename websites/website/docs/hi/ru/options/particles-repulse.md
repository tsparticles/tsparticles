# Отталкивание частиц

`particles.repulse` управляет поведением отталкивания при взаимодействии частиц.

## Пример

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

## Практическое руководство

- Используйте умеренные расстояния, чтобы избежать резких скачков движения.
- Настройтесь вместе с `interactivity.modes.repulse`, когда оба активны.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
