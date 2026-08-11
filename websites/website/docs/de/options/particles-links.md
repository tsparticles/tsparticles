# Partikel-Links

`particles.links` zeichnet Verbindungslinien zwischen benachbarten Partikeln.

## Beispiel

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: maximale Entfernung für einen Link.
- `opacity`: visuelle Stärke der Linie.
- `color`: Linienfarbe.
- `width`: Strichstärke.

## Leistungstipp

Verbindungen können bei hohen Partikelzahlen teuer werden. Stimmen Sie `number.value` und `distance` gemeinsam ab.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
