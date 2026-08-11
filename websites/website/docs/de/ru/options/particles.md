# Частицы

Параметры внутри `particles` управляют внешним видом и движением частиц.

## Наиболее часто используемые группы

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Смотрите подробные страницы:

- [`Particles Number`](/ru/options/particles-number)
- [`Particles Move`](/ru/options/particles-move)
- [`Particles Links`](/ru/options/particles-links)
- [`Particles Palette`](/ru/options/particles-palette)
- [`Particles Paint`](/ru/options/particles-paint)
- [`Particles Shape`](/ru/options/particles-shape)

## `particles.number`

```ts
particles: {
  number: {
    value: 70,
    density: {
      enable: true,
      area: 800
    }
  }
}
```

- `value`: количество базовых частиц.
- `density.enable`: адаптирует количество к размеру контейнера.

## `particles.move`

```ts
move: {
  enable: true,
  speed: 1.6,
  direction: "none",
  outModes: {
    default: "out"
  }
}
```

- `speed`: воспринимаемая скорость движения.
- `outModes.default`: поведение края (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Включает связи между частицами, что полезно для «сетевых» разделов героев.

## `particles.palette`

```ts
palette: "sunset";
```

- Импортирует цвета и настройки смешивания по умолчанию из зарегистрированного идентификатора палитры.
- Заполняет `paint.fill` или `paint.stroke` автоматически в зависимости от палитры.
- При использовании многовариантных палитр `paint` загружается как массив вариантов.
- Полезно с пресетами и демонстрациями, если вы хотите быстро поменять цветовое настроение.

## `particles.shape`, `size`, `opacity`

```ts
shape: {
  type: ["circle", "square"]
},
size: {
  value: {
    min: 1,
    max: 5
  }
},
opacity: {
  value: 0.7
}
```

- `shape.type`: один тип или список типов.
- `size.value`: рекомендуемый диапазон для естественного изменения.
- `opacity.value`: средняя прозрачность.

## Расширенные группы, которые стоит проверить дальше

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Подробные страницы:

- [`Particles Bounce`](/ru/options/particles-bounce)
- [`Particles Paint`](/ru/options/particles-paint)
- [`Particles Destroy`](/ru/options/particles-destroy)
- [`Particles Group`](/ru/options/particles-group)
- [`Particles Collisions`](/ru/options/particles-collisions)
- [`Particles Life`](/ru/options/particles-life)
- [`Particles Palette`](/ru/options/particles-palette)
- [`Particles Opacity`](/ru/options/particles-opacity)
- [`Particles Orbit`](/ru/options/particles-orbit)
- [`Particles Repulse`](/ru/options/particles-repulse)
- [`Particles Roll`](/ru/options/particles-roll)
- [`Particles Rotate`](/ru/options/particles-rotate)
- [`Particles Shadow`](/ru/options/particles-shadow)
- [`Particles Size`](/ru/options/particles-size)
- [`Particles Tilt`](/ru/options/particles-tilt)
- [`Particles Twinkle`](/ru/options/particles-twinkle)
- [`Particles Wobble`](/ru/options/particles-wobble)
- [`Particles ZIndex`](/ru/options/particles-zindex)
- [`Particles Move`](/ru/options/particles-move)
- [`Particles Number`](/ru/options/particles-number)
- [`Particles Links`](/ru/options/particles-links)
- [`Particles Shape`](/ru/options/particles-shape)

Исходные страницы: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
