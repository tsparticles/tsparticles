# Столкновения частиц

`particles.collisions` управляет поведением столкновений частиц.

## Пример

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: активирует коллизии.
- `mode`: поведение при коллизиях (`bounce` является наиболее распространенным).

## Совет по производительности

Столкновения могут быть дорогостоящими при большом количестве частиц. Сначала настройтесь на `particles.number`.

## Ссылка на источник

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
