# Referencia de opciones

Las opciones de `tsParticles` son profundas, asi que esta pagina funciona como mapa practico antes de entrar en cada subopcion.

## Elige tu ruta de configuracion

- **Resultado visual rapido**: comienza con un preset y sobrescribe los campos clave.
- **Control total**: define manualmente `particles`, `interactivity` y `background`.
- **Enfoque config-first**: empieza con `@tsparticles/configs` y ajusta de forma gradual.

## Docs rapidas (locales)

- [`Background & Canvas`](/es/options/background)
- [`Background Mask`](/es/options/background-mask)
- [`Full Screen`](/es/options/fullscreen)
- [`Motion`](/es/options/motion)
- [`Manual Particles`](/es/options/manual-particles)
- [`Themes`](/es/options/themes)
- [`Particles`](/es/options/particles)
- [`Particles Number`](/es/options/particles-number)
- [`Particles Move`](/es/options/particles-move)
- [`Particles Links`](/es/options/particles-links)
- [`Particles Palette`](/es/options/particles-palette)
- [`Particles Shape`](/es/options/particles-shape)
- [`Particles Collisions`](/es/options/particles-collisions)
- [`Particles Life`](/es/options/particles-life)
- [`Particles Orbit`](/es/options/particles-orbit)
- [`Particles Roll`](/es/options/particles-roll)
- [`Particles Rotate`](/es/options/particles-rotate)
- [`Interactivity`](/es/options/interactivity)
- [`Interactivity Click`](/es/options/interactivity-click)
- [`Interactivity Hover`](/es/options/interactivity-hover)
- [`Interactivity Div`](/es/options/interactivity-div)
- [`Interactivity Events`](/es/options/interactivity-events)
- [`Interactivity Modes`](/es/options/interactivity-modes)
- [`Plugin: Absorbers`](/es/options/plugin-absorbers)
- [`Plugin: Emitters`](/es/options/plugin-emitters)
- [`Plugin: Infection`](/es/options/plugin-infection)
- [`Plugin: Polygon Mask`](/es/options/plugin-polygon-mask)
- [`Performance Guide`](/es/options/performance)

## Paginas de detalle para particulas

- [`Particles Bounce`](/es/options/particles-bounce)
- [`Particles Color`](/es/options/particles-color)
- [`Particles Destroy`](/es/options/particles-destroy)
- [`Particles Group`](/es/options/particles-group)
- [`Particles Opacity`](/es/options/particles-opacity)
- [`Particles Palette`](/es/options/particles-palette)
- [`Particles Repulse`](/es/options/particles-repulse)
- [`Particles Shadow`](/es/options/particles-shadow)
- [`Particles Size`](/es/options/particles-size)
- [`Particles Stroke`](/es/options/particles-stroke)
- [`Particles Tilt`](/es/options/particles-tilt)
- [`Particles Twinkle`](/es/options/particles-twinkle)
- [`Particles Wobble`](/es/options/particles-wobble)
- [`Particles ZIndex`](/es/options/particles-zindex)

## Donde esta la documentacion de referencia

- Docs principales de opciones: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Paginas detalladas de opciones: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Interfaces de tipos: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Opciones raiz mas usadas

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Secciones mas usadas

- `background`: base para el fondo de canvas y el enmascarado.
- `particles.number`: cantidad y densidad.
- `particles.move`: velocidad, direccion y out modes.
- `particles.shape`: circulo, poligono, imagen, emoji, personalizado.
- `particles.palette`: cambia rapidamente paletas coordinadas.
- `interactivity`: modos hover/click y efectos externos.
- `detectRetina`: equilibrio calidad/rendimiento en pantallas de alta densidad.

## Mapa de particulas (vista anidada)

Usa este arbol como ayuda de navegacion antes de abrir paginas de detalle:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Primero abre la documentacion raiz y despues los apartados de profundidad:

- Raiz: [`Particles`](/es/options/particles)
- En detalle: [`Particles Number`](/es/options/particles-number), [`Particles Move`](/es/options/particles-move), [`Particles Links`](/es/options/particles-links)

## Workflow seguro para opciones

1. Empieza con una configuracion funcional desde demos o presets.
2. Cambia una seccion cada vez.
3. Valida con TypeScript (`IOptions`) dentro del codigo de la app.
4. Guarda las opciones de produccion en archivos JSON dedicados.

## Ejemplo tipado minimo

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Guardrails de rendimiento

- Prefiere `@tsparticles/slim` salvo que necesites plugins avanzados.
- Mantén el numero de particulas proporcional al area del contenedor.
- Perfila en dispositivos reales antes de anadir interacciones pesadas.

## Referencias relacionadas

- Docs del paquete de configs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Carpeta de presets: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Carpeta de paletas: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Para el detalle completo de cada subopcion, usa tambien las paginas fuente en `tsparticles/markdown/Options` enlazadas arriba.
