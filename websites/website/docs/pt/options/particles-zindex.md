# Partículas ZIndex

`particles.zIndex` controla camadas de desenho e animação de índice z opcional.

## Exemplo

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## Orientação prática

- Use a variação do índice z para criar percepção de profundidade.
- Mantenha os intervalos moderados para preservar a consistência visual.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
