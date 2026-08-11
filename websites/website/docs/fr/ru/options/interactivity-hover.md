# Интерактивность при наведении

`interactivity.events.onHover` управляет реакциями наведения указателя.

## Пример

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## Практическое руководство

- Эффекты при наведении дороже в плотных сценах.
  - На мобильных устройствах рассмотрите возможность отключения режимов с тяжелым наведением.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
