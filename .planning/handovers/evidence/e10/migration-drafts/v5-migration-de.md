# Migrationsleitfaden für v5 — E10-Arbeitsentwurf

Status: E10-Arbeitsentwurf, aktualisiert am 2026-11-27. Die E9-Prüfungen installierter Pakete und im Browser waren für den aktuellen Kandidaten erfolgreich. Dieser Leitfaden beschreibt die implementierten v5-Verträge für Engine, Wrapper, Bundles und Farben. Die E0-Größenlimits bleiben gemäß dem aktualisierten E10-Größenkriterium als Diagnosewerte sichtbar; sie werden nicht als erfüllt dargestellt. Der callbackfreie Renderer-Follow-up besteht alle 30 E0-Laufzeitprüfungen, einschließlich erzwungenem HDR. Bei M4/500 liegen Update und Render innerhalb der E0-Limits; das Frame-p95 beträgt 7,20 ms und liegt damit 0,05 ms über dem historischen E5-Referenzwert. Die HDR-Prüfung auf echter Hardware und die erforderlichen Dokumentationsprüfungen sind noch offen.

Das von MCP generierte TypeScript-Beispiel und alle 20 CLI-Scaffolds (Vanilla und 19 Frameworks) bestehen Typprüfung, Produktionsbuild und Chrome-Start ohne Seiten- oder Konsolenfehler. Alle neun gepackten Template-Familien enthalten keine entfernten Vue-2-, Nuxt-2- oder Nuxt-3-Varianten. Offen bleiben die sprachliche Prüfung aller neun Entwürfe und der HDR-/Browser-Hardware-Gate. Diese Dateien sind interne Entwürfe und keine fertigen Migrationsleitfäden zur Veröffentlichung.

Die standardmäßigen und lokalisierten Vanilla-Anleitungen der aktuellen Website sind byte-identisch und verwenden die derzeit veröffentlichten v4-CDN-Pakete. Ihre Singleton-Beispiele bleiben v4-Dokumentation, bis die v5-Migrationsseite veröffentlichungsbereit ist; sie zählen nicht als v5-Verbraucherprüfungen.

## Engine-Eigentümerschaft

Ersetze Importe des `tsParticles`-Singletons durch `createEngine()`. Bewahre die zurückgegebene Instanz im Anwendungsbereich auf, übergib sie an jeden Loader und stelle sie Wrappern und Providern explizit bereit. Eine lokale Variable darf weiterhin `tsParticles` heißen. Beim Teardown einer Komponente wird ihr Container verwaltet; andere Container derselben Engine dürfen dabei nicht zerstört werden.

Die Anpassung von Zufallsquelle und Logger sowie die Animationsplanung gehören in der E2-Implementierung nun zur jeweiligen Instanz. Registriere benutzerdefinierte Plugins in `container.engine` (oder `container.pluginManager.engine`), damit Runtime-Dienste der zuständigen Engine folgen.

## Entfernte Framework-Integrationen

| Integration                                 | Migrationsziel                                              | Entfernung / Prüfung                       |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| Vue-2-Wrapper, Demo und Starter-Referenzen  | Anwendung auf Vue 3 und `@tsparticles/vue3` aktualisieren   | In E1 entfernt; in E9 abschließend geprüft |
| Nuxt-2-Wrapper, Demo und Starter-Referenzen | Anwendung auf Nuxt 4 und `@tsparticles/nuxt4` aktualisieren | In E1 entfernt; in E9 abschließend geprüft |
| Nuxt-3-Wrapper, Demo und Starter-Referenzen | Anwendung auf Nuxt 4 und `@tsparticles/nuxt4` aktualisieren | In E1 entfernt; in E9 abschließend geprüft |

Framework-Upgrades sind Anwendungsmigrationen und keine einfachen Umbenennungen von Paketen. Die E0-Referenzsuche steht in [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt). Prüfe bei der Entfernung auch Installer, generierte Zeichenketten, Dokumentation und Übersetzungen. Die Matrix enthält ebenso weitergeführte Verbraucher, die explizite Engines verwenden müssen.

## Veraltete APIs

`colorMix()`, das RGB zurückgab, wurde entfernt. Ebenfalls entfernt wurden die veralteten Engine-Helfer `getStyleFromRgb()` und `getStyleFromHsl()`, das HSV-Plugin-`getStyleFromHsv()` sowie der lokale OKLCH-Paketformatierer `getStyleFromOklch()`. Konvertiere RGB mit `rgbToOklch()`, HSL mit `rgbToOklch(hslToRgbFloat(color))` und löse HSV-Optionen über den registrierten HSV-Farbmanager mit `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })` auf. Übergib das kanonische Ergebnis an das Engine-`getStyleFromOklch()`, das Ziel-Gamut-Mapping und HDR-Einstellungen verarbeitet. Wenn die Ausgabe tatsächlich auf RGB beschränkt sein muss, verwende `mapOklchToSrgb(result).rgb`.

