# Mouvement

`motion` est utile lorsque vous avez besoin d'un contrôle au niveau de l'animation, y compris un comportement de mouvement réduit.

## Structure de base

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable` : arrête le comportement lié au mouvement.
- `reduce` : permet une animation plus douce sur des appareils contraints ou des contextes à mouvement réduit.

## Conseils pratiques

- Conservez cette valeur par défaut, sauf si vous avez des exigences d'accessibilité/performance.
- Testez avec des préférences de mouvement réduit et des appareils bas de gamme.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
