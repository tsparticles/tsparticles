# Bundle: Confetti

`@tsparticles/confetti` bietet eine vereinfachte API zum Erstellen von Konfetti-Effekten mit einem einzigen Funktionsaufruf. Keine direkte Interaktion mit `tsParticles` nötig.

## Enthaltene Funktionen

**Formen:** Kreis, Herz, Karten (französische Farben: Herz, Karo, Kreuz, Pik), Emoji, Bilder, Polygon, Quadrat, Stern

**Interne Plugins:** Emitter, Bewegung (respektiert die Benutzereinstellung zur reduzierten Bewegung)

**Aktualisierer:** Lebenszyklus, Rollen, Drehen, Neigen, Wackeln

**API:** `confetti(options)` oder `confetti(canvasId, options)`

## Wann verwenden

- "Glückwunsch!"- oder "Alles Gute zum Geburtstag!"-Button
- Schneller Feiereffekt
- Du möchtest die Engine nicht manuell konfigurieren

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Basiseffekt
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// Auf einer bestimmten Canvas
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN (Script-Tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Hauptparameter

| Parameter       | Typ      | Standard     | Beschreibung                                         |
| --------------- | -------- | ------------ | ---------------------------------------------------- |
| `particleCount` | number   | 50           | Anzahl der Konfettiteilchen                          |
| `spread`        | number   | 60           | Streuwinkel (Grad)                                   |
| `angle`         | number   | 90           | Richtung (Grad, 90 = nach unten)                     |
| `startVelocity` | number   | 30           | Anfangsgeschwindigkeit                               |
| `colors`        | string[] | —            | Konfettifarben                                       |
| `origin`        | { x, y } | { 0.5, 0.5 } | Ursprungspunkt (0-1)                                 |
| `drift`         | number   | 0            | Horizontale Drift                                    |
| `shapes`        | string[] | —            | Formen: "circle", "heart", "square", "star", "cards" |

## Häufige Fehler

- Denken, dass `tsParticles` von `@tsparticles/confetti` exportiert wird — das ist nicht der Fall.
- Dieselbe Canvas-ID unbeabsichtigt wiederverwenden.
- `confetti` in einer Schleife aufrufen, ohne die Leistung zu verwalten — verwende ein angemessenes Intervall oder stoppe die Animation, wenn sie fertig ist.

## Siehe auch

- [Bundle-Übersicht](/de/guide/bundles)
- [Feuerwerk-Bundle](/de/guide/bundles-fireworks)
