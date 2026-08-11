# Hover Interatividade

`interactivity.events.onHover` controla as reações ao passar o ponteiro.

## Exemplo

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

## Orientação prática

- Os efeitos de foco são mais caros em cenas densas.
- No celular, considere desativar os modos de foco intenso.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
