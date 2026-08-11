# Partikelanzahl

`particles.number` steuert, wie viele Partikel aktiv sind.

## Beispiel

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

- `value`: Basismenge an Partikeln.
- `density.enable`: Passt die Anzahl an die Leinwandgröße an.
- `density.area`: Referenzbereich, der für die Skalierung verwendet wird.

## Leistungstipp

Senken Sie zuerst `value`, wenn die FPS sinken.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
