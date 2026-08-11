# Partículas Manuais

`manualParticles` adiciona partículas explícitas em posições fixas.

## Exemplo

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## Quando usar

- Marcadores visuais ancorados.
- Efeitos híbridos misturando partículas fixas e dinâmicas.
- Estados iniciais controlados em demonstrações ou tutoriais.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
