# Option du plugin : Émetteurs

`emitters` génère des particules de manière dynamique et est piloté par un plugin.

## Exemple

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Remarques

- Idéal pour les effets d'éclatement et la génération dynamique de particules.
- Maintenir les taux d'émission équilibrés pour éviter les pics de performances.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
