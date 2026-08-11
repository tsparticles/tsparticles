# Vita delle particelle

`particles.life` controlla il conteggio del ciclo di vita e la durata per particella.

## Esempio

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

- `count`: quanti cicli di vita ha ciascuna particella.
- `duration`: quanto dura ogni ciclo.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
