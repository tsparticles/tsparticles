# Collegamenti alle particelle

`particles.links` disegna linee di connessione tra le particelle vicine.

## Esempio

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: distanza massima per un collegamento.
- `opacity`: forza visiva della linea.
- `color`: colore della linea.
- `width`: spessore del tratto.

## Suggerimento per le prestazioni

I collegamenti possono diventare costosi con un numero elevato di particelle. Accorda `number.value` e `distance` insieme.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
