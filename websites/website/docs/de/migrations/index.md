# Versioning & Migration

Nutzen Sie diesen Bereich, um zwischen den Hauptversionen von `tsParticles` zu navigieren, Releases zu verfolgen und das Versionierungssystem zu verstehen.

## Migrationsanleitungen

- [`Migration von v3.x`](/de/migrations/from-v3)
- [`Migration von v2.x`](/de/migrations/from-v2)
- [`Migration von v1.x`](/de/migrations/from-v1)

## Schnelleinstieg

- Von `v3.x`: beginnen Sie mit [`/de/migrations/from-v3`](/de/migrations/from-v3) (Schwerpunkt: Optionsschlüssel-Änderungen + Paketumbenennungen).
- Von `v2.x`: beginnen Sie mit [`/de/migrations/from-v2`](/de/migrations/from-v2) (Schwerpunkt: `load(...)`-API + Optionen).
- Von `v1.x`: beginnen Sie mit [`/de/migrations/from-v1`](/de/migrations/from-v1) (Schwerpunkt: Pakete, Loader, Optionen).

## Wo Migrationen normalerweise brechen

Die meisten Migrationen zwischen Hauptversionen brechen an zwei Stellen:

1. **Load-API-Form** (alte Positionsparameter vs neuer Objektparameter).
2. **Optionsschema** (umbenannte/verschobene Schlüssel).

Wenn Ihre App kompiliert aber falsch rendert, beginnen Sie mit den Optionszuordnungen.

## Schnellsuche

- [Option-Rename-Matrix](/de/migrations/option-rename-matrix) — schnelle Zuordnung von Legacy- zu aktuellen Optionsschlüsseln.

## Auch nützlich

- [Changelog](/de/migrations/changelog) — neueste Release-Notizen.
- [Releases und Versionierung](/de/migrations/releases) — Versionsangleichungsregeln und Release-Checkliste.
- [Migration von particles.js](/de/migrations/particles-js) — Migration von Legacy `particles.js` oder `canvas-confetti`.
