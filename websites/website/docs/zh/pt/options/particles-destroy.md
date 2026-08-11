# Partículas Destruídas

`particles.destroy` controla o que acontece quando as partículas são destruídas.

## Exemplo

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Orientação prática

- Comece com configurações simples de `mode` antes de cadeias divididas complexas.
- Verifique novamente o desempenho ao usar grandes contagens divididas.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
