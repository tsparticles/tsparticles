# Catalogo de formas

Este catalogo enumera los valores mas comunes de `particles.shape.type` y muestra cuando `particles.shape.options` agrega controles especificos de forma.

Carpetas de origen:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Referencia de opciones de forma: [`/options/particles-shape`](/es/options/particles-shape)

## Tipos de forma comunes

- `circle` (predeterminado, sin opciones extra de forma)
- `square` / `edge` (sin opciones extra de forma)
- `triangle` (sin opciones extra de forma)
- `line` (sin opciones extra de forma)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)
- `ribbon` (`options.ribbon.angle`, `count`, `drag`, `mass`, `oscillationDistance`, `oscillationSpeed`, `particleDist`, `velocityInherit`)

## Notas sobre alias y bundles

- `square` y `edge` son alias de la misma forma.
- `character` y `char` son alias del mismo grupo de opciones.
- `image` e `images` usan el mismo objeto de opciones.
- La mayoria de las formas avanzadas requieren `@tsparticles/slim` (o `@tsparticles/all`) o paquetes de forma dedicados.

Para probarlas rapido con controles Start/Pause y JSON editable, usa [`/playground/shapes`](/es/playground/shapes).

## Ejemplos rápidos

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
