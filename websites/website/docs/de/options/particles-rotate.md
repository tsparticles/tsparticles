# Partikel rotieren

`particles.rotate` steuert das Rotationsverhalten pro Partikel.

## Beispiel

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

- `direction`: im Uhrzeigersinn oder gegen den Uhrzeigersinn.
- `animation.speed`: Winkelgeschwindigkeit.
- `animation.sync`: gemeinsames vs. unabhängiges Rotations-Timing.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
