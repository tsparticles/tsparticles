# Número de Partículas

`particles.number` controla quantas partículas estão ativas.

## Exemplo

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: quantidade base de partículas.
- `density.enable`: adapta a contagem ao tamanho da tela.
- `density.area`: área de referência utilizada para dimensionamento.

## Dica de desempenho

Abaixe `value` primeiro quando o FPS cair.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
