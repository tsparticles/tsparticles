# Forme des particules

`particles.shape` définit la façon dont les particules sont dessinées.

## Exemple

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type` : une forme ou une liste de formes.
- valeurs communes : `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`.

## Avec options

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

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
