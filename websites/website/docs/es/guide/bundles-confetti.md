# Bundle: Confetti

`@tsparticles/confetti` expone una API simplificada para crear efectos de confeti con una sola llamada a función. No requiere interactuar con `tsParticles` directamente.

## Funcionalidades incluidas

**Formas:** círculo, corazón, cartas (palos franceses: corazones, diamantes, tréboles, picas), emoji, imágenes, polígono, cuadrado, estrella

**Plugins internos:** emisores, motion (respeta las preferencias de usuario de reducir animaciones)

**Updaters:** life, roll, rotate, tilt, wobble

**API:** `confetti(options)` o `confetti(canvasId, options)`

## Cuándo usarlo

- Botón "¡Felicidades!" o "¡Cumpleaños!"
- Efecto de celebración rápido
- No quieres configurar el engine manualmente

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Efecto base
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// En un canvas específico
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Parámetros principales

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `particleCount` | number | 50 | Número de confetis |
| `spread` | number | 60 | Ángulo de difusión (grados) |
| `angle` | number | 90 | Dirección (grados, 90 = abajo) |
| `startVelocity` | number | 30 | Velocidad inicial |
| `colors` | string[] | — | Colores de los confetis |
| `origin` | { x, y } | { 0.5, 0.5 } | Punto de origen (0-1) |
| `drift` | number | 0 | Deriva horizontal |
| `shapes` | string[] | — | Formas: "circle", "heart", "square", "star", "cards" |

## Errores comunes

- Pensar que `tsParticles` se exporta desde `@tsparticles/confetti` — no es así.
- Reutilizar el mismo ID de canvas sin querer.
- Llamar `confetti` en bucle sin gestionar el rendimiento: usa un intervalo razonable o detén la animación cuando no sea necesaria.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Bundle fireworks](/es/guide/bundles-fireworks)
