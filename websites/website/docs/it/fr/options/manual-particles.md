# Particules manuelles

`manualParticles` ajoute des particules explicites à des positions fixes.

## Exemple

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

## Quand l'utiliser

- Marqueurs visuels ancrés.
- Effets hybrides mélangeant particules fixes et dynamiques.
- États initiaux contrôlés dans des démos ou des tutoriels.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
