# Shapes Catalog

This catalog lists the common `particles.shape.type` values and the related `particles.shape.options.<type>` customization keys used in v4.

Source folders:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Shape options reference: [`/options/particles-shape`](/options/particles-shape)

## Common shape types and option keys

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
- `ribbon` (`options.ribbon.angle`, `count`, `drag`, `mass`, `oscillationDistance`, `oscillationSpeed`, `particleDist`, `velocityInherit`)

## Notes on aliases and bundles

- `square` and `edge` are aliases for the same shape.
- `text` is the dedicated text shape package in v4.
- `image` and `images` use the same options object.
- Most advanced shapes require `@tsparticles/slim` (or `@tsparticles/all`) or dedicated shape packages.

## Quick usage examples

### Polygon

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

### Emoji

```ts
particles: {
  shape: {
    type: "emoji",
    options: {
      emoji: {
        value: ["😀", "🎉", "✨"],
        font: "Apple Color Emoji",
        padding: 0,
      },
    },
  },
}
```

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

To test these quickly with Start/Pause controls and editable JSON, use [`/playground/shapes`](/playground/shapes).
