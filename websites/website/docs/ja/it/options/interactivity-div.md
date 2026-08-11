# Div. interattività

`interactivity.events.onDiv` applica modalità di interazione a specifici elementi HTML.

## Esempio

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

## Guida pratica

- Usalo per zone UX mirate invece che per reazioni su tutta la tela.
- Mantieni gli elenchi di selezione espliciti e facili da mantenere.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
