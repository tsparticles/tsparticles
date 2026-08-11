# Ручные частицы

`manualParticles` добавляет явные частицы в фиксированных позициях.

## Пример

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## Когда это использовать

- Закрепленные визуальные маркеры.
- Гибридные эффекты, смешивающие фиксированные и динамические частицы.
- Контролируемые начальные состояния в демонстрациях или руководствах.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
