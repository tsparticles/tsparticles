# Fondo y lienzo

Esta sección controla la capa del lienzo y el comportamiento de pantalla completa.

## Propiedades principales

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`: color de fondo del lienzo.
- `opacity`: canal alfa para la capa de fondo.
- `image`: imagen de fondo opcional.
- `position`, `repeat`, `size`: comportamiento similar a CSS.
- `element`: selector CSS opcional, `HTMLCanvasElement` o `OffscreenCanvas` para el draw callback. Si se omite, se usa el lienzo de partículas.
- `draw`: callback opcional por frame `(context, delta) => void` para renderizado personalizado del fondo.

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: hace que el lienzo sea una ventana gráfica completa.
- `zIndex`: útil para colocar partículas detrás de tu contenido.

Para áreas de juego integradas y vistas previas de documentos en línea, configure:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Mejora la representación en pantallas HiDPI, pero aumenta la carga de GPU/CPU.

## Notas prácticas

- Para páginas de destino, utilice `fullScreen.enable: true` con `zIndex: -1`.
- Si ves ralentizaciones en el móvil, prueba `detectRetina: false`.
- Si una configuración está diseñada para pantalla completa, desactive `fullScreen` antes de incrustarla en una sección delimitada.
