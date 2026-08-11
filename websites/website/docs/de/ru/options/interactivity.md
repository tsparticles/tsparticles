# Интерактивность

Параметры `interactivity` определяют, как частицы реагируют на наведение/щелчок.

Для целенаправленных ссылок:

- [`Interactivity Click`](/ru/options/interactivity-click)
- [`Interactivity Hover`](/ru/options/interactivity-hover)
- [`Interactivity Div`](/ru/options/interactivity-div)
- [`Interactivity Events`](/ru/options/interactivity-events)
- [`Interactivity Modes`](/ru/options/interactivity-modes)

## Базовая структура

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## Наиболее часто используемые события

- `onHover`: немедленная обратная связь для пользователей.
- `onClick`: всплески или целевые действия.
- `resize`: сохраняет единообразие поведения холста при изменении размера окна.
- `onDiv`: целевое взаимодействие с конкретными элементами.

## Лучшая практика

- Избегайте одновременного включения слишком большого количества режимов на устройствах низкого уровня.
  - Сохраняйте `distance` умеренным, чтобы избежать скачков производительности.
- Если эффект сильный, используйте ручное управление с помощью `Start/Pause`.

## Подробные ссылки

- Нажмите: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>.
- Наведите курсор: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Раздел: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
