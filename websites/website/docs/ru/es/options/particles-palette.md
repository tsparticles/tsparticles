# Paleta de partículas

`particles.palette` importa una paleta con nombre y aplica valores predeterminados de color de partículas.

## Ejemplo

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## Lo que cambia

- Establece `particles.paint.fill` o `particles.paint.stroke` según la configuración de la paleta.
- Si la paleta tiene varias variantes de color, `particles.paint` se importa como una matriz de variantes.
- Habilita `particles.blend` con el modo de fusión de paleta.
- Mantiene su configuración compacta al reutilizar conjuntos de colores.

## Nuevo formato de paleta (para paletas personalizadas)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` puede ser:

- un único objeto variante (`{ fill?, stroke? }`)
- una matriz de objetos variantes (cada variante puede definir `fill`, `stroke` o ambos)

## Notas

- Se ignoran los identificadores de paleta desconocidos.
- Los valores `particles.paint.fill`, `particles.paint.stroke` o `particles.blend` explícitos anulan los valores predeterminados importados.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
