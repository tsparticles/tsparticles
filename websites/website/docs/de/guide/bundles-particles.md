# Bundle: Particles

`@tsparticles/particles` bietet eine vereinfachte API zum Erstellen interaktiver Partikelhintergründe. Eine umfangreichere Alternative zu `@tsparticles/basic` mit einer dedizierten API anstelle der manuellen Engine-Konfiguration.

## Enthaltene Funktionen

**Formen:** Kreis (von basic)

**Interne Plugins:** Interaktivität (Verbindungen, Kollisionen)

**Interaktionen:** Verbindungen (Partikel-Links), Kollisionen

**API:** `particles(options)` oder `particles(canvasId, options)`

## Wann verwenden

- Partikelhintergrund für eine Website
- Hintergrund mit Partikelverbindungen (Knoten-Netz-Effekt)
- Du möchtest die Engine nicht manuell konfigurieren

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Hintergrund mit Verbindungen
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// Auf einer bestimmten Canvas
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// Mit benutzerdefinierten Farben
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN (Script-Tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Hauptparameter

| Parameter | Typ | Standard | Beschreibung |
|---|---|---|---|
| `count` | number | 50 | Anzahl der Partikel |
| `radius` | number | 3 | Partikelradius |
| `speed` | number | 2 | Bewegungsgeschwindigkeit |
| `opacity` | number | 0.8 | Opazität (0-1) |
| `color` | string \| string[] | "#ffffff" | Partikelfarbe(n) |
| `links` | boolean | false | Verbindungen anzeigen |
| `linksColor` | string | "#ffffff" | Verbindungsfarbe |
| `linksWidth` | number | 1 | Verbindungsstärke |
| `shape` | string[] | ["circle"] | Partikelformen |

## Häufige Fehler

- Denken, dass `tsParticles` von `@tsparticles/particles` exportiert wird — das ist nicht der Fall.
- Dieselbe Canvas-ID unbeabsichtigt wiederverwenden.
- Erweiterte Formen erwarten (Sterne, Polygone) — das Particles-Bundle basiert auf basic und verwendet nur Kreise.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Erste Schritte](/de/guide/getting-started)
