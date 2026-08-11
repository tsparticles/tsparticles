# Opción de complemento: Máscara de polígono

`polygonMask` restringe las partículas a SVG o regiones basadas en polígonos.

## Ejemplo

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

## Notas

- Utilice rutas SVG optimizadas para un mejor rendimiento en tiempo de ejecución.
- Validar la carga de ruta y el comportamiento de reserva.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
