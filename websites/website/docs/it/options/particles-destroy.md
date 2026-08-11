# Le particelle distruggono

`particles.destroy` controlla cosa succede quando le particelle vengono distrutte.

## Esempio

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

## Guida pratica

- Inizia con semplici configurazioni `mode` prima di complesse catene divise.
- Ricontrollare le prestazioni quando si utilizzano conteggi parziali di grandi dimensioni.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
