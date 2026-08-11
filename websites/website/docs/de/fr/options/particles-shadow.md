# Ombre de particules

`particles.shadow` ajoute une ombre autour des particules.

## Exemple

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## Conseils pratiques

- Les ombres améliorent la profondeur mais peuvent être coûteuses sur les scènes denses.
- Utilisez d'abord un faible flou et effectuez une comparaison sur mobile.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
