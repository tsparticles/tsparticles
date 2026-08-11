# Interactividad Clic

`interactivity.events.onClick` define lo que sucede cuando los usuarios hacen clic o tocan el lienzo.

## Ejemplo

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

## Orientación práctica

- Comience con un modo, luego combine modos solo si es necesario.
- Mantenga `quantity` y `distance` moderados para FPS estable.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
