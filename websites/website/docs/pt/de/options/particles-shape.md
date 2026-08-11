# Partikelform

`particles.shape` definiert, wie Partikel gezeichnet werden.

## Beispiel

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: eine Form oder eine Liste von Formen.
- Gemeinsame Werte: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## Mit Optionen

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

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
