# Partikel stoßen ab

`particles.repulse` steuert das Abstoßungsverhalten bei Partikel-zu-Partikel-Wechselwirkungen.

## Beispiel

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

## Praktische Anleitung

- Halten Sie moderate Abstände ein, um abrupte Bewegungssprünge zu vermeiden.
  - Stimmen Sie zusammen mit `interactivity.modes.repulse` ab, wenn beide aktiv sind.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
