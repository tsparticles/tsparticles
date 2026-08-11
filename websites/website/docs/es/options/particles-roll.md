# Rollo de partículas

`particles.roll` aplica un comportamiento de balanceo y puede crear un movimiento visual de profundidad.

## Ejemplo

```ts
particles: {
  roll: {
    enable: true,
    speed: 12,
    darken: {
      enable: true,
      value: 20,
    },
  },
}
```

## Orientación práctica

- Usar primero a velocidad moderada.
- Combine cuidadosamente con `tilt` y `rotate` para facilitar la lectura.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Roll.md>
