# Interaktivitätsereignisse

`interactivity.events` steuert, wann Interaktionsmodi ausgelöst werden.

## Beispiel

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
    resize: true,
  },
}
```

- `onHover`: Zeiger-Hover-Verhalten.
- `onClick`: Klick-/Tippenverhalten.
- `resize`: Hält das Verhalten nach Ansichtsfensteränderungen konsistent.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
