# Interaktivitätsmodi

`interactivity.modes` definiert modusspezifische Einstellungen, die von Ereignissen verwendet werden.

## Beispiel

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## Praktische Anleitung

- Aktivieren Sie nur die Modi, die Sie wirklich nutzen.
- Halten Sie die Abstände moderat, um eine stabile Leistung zu gewährleisten.
- Verwenden Sie die Start-/Pause-Steuerung für teure Moduskombinationen.

Verwandte Seiten:

- [`Interactivity Click`](/de/options/interactivity-click)
- [`Interactivity Hover`](/de/options/interactivity-hover)
- [`Interactivity Div`](/de/options/interactivity-div)

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
