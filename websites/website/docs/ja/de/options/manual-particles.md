# Manuelle Partikel

`manualParticles` fügt explizite Partikel an festen Positionen hinzu.

## Beispiel

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

## Wann man es verwenden sollte

- Verankerte visuelle Markierungen.
- Hybrideffekte, die feste und dynamische Partikel mischen.
- Kontrollierte Ausgangszustände in Demos oder Tutorials.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
