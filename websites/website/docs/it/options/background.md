# Sfondo e tela

Questa sezione controlla il livello tela e il comportamento a schermo intero.

## Ordine dei livelli (dal retro al fronte)

1. **Sfondo CSS** (`color`, `image`, `position`, `repeat`, `size`) — applicato come stile DOM della tela
2. **`clear()`** — cancellazione dei pixel della tela per frame
3. **`background.element` disegno automatico** — se impostato, `ctx.drawImage(element, ...)`
4. **`background.draw` callback** — se impostato, chiamato con il contesto di rendering principale + delta
5. **Particelle** — disegnate sopra

`element` e `draw` sono **livelli indipendenti**. Entrambi sono opzionali e possono essere usati insieme o separatamente.

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

| Chiave     | Tipo                                                                                         | Descrizione                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Colore di sfondo della tela.                                                                        |
| `opacity`  | `number`                                                                                     | Canale alfa per il colore di sfondo, da `0` a `1`.                                                  |
| `image`    | `string`                                                                                     | Valore CSS `background-image` (es. `url('...')`).                                                   |
| `position` | `string`                                                                                     | Valore CSS `background-position`.                                                                   |
| `repeat`   | `string`                                                                                     | Valore CSS `background-repeat`.                                                                     |
| `size`     | `string`                                                                                     | Valore CSS `background-size`.                                                                       |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento esterno disegnato automaticamente ogni frame via `drawImage`. Non gestito dal motore.      |
| `draw`     | `(context, delta) => void`                                                                   | Callback per frame per il rendering personalizzato dello sfondo sul contesto principale della tela. |

### `element`

Quando `element` è impostato, il contenuto visivo corrente dell'elemento viene disegnato sulla tela principale ogni frame via `ctx.drawImage()`. L'elemento **non è gestito dal motore** — il codice esterno gestisce il suo rendering.

Tipi di elemento supportati:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (disegna il frame corrente)
- `HTMLImageElement`
- Stringa selettore CSS che corrisponde a uno dei precedenti nel DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Disegnare automaticamente un elemento <video> esterno come sfondo
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

Un callback per frame per il rendering personalizzato dello sfondo. Riceve sempre il **contesto principale della tela** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), mai il contesto dell'elemento.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript usa un riferimento a funzione, non una stringa.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Elemento + Draw combinati

Entrambi i livelli vengono eseguiti indipendentemente ogni frame. L'elemento viene disegnato per primo, poi il callback draw:

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

- `enable`: rende il viewport completo della tela.
- `zIndex`: utile per posizionare particelle dietro i tuoi contenuti.

Per i parchi giochi incorporati e le anteprime dei documenti in linea, imposta:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Migliora il rendering sugli schermi HiDPI, ma aumenta il carico GPU/CPU.

## Note pratiche

- Per le pagine di destinazione, utilizza `fullScreen.enable: true` con `zIndex: -1`.
- Se noti rallentamenti sui dispositivi mobili, prova `detectRetina: false`.
- Se una configurazione è progettata per lo schermo intero, disabilita `fullScreen` prima di incorporarla in una sezione delimitata.
