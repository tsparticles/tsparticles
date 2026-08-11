# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, loader: `loadFull`) es el bundle oficial completo. Incluye todas las funcionalidades del bundle Slim más emisores, absorbedores, formas de texto, animaciones avanzadas (wobble, roll, tilt, twinkle, destroy).

## Funcionalidades incluidas

Hereda todo de `@tsparticles/slim` más:

**Formas adicionales:** text (texto con fuentes personalizadas)

**Interacciones externas adicionales:**

- drag (arrastrar partículas con el mouse)
- trail (estela detrás del mouse)

**Updaters adicionales:**

- destroy (destrucción de partículas con animación)
- roll (rodamiento)
- tilt (inclinación 3D)
- twinkle (centelleo intermitente)
- wobble (oscilación)

**Plugins:**

- absorbers (absorbedores — agujeros negros que succionan partículas)
- emitters (emisores — fuentes continuas de partículas)
- emitters-shape-circle, emitters-shape-square (formas para emisores)

## Cuándo usarlo

- Se necesitan emisores (partículas que aparecen continuamente)
- Se necesitan absorbedores (partículas que son succionadas)
- Se necesitan formas de texto con fuentes personalizadas
- Se necesitan animaciones avanzadas (wobble, tilt, roll, twinkle)
- Buen punto de llegada antes de pasar a plugins individuales

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Diferencia entre `tsparticles` y `@tsparticles/all`

| Aspecto       | `tsparticles` (full)                                    | `@tsparticles/all`                                                                    |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Tamaño        | Contenido                                               | Muy grande                                                                            |
| Formas        | circle, square, star, polygon, line, image, emoji, text | Todas las formas (corazón, cartas, flechas, espirales, cog, rounded-rect, etc.)       |
| Interacciones | Slim + drag + trail                                     | Todas (cannon, light, pop, particle, repulse)                                         |
| Path          | Solo easing quad                                        | 14 generadores de path                                                                |
| Efectos       | Ninguno                                                 | 5 efectos (bubble, filter, shadow, etc.)                                              |
| Exportaciones | Ninguna                                                 | Image, JSON, Video                                                                    |
| Plugins extra | absorbers, emitters                                     | Todos (sounds, themes, trail, zoom, polygon-mask, canvas-mask, background-mask, etc.) |
| Easing        | Quad                                                    | 15 easing                                                                             |

## Errores comunes

- Confundir `tsparticles` con `@tsparticles/all` — no son el mismo paquete.
- Llamar `tsParticles.load()` antes de `loadFull(tsParticles)`.
- El paquete npm es `tsparticles` (no `@tsparticles/full`), el loader es `loadFull`.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Guía de instalación](/es/guide/installation)
