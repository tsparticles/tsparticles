# Partikel zerstören

`particles.destroy` steuert, was passiert, wenn Partikel zerstört werden.

## Beispiel

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Praktische Anleitung

- Beginnen Sie mit einfachen `mode`-Setups, bevor Sie komplexe Split-Ketten durchführen.
  - Überprüfen Sie die Leistung erneut, wenn Sie große Split-Anzahlen verwenden.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
