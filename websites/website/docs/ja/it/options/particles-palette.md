# Tavolozza delle particelle

`particles.palette` importa una tavolozza con nome e applica i colori predefiniti delle particelle.

## Esempio

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## Cosa cambia

- Imposta `particles.paint.fill` o `particles.paint.stroke` in base alla configurazione della tavolozza.
- Se la tavolozza ha più varianti di colore, `particles.paint` viene importato come array di varianti.
- Abilita `particles.blend` con la modalità di fusione tavolozza.
- Mantiene compatta la configurazione quando si riutilizzano i set di colori.

## Nuovo formato tavolozza (per tavolozze personalizzate)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` può essere:

- un singolo oggetto variante (`{ fill?, stroke? }`)
- un array di oggetti variante (ogni variante può definire `fill`, `stroke` o entrambi)

## Note

- Gli ID tavolozza sconosciuti vengono ignorati.
- I valori espliciti `particles.paint.fill`, `particles.paint.stroke` o `particles.blend` sostituiscono i valori predefiniti importati.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
