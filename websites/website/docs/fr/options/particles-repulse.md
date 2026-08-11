# Particules repoussées

`particles.repulse` contrôle le comportement de répulsion dans les interactions particule à particule.

## Exemple

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

## Conseils pratiques

- Utilisez des distances modérées pour éviter les sauts de mouvement brusques.
- Accordez-vous avec `interactivity.modes.repulse` lorsque les deux sont actifs.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
