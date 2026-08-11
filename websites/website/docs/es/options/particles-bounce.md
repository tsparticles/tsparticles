# Rebote de partículas

`particles.bounce` personaliza el comportamiento de rebote cuando las colisiones o límites aplican lógica de rebote.

## Ejemplo

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Orientación práctica

- Los valores alrededor de `1` mantienen los rebotes naturales.
- Los valores más altos pueden parecer enérgicos pero menos realistas.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
