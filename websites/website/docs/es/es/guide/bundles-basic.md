# Bundle: Basic

`@tsparticles/basic` es el bundle más ligero. Incluye solo lo esencial: círculos que se mueven con opacidad y tamaño animables.

## Funcionalidades incluidas

**Formas:** círculo

**Updaters (animaciones):**

- paint (color)
- opacity (opacidad)
- out-modes (comportamiento al salir de la pantalla)
- size (tamaño)

**Plugins:**

- move (movimiento)
- blend (mezcla de color)
- Colores HEX, HSL, RGB

**No incluye:**

- Interacciones mouse/touch (click, hover, etc.)
- Enlaces entre partículas (links)
- Otras formas (cuadrados, estrellas, imágenes, polígonos, etc.)
- Emisores, absorbedores, sonidos
- Rotación, vida, roll, tilt, wobble

## Cuándo usarlo

- El tamaño del bundle es la prioridad absoluta
- Solo se necesitan puntos que se muevan
- No se necesitan interacciones ni formas complejas

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## Errores comunes

- Esperar funcionalidades que no están incluidas (ej. `links`, interacciones mouse), que requieren bundles superiores.
- Llamar `tsParticles.load()` antes de `loadBasic(tsParticles)`: las formas y updaters aún no están registrados.
- Instalar solo `@tsparticles/engine` sin un bundle: el engine por sí solo no dibuja nada.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Guía de instalación](/es/guide/installation)
