# Veröffentlichungen und Versionierung

Dieses Projekt wird jetzt aus einem einzigen Repository versendet: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Wo Release-Arbeit stattfindet

- Monorepo-Stamm: <https://github.com/tsparticles/tsparticles>
- Pakete: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Voreinstellungen: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Paletten: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Versionsausrichtungsregel

- Halten Sie alle `@tsparticles/*`-Pakete an derselben Release-Linie ausgerichtet.
- Vermeiden Sie das Mischen verschiedener Beta-Linien oder Hauptversionen in einer App.

## Praktische Release-Checkliste

1. Überprüfen Sie die Zielpaketversionen in den `package.json`-Dateien des Arbeitsbereichs.
2. Erstellen und testen Sie betroffene Projekte.
3. Überprüfen Sie die Links zu Dokumenten und das Verhalten auf dem Spielplatz.
4. Veröffentlichen Sie über den Monorepo-Release-Flow.
