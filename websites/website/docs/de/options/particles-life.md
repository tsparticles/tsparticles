# Leben der Partikel

`particles.life` steuert die Anzahl und Dauer des Lebenszyklus pro Partikel.

## Beispiel

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

- `count`: wie viele Lebenszyklen jedes Partikel hat.
- `duration`: wie lange jeder Zyklus dauert.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
