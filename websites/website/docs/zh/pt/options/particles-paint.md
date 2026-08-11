# Partículas de tinta

`particles.paint` agrupa opções de preenchimento de partículas e estilo de traço.

## Exemplo

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Preencher (`particles.paint.fill`)

- Define a cor interna da partícula.
- Suporta valores estáticos, matrizes e animação colorida.

## Acidente Vascular Cerebral (`particles.paint.stroke`)

- Define a largura e a cor do contorno.
- Útil para aumentar o contraste da forma.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
