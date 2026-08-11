# Particules détruites

`particles.destroy` contrôle ce qui se passe lorsque les particules sont détruites.

## Exemple

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Conseils pratiques

- Commencez par des configurations simples `mode` avant des chaînes divisées complexes.
- Revérifiez les performances lors de l'utilisation de grands comptes fractionnés.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
