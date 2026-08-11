# Палитра частиц

`particles.palette` импортирует именованную палитру и применяет цвета частиц по умолчанию.

## Пример

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## Что это меняет

- Устанавливает `particles.paint.fill` или `particles.paint.stroke` в зависимости от конфигурации палитры.
- Если палитра имеет несколько вариантов цвета, `particles.paint` импортируется как массив вариантов.
- Включает `particles.blend` с режимом наложения палитры.
  — Сохраняет компактность конфигурации при повторном использовании наборов цветов.

## Новый формат палитры (для пользовательских палитр)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` может быть:

- один вариант объекта (`{ fill?, stroke? }`)
- массив объектов вариантов (каждый вариант может определять `fill`, `stroke` или оба)

## Примечания

— Неизвестные идентификаторы палитр игнорируются.

- Явные значения `particles.paint.fill`, `particles.paint.stroke` или `particles.blend` переопределяют импортированные значения по умолчанию.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
