# Partículas de Vida

`particles.life` controla a contagem e a duração do ciclo de vida por partícula.

## Exemplo

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`: quantos ciclos de vida cada partícula possui.
- `duration`: quanto tempo dura cada ciclo.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
