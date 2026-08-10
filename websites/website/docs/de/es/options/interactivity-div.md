# División de interactividad

`interactivity.events.onDiv` aplica modos de interacción a elementos HTML específicos.

## Ejemplo

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

## Orientación práctica

- Úselo para zonas de UX específicas en lugar de reacciones de lienzo completo.
- Mantenga las listas de selección explícitas y fáciles de mantener.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
