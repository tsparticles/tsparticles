# Режимы интерактивности

`interactivity.modes` определяет настройки режима, используемые событиями.

## Пример

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## Практическое руководство

- Включайте только те режимы, которые вы действительно используете.
- Соблюдайте умеренные расстояния для стабильной работы.
- Используйте элементы управления «Старт/Пауза» для дорогостоящих комбинаций режимов.

Связанные страницы:

- [`Interactivity Click`](/ru/options/interactivity-click)
- [`Interactivity Hover`](/ru/options/interactivity-hover)
- [`Interactivity Div`](/ru/options/interactivity-div)

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
