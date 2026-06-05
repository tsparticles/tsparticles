# Installation

## Wähle deinen Weg

| Szenario                      | Befehl                                            |
| ----------------------------- | ------------------------------------------------- |
| Schnellstart (empfohlen)      | `pnpm add @tsparticles/engine @tsparticles/slim`  |
| Minimales Setup               | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Vollständiger Funktionsumfang | `pnpm add @tsparticles/engine tsparticles`        |
| Alles im Repository           | `pnpm add @tsparticles/engine @tsparticles/all`   |
| Nur Konfetti                  | `pnpm add @tsparticles/confetti`                  |
| Nur Feuerwerk                 | `pnpm add @tsparticles/fireworks`                 |
| Partikel-Hintergrund          | `pnpm add @tsparticles/particles`                 |
| Ribbon-Effekt                 | `pnpm add @tsparticles/ribbons`                   |

> **Wichtig**: `@tsparticles/engine` allein zeichnet nichts. Du musst immer ein Bundle (zum Laden von Formen und Animationen) oder einzelne Plugins hinzufügen. Siehe die [Bundle-Anleitung](/de/guide/bundles).

## npm

```bash
# Engine + Slim (empfohlen für die meisten Projekte)
npm install @tsparticles/engine @tsparticles/slim

# Engine + Basic (minimal)
npm install @tsparticles/engine @tsparticles/basic

# Engine + Full (tsparticles)
npm install @tsparticles/engine tsparticles

# Engine + All
npm install @tsparticles/engine @tsparticles/all

# Dedizierte API-Bundles (keine explizite Engine nötig)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... gleiches Muster für andere Bundles
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... gleiches Muster für andere Bundles
```

## CDN (Script-Tags)

Alle Pakete sind auf jsDelivr, unpkg und cdnjs verfügbar.

### jsDelivr

| Bundle                      | URL                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| Engine                      | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js`              |
| Basic                       | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js`         |
| Slim                        | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`           |
| Full (`tsparticles`)        | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js`                      |
| All                         | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js`             |
| Confetti                    | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js`   |
| Fireworks                   | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles                   | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons                     | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js`     |
| particles.js-Kompatibilität | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js`                    |

### unpkg

Gleiche Struktur: `https://unpkg.com/{paketname}@{version}/{dateiname}`

Beispiel:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Importbeispiele

### Mit Bundler (ES-Modul-Import)

```ts
// Engine + Bundle-Loader
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### Mit CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### Mit CDN (Script-Tag)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (macht loadBasic/loadSlim/loadFull/loadAll global verfügbar) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Dein Skript -->
<script>
  (async () => {
    await loadSlim(tsParticles); // Funktionen registrieren
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

Mit dedizierten API-Bundles:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Verwandte Seiten

- [Erste Schritte](/de/guide/getting-started)
- [Bundle-Anleitung](/de/guide/bundles)
- [Framework-Wrapper](/de/guide/wrappers)
