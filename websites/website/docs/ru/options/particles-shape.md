# Форма частиц

`particles.shape` определяет способ рисования частиц.

## Пример

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: одна фигура или список фигур.
- общие значения: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## С опциями

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
