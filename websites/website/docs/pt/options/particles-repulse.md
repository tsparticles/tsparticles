# Repulsão de Partículas

`particles.repulse` controla o comportamento de repulsão em interações partícula-partícula.

## Exemplo

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## Orientação prática

- Use distâncias moderadas para evitar saltos bruscos de movimento.
- Sintonize junto com `interactivity.modes.repulse` quando ambos estiverem ativos.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
