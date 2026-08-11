# Partikelfarbe

`particles.paint` gruppiert Partikelfüllungs- und Strichstiloptionen.

## Beispiel

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Füllen (`particles.paint.fill`)

- Definiert die innere Farbe des Partikels.
- Unterstützt statische Werte, Arrays und Farbanimationen.

## Strich (`particles.paint.stroke`)

- Definiert die Breite und Farbe der Kontur.
- Nützlich, um den Formkontrast zu erhöhen.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
