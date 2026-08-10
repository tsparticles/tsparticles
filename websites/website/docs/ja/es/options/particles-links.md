# Enlaces de partículas

`particles.links` dibuja líneas de conexión entre partículas cercanas.

## Ejemplo

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

- `distance`: distancia máxima para un enlace.
- `opacity`: fuerza visual de la línea.
- `color`: color de línea.
- `width`: espesor del trazo.

## Consejo de rendimiento

Los enlaces pueden resultar costosos con un alto número de partículas. Sintonice `number.value` y `distance` juntos.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
