# Bundle: Particles

`@tsparticles/particles` expone una API simplificada para crear fondos de partículas interactivos. Es una alternativa más completa a `@tsparticles/basic` pero con API dedicada en lugar de configurar el engine manualmente.

## Funcionalidades incluidas

**Formas:** círculo (de basic)

**Plugins internos:** interactivity (enlaces, colisiones)

**Interacciones:** links (enlaces entre partículas), collisions (colisiones)

**API:** `particles(options)` o `particles(canvasId, options)`

## Cuándo usarlo

- Fondo de partículas para un sitio web
- Fondo con enlaces entre partículas (estilo "nodos")
- No quieres configurar el engine manualmente

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Fondo con enlaces
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// En un canvas específico
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// Con colores personalizados
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Parámetros principales

| Parámetro    | Tipo               | Default    | Descripción             |
| ------------ | ------------------ | ---------- | ----------------------- |
| `count`      | number             | 50         | Número de partículas    |
| `radius`     | number             | 3          | Radio de partículas     |
| `speed`      | number             | 2          | Velocidad de movimiento |
| `opacity`    | number             | 0.8        | Opacidad (0-1)          |
| `color`      | string \| string[] | "#ffffff"  | Color/es de partículas  |
| `links`      | boolean            | false      | Muestra enlaces         |
| `linksColor` | string             | "#ffffff"  | Color de enlaces        |
| `linksWidth` | number             | 1          | Grosor de enlaces       |
| `shape`      | string[]           | ["circle"] | Formas de partículas    |

## Errores comunes

- Pensar que `tsParticles` se exporta desde `@tsparticles/particles` — no es así.
- Reutilizar el mismo ID de canvas sin querer.
- Esperar formas avanzadas (estrellas, polígonos) — el bundle particles está basado en basic y usa solo círculos.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Guía para empezar](/es/guide/getting-started)
