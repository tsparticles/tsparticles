# Divisão de Interatividade

`interactivity.events.onDiv` aplica modos de interação a elementos HTML específicos.

## Exemplo

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

## Orientação prática

- Use-o para zonas UX direcionadas em vez de reações em tela inteira.
- Mantenha as listas de seletores explícitas e fáceis de manter.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
