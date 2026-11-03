# Catalogue des formes

Ce catalogue recense les valeurs les plus courantes de `particles.shape.type` et indique quand `particles.shape.options` ajoute des controles specifiques a une forme.

Dossiers source :

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Reference des options de forme : [`/options/particles-shape`](/fr/options/particles-shape)

## Types de formes courants

- `circle` (par defaut, sans options de forme supplementaires)
- `square` / `edge` (sans options de forme supplementaires)
- `triangle` (sans options de forme supplementaires)
- `line` (sans options de forme supplementaires)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `replaceColor`, `close`)
- `gif` / `gifs` (`options.gif.src`, `name`, `width`, `height`, `loopCount`)
- `ribbon` (`options.ribbon.angle`, `count`, `drag`, `mass`, `oscillationDistance`, `oscillationSpeed`, `particleDist`, `velocityInherit`)

## Notes sur les alias et les bundles

- `square` et `edge` sont des alias de la meme forme.
- `character` et `char` sont des alias du meme groupe d'options.
- `image` et `images` utilisent le meme objet d'options.
- La plupart des formes avancees necessitent `@tsparticles/slim` (ou `@tsparticles/all`) ou des packages de forme dedies.

Pour les tester rapidement avec controles Start/Pause et JSON editable, utilisez [`/playground/shapes`](/fr/playground/shapes).

## Exemples rapides

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
        replaceColor: false,
      },
    },
  },
}
```
