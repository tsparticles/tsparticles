# movimiento

`motion` es útil cuando necesitas control a nivel de animación, incluido el comportamiento de movimiento reducido.

## Estructura básica

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: detiene el comportamiento relacionado con el movimiento.
- `reduce`: permite una animación más suave en dispositivos restringidos o contextos de movimiento reducido.

## Orientación práctica

- Mantenga esto en los valores predeterminados a menos que tenga requisitos de accesibilidad/rendimiento.
- Prueba con preferencias de movimiento reducido y dispositivos de gama baja.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
