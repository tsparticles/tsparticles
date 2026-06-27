# Hintergrund und Leinwand

Dieser Abschnitt steuert die Leinwandebene und das Vollbildverhalten.

## Ebenenreihenfolge (hinten nach vorne)

1. **CSS-Hintergrund** (`color`, `image`, `position`, `repeat`, `size`) — als DOM-Canvas-Stil angewendet
2. **`clear()`** — Canvas-Pixel pro Frame löschen
3. **`background.element` Auto-Zeichnung** — wenn gesetzt, `ctx.drawImage(element, ...)` zeichnet das externe Element ein
4. **`background.draw` Callback** — wenn gesetzt, mit dem Haupt-Rendering-Kontext + Delta aufgerufen
5. **Partikel** — darüber gezeichnet

`element` und `draw` sind **unabhängige Ebenen**. Beide sind optional und können zusammen oder separat verwendet werden.

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

| Schlüssel  | Typ                                                                                          | Beschreibung                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `color`    | `string` / `object`                                                                          | Hintergrundfarbe der Leinwand.                                                                               |
| `opacity`  | `number`                                                                                     | Alphakanal für die Hintergrundfarbe, von `0` bis `1`.                                                        |
| `image`    | `string`                                                                                     | CSS `background-image` Wert (z.B. `url('...')`).                                                             |
| `position` | `string`                                                                                     | CSS `background-position` Wert.                                                                              |
| `repeat`   | `string`                                                                                     | CSS `background-repeat` Wert.                                                                                |
| `size`     | `string`                                                                                     | CSS `background-size` Wert.                                                                                  |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Externes Element, das pro Frame via `drawImage` automatisch gezeichnet wird. Nicht von der Engine verwaltet. |
| `draw`     | `(context, delta) => void`                                                                   | Pro-Frame Callback für benutzerdefinierte Hintergrundzeichnung auf dem Haupt-Canvas-Kontext.                 |

### `element`

Wenn `element` gesetzt ist, wird der aktuelle visuelle Inhalt des Elements jedes Frame via `ctx.drawImage()` auf die Hauptleinwand gezeichnet. Das Element wird **nicht von der Engine verwaltet** — externer Code kümmert sich um seine Darstellung.

Unterstützte Elementtypen:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (zeichnet den aktuellen Frame)
- `HTMLImageElement`
- CSS-Selektor-String, der eines der oben genannten im DOM findet

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Ein externes <video>-Element als Hintergrund automatisch zeichnen
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

Ein Pro-Frame Callback für benutzerdefinierte Hintergrunddarstellung. Erhält immer den **Haupt-Canvas-Kontext** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), niemals den Kontext des Elements.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript verwendet eine Funktionsreferenz, keinen String.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Kombiniertes Element + Draw

Beide Ebenen laufen unabhängig voneinander in jedem Frame. Das Element wird zuerst gezeichnet, dann der Draw-Callback:

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

- `enable`: Macht die Leinwand zum vollständigen Ansichtsfenster.
- `zIndex`: nützlich, um Partikel hinter Ihrem Inhalt zu platzieren.

Legen Sie für eingebettete Playgrounds und Inline-Dokumentvorschauen Folgendes fest:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Verbessert das Rendering auf HiDPI-Bildschirmen, erhöht aber die GPU-/CPU-Last.

## Praktische Hinweise

- Für Landingpages verwenden Sie `fullScreen.enable: true` mit `zIndex: -1`.
- Wenn Sie auf Mobilgeräten eine Verlangsamung feststellen, versuchen Sie es mit `detectRetina: false`.
- Wenn eine Konfiguration für den Vollbildmodus konzipiert ist, deaktivieren Sie `fullScreen`, bevor Sie sie in einen begrenzten Abschnitt einbetten.
