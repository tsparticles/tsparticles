# Опция плагина: Многоугольная маска

`polygonMask` ограничивает частицы областями SVG или полигонами.

## Пример

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## Примечания

- Используйте оптимизированные пути SVG для повышения производительности во время выполнения.
- Проверка загрузки пути и резервного поведения.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
