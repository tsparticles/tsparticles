# Le particelle si muovono

`particles.move` definisce la direzione, la velocità e il comportamento fuori campo.

## Esempio

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: attiva il movimento.
- `speed`: intensità di movimento percepita primaria.
- `direction`: direzione fissa o movimento libero.
- `outModes`: comportamento ai limiti della tela.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
