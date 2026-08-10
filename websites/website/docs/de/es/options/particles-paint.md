# Pintura de partículas

`particles.paint` agrupa opciones de estilo de trazo y relleno de partículas.

## Ejemplo

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

## Rellenar (`particles.paint.fill`)

- Define el color interior de la partícula.
- Admite valores estáticos, matrices y animaciones en color.

## Accidente cerebrovascular (`particles.paint.stroke`)

- Define el ancho y el color del contorno.
- Útil para aumentar el contraste de formas.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
