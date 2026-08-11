# Le particelle si respingono

`particles.repulse` controlla il comportamento di repulsione nelle interazioni particella-particella.

## Esempio

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## Guida pratica

- Utilizzare distanze moderate per evitare bruschi salti di movimento.
- Sintonizzarsi con `interactivity.modes.repulse` quando entrambi sono attivi.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
