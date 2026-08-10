# Particules ZIndex

`particles.zIndex` contrôle la superposition de dessin et l'animation facultative d'index z.

## Exemple

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## Conseils pratiques

- Utilisez la variation de l'indice z pour créer une perception de la profondeur.
- Gardez les plages modérées pour préserver la cohérence visuelle.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
