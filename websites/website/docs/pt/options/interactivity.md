# Interatividade

As opções `interactivity` definem como as partículas reagem ao passar o mouse/clique.

Para referências específicas:

- [`Interactivity Click`](/pt/options/interactivity-click)
- [`Interactivity Hover`](/pt/options/interactivity-hover)
- [`Interactivity Div`](/pt/options/interactivity-div)
- [`Interactivity Events`](/pt/options/interactivity-events)
- [`Interactivity Modes`](/pt/options/interactivity-modes)

## Estrutura básica

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

## Eventos mais usados

- `onHover`: feedback imediato para usuários.
- `onClick`: rajadas ou ações direcionadas.
- `resize`: mantém o comportamento da tela consistente no redimensionamento da janela.
- `onDiv`: direcionar interações em elementos específicos.

## Melhores práticas

- Evite ativar muitos modos ao mesmo tempo em dispositivos de baixo custo.
- Mantenha `distance` moderado para evitar picos de desempenho.
- Se o efeito for pesado, use o controle manual com `Start/Pause`.

## Referências detalhadas

- Clique em: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Passe o mouse: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Divisão: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
