# Bundle: Slim

`@tsparticles/slim` es el bundle recomendado para la mayoría de proyectos. Incluye todo lo necesario para crear animaciones de partículas modernas con interacciones mouse, formas múltiples y enlaces.

## Funcionalidades incluidas

Hereda todo de `@tsparticles/basic` más:

**Formas:** círculo, cuadrado, estrella, polígono, línea, imagen, emoji

**Interacciones externas (mouse/touch):**

- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Interacciones entre partículas:**

- attract
- collisions (colisiones)
- links (enlaces entre partículas)

**Updaters adicionales:**

- life (vida/ciclo)
- rotate (rotación)

**Plugins:**

- interactivity (plugin para habilitar las interacciones)
- easing-quad (easing cuadrático para animaciones)
- Colores HEX, HSL, RGB

## Cuándo usarlo

- Punto de partida recomendado para la mayoría de proyectos
- Se necesitan formas múltiples (círculos, estrellas, polígonos, imágenes)
- Se necesitan interacciones mouse (click, hover, bubble, repulse)
- Se necesitan enlaces entre partículas (links)
- Buen equilibrio entre tamaño del bundle y funcionalidades

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Errores comunes

- Llamar `tsParticles.load()` antes de `loadSlim(tsParticles)`.
- Mezclar versiones diferentes entre engine y bundle — mantenlos alineados.
- Esperar funcionalidades que solo están en bundles superiores (emisores, absorbedores, texto, wobble): se necesita `tsparticles` (full) o plugins individuales.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Guía de instalación](/es/guide/installation)
