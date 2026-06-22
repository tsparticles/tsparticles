# Hintergrundmaske

`backgroundMask` lässt Partikel eine maskierte Hintergrundebene durchdringen oder mit ihr verschmelzen.

## Beispiele

### Statische Abdeckung (legacy)

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

### Dynamischer Draw-Callback _(seit 4.3.0)_

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

### Externes Element _(seit 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Eigenschaften

| Eigenschaft | Typ                        | Beschreibung                                             |
| ----------- | -------------------------- | -------------------------------------------------------- |
| `enable`    | `boolean`                  | Aktiviert die Hintergrundmaskierung                      |
| `composite` | `GlobalCompositeOperation` | Canvas-Kompositoperation (Standard: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Abdeckungskonfiguration                                  |

### `cover` (BackgroundMaskCover)

| Eigenschaft | Typ                                                                                          | Beschreibung                                                                            |
| ----------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `color`     | `string` / `OptionsColor`                                                                    | Abdeckungsfarbe                                                                         |
| `image`     | `string`                                                                                     | URL des Abdeckungsbildes                                                                |
| `opacity`   | `number`                                                                                     | Alpha-Level der Abdeckung (0..1, Standard: `1`)                                         |
| `element`   | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Externes Element oder CSS-Selektor, automatisch pro Frame gezeichnet _(seit 4.3.0)_     |
| `draw`      | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Benutzerdefinierter Draw-Callback auf dem Haupt-Canvas-Kontext pro Frame _(seit 4.3.0)_ |

### Ebenenreihenfolge _(seit 4.3.0)_

1. `clear()` — Pixel des Canvas löschen
2. `cover.element` automatische Zeichnung (falls gesetzt)
3. `cover.draw` Callback (falls gesetzt)
4. Statische Abdeckung (Farbe/Bild) — Fallback
5. Globale Kompositoperation

## Wann man es verwenden sollte

- Spotlight-ähnliche Effekte.
- Kontrastreiche Heldenabschnitte.
- Mehrschichtige Interaktionen auf dunklem Hintergrund.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
