# Les particules bougent

`particles.move` définit la direction, la vitesse et le comportement hors canevas.

## Exemple

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable` : active le mouvement.
- `speed` : intensité de mouvement perçue principale.
- `direction` : sens fixe ou mouvement libre.
- `outModes` : comportement aux limites du canevas.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
