# Links de partículas

`particles.links` desenha linhas de conexão entre partículas próximas.

## Exemplo

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: distância máxima para um link.
- `opacity`: força visual da linha.
- `color`: cor da linha.
- `width`: espessura do traço.

## Dica de desempenho

Os links podem ficar caros com altas contagens de partículas. Sintonize `number.value` e `distance` juntos.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
