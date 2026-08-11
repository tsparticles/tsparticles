# Interaktivitätsabteilung

`interactivity.events.onDiv` wendet Interaktionsmodi auf bestimmte HTML-Elemente an.

## Beispiel

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## Praktische Anleitung

- Verwenden Sie es für gezielte UX-Zonen anstelle von Reaktionen auf der gesamten Leinwand.
- Halten Sie Auswahllisten klar und einfach zu pflegen.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
