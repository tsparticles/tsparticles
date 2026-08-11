# Colisões de partículas

`particles.collisions` controla o comportamento de colisão entre partículas.

## Exemplo

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: ativa colisões.
- `mode`: comportamento de colisão (`bounce` é o mais comum).

## Dica de desempenho

As colisões podem custar caro em contagens elevadas de partículas. Sintonize primeiro com `particles.number`.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
