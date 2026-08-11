# Nombre de particules

`particles.number` contrôle le nombre de particules actives.

## Exemple

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

- `value` : quantité de base de particules.
- `density.enable` : adapte le nombre à la taille de la toile.
- `density.area` : zone de référence utilisée pour la mise à l'échelle.

## Conseil sur les performances

Réduisez d'abord `value` lorsque le FPS chute.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
