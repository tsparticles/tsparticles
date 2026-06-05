# Bundle: Slim

`@tsparticles/slim` ist das empfohlene Bundle für die meisten Projekte. Enthält alles, was für moderne Partikelanimationen mit Maus-Interaktionen, mehreren Formen und Partikelverbindungen benötigt wird.

## Enthaltene Funktionen

Erbt alles von `@tsparticles/basic` plus:

**Formen:** Kreis, Quadrat, Stern, Polygon, Linie, Bild, Emoji

**Externe Interaktionen (Maus/Touch):**

- Anziehen
- Abprallen
- Blase
- Verbinden
- Zerstören
- Greifen
- Parallaxe
- Pausieren
- Schieben
- Entfernen
- Abstoßen
- Verlangsamen

**Partikel-Interaktionen:**

- Anziehen
- Kollisionen
- Verbindungen (Partikel-Links)

**Zusätzliche Aktualisierer:**

- Lebenszyklus
- Drehen

**Plugins:**

- Interaktivität
- Easing-Quad
- HEX-, HSL-, RGB-Farb-Plugins

## Wann verwenden

- Empfohlener Ausgangspunkt für die meisten Projekte
- Du brauchst mehrere Formen (Kreise, Sterne, Polygone, Bilder)
- Du brauchst Maus-Interaktionen (Klick, Hover, Blase, Abstoßen)
- Du brauchst Partikelverbindungen
- Gute Balance zwischen Bundle-Größe und Funktionen

## Installation

### npm/pnpm/yarn

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

### CDN (Script-Tags)

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

## Häufige Fehler

- `tsParticles.load()` vor `loadSlim(tsParticles)` aufrufen.
- Unterschiedliche Versionen von Engine und Bundle mischen — halte sie auf dem gleichen Stand.
- Funktionen aus höheren Bundles erwarten (Emitter, Absorber, Text, Wobble) — dafür wird `tsparticles` (full) oder einzelne Plugins benötigt.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Installationsanleitung](/de/guide/installation)
