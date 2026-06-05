# Bundle: Basic

`@tsparticles/basic` ist das leichteste Bundle. Enthält nur das Nötigste: Kreise, die sich mit animierbarer Opazität und Größe bewegen.

## Enthaltene Funktionen

**Formen:** Kreis

**Aktualisierer:**
- Farbe
- Opazität
- Aus-Modi (Verhalten beim Verlassen des Bildschirms)
- Größe

**Plugins:**
- Bewegung
- Mischung (Farbmischung)
- HEX-, HSL-, RGB-Farb-Plugins

**Nicht enthalten:**
- Maus-/Touch-Interaktionen
- Partikelverbindungen
- Andere Formen (Quadrate, Sterne, Bilder, Polygone etc.)
- Emitter, Absorber, Töne
- Drehung, Lebenszyklus, Rollen, Neigen, Wackeln

## Wann verwenden

- Die Bundle-Größe hat oberste Priorität
- Du brauchst nur sich bewegende Punkte
- Keine Interaktionen oder komplexen Formen nötig

## Installation

### npm/pnpm/yarn

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

### CDN (Script-Tags)

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

## Häufige Fehler

- Funktionen erwarten, die nicht enthalten sind (z.B. `links`, Maus-Interaktionen) — diese erfordern umfangreichere Bundles.
- `tsParticles.load()` vor `loadBasic(tsParticles)` aufrufen — Formen und Aktualisierer sind noch nicht registriert.
- Nur `@tsparticles/engine` ohne ein Bundle installieren — die Engine allein zeichnet nichts.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Installationsanleitung](/de/guide/installation)
