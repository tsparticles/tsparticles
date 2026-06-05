# Bundle: Fireworks

`@tsparticles/fireworks` expone una API simplificada para crear efectos de fuegos artificiales con una sola llamada. Soporta sonidos, colores personalizados y control de la instancia (pause/play).

## Funcionalidades incluidas

**Formas:** línea, círculo (de basic)

**Plugins internos:** emisores, emitters-shape-square, blend (mezcla), sonidos (sounds)

**Updaters:** destroy, life, paint, rotate

**API:** `fireworks(options)`, devuelve una instancia controlable

## Cuándo usarlo

- Efecto de Año Nuevo o fiesta
- UI de celebración
- No quieres configurar el engine manualmente

## Instalación

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Efecto base
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Control de instancia
instance?.pause();
instance?.play();

// En un canvas específico
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### Con CDN (etiqueta `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Fuegos artificiales inmediatos
  fireworks();
</script>
```

### Parámetros principales

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `colors` | string[] | — | Colores de explosión |
| `rate` | number | — | Fuegos por segundo |
| `speed` | { min, max } | — | Velocidad de partículas |
| `sounds` | boolean | true | Habilita efectos de sonido |
| `gravity` | number | — | Gravedad (default: 0) |
| `opacity` | number | — | Opacidad (0-1) |
| `brightness` | { min, max } | — | Brillo de explosión |

## Errores comunes

- Pensar que `tsParticles` se exporta desde `@tsparticles/fireworks` — no es así.
- Llamar `fireworks()` en bucle sin gestionar la instancia: el efecto ya es continuo, no hace falta un intervalo.
- No detener la instancia cuando el usuario cambia de página: llama `instance?.pause()` o `instance?.stop()`.

## Ver también

- [Panorámica de bundles](/es/guide/bundles)
- [Bundle confetti](/es/guide/bundles-confetti)
