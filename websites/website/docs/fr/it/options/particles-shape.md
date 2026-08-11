# Forma delle particelle

`particles.shape` definisce come vengono disegnate le particelle.

## Esempio

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: una forma o un elenco di forme.
- valori comuni: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## Con opzioni

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

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
