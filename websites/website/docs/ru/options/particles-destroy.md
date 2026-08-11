# Частицы Уничтожить

`particles.destroy` управляет тем, что происходит при уничтожении частиц.

## Пример

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Практическое руководство

- Начните с простых настроек `mode`, а затем разбивайте сложные цепочки.

- Повторно проверьте производительность при использовании большого количества разделений.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
