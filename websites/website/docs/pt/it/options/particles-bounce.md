# Le particelle rimbalzano

`particles.bounce` personalizza il comportamento di rimbalzo quando collisioni o confini applicano la logica di rimbalzo.

## Esempio

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Guida pratica

- I valori intorno a `1` mantengono rimbalzi naturali.
- Valori più alti possono sembrare energici ma meno realistici.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
