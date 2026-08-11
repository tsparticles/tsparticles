# Число частиц

`particles.number` контролирует количество активных частиц.

## Пример

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: базовое количество частиц.
- `density.enable`: адаптирует количество к размеру холста.
- `density.area`: эталонная область, используемая для масштабирования.

## Совет по производительности

Сначала уменьшите `value`, когда FPS упадет.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
