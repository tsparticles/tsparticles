# Vie des particules

`particles.life` contrôle le nombre de cycles de vie et la durée par particule.

## Exemple

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

- `count` : combien de cycles de vie a chaque particule.
- `duration` : combien de temps dure chaque cycle.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
