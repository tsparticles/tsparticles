# Partículas

Las opciones dentro de `particles` controlan la apariencia y el movimiento de las partículas.

## Grupos más utilizados

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Ver páginas detalladas:

- [`Particles Number`](/es/options/particles-number)
- [`Particles Move`](/es/options/particles-move)
- [`Particles Links`](/es/options/particles-links)
- [`Particles Palette`](/es/options/particles-palette)
- [`Particles Paint`](/es/options/particles-paint)
- [`Particles Shape`](/es/options/particles-shape)

## `particles.number`

```ts
particles: {
  number: {
    value: 70,
    density: {
      enable: true,
      area: 800
    }
  }
}
```

- `value`: recuento de partículas base.
- `density.enable`: adapta el recuento al tamaño del contenedor.

## `particles.move`

```ts
move: {
  enable: true,
  speed: 1.6,
  direction: "none",
  outModes: {
    default: "out"
  }
}
```

- `speed`: velocidad de movimiento percibida.
- `outModes.default`: comportamiento de los bordes (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Permite enlaces entre partículas, útil para secciones de héroes de "red".

## `particles.palette`

```ts
palette: "sunset";
```

- Importa colores y combina valores predeterminados desde una identificación de paleta registrada.
- Completa `paint.fill` o `paint.stroke` automáticamente según la paleta.
- Con paletas multivariantes, `paint` se carga como una serie de variantes.
- Útil con ajustes preestablecidos y demostraciones cuando desea cambiar el estado de ánimo del color rápidamente.

## `particles.shape`, `size`, `opacity`

```ts
shape: {
  type: ["circle", "square"]
},
size: {
  value: {
    min: 1,
    max: 5
  }
},
opacity: {
  value: 0.7
}
```

- `shape.type`: tipo único o lista de tipos.
- `size.value`: rango recomendado para variación natural.
- `opacity.value`: transparencia media.

## Grupos avanzados para comprobar a continuación

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Páginas detalladas:

- [`Particles Bounce`](/es/options/particles-bounce)
- [`Particles Paint`](/es/options/particles-paint)
- [`Particles Destroy`](/es/options/particles-destroy)
- [`Particles Group`](/es/options/particles-group)
- [`Particles Collisions`](/es/options/particles-collisions)
- [`Particles Life`](/es/options/particles-life)
- [`Particles Palette`](/es/options/particles-palette)
- [`Particles Opacity`](/es/options/particles-opacity)
- [`Particles Orbit`](/es/options/particles-orbit)
- [`Particles Repulse`](/es/options/particles-repulse)
- [`Particles Roll`](/es/options/particles-roll)
- [`Particles Rotate`](/es/options/particles-rotate)
- [`Particles Shadow`](/es/options/particles-shadow)
- [`Particles Size`](/es/options/particles-size)
- [`Particles Tilt`](/es/options/particles-tilt)
- [`Particles Twinkle`](/es/options/particles-twinkle)
- [`Particles Wobble`](/es/options/particles-wobble)
- [`Particles ZIndex`](/es/options/particles-zindex)
- [`Particles Move`](/es/options/particles-move)
- [`Particles Number`](/es/options/particles-number)
- [`Particles Links`](/es/options/particles-links)
- [`Particles Shape`](/es/options/particles-shape)

Páginas de origen: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
