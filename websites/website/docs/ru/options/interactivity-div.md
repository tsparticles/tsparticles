# Отдел интерактивности

`interactivity.events.onDiv` применяет режимы взаимодействия к определенным элементам HTML.

## Пример

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## Практическое руководство

- Используйте его для целевых UX-зон вместо полноценных реакций.
- Сохраняйте списки селекторов явными и простыми в обслуживании.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
