# Интерактивность Нажмите

`interactivity.events.onClick` определяет, что происходит, когда пользователи щелкают или касаются холста.

## Пример

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## Практическое руководство

- Начните с одного режима, затем комбинируйте режимы только при необходимости.
- Оставьте `quantity` и `distance` умеренными для стабильного FPS.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
