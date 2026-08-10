# Bundle: All

`@tsparticles/all` carga **todo** el repositorio tsParticles: cada forma, interacción, updater, efecto, ruta, easing, plugin y exportación. Es el bundle más grande, pensado para prototipado y demos.

## Funcionalidades incluidas

Hereda todo de `tsparticles` (full) más:

**Todas las formas:** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**Todas las interacciones:** cannon, light, particle, pop, particles-repulse

**Todos los efectos:** bubble, filter, particles, shadow, trail

**Todos los generadores de path:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**Todos los easing:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**Todos los plugins de color:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Todos los plugins:** absorbers, background-mask, canvas-mask, emitters (con todas las formas), easing (todos), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**Todos los updaters:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## Cuándo usarlo

- Prototipado rápido para explorar las posibilidades
- Demos y showcases
- Entornos de desarrollo donde el tamaño no es importante
- **No recomendado en producción**: prefiere bundles más específicos

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Diferencia entre `tsparticles` y `@tsparticles/all`

Ver la tabla completa en la [página bundles-full](/es/guide/bundles-full) para la comparación detallada.

## Errores comunes

- Usarlo en producción — prefiere `@tsparticles/slim` o `tsparticles` para bundles más pequeños.
- Llamar `tsParticles.load()` antes de `loadAll(tsParticles)`.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Guía de instalación](/es/guide/installation)
