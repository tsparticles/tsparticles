# Modos de interactividad

`interactivity.modes` define la configuración específica del modo utilizada por los eventos.

## Ejemplo

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

## Orientación práctica

- Habilita sólo los modos que realmente utilizas.
- Mantenga distancias moderadas para un rendimiento estable.
- Utilice controles de Inicio/Pausa para combinaciones de modos costosas.

Páginas relacionadas:

- [`Interactivity Click`](/es/options/interactivity-click)
- [`Interactivity Hover`](/es/options/interactivity-hover)
- [`Interactivity Div`](/es/options/interactivity-div)

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
