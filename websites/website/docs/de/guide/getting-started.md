# Erste Schritte

Dieser Pfad ist das schnellste und zuverlässigste Setup für `tsParticles` im Jahr 2026.

## Kurze Checkliste

1. Installieren Sie `@tsparticles/engine`.
2. Wählen Sie einen Laufzeitpfad aus (`@tsparticles/slim`, `@tsparticles/all`, fokussierte APIs wie `@tsparticles/particles` oder nur benutzerdefinierte Pakete).
3. Laden Sie Ihr Bundle einmal.
4. Beginnen Sie mit manuellen Optionen, einem Konfigurationsobjekt oder einer Voreinstellung.

## 1) Installieren Sie die Engine + eine Bundle-Voreinstellung

Verwenden Sie `@tsparticles/engine` plus `@tsparticles/slim` für ein hervorragendes Gleichgewicht zwischen Standardgröße und Funktionen.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Benötigen Sie CDN-Links, `npm`/`yarn`-Varianten oder `require(...)`-Beispiele?

- Siehe [`/guide/installation`](/de/guide/installation).

## 2) Erstellen Sie einen Container in HTML

```html
<div id="tsparticles"></div>
```

## 3) tsParticles initialisieren

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
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
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Wählen Sie das richtige Paket

- `@tsparticles/slim`: Die meisten Apps sollten hier beginnen.
- `@tsparticles/basic`: kleinerer Funktionsumfang für sehr leichte Setups.
- `@tsparticles/all`: alles enthalten, am einfachsten für schnelles Prototyping.

Wenn Sie eine fokussierte API anstelle einer direkten `tsParticles`-Einrichtung benötigen:

- `@tsparticles/particles`: Vereinfachte Partikel-Hintergrund-API
- `@tsparticles/confetti`: Konfetti-API mit einem Aufruf
- `@tsparticles/fireworks`: Feuerwerks-API mit einem Aufruf

## 5) Verwenden Sie Voreinstellungen/Konfigurationen, wenn Sie Geschwindigkeit benötigen

Wenn Sie vorgefertigte Effekte bevorzugen:

```bash
pnpm add @tsparticles/configs
```

Laden Sie dann eine Konfiguration per Schlüssel, z. B. die [`demo/vite`-App](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Wenn Sie Setups bevorzugen, die auf Preset-Namen basieren, verwenden Sie den offiziellen Preset-Katalog in [`/demos/presets`](/de/demos/presets).

## Schnelle Dokumentationskarte

- Root-Optionen: [`/options/`](/de/options/)
- Wrapper-Referenz: [`/guide/wrappers`](/de/guide/wrappers)
- Voreinstellungskatalog: [`/demos/presets`](/de/demos/presets)
- Palettenkatalog: [`/demos/palettes`](/de/demos/palettes)
- Formenkatalog: [`/demos/shapes`](/de/demos/shapes)
- Migration von particles.js: [`/migrations/particles-js`](/de/migrations/particles-js)
- Farbformate: [`/guide/color-formats`](/de/guide/color-formats)
- Container-Lebenszyklus: [`/guide/container-lifecycle`](/de/guide/container-lifecycle)
- Plugins und Anpassungen: [`/guide/plugins-customization`](/de/guide/plugins-customization)

## Fehlerbehebung

- Leerer Bildschirm: Überprüfen Sie, ob `#tsparticles` vorhanden ist, bevor Sie `tsParticles.load` aufrufen.

- Fehlende Funktion: Sie benötigen wahrscheinlich ein anderes Plugin/Paket (Form, Interaktion, Updater).
- Tippfehler bei den Optionen: Halten Sie Ihre Pakete auf die gleiche Haupt-/Nebenversion ausgerichtet.
