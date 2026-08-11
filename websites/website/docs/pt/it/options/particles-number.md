# Numero di particelle

`particles.number` controlla quante particelle sono attive.

## Esempio

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: quantità base di particelle.
- `density.enable`: adatta il conteggio alle dimensioni della tela.
- `density.area`: area di riferimento utilizzata per il ridimensionamento.

## Suggerimento per le prestazioni

Abbassa prima `value` quando l'FPS diminuisce.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
