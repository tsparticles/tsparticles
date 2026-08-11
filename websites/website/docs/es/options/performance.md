# Guía de rendimiento

Estas son las palancas principales para evitar caídas de FPS.

## 1) Recuento de partículas

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Menos partículas = menos llamadas de sorteo y menos colisiones.

## 2) Movimiento y enlaces

- Reducir `move.speed` cuando no necesites un efecto energético.
- Límite `links.distance` y `links.opacity`.
- Evite combinaciones pesadas (por ejemplo `links` + `collisions` + efectos avanzados) en pantalla completa.

## 3) Interactividad

- Mantenga sólo unos pocos modos activos.
- En dispositivos móviles, considere desactivar el modo de desplazamiento.

## 4) Retina y cambio de tamaño

```ts
detectRetina: false;
```

Útil en contextos que priorizan el rendimiento o en dispositivos más débiles.

## 5) Control manual del ciclo de vida

Para secciones costosas, use controles explícitos:

- `start` al hacer clic del usuario
- `stop`/`pause` cuando la sección no es visible
- `destroy` en el desmontaje de página/componente
