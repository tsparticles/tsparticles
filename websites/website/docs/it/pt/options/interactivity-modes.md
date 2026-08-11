# Modos de interatividade

`interactivity.modes` define configurações específicas do modo usadas por eventos.

## Exemplo

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

## Orientação prática

- Habilite apenas os modos que você realmente usa.
- Mantenha distâncias moderadas para um desempenho estável.
- Use os controles Iniciar/Pausa para combinações de modos caros.

Páginas relacionadas:

- [`Interactivity Click`](/pt/options/interactivity-click)
- [`Interactivity Hover`](/pt/options/interactivity-hover)
- [`Interactivity Div`](/pt/options/interactivity-div)

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
