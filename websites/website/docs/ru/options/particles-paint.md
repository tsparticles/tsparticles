# Частицы краски

`particles.paint` группирует параметры заливки частиц и стиля обводки.

## Пример

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Заполнить (`particles.paint.fill`)

- Определяет внутренний цвет частицы.
- Поддерживает статические значения, массивы и цветную анимацию.

## Ход (`particles.paint.stroke`)

- Определяет ширину и цвет контура.
- Полезно для увеличения контраста формы.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
