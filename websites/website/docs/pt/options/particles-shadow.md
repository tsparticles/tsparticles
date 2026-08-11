# Sombra de Partículas

`particles.shadow` adiciona uma sombra ao redor das partículas.

## Exemplo

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## Orientação prática

- As sombras melhoram a profundidade, mas podem ser caras em cenas densas.
- Use primeiro o desfoque baixo e faça o benchmark no celular.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
