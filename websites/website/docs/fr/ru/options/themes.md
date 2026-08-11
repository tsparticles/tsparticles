# Темы

`themes` позволяет определять именованные наборы опций (например, светлый и темный) и переключаться во время выполнения.

## Пример

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## Практическое руководство

- Сохраняйте стабильный объект базовых параметров.
- Переопределить только то, что отличается для каждой темы.
- Сопряжение с состоянием темного режима на уровне приложения.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
