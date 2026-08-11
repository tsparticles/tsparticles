# Bundle: Fireworks

`@tsparticles/fireworks` bietet eine vereinfachte API zum Erstellen von Feuerwerkseffekten mit einem einzigen Funktionsaufruf. Unterstützt Töne, benutzerdefinierte Farben und Instanzsteuerung (Pause/Play).

## Enthaltene Funktionen

**Formen:** Linie, Kreis (von basic)

**Interne Plugins:** Emitter, Emitter-Form-Quadrat, Mischung (Farbmischung), Töne

**Aktualisierer:** Zerstören, Lebenszyklus, Farbe, Drehen

**API:** `fireworks(options)` — gibt eine steuerbare Instanz zurück

## Wann verwenden

- Neujahrs- oder Feier-Effekt
- Feier-UI
- Du möchtest die Engine nicht manuell konfigurieren

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Basiseffekt
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Instanzsteuerung
instance?.pause();
instance?.play();

// Auf einer bestimmten Canvas
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN (Script-Tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Sofortiges Feuerwerk
  fireworks();
</script>
```

### Hauptparameter

| Parameter    | Typ          | Standard | Beschreibung              |
| ------------ | ------------ | -------- | ------------------------- |
| `colors`     | string[]     | —        | Explosionsfarben          |
| `rate`       | number       | —        | Feuerwerke pro Sekunde    |
| `speed`      | { min, max } | —        | Partikelgeschwindigkeit   |
| `sounds`     | boolean      | true     | Soundeffekte aktivieren   |
| `gravity`    | number       | —        | Schwerkraft (Standard: 0) |
| `opacity`    | number       | —        | Opazität (0-1)            |
| `brightness` | { min, max } | —        | Explosionshelligkeit      |

## Häufige Fehler

- Denken, dass `tsParticles` von `@tsparticles/fireworks` exportiert wird — das ist nicht der Fall.
- `fireworks()` in einer Schleife aufrufen, ohne die Instanz zu verwalten — der Effekt ist bereits kontinuierlich.
- Die Instanz nicht stoppen, wenn die Seite verlassen wird — rufe `instance?.pause()` oder `instance?.stop()` auf.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Konfetti-Bundle](/de/guide/bundles-confetti)
