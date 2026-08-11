# Maschera di sfondo

`backgroundMask` consente alle particelle di penetrare o fondersi con un livello di sfondo mascherato.

## Esempi

### Copertura statica (legacy)

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

### Draw callback dinamico _(dal 4.3.0)_

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

### Elemento esterno _(dal 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Proprietà

| Proprietà   | Tipo                       | Descrizione                                                      |
| ----------- | -------------------------- | ---------------------------------------------------------------- |
| `enable`    | `boolean`                  | Attiva il mascheramento dello sfondo                             |
| `composite` | `GlobalCompositeOperation` | Operazione di composizione canvas (default: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Configurazione della copertura                                   |

### `cover` (BackgroundMaskCover)

| Proprietà | Tipo                                                                                         | Descrizione                                                                                |
| --------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `color`   | `string` / `OptionsColor`                                                                    | Colore di copertura                                                                        |
| `image`   | `string`                                                                                     | URL dell'immagine di copertura                                                             |
| `opacity` | `number`                                                                                     | Livello alfa di copertura (0..1, default: `1`)                                             |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento esterno o selettore CSS disegnato automaticamente ogni frame _(dal 4.3.0)_        |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Callback di disegno personalizzato sul contesto canvas principale ogni frame _(dal 4.3.0)_ |

### Ordine dei layer _(dal 4.3.0)_

1. `clear()` — Pulizia pixel del canvas
2. `cover.element` disegno automatico (se impostato)
3. `cover.draw` callback (se impostato)
4. Copertura statica (colore/immagine) — fallback
5. Operazione di composizione globale

## Quando usarlo

- Effetti simili a Spotlight.
- Sezioni degli eroi ad alto contrasto.
- Interazioni a più livelli su sfondi scuri.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
