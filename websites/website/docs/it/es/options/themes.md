# Temas

`themes` le permite definir conjuntos de opciones con nombre (por ejemplo, claro y oscuro) y cambiar en tiempo de ejecución.

## Ejemplo

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## Orientación práctica

- Mantener un objeto de opciones base estable.
- Anular sólo lo que difiere por tema.
- Emparejar con el estado del modo oscuro a nivel de aplicación.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
