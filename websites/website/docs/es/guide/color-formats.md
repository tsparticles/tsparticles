# Formatos de color

tsParticles acepta múltiples formatos de color en opciones como `background`, `particles.paint` y configuraciones de complementos.

## Formatos comunes

```ts
color: "#60a5fa";
```

```ts
color: {
  value: {
    r: 96,
    g: 165,
    b: 250,
  },
}
```

```ts
color: {
  value: "hsl(220, 90%, 70%)",
}
```

## Orientación práctica

- Prefiera hexadecimal para facilitar la lectura en documentos y ejemplos.
- Utilice matrices de colores para escenas aleatorias más ricas.
- Mantenga el contraste alto cuando se utilicen efectos detrás del texto.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Color.md>
