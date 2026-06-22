# Máscara de fondo

`backgroundMask` permite que las partículas atraviesen o se mezclen con una capa de fondo enmascarada.

## Ejemplos

### Cubierta estática (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### Draw callback dinámico _(desde 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### Elemento externo _(desde 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Propiedades

| Propiedad   | Tipo                       | Descripción                                                           |
| ----------- | -------------------------- | --------------------------------------------------------------------- |
| `enable`    | `boolean`                  | Activa el enmascaramiento de fondo                                    |
| `composite` | `GlobalCompositeOperation` | Operación de composición canvas (predeterminado: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Configuración de cubierta                                             |

### `cover` (BackgroundMaskCover)

| Propiedad | Tipo                                                                                         | Descripción                                                                                     |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `color`   | `string` / `OptionsColor`                                                                    | Color de cubierta                                                                               |
| `image`   | `string`                                                                                     | URL de la imagen de cubierta                                                                    |
| `opacity` | `number`                                                                                     | Nivel alfa de cubierta (0..1, predeterminado: `1`)                                              |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento externo o selector CSS dibujado automáticamente cada frame _(desde 4.3.0)_             |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Callback de dibujo personalizado en el contexto principal del canvas cada frame _(desde 4.3.0)_ |

### Orden de capas _(desde 4.3.0)_

1. `clear()` — limpieza de píxeles del canvas
2. `cover.element` dibujo automático (si se establece)
3. `cover.draw` callback (si se establece)
4. Cubierta estática (color/imagen) — fallback
5. Operación de composición global

## Cuándo usarlo

- Efectos tipo foco.
- Secciones de héroes con mucho contraste.
- Interacciones en capas sobre fondos oscuros.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
