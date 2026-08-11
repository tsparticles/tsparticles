# Interactividad flotante

`interactivity.events.onHover` controla las reacciones al pasar el puntero.

## Ejemplo

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

## Orientación práctica

- Los efectos de desplazamiento son más caros en escenas densas.
- En dispositivos móviles, considere desactivar los modos de desplazamiento intenso.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
