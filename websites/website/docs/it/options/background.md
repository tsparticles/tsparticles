# Sfondo e tela

Questa sezione controlla il livello tela e il comportamento a schermo intero.

## Principali proprietà

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

- `color`: colore di sfondo della tela.
- `opacity`: canale alfa per il livello di sfondo.
- `image`: immagine di sfondo opzionale.
- `position`, `repeat`, `size`: comportamento simile a CSS.
- `element`: selettore CSS opzionale, `HTMLCanvasElement` o `OffscreenCanvas` per il draw callback. Se omesso, viene usata la tela delle particelle.
- `draw`: callback opzionale per frame `(context, delta) => void` per il rendering personalizzato dello sfondo.

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
