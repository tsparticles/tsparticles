# Primeros pasos

tsParticles es una librería JavaScript/TypeScript para crear animaciones de partículas, confeti, fuegos artificiales y mucho más. Funciona en cualquier navegador moderno y está disponible como paquete npm o vía CDN con etiquetas `<script>`.

## Arquitectura: engine + bundle

`@tsparticles/engine` por sí solo **no hace nada visible**. Contiene solo el motor interno (bucle de animación, canvas, gestión de eventos) pero **ninguna forma, ninguna interacción, ningún efecto visual**. Para ver algo necesitas cargar al menos un **bundle** o **plugins individuales**.

| Concepto                                                                                 | Rol                                                                                     |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                                    | Motor base. Exporta `tsParticles`, los tipos, las opciones. Por sí solo no dibuja nada. |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, etc.)                                 | Paquete preensamblado que registra formas, interacciones y updaters en el engine.       |
| Plugins individuales (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, etc.) | Paquetes individuales para combinar a medida para un bundle personalizado.              |

## Elige tu ruta

### Ruta A — npm/pnpm/yarn (proyectos modernos con bundler)

Instala el motor + un bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Luego en tu código:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Registra todas las funcionalidades del bundle slim en el engine
  await loadSlim(tsParticles);

  // 2. Crea la animación
  await tsParticles.load({
    id: "tsparticles", // ID del contenedor HTML
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

El contenedor HTML:

```html
<div id="tsparticles"></div>
```

### Ruta B — CDN con etiqueta `<script>` (sin bundler, HTML vanilla)

Carga primero el engine, luego el bundle. Los archivos CDN exponen todo en `window` — no hace falta `import`.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Bundle slim (expone loadSlim globalmente) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim está disponible globalmente tras cargar el bundle CDN
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **Nota**: incluso con los bundles CDN debes llamar `loadSlim(tsParticles)` (o `loadBasic` / `loadFull` / `loadAll`) antes de usar `tsParticles.load()`. Los bundles CDN exponen la función loader globalmente pero no la llaman automáticamente.

El mismo esquema aplica para `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Ruta C — Bundles especializados con API dedicada (confeti, fuegos, partículas)

Algunos bundles tienen su propia API simplificada, sin pasar por `tsParticles.load()`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

Lo mismo para `fireworks()`, `particles()`, `ribbons()`.

## ¿Qué bundle elegir?

| Bundle                   | npm                      | Cuándo usarlo                                                                                                                                       |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | Mínimo indispensable: círculos, movimiento, opacidad, tamaño.                                                                                       |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **Elección recomendada para la mayoría de proyectos.** Añade interacciones (click/hover), enlaces entre partículas, imágenes, estrellas, polígonos. |
| `tsparticles`            | `loadFull(tsParticles)`  | Conjunto completo de funcionalidades oficiales: emisores, absorbedores, formas texto, roll, wobble, trail.                                          |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **Todo** el repositorio: cada forma, interacción, efecto, easing, ruta, exportación. Solo para prototipado.                                         |
| `@tsparticles/confetti`  | `confetti(opciones)`     | Confeti en una llamada. API dedicada.                                                                                                               |
| `@tsparticles/fireworks` | `fireworks(opciones)`    | Fuegos artificiales en una llamada. API dedicada.                                                                                                   |
| `@tsparticles/particles` | `particles(opciones)`    | Fondo de partículas simplificado. API dedicada.                                                                                                     |
| `@tsparticles/ribbons`   | `ribbons(opciones)`      | Efecto ribbon/cintas. API dedicada.                                                                                                                 |

Más detalles: [`/guide/bundles`](/es/guide/bundles).

## Usar presets predefinidos

El paquete `@tsparticles/configs` contiene decenas de configuraciones listas (absorbedores, burbujas, nieve, estrellas, gravity, collisions, etc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

// Carga un preset por nombre
await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

Con CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Referencias rápidas

- Documentación de opciones: [`/options/`](/es/options/)
- Guía de bundles: [`/guide/bundles`](/es/guide/bundles)
- Catálogo de presets: [`/demos/presets`](/es/demos/presets)
- Catálogo de paletas: [`/demos/palettes`](/es/demos/palettes)
- Catálogo de formas: [`/demos/shapes`](/es/demos/shapes)
- Wrappers para frameworks: [`/guide/wrappers`](/es/guide/wrappers)
- Formatos de color: [`/guide/color-formats`](/es/guide/color-formats)
- Ciclo de vida del contenedor: [`/guide/container-lifecycle`](/es/guide/container-lifecycle)
- Plugins y personalización: [`/guide/plugins-customization`](/es/guide/plugins-customization)

## Solución de problemas

| Problema                                              | Causa probable                                                        | Solución                                                                                                            |
| ----------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Pantalla en blanco, sin partículas                    | `#tsparticles` no existe en el DOM cuando llamas `tsParticles.load()` | Verifica que el DIV esté presente antes del script, o usa `DOMContentLoaded`                                        |
| Pantalla en blanco, sin partículas                    | Has instalado solo `@tsparticles/engine`                              | Debes instalar también un bundle (`@tsparticles/slim`) o plugins, porque el engine solo no tiene formas que dibujar |
| Error "loadBasic/loadSlim/loadFull is not a function" | Bundle no instalado o import incorrecto                               | `pnpm add @tsparticles/slim` e importa `{ loadSlim }`                                                               |
| Las partículas no se mueven                           | `move.enable` no está establecido a `true`                            | Añade `move: { enable: true, speed: 2 }`                                                                            |
| Funcionalidad faltante (ej. enlaces, colisiones)      | El bundle elegido no incluye esa funcionalidad                        | Cambia a un bundle más completo (`@tsparticles/slim` o `tsparticles`) o instala el plugin específico                |
| Errores de tipo TypeScript                            | Versiones de los paquetes no alineadas                                | Mantén engine y bundle en la misma versión mayor/menor                                                              |
