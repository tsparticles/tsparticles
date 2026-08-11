# Partikelpalette

`particles.palette` importiert eine benannte Palette und wendet Partikelfarbstandards an.

## Beispiel

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## Was es ändert

- Legt `particles.paint.fill` oder `particles.paint.stroke` basierend auf der Palettenkonfiguration fest.
- Wenn die Palette mehrere Farbvarianten hat, wird `particles.paint` als Array von Varianten importiert.
- Aktiviert `particles.blend` mit dem Paletten-Mischmodus.

- Hält Ihre Konfiguration kompakt, wenn Sie Farbsätze wiederverwenden.

## Neues Palettenformat (für benutzerdefinierte Paletten)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` kann entweder sein:

- ein einzelnes Variantenobjekt (`{ fill?, stroke? }`)
  - ein Array von Variantenobjekten (jede Variante kann `fill`, `stroke` oder beide definieren)

## Notizen

- Unbekannte Paletten-IDs werden ignoriert.
  - Explizite `particles.paint.fill`-, `particles.paint.stroke`- oder `particles.blend`-Werte überschreiben importierte Standardwerte.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
