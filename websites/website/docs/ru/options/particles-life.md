# Частицы жизни

`particles.life` управляет количеством и продолжительностью жизненного цикла каждой частицы.

## Пример

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`: сколько жизненных циклов имеет каждая частица.
- `duration`: продолжительность каждого цикла.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
