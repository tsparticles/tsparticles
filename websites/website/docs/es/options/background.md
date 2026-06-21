# Fondo y lienzo

Esta sección controla la capa del lienzo y el comportamiento de pantalla completa.

## Orden de las capas (de atrás hacia adelante)

1. **Fondo CSS** (`color`, `image`, `position`, `repeat`, `size`) — aplicado como estilo DOM del lienzo
2. **`clear()`** — limpieza de píxeles del lienzo por cuadro
3. **`background.element` dibujo automático** — si está configurado, `ctx.drawImage(element, ...)`
4. **`background.draw` callback** — si está configurado, llamado con el contexto de renderizado principal + delta
5. **Partículas** — dibujadas encima

`element` y `draw` son **capas independientes**. Ambas son opcionales y pueden usarse juntas o por separado.

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

| Clave      | Tipo                                                                                         | Descripción                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Color de fondo del lienzo.                                                                         |
| `opacity`  | `number`                                                                                     | Canal alfa para el color de fondo, de `0` a `1`.                                                   |
| `image`    | `string`                                                                                     | Valor CSS `background-image` (ej. `url('...')`).                                                   |
| `position` | `string`                                                                                     | Valor CSS `background-position`.                                                                   |
| `repeat`   | `string`                                                                                     | Valor CSS `background-repeat`.                                                                     |
| `size`     | `string`                                                                                     | Valor CSS `background-size`.                                                                       |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento externo dibujado automáticamente cada cuadro via `drawImage`. No gestionado por el motor. |
| `draw`     | `(context, delta) => void`                                                                   | Callback por cuadro para dibujo personalizado de fondo en el contexto principal del lienzo.        |

### `element`

Cuando se configura `element`, el contenido visual actual del elemento se dibuja en el lienzo principal cada cuadro via `ctx.drawImage()`. El elemento **no es gestionado por el motor** — el código externo maneja su renderizado.

Tipos de elemento soportados:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (dibuja el cuadro actual)
- `HTMLImageElement`
- String selector CSS que coincida con alguno de los anteriores en el DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Dibujar automáticamente un elemento <video> externo como fondo
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

Un callback por cuadro para renderizado personalizado del fondo. Siempre recibe el **contexto principal del lienzo** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), nunca el contexto del elemento.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript usa una referencia de función, no un string.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Elemento + Draw combinados

Ambas capas se ejecutan independientemente cada cuadro. El elemento se dibuja primero, luego el callback draw:

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

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
