# Le particelle ruotano

`particles.rotate` controlla il comportamento di rotazione per particella.

## Esempio

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`: in senso orario o antiorario.
- `animation.speed`: velocità angolare.
- `animation.sync`: tempi di rotazione condivisi vs indipendenti.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
