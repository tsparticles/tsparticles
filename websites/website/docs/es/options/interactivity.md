# Interactividad

Las opciones `interactivity` definen cómo reaccionan las partículas al pasar el cursor o hacer clic.

Para referencias enfocadas:

- [`Interactivity Click`](/es/options/interactivity-click)
- [`Interactivity Hover`](/es/options/interactivity-hover)
- [`Interactivity Div`](/es/options/interactivity-div)
- [`Interactivity Events`](/es/options/interactivity-events)
- [`Interactivity Modes`](/es/options/interactivity-modes)

## Estructura básica

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

## Eventos más utilizados

- `onHover`: retroalimentación inmediata para los usuarios.
- `onClick`: ráfagas o acciones dirigidas.
- `resize`: mantiene el comportamiento del lienzo consistente al cambiar el tamaño de la ventana.
- `onDiv`: apuntar a interacciones sobre elementos específicos.

## Mejores prácticas

- Evite habilitar demasiados modos a la vez en dispositivos de gama baja.
- Mantenga `distance` moderado para evitar picos de rendimiento.
- Si el efecto es intenso, utilice el control manual con `Start/Pause`.

## Referencias detalladas

- Haga clic en: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Colocar el cursor sobre: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- División: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
