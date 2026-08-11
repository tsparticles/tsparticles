# Forma de Partículas

`particles.shape` define como as partículas são desenhadas.

## Exemplo

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: uma forma ou uma lista de formas.
- valores comuns: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## Com opções

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
