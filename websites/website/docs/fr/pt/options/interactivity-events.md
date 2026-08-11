# Eventos de Interatividade

`interactivity.events` controla quando os modos de interação são acionados.

## Exemplo

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

- `onHover`: comportamento do ponteiro ao passar o mouse.
- `onClick`: comportamento de clique/toque.
- `resize`: mantém o comportamento consistente após alterações na janela de visualização.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md> - <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md> - <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md> - <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
