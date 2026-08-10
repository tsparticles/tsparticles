# Inclinaison des particules

`particles.tilt` contrôle l'angle d'inclinaison et l'animation d'inclinaison.

## Exemple

```ts
particles: {
  tilt: {
    enable: true,
    direction: "clockwise",
    value: {
      min: 0,
      max: 360,
    },
    animation: {
      enable: true,
      speed: 15,
      sync: false,
    },
  },
}
```

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Tilt.md>
