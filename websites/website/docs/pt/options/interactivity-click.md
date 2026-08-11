# Clique de interatividade

`interactivity.events.onClick` define o que acontece quando os usuários clicam/tocam na tela.

## Exemplo

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

## Orientação prática

- Comece com um modo e combine os modos somente se necessário.
- Mantenha `quantity` e `distance` moderados para FPS estável.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
