# Movimento de partículas

`particles.move` define direção, velocidade e comportamento fora da tela.

## Exemplo

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: ativa o movimento.
- `speed`: intensidade de movimento percebida primária.
- `direction`: direção fixa ou movimento livre.
- `outModes`: comportamento nos limites do canvas.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
