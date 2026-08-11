# Modalità di interattività

`interactivity.modes` definisce le impostazioni specifiche della modalità utilizzate dagli eventi.

## Esempio

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## Guida pratica

- Abilita solo le modalità che usi realmente.
- Mantenere le distanze moderate per prestazioni stabili.
- Utilizza i controlli Avvio/Pausa per combinazioni di modalità costose.

Pagine correlate:

- [`Interactivity Click`](/it/options/interactivity-click)
- [`Interactivity Hover`](/it/options/interactivity-hover)
- [`Interactivity Div`](/it/options/interactivity-div)

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
