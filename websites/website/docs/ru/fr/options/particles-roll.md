# Rouleau de particules

`particles.roll` applique un comportement de roulement et peut créer un mouvement visuel de type profondeur.

## Exemple

```ts
particles: {
  roll: {
    enable: true,
    speed: 12,
    darken: {
      enable: true,
      value: 20,
    },
  },
}
```

## Conseils pratiques

- Utilisez d'abord à vitesse modérée.
- Combinez soigneusement avec `tilt` et `rotate` pour plus de lisibilité.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Roll.md>
