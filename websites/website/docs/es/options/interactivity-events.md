# Eventos de interactividad

`interactivity.events` controla cuándo se activan los modos de interacción.

## Ejemplo

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

- `onHover`: comportamiento de desplazamiento del puntero.
- `onClick`: comportamiento de hacer clic/tocar.
- `resize`: mantiene el comportamiento consistente después de los cambios en la ventana gráfica.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
