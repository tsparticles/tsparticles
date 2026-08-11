# Частицы отскакивают

`particles.bounce` настраивает поведение отскока, когда столкновения или границы применяют логику отскока.

## Пример

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Практическое руководство

- Значения около `1` сохраняют естественные отскоки.
- Более высокие значения могут выглядеть энергично, но менее реалистично.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
