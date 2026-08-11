# Optionen-Referenz

Die `tsParticles`-Optionen sind sehr umfangreich. Diese Seite ist eine praktische Karte, bevor du in jede Unteroption einsteigst.

## Wähle deinen Konfigurationsweg

- **Schnelles visuelles Ergebnis**: starte mit einem Preset und uberschreibe die wichtigsten Felder.
- **Volle Kontrolle**: definiere `particles`, `interactivity` und `background` manuell.
- **Config-first-Workflow**: beginne mit `@tsparticles/configs` und iteriere sicher weiter.

## Schnelldoku (lokal)

- [`Background & Canvas`](/de/options/background)
- [`Background Mask`](/de/options/background-mask)
- [`Full Screen`](/de/options/fullscreen)
- [`Motion`](/de/options/motion)
- [`Manual Particles`](/de/options/manual-particles)
- [`Themes`](/de/options/themes)
- [`Particles`](/de/options/particles)
- [`Particles Number`](/de/options/particles-number)
- [`Particles Move`](/de/options/particles-move)
- [`Particles Links`](/de/options/particles-links)
- [`Particles Palette`](/de/options/particles-palette)
- [`Particles Shape`](/de/options/particles-shape)
- [`Particles Collisions`](/de/options/particles-collisions)
- [`Particles Life`](/de/options/particles-life)
- [`Particles Orbit`](/de/options/particles-orbit)
- [`Particles Roll`](/de/options/particles-roll)
- [`Particles Rotate`](/de/options/particles-rotate)
- [`Interactivity`](/de/options/interactivity)
- [`Interactivity Click`](/de/options/interactivity-click)
- [`Interactivity Hover`](/de/options/interactivity-hover)
- [`Interactivity Div`](/de/options/interactivity-div)
- [`Interactivity Events`](/de/options/interactivity-events)
- [`Interactivity Modes`](/de/options/interactivity-modes)
- [`Plugin: Absorbers`](/de/options/plugin-absorbers)
- [`Plugin: Emitters`](/de/options/plugin-emitters)
- [`Plugin: Infection`](/de/options/plugin-infection)
- [`Plugin: Polygon Mask`](/de/options/plugin-polygon-mask)
- [`Performance Guide`](/de/options/performance)

## Partikel-Deep-Dive-Seiten

- [`Particles Bounce`](/de/options/particles-bounce)
- [`Particles Color`](/de/options/particles-color)
- [`Particles Destroy`](/de/options/particles-destroy)
- [`Particles Group`](/de/options/particles-group)
- [`Particles Opacity`](/de/options/particles-opacity)
- [`Particles Palette`](/de/options/particles-palette)
- [`Particles Repulse`](/de/options/particles-repulse)
- [`Particles Shadow`](/de/options/particles-shadow)
- [`Particles Size`](/de/options/particles-size)
- [`Particles Stroke`](/de/options/particles-stroke)
- [`Particles Tilt`](/de/options/particles-tilt)
- [`Particles Twinkle`](/de/options/particles-twinkle)
- [`Particles Wobble`](/de/options/particles-wobble)
- [`Particles ZIndex`](/de/options/particles-zindex)

## Wo die Referenzdokumentation liegt

- Hauptdoku fur Optionen: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Detaillierte Optionsseiten: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- TypeScript-Interfaces: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Meistgenutzte Root-Optionen

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Meistgenutzte Bereiche

- `background`: Basis fur Canvas-Hintergrund und Maskierung.
- `particles.number`: Anzahl und Dichte.
- `particles.move`: Geschwindigkeit, Richtung und out modes.
- `particles.shape`: Kreis, Polygon, Bild, Emoji, benutzerdefiniert.
- `particles.palette`: schnell koordinierte Farbsets wechseln.
- `interactivity`: Hover/Klick-Modi und externe Effekte.
- `detectRetina`: Qualitats-/Performance-Kompromiss auf High-DPI-Displays.

## Partikelkarte (verschachtelte Ansicht)

Nutze diesen schnellen Baum als Navigationshilfe, bevor du Einzelseiten offnest:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Erst die Root-Doku, dann die Deep-Dive-Bereiche:

- Basis: [`Particles`](/de/options/particles)
- Vertiefung: [`Particles Number`](/de/options/particles-number), [`Particles Move`](/de/options/particles-move), [`Particles Links`](/de/options/particles-links)

## Sicherer Optionen-Workflow

1. Starte mit einer funktionierenden Konfiguration aus Demos oder Presets.
2. Aendere immer nur einen Bereich auf einmal.
3. Validiere mit TypeScript (`IOptions`) im App-Code.
4. Halte Produktionsoptionen in dedizierten JSON-Dateien.

## Minimal typisiertes Beispiel

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Performance-Leitplanken

- Nutze bevorzugt `@tsparticles/slim`, ausser du brauchst erweiterte Plugins.
- Halte die Partikelanzahl proportional zur Flache des Containers.
- Profile mit echten Geraten, bevor du schwere Interaktionen hinzufugst.

## Verwandte Referenzen

- Doku zum Config-Paket: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Presets-Ordner: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Paletten-Ordner: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Fur alle Details jeder Unteroption nutze zusatzlich die oben verlinkten Quellseiten in `tsparticles/markdown/Options`.
