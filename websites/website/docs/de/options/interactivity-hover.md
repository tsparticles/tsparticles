# Interaktivität Hover

`interactivity.events.onHover` steuert Zeiger-Hover-Reaktionen.

## Beispiel

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## Praktische Anleitung

- Hover-Effekte sind bei dichten Szenen teurer.
- Erwägen Sie auf Mobilgeräten, die Hover-lastigen Modi zu deaktivieren.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