### Interactor-Lifecycle-Hooks

Die Basisklassen der Interactors stellen standardmäßig ein wirkungsloses `reset()` bereit. Auch die externe Interactor-Basisklasse bietet ein wirkungsloses `clear()`. Der Manager wählt benutzerdefinierte Hooks nach der Initialisierung der Interactors aus, einschließlich der Redraw-Initialisierung. Behalte Overrides bei, die Zustand verwalten oder während des Resets Arbeit erledigen, und ergänze den TypeScript-Modifikator `override`, wenn `noImplicitOverride` verwendet wird.

Siehe das [Inventar veralteter APIs](../../e9/deprecated-migrations.md) für entfernte Farbformatierer, Confetti- und Ribbons-Optionen sowie die beibehaltene optionale particles.js-Kompatibilität. Wenn du den Compiler auf Stencil 5 aktualisierst, entferne `applyPolyfills()` und warte auf `defineCustomElements()`, falls die Registrierung vor der Hydrierung abgeschlossen sein muss. Der tsParticles-Stencil-Wrapper verwendet Stencil 4 und deklariert `applyPolyfills()` weiterhin.

## Farben, Optionen und öffentliche Verträge

Farbeingaben unterstützen weiterhin RGB, HSL, HSV, HWB, Lab, LCH, OKLab, CSS-Zeichenketten, Arrays und Bereiche. Der Animationsvertrag für Partikel verwendet jetzt OKLCH: Ersetze die bisherigen HSL-Animationskomponenten `{ h, s, l }` durch `{ h, c, l }`. Der Farbton bleibt ein Winkel; Chroma und Helligkeit verwenden die numerische OKLCH-Skala von v5, Alpha bleibt ein separater Deckkraftwert. Übernimm die HSL-Sättigung nicht als Chroma. Konvertiere Farben an der Eingabegrenze oder übergib unterstützte CSS-/RGB-Eingaben zur Analyse an die Engine. Farbmanager, die den Color-Erweiterungspunkt implementieren, müssen dem aktuellen OKLCH-Managervertrag folgen. Die [Farbentscheidungen](../../../V5-COLOR-DECISIONS.md) beschreiben akzeptierte Eingaben, Gamut-Mapping, Alpha und HDR-Verhalten.

## In E1 eingeführte APIs mit expliziter Engine

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Root-, `/lazy`- und Browser-Moduleinstiege erstellen keine Engine und veröffentlichen keine Objekte auf `globalThis`. Klassische Rollup-Skripte stellen das Namespace mit Factories und Loadern bereit:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Ein eigenständiges Bundle enthält Engine-Definitionen; externe Feature-Skripte benötigen zuerst die passende Engine samt Abhängigkeiten. Halte die Paketversionen synchron. Das Namespace enthält Definitionen, keine Engine. Das Laden eines weiteren Bundles zerstört keine bereits erstellte Engine. Dasselbe Canvas kann auch über Engine-Kopien aus verschiedenen Bundles hinweg nur einem Besitzer gehören. Zerstöre den Besitzer, bevor du das Canvas überträgst. Gleiche IDs auf verschiedenen bereitgestellten Canvas-Elementen bleiben zwischen Engines unabhängig.

Verwende eine separate Engine, wenn die Anwendung getrennte Plugin-Registries, Zufallsquellen, Logger, Scheduler oder Container-Eigentümerschaft benötigt. Registriere jedes benötigte Feature bei jeder Engine, die es verwenden soll:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Convenience-Pakete exportieren `createConfetti(engine)`, `createFireworks(engine)`, `createParticles(engine)` und `createRibbons(engine)`. Die zurückgegebene Funktion ist an diese Engine gebunden und behält `init`, `create` und `version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` liefert `{ particlesJS, pJSDom, Particles }`; diese Kompatibilitäts-APIs werden nicht `globalThis` zugewiesen. `loadConfigs(engine)` registriert den Katalog und die Paletten ausdrücklich bei dieser Engine.

| Wrapper-Familie                               | Engine-Eigentümerschaft und Registrierung                                                                                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Übergib `engine` an `ParticlesProvider` und stelle einen `init`-Registrar bereit, der die benötigten Plugins dort lädt.                                                                  |
| Vue 3                                         | Installiere den particles-Provider mit `{ engine, init }`; rufe `useParticlesProvider()` in Nachfahren auf.                                                                              |
| Angular                                       | Übergib eine Engine an `service.init(engine, registrar)` und verwende für jede unabhängige Engine einen eigenen Service-Provider. Convenience-Komponenten erhalten `engine` als Eingabe. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Stelle die Engine über die Komponenten-/Provider-API bereit und initialisiere sie, sofern verfügbar, mit `initParticlesEngine(engine, registrar)`.                                       |
| Qwik                                          | Erstelle und registriere auf dem Client und bewahre die Engine mit `noSerialize` auf; erstelle sie nicht während des Server-Renderings.                                                  |
| Benutzerdefinierte Elemente                   | Setze `.engine` als Property; es ist kein serialisiertes HTML-Attribut.                                                                                                                  |
| Nuxt 4                                        | Verwende `engine` und `registerParticles` aus dem konfigurierten Initialisierungsmodul.                                                                                                  |

