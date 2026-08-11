# Installazione

## Scegli il tuo percorso

| Scenario                    | Comando                                           |
| --------------------------- | ------------------------------------------------- |
| Inizio rapido (consigliato) | `pnpm add @tsparticles/engine @tsparticles/slim`  |
| Minimo indispensabile       | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Set completo funzionalità   | `pnpm add @tsparticles/engine tsparticles`        |
| Tutto l'ecosistema          | `pnpm add @tsparticles/engine @tsparticles/all`   |
| Solo coriandoli             | `pnpm add @tsparticles/confetti`                  |
| Solo fuochi d'artificio     | `pnpm add @tsparticles/fireworks`                 |
| Sfondo particellare         | `pnpm add @tsparticles/particles`                 |
| Effetto ribbon              | `pnpm add @tsparticles/ribbons`                   |

> **Importante**: `@tsparticles/engine` da solo non disegna nulla. Devi sempre aggiungere un bundle (per caricare forme e animazioni) o dei plugin individuali. Vedi la [guida ai bundle](/it/guide/bundles).

## Con npm

```bash
# engine + slim (consigliato per la maggior parte dei progetti)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (minimo)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all (tutto)
npm install @tsparticles/engine @tsparticles/all

# Bundle ad API dedicata (non serve engine esplicito)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## Con yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... stesso schema degli altri bundle
```

## Con pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... stesso schema degli altri bundle
```

## Con CDN (tag `<script>`)

Tutti i pacchetti sono disponibili su jsDelivr, unpkg e cdnjs.

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

Stessa struttura: `https://unpkg.com/{package-name}@{version}/{filename}`

Esempio:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Esempi di import

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
<!-- 2. Bundle (espone loadBasic/loadSlim/loadFull/loadAll globalmente) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Tuo script -->
<script>
  (async () => {
    await loadSlim(tsParticles); // registra le funzionalità
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

Con i bundle ad API dedicata:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Pagine correlate

- [Per iniziare](/it/guide/getting-started)
- [Guida ai bundle](/it/guide/bundles)
- [Catalogo preset](/demos/presets)
- [Wrapper framework](/it/guide/wrappers)
