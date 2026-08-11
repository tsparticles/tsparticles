# Catalogo forme

Questo catalogo elenca i valori comuni di `particles.shape.type` e le chiavi `particles.shape.options.<type>` da usare in v4 per personalizzare ogni forma.

Cartelle sorgente:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Riferimento opzioni shape: [`/options/particles-shape`](/it/options/particles-shape)

## Tipi di forma comuni e chiavi opzioni

- `circle` (`options.circle.close`)
- `square` / `edge` (`options.square.close`)
- `triangle` (`options.triangle.close`)
- `line` (`options.line.cap`, `options.line.close`)
- `polygon` (`options.polygon.sides`, `options.polygon.close`)
- `star` (`options.star.sides`, `options.star.inset`, `options.star.close`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`, `font`, `padding`, `close`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)
- `arrow` (`options.arrow.heightFactor`, `headWidthFactor`, `bodyHeightFactor`)
- `cog` (`options.cog.notches`, `innerRadius`, `holeRadius`, `innerTaper`, `outerTaper`)
- `rounded-rect` (`options.rounded-rect.radius`)
- `rounded-polygon` (`options.rounded-polygon.sides`, `radius`)
- `spiral` (`options.spiral.innerRadius`, `lineSpacing`, `widthFactor`, `close`)
- `squircle` (`options.squircle.exponent`, `steps`)
- `matrix` (`options.matrix.interval`)
- `path` (`options.path.half`, `options.path.segments`)
- `card` (`options.card.suit`, `options.card.value`)

## Note su alias e bundle

- `square` ed `edge` sono alias della stessa forma.
- `text` e il pacchetto dedicato per il testo in v4.
- `image` e `images` usano lo stesso oggetto opzioni.
- La maggior parte delle forme avanzate richiede `@tsparticles/slim` (o `@tsparticles/all`) o pacchetti shape dedicati.

## Esempi rapidi

### Text

```ts
particles: {
  shape: {
    type: "text",
    options: {
      text: {
        value: ["TS", "DOCS"],
        font: "Verdana",
        weight: "700",
        style: "",
      },
    },
  },
}
```

### Image

```ts
particles: {
  shape: {
    type: "image",
    options: {
      image: {
        src: "https://particles.js.org/images/hdr/fruits/strawberry.png",
        name: "strawberry",
        width: 64,
        height: 64,
        gif: false,
        replaceColor: false,
      },
    },
  },
}
```

Per provarle rapidamente con controlli Start/Pause e JSON modificabile, usa [`/playground/shapes`](/it/playground/shapes).
