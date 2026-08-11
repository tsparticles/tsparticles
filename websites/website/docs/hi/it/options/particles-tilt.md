# Inclinazione delle particelle

`particles.tilt` controlla l'angolo di inclinazione e l'animazione di inclinazione.

## Esempio

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

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Tilt.md>
