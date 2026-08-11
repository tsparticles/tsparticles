# Particules rebondissantes

`particles.bounce` personnalise le comportement de rebond lorsque des collisions ou des limites appliquent une logique de rebond.

## Exemple

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Conseils pratiques

- Les valeurs autour de `1` conservent les rebonds naturels.
- Des valeurs plus élevées peuvent paraître énergiques mais moins réalistes.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
