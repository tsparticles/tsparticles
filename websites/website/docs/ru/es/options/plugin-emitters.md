# Opción de complemento: Emisores

`emitters` genera partículas dinámicamente y está controlado por complementos.

## Ejemplo

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

## Notas

- Ideal para efectos de ráfaga y generación dinámica de partículas.
- Mantener las tasas de emisión equilibradas para evitar picos de rendimiento.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
