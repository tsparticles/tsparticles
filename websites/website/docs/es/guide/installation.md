# Instalación

## Elige tu ruta

| Escenario                            | Comando                                           |
| ------------------------------------ | ------------------------------------------------- |
| Inicio rápido (recomendado)          | `pnpm add @tsparticles/engine @tsparticles/slim`  |
| Mínimo indispensable                 | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Conjunto completo de funcionalidades | `pnpm add @tsparticles/engine tsparticles`        |
| Todo el ecosistema                   | `pnpm add @tsparticles/engine @tsparticles/all`   |
| Solo confeti                         | `pnpm add @tsparticles/confetti`                  |
| Solo fuegos artificiales             | `pnpm add @tsparticles/fireworks`                 |
| Fondo de partículas                  | `pnpm add @tsparticles/particles`                 |
| Efecto ribbon                        | `pnpm add @tsparticles/ribbons`                   |

> **Importante**: `@tsparticles/engine` por sí solo no dibuja nada. Debes añadir siempre un bundle (para cargar formas y animaciones) o plugins individuales. Ver la [guía de bundles](/es/guide/bundles).

## Con npm

```bash
# engine + slim (recomendado para la mayoría de proyectos)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (mínimo)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all (todo)
npm install @tsparticles/engine @tsparticles/all

# Bundle con API dedicada (no necesita engine explícito)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## Con yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... mismo esquema que los otros bundles
```

## Con pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... mismo esquema que los otros bundles
```

## Con CDN (etiqueta `<script>`)

Todos los paquetes están disponibles en jsDelivr, unpkg y cdnjs.

### jsDelivr

| Bundle                     | URL                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| Engine                     | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js`              |
| Basic                      | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js`         |
| Slim                       | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`           |
| Full (`tsparticles`)       | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js`                      |
| All                        | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js`             |
| Confetti                   | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js`   |
| Fireworks                  | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles                  | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons                    | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js`     |
| Compatibility particles.js | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js`                    |

### unpkg

Misma estructura: `https://unpkg.com/{package-name}@{version}/{filename}`

Ejemplo:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Ejemplos de import

### Con bundler (import ES module)

```ts
// Engine + bundle loader
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### Con CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### Con CDN (script tag)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (expone loadBasic/loadSlim/loadFull/loadAll globalmente) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Tu script -->
<script>
  (async () => {
    await loadSlim(tsParticles); // registra las funcionalidades
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

Con los bundles de API dedicada:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Páginas relacionadas

- [Primeros pasos](/es/guide/getting-started)
- [Guía de bundles](/es/guide/bundles)
- [Catálogo de presets](/demos/presets)
- [Wrappers para frameworks](/es/guide/wrappers)
