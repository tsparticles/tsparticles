# Opzione plugin: Emettitori

`emitters` genera particelle in modo dinamico ed è basato su plug-in.

## Esempio

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Note

- Ottimo per effetti burst e generazione dinamica di particelle.
- Mantenere i tassi di emissione equilibrati per evitare picchi di prestazioni.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
