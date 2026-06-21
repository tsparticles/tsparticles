# Hintergrund und Leinwand

Dieser Abschnitt steuert die Leinwandebene und das Vollbildverhalten.

## Haupteigenschaften

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

- `color`: Hintergrundfarbe der Leinwand.
- `opacity`: Alphakanal für die Hintergrundebene.
- `image`: optionales Hintergrundbild.
- `position`, `repeat`, `size`: CSS-ähnliches Verhalten.
- `element`: optionaler CSS-Selektor, `HTMLCanvasElement` oder `OffscreenCanvas` für den benutzerdefinierten draw-Callback. Standardmäßig wird der Partikel-Canvas verwendet.
- `draw`: optionaler Frame-Callback `(context, delta) => void` für benutzerdefinierte Hintergrunddarstellung.

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
