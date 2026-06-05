# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, Loader: `loadFull`) ist das offizielle Full-Bundle. Enthält alles von Slim plus Emitter, Absorber, Textformen und erweiterte Animationen (Wobble, Roll, Tilt, Twinkle, Destroy).

## Enthaltene Funktionen

Erbt alles von `@tsparticles/slim` plus:

**Zusätzliche Formen:** Text (mit benutzerdefinierten Schriftarten)

**Zusätzliche externe Interaktionen:**
- Ziehen (Partikel mit der Maus ziehen)
- Spur (Partikelspur hinter der Maus)

**Zusätzliche Aktualisierer:**
- Zerstören (Partikelzerstörungs-Animation)
- Rollen
- Neigen (3D-Neigung)
- Funkeln (intermittierendes Glitzern)
- Wackeln (Oszillation)

**Plugins:**
- Absorber (schwarze Löcher, die Partikel einsaugen)
- Emitter (kontinuierliche Partikelquellen)
- Emitter-Form-Kreis, Emitter-Form-Quadrat (Emitterformen)

## Wann verwenden

- Du brauchst Emitter (Partikel, die kontinuierlich erzeugt werden)
- Du brauchst Absorber (Partikel werden eingesaugt)
- Du brauchst Textformen mit benutzerdefinierten Schriftarten
- Du brauchst erweiterte Animationen (Wobble, Tilt, Roll, Twinkle)
- Gute Zwischenstufe vor dem Wechsel zu einzelnen Plugins

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN (Script-Tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Unterschied zwischen `tsparticles` und `@tsparticles/all`

| Aspekt | `tsparticles` (full) | `@tsparticles/all` |
|---|---|---|
| Größe | Mittel | Sehr groß |
| Formen | Kreis, Quadrat, Stern, Polygon, Linie, Bild, Emoji, Text | Alle Formen (Herz, Karten, Pfeil, Spirale, Zahnrad, abgerundetes Rechteck etc.) |
| Interaktionen | Slim + Ziehen + Spur | Alle (Kanone, Licht, Pop, Partikel, Abstoßen) |
| Pfade | Nur Quad-Easing | 14 Pfadgeneratoren |
| Effekte | Keine | 5 Effekte (Blase, Filter, Schatten etc.) |
| Exporte | Keine | Bild, JSON, Video |
| Zusätzliche Plugins | Absorber, Emitter | Alle (Töne, Themes, Spur, Zoom, Polygon-Maske, Canvas-Maske, Hintergrundmaske etc.) |
| Easing | Quad | 15 Easings |

## Häufige Fehler

- `tsparticles` mit `@tsparticles/all` verwechseln — es sind unterschiedliche Pakete.
- `tsParticles.load()` vor `loadFull(tsParticles)` aufrufen.
- Das npm-Paket heißt `tsparticles` (nicht `@tsparticles/full`), der Loader heißt `loadFull`.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Installationsanleitung](/de/guide/installation)
