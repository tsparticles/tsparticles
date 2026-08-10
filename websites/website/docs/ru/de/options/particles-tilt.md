# Partikelneigung

`particles.tilt` steuert den Neigungswinkel und die Neigungsanimation.

## Beispiel

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

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Tilt.md>
