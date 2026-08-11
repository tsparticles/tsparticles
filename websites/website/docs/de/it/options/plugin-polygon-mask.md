# Opzione plugin: Maschera poligonale

`polygonMask` vincola le particelle a SVG o ad aree basate su poligoni.

## Esempio

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## Note

- Utilizza percorsi SVG ottimizzati per migliori prestazioni di runtime.
- Convalidare il caricamento del percorso e il comportamento di fallback.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