Framework-spezifische Signaturen und SSR-Einschränkungen stehen in der README des jeweiligen Wrappers. Erstelle in einem Provider keine implizite Engine auf Modulebene neu.

Beim Teardown einer Komponente wird nur ihr eigener Container zerstört. Die Anwendung verwaltet die Lebensdauer einer gemeinsam genutzten Engine und muss ausstehende Ladevorgänge abschließen sowie Container zerstören, bevor sie die Engine verwirft. Runtime-Dienste gehören jeweils zu einer Engine. Konfiguriere sie vor dem Laden eines Containers:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

Die früheren globalen APIs `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` und `getParticlesLogger` wurden entfernt. Ersetze sie durch `engine.setRandom`, `engine.getRandom`, `engine.getRandomFn`, `engine.setLogger` und `engine.getLogger`. Benutzerdefinierte Plugins finden ihren Besitzer über `container.engine` oder `container.pluginManager.engine`. Runtime-Helfer erhalten eine explizite Zufallsquelle. Verwende den stabilen `getRandomFn()`-Provider der zuständigen Engine, damit spätere Änderungen der Quelle greifen, ohne andere Engines zu beeinflussen. Auch die Animationsplanung erfolgt pro Engine; der Scheduler, der die Frames eines Containers erzeugt hat, bricht sie ab.

### Reihenfolge der Initialisierung

Rufe bei Wrappern mit `initParticlesEngine` diese Funktion während der Anwendungsinitialisierung als `initParticlesEngine(engine, registrar)` auf. Komponenten dürfen vorher gemountet werden: Sie warten auf die Initialisierung dieser Engine und erstellen oder initialisieren keine implizite Engine. Verwende für jQuery `$.particles(engine).init(registrar)`. React-/Vue-Provider und die Angular-Service-Initialisierung übernehmen den entsprechenden Schritt. Bei fehlgeschlagener Registrierung werden aktuelle Wartende abgewiesen; ein erneuter Initialisierungsversuch ist möglich.

## Modul- und Browser-Einstiege

Importiere die Paketwurzel für die standardmäßige ESM-API. Verwende den `/lazy`-Unterpfad, wenn du dessen verzögerten Einstieg benötigst; dynamisches Laden stellt das alte Singleton nicht wieder her. Die Prüfungen installierter Pakete umfassen ESM-`import`, CJS-`require` und die `browser`-Bedingung für die Einstiege der Paketwurzel und `/lazy`.

Die klassische Browser-Ausgabe enthält im Rollup-Namespace Factories und Feature-Loader. Erstelle die Engine nach dem Laden des Namespace-Skripts und übergib sie an jeden Loader. Externe Feature-Skripte benötigen die passende Engine und gemeinsame Abhängigkeiten. Verwende zusammenpassende Versionen und die Reihenfolge aus der Browser-README des Bundles. Ein eigenständiges Bundle enthält die ausgewählten Features. Weder das Laden des Browser-Einstiegs noch der Import einer Paketwurzel erstellt automatisch eine Engine.

## Paketgrenzen und entfernte Singleton-APIs

Importiere Runtime-Typen und `createEngine` aus `@tsparticles/engine` und danach nur die von der Anwendung benötigten Feature-Pakete, etwa `@tsparticles/slim` oder ein dediziertes Interaktions-, Form- oder Updater-Paket. Convenience-Pakete sind eigenständige Adapter. Bevorzuge deklarierte Paketexports gegenüber internen `dist`- oder Quellpfaden eines anderen Pakets. Der E10-Bericht installierter Pakete ist maßgeblich für die aktuellen Prüfungen von `exports`, Deklarationen und Auflösung.

Das exportierte Engine-Singleton und globale Engine-Mutationshelfer wurden entfernt. Ersetze `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` und `getParticlesLogger` durch die entsprechenden Methoden der Engine, der der Container gehört. Wenn der Anwendungscode `tsParticles.load`, `tsParticles.loadJSON` oder `tsParticles.dom` verwendet hat, rufe diese Operationen auf der expliziten Engine auf oder bewahre den zurückgegebenen Container auf. Greife aus einem importierten ESM-/CJS-Paket nicht auf `window.tsParticles` zu; klassische Browser-Bundles stellen das dokumentierte Namespace separat bereit.
