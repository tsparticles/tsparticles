# Bundle: All

`@tsparticles/all` lädt **alles** aus dem tsParticles-Repository: jede Form, Interaktion, Aktualisierer, Effekt, Pfad, Easing, Plugin und Export. Es ist das größte Bundle, gedacht für Prototyping und Demos.

## Enthaltene Funktionen

Erbt alles von `tsparticles` (full) plus:

**Alle Formen:** Pfeil, Karten, Zahnrad, Herz, Unendlichkeit, Matrix, Pfad, Ribbon, abgerundetes Polygon, abgerundetes Rechteck, Spirale, Squircle

**Alle externen Interaktionen:** Kanone, Licht, Partikel, Pop, Partikel-Abstoßen

**Alle Effekte:** Blase, Filter, Partikel, Schatten, Spur

**Alle Pfadgeneratoren:** Äste, Brownsch, Curl-Noise, Kurven, Fraktal-Noise, Gitter, Levy, Perlin-Noise, Polygon, Zufall, Simplex-Noise, Spirale, SVG, Zickzack

**Alle Easings:** Back, Bounce, Circ, Cubic, Elastic, Expo, Gaussian, Linear, Quad, Quart, Quint, Sigmoid, Sine, Smoothstep

**Alle Farb-Plugins:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Alle Plugins:** Absorber, Hintergrundmaske, Canvas-Maske, Emitter (alle Formen), Easings (alle), Export-Bild, Export-JSON, Export-Video, Infektion, Manuelle Partikel, Bewegung, Poisson-Scheibe, Polygon-Maske, Responsive, Töne, Themes, Spur, Zoom

**Alle Aktualisierer:** Zerstören, Farbverlauf, Lebenszyklus, Opazität, Orbit, Aus-Modi, Farbe, Rollen, Drehen, Größe, Neigen, Funkeln, Wackeln

## Wann verwenden

- Schnelles Prototyping, um Möglichkeiten zu erkunden
- Demos und Vorführungen
- Entwicklungsumgebungen, in denen die Größe keine Rolle spielt
- **Nicht für die Produktion empfohlen** — bevorzuge gezieltere Bundles

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN (Script-Tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Unterschied zwischen `tsparticles` und `@tsparticles/all`

Siehe die Vergleichstabelle auf der [Bundles-Full-Seite](/de/guide/bundles-full) für die detaillierte Aufschlüsselung.

## Häufige Fehler

- Verwendung in der Produktion — bevorzuge `@tsparticles/slim` oder `tsparticles` für kleinere Bundles.
- `tsParticles.load()` vor `loadAll(tsParticles)` aufrufen.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Installationsanleitung](/de/guide/installation)
