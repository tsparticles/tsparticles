# Частицы Тень

`particles.shadow` добавляет тень вокруг частиц.

## Пример

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## Практическое руководство

- Тени улучшают глубину, но могут оказаться дорогостоящими в плотных сценах.
  - Сначала используйте низкое размытие и проверьте качество изображения на мобильном устройстве.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
