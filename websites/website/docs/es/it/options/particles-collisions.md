# Collisioni di particelle

`particles.collisions` controlla il comportamento delle collisioni da particella a particella.

## Esempio

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: attiva le collisioni.
- `mode`: comportamento di collisione (`bounce` è il più comune).

## Suggerimento per le prestazioni

Le collisioni possono essere costose in caso di conteggi elevati di particelle. Sintonizzati prima con `particles.number`.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
