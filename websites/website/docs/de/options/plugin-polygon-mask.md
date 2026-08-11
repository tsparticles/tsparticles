# Plugin-Option: Polygonmaske

`polygonMask` beschränkt Partikel auf SVG- oder Polygon-basierte Regionen.

## Beispiel

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

## Notizen

- Verwenden Sie optimierte SVG-Pfade für eine bessere Laufzeitleistung.
- Validieren Sie das Pfadlade- und Fallback-Verhalten.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
