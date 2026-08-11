# Spielplatz

Aufgeteilt nach Anwendungsfall:

- [`Configs Playground`](/de/playground/configs): umfangreichere Demos mit vollständig bearbeitbaren Optionen.
- [`Shapes Playground`](/de/playground/shapes): fokussierte Demos fur `shape.type` mit formspezifischen Optionen, wenn verfugbar.
- [`Presets Playground`](/de/playground/presets): offizielle Demos für voreingestellte Namen (`{ preset: "..." }`).
- [`Palettes Playground`](/de/playground/palettes): Palettenorientierte Demos aus dem Preset-Projekt.
- [`Bundles Playground`](/de/playground/bundles): dedizierte Spielplätze für `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles` und `@tsparticles/ribbons`.

Die Ausführung erfolgt immer **nur vom Benutzer ausgelöst** (keine automatische Wiedergabe).

## Geteilter Ablauf

Das Layout ist auf allen Spielplätzen einheitlich:

1. Zuerst die Canvas-Vorschau.
2. Steuerelemente für Start/Pause/Fortsetzen/Zerstören.
3. JSON-Editor für Optionen.

4. Wählen Sie eine Demo aus dem Menü aus.
5. Drücken Sie `Start`, um es auszuführen (keine automatische Wiedergabe).
6. Bearbeiten Sie den JSON im Editor.
7. Drücken Sie erneut `Start`, um mit Ihren neuen Optionen neu zu laden.
8. Verwenden Sie `Pause`/`Resume`, um Leistung und CPU-Auslastung zu steuern.

> Hinweis: `Destroy` gibt die Containerinstanz vollständig frei.

## Vorgeschlagener Arbeitsablauf

- Prototyp hier, bis der Effekt stabil ist.
- Kopieren Sie den endgültigen JSON in Ihr Projekt.
  - Geben Sie es mit `ISourceOptions` in den Anwendungscode ein.
