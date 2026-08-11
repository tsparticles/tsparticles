# Ссылки на частицы

`particles.links` рисует линии соединения между близлежащими частицами.

## Пример

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: максимальное расстояние для ссылки.
- `opacity`: визуальная сила линии.
- `color`: цвет линии.
- `width`: толщина штриха.

## Совет по производительности

Ссылки могут стать дорогими из-за большого количества частиц. Настройте `number.value` и `distance` вместе.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
