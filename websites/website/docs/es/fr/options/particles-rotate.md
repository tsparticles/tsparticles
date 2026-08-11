# Particules en rotation

`particles.rotate` contrôle le comportement de rotation par particule.

## Exemple

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction` : dans le sens horaire ou anti-horaire.
- `animation.speed` : vitesse angulaire.
- `animation.sync` : timing de rotation partagé ou indépendant.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
