# Interaktivität

`interactivity`-Optionen definieren, wie Partikel auf Hover/Klick reagieren.

Für gezielte Referenzen:

- [`Interactivity Click`](/de/options/interactivity-click)
- [`Interactivity Hover`](/de/options/interactivity-hover)
- [`Interactivity Div`](/de/options/interactivity-div)
- [`Interactivity Events`](/de/options/interactivity-events)
- [`Interactivity Modes`](/de/options/interactivity-modes)

## Grundstruktur

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## Am häufigsten verwendete Ereignisse

- `onHover`: sofortiges Feedback für Benutzer.
- `onClick`: Bursts oder gezielte Aktionen.
- `resize`: Hält das Canvas-Verhalten bei der Fenstergrößenänderung konsistent.
- `onDiv`: Zielinteraktionen auf bestimmte Elemente.

## Best Practice

- Vermeiden Sie es, auf Low-End-Geräten zu viele Modi gleichzeitig zu aktivieren.
  - Halten Sie `distance` moderat, um Leistungsspitzen zu vermeiden.
- Wenn der Effekt stark ist, verwenden Sie die manuelle Steuerung mit `Start/Pause`.

## Detaillierte Referenzen

- Klicken Sie auf: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Hover: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Div: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
