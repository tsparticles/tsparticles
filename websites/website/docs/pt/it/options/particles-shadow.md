# Particelle Ombra

`particles.shadow` aggiunge un'ombra attorno alle particelle.

## Esempio

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## Guida pratica

- Le ombre migliorano la profondità ma possono essere costose nelle scene dense.
- Utilizza prima la sfocatura bassa e confrontala sui dispositivi mobili.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
