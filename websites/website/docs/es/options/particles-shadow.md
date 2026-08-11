# Partículas Sombra

`particles.shadow` agrega una sombra alrededor de las partículas.

## Ejemplo

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

## Orientación práctica

- Las sombras mejoran la profundidad, pero pueden resultar costosas en escenas densas.
- Utilice primero un desenfoque bajo y compare en dispositivos móviles.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
