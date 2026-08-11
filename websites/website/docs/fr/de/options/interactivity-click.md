# Interaktivität Klicken Sie

`interactivity.events.onClick` definiert, was passiert, wenn Benutzer auf die Leinwand klicken/tippen.

## Beispiel

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## Praktische Anleitung

- Beginnen Sie mit einem Modus und kombinieren Sie die Modi dann nur bei Bedarf.
- Halten Sie `quantity` und `distance` für stabile FPS moderat.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
