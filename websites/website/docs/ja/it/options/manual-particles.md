# Particelle manuali

`manualParticles` aggiunge particelle esplicite in posizioni fisse.

## Esempio

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## Quando usarlo

- Indicatori visivi ancorati.
- Effetti ibridi che mescolano particelle fisse e dinamiche.
- Stati iniziali controllati in demo o tutorial.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
