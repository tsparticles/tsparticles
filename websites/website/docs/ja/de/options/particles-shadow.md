# Partikelschatten

`particles.shadow` fügt einen Schatten um Partikel herum hinzu.

## Beispiel

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

## Praktische Anleitung

- Schatten verbessern die Tiefe, können aber bei dichten Szenen teuer sein.
- Verwenden Sie zuerst eine geringe Unschärfe und einen Benchmark auf Mobilgeräten.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
