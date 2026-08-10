# Vollbild

Verwenden Sie `fullScreen`, um zu steuern, ob die Leinwand das gesamte Ansichtsfenster einnimmt.

## Typisches Setup

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: Schaltet das Verhalten im gesamten Ansichtsfenster um.
- `zIndex`: nützlich, um Partikel hinter App-Inhalten zu halten.

## Eingebettete Abschnitte

Für Dokumentvorschauen, Karten und Playground-Panels:

```ts
fullScreen: {
  enable: false,
}
```

Dadurch werden Überschneidungen mit dem Seitenlayout und anderen Leinwänden vermieden.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
