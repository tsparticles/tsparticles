# Erste Schritte

tsParticles ist eine JavaScript/TypeScript-Bibliothek zum Erstellen von Partikelanimationen, Konfetti, Feuerwerk und mehr. Sie funktioniert in jedem modernen Browser und ist sowohl als npm-Paket als auch über CDN mit `<script>`-Tags verfügbar.

## Architektur: Engine + Bundle

`@tsparticles/engine` allein **tut nichts Sichtbares**. Es enthält nur die Kern-Engine (Animationsloop, Canvas, Ereignisverwaltung), aber **keine Formen, keine Interaktionen, keine visuellen Effekte**. Um etwas zu sehen, musst du mindestens ein **Bundle** oder einzelne **Plugins** laden.

| Konzept                                                                              | Rolle                                                                                              |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                                | Kern-Engine. Exportiert `tsParticles`, Typen, Optionen. Allein zeichnet es nichts.                 |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, etc.)                             | Vorkonfektioniertes Paket, das Formen, Interaktionen und Aktualisierer auf der Engine registriert. |
| Einzelne Plugins (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, etc.) | Einzelpakete, die du für ein benutzerdefiniertes Bundle kombinieren kannst.                        |

## Wähle deinen Weg

### Pfad A — npm/pnpm/yarn (moderne Projekte mit Bundler)

Installiere die Engine + ein Bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Dann in deinem Code:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Alle Slim-Bundle-Features auf der Engine registrieren
  await loadSlim(tsParticles);

  // 2. Die Animation erstellen
  await tsParticles.load({
    id: "tsparticles", // HTML-Container-ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

Der HTML-Container:

```html
<div id="tsparticles"></div>
```

### Pfad B — CDN mit `<script>`-Tags (kein Bundler, reines HTML)

Lade zuerst die Engine, dann das Bundle. CDN-Dateien machen alles über `window` verfügbar — kein `import` nötig.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles Engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Slim-Bundle (macht loadSlim global verfügbar) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim ist global aus dem CDN-Bundle verfügbar
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **Hinweis**: Auch bei CDN-Bundles MUSST du `loadSlim(tsParticles)` (oder `loadBasic` / `loadFull` / `loadAll`) vor `tsParticles.load()` aufrufen. CDN-Bundles machen die Loader-Funktion global verfügbar, rufen sie aber NICHT automatisch auf.

Das gleiche Muster gilt für `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Pfad C — Spezialisierte Bundles mit dedizierter API (Confetti, Fireworks, Particles)

Einige Bundles haben ihre eigene vereinfachte API, ohne `tsParticles.load()` verwenden zu müssen:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

Gleiches gilt für `fireworks()`, `particles()`, `ribbons()`.

## Welches Bundle wählen?

| Bundle                   | npm                      | Verwendung                                                                                                                      |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | Minimum: Kreise, Bewegung, Opazität, Größe. Keine Interaktionen.                                                                |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **Empfohlen für die meisten Projekte.** Fügt Interaktionen (Klick/Hover), Partikelverbindungen, Bilder, Sterne, Polygone hinzu. |
| `tsparticles`            | `loadFull(tsParticles)`  | Vollständiger offizieller Funktionsumfang: Emitter, Absorber, Textformen, Roll, Wobble, Trail.                                  |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **Alles** im Repository: jede Form, Interaktion, Effekt, Easing, Pfad, Export. Nur zum Prototyping.                             |
| `@tsparticles/confetti`  | `confetti(options)`      | Konfetti in einem Funktionsaufruf. Dedizierte API.                                                                              |
| `@tsparticles/fireworks` | `fireworks(options)`     | Feuerwerk in einem Funktionsaufruf. Dedizierte API.                                                                             |
| `@tsparticles/particles` | `particles(options)`     | Vereinfachter Partikel-Hintergrund. Dedizierte API.                                                                             |
| `@tsparticles/ribbons`   | `ribbons(options)`       | Ribbon-Effekt. Dedizierte API.                                                                                                  |

Weitere Details: [`/guide/bundles`](/de/guide/bundles).

## Voreinstellungen verwenden

Das Paket `@tsparticles/configs` enthält Dutzende vorgefertigter Konfigurationen (Absorber, Blasen, Schnee, Sterne, Schwerkraft, Kollisionen etc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

Mit CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Kurzreferenzen

- Optionsdokumentation: [`/options/`](/de/options/)
- Bundle-Anleitung: [`/guide/bundles`](/de/guide/bundles)
- Voreinstellungskatalog: [`/demos/presets`](/de/demos/presets)
- Palettenkatalog: [`/demos/palettes`](/de/demos/palettes)
- Formenkatalog: [`/demos/shapes`](/de/demos/shapes)
- Framework-Wrapper: [`/guide/wrappers`](/de/guide/wrappers)
- Farbformate: [`/guide/color-formats`](/de/guide/color-formats)
- Container-Lebenszyklus: [`/guide/container-lifecycle`](/de/guide/container-lifecycle)
- Plugins & Anpassungen: [`/guide/plugins-customization`](/de/guide/plugins-customization)

## Fehlerbehebung

| Problem                                                | Wahrscheinliche Ursache                                                    | Lösung                                                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Leerer Bildschirm, keine Partikel                      | `#tsparticles` existiert nicht im DOM beim Aufruf von `tsParticles.load()` | Stelle sicher, dass das DIV vor dem Skript existiert, oder verwende `DOMContentLoaded`                                   |
| Leerer Bildschirm, keine Partikel                      | Nur `@tsparticles/engine` installiert                                      | Installiere auch ein Bundle (`@tsparticles/slim`) oder Plugins — die Engine allein hat keine Formen zum Zeichnen         |
| Fehler "loadBasic/loadSlim/loadFull is not a function" | Bundle nicht installiert oder falscher Import                              | `pnpm add @tsparticles/slim` und importiere `{ loadSlim }`                                                               |
| Partikel bewegen sich nicht                            | `move.enable` nicht auf `true` gesetzt                                     | Füge `move: { enable: true, speed: 2 }` hinzu                                                                            |
| Fehlende Funktion (z.B. Links, Kollisionen)            | Gewähltes Bundle enthält sie nicht                                         | Wechsle zu einem umfangreicheren Bundle (`@tsparticles/slim` oder `tsparticles`) oder installiere das spezifische Plugin |
| TypeScript-Typfehler                                   | Paketversionen nicht synchron                                              | Halte Engine und Bundle auf derselben Haupt-/Nebenversion                                                                |
