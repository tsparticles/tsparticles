# Plugins und Anpassung

tsParticles kann zur Laufzeit mit benutzerdefinierten Formen, Presets und Plugins erweitert werden.

Dieser Leitfaden konzentriert sich auf den schnellen Weg: benutzerdefiniertes Verhalten direkt in einer App hinzufugen, ohne zuerst ein vollstandiges Standalone-Paket zu erstellen.

## Schnelle Entscheidungsubersicht

- Verwende eine **benutzerdefinierte Shape**, wenn du nur eine neue Zeichenprimitive brauchst.
- Verwende ein **benutzerdefiniertes Preset**, wenn du ein vollstandiges Optionsobjekt wiederverwenden mochtest.
- Verwende ein **Plugin**, wenn du Laufzeitlogik brauchst (Container-Lebenszyklus, benutzerdefiniertes Verhalten, Options-Parsing).

## Alle Erweiterungstypen auf einen Blick

Die Anpassung von tsParticles ist umfassender als nur benutzerdefinierte Plugins.

- **Bundle**: gruppierter Loader, der viele Funktionen auf einmal registriert (`slim`, `basic`, `all`).
- **Effect**: Render-Effekt fur Partikel (`particles.effect`).
- **Interaction**: Verhalten zwischen Partikeln und Ereignissen; aufgeteilt in `external` (Maus/Touch) und `particles` (Partikel-Partikel).
- **Palette**: wiederverwendbares Stil-/Farbprofil (`particles.palette`).
- **Path**: Pfadgenerator fur die Partikelbewegung (`particles.move.path`).
- **Plugin**: Funktionsmodul fur Container/Laufzeit (zum Beispiel Emitters, Absorbers, Polygon Mask).
- **Preset**: wiederverwendbares vollstandiges Optionsprofil (`preset`).
- **Shape**: Zeichenprimitive fur Partikel (`particles.shape.type`).
- **Updater**: Aktualisierer fur Partikeleigenschaften pro Frame (tilt, roll, twinkle, opacity, size und mehr).

Wenn du diese Kategorien erklarst, verstehen Nutzer sofort, wie weit die Anpassung gehen kann.

## Ubersichtstabelle

| Typ         | Schnell erstellen (app-lokal)                                                                     | Verwendung                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Bundle      | Erstelle dein eigenes `loadAppBundle(engine)` und rufe interne Loader auf                         | Rufe `await loadAppBundle(tsParticles)` vor `tsParticles.load(...)` auf                        |
| Effect      | Mit `pluginManager.addEffect("app-*", drawer)` registrieren                                       | `particles.effect.type` auf deine Effect-ID setzen                                             |
| Interaction | Mit `pluginManager.addInteractor("app-*", interactor)` registrieren                               | In `interactivity.events` aktivieren / optionale Prufungen fur benutzerdefinierte Modi         |
| Palette     | Mit `pluginManager.addPalette("app-*", palette)` registrieren                                     | `particles.palette` auf deine Palette-ID setzen                                                |
| Path        | Mit `pluginManager.addPathGenerator("app-*", generator)` registrieren                             | `particles.move.path.generator` auf deine Path-ID setzen                                       |
| Plugin      | `IPlugin` + `IContainerPlugin` erstellen und `engine.addPlugin(...)` aufrufen                     | Mit Plugin-Optionen und Lifecycle-Hooks aktivieren                                             |
| Preset      | Mit `tsParticles.addPreset("app-*", options)` registrieren                                        | Root-`preset` setzen                                                                           |
| Shape       | Mit `tsParticles.addShape("app-*", drawer)` registrieren oder alle offiziellen Shape-Pakete laden | `particles.shape.type` und die shape-spezifischen Optionen in `particles.shape.options` setzen |
| Updater     | Mit `pluginManager.addParticleUpdater("app-*", updater)` registrieren                             | Lauft automatisch fur Partikel, bei denen `isEnabled(...)` `true` zuruckgibt                   |

## Schnelle app-lokale Erstellung + Nutzung nach Erweiterungstyp

Alle Snippets setzen diese Setup-Reihenfolge voraus:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

Erstelle ein kleines App-Bundle, das genau die Teile verknupft, die du brauchst.

```ts
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export async function loadAppBundle(engine: Engine): Promise<void> {
  await loadSlim(engine);

  await Promise.all([
    loadAppShape(engine),
    loadAppPreset(),
    loadAppPalette(engine),
    loadAppEffect(engine),
    loadAppPath(engine),
    loadAppUpdater(engine),
    loadAppInteraction(engine),
    loadAppPlugin(engine),
  ]);
}

await loadAppBundle(tsParticles);
```

### Effect

```ts
import type { Engine } from "@tsparticles/engine";

export async function loadAppEffect(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addEffect("app-fade", () =>
      Promise.resolve({
        drawBefore: ({ context }) => {
          context.save();
          context.globalAlpha *= 0.85;
        },
        drawAfter: ({ context }) => {
          context.restore();
        },
      }),
    );
  });
}

await loadAppEffect(tsParticles);

const options = {
  particles: {
    effect: {
      type: "app-fade",
    },
  },
};
```

### Interaktionen (external und particles)

```ts
import {
  ExternalInteractorBase,
  loadInteractivityPlugin,
  type IInteractivityData,
} from "@tsparticles/plugin-interactivity";
import type { Engine, IDelta } from "@tsparticles/engine";

class AppHoverPauseInteractor extends ExternalInteractorBase {
  readonly maxDistance = 0;

  clear(): void {}

  init(): void {}

  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    if (interactivityData.pointer?.position) {
      this.container.pause();
    }
  }

  isEnabled(interactivityData: IInteractivityData): boolean {
    return !!interactivityData.pointer?.position;
  }

  reset(): void {
    this.container.play();
  }
}

export async function loadAppInteraction(engine: Engine): Promise<void> {
  await loadInteractivityPlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addInteractor?.("app-hover-pause", (container) => {
      return Promise.resolve(new AppHoverPauseInteractor(container));
    });
  });
}

await loadAppInteraction(tsParticles);

const options = {
  interactivity: {
    events: {
      onHover: {
        enable: true,
      },
    },
  },
};
```

### Palette

```ts
import type { Engine, IPalette } from "@tsparticles/engine";

const appPalette: IPalette = {
  name: "App Sunset",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: ["#ff6b6b", "#ffd166", "#4ecdc4"],
    },
  },
};

export async function loadAppPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPalette("app-sunset", appPalette);
  });
}

await loadAppPalette(tsParticles);

const options = {
  particles: {
    palette: "app-sunset",
  },
};
```

### Path

```ts
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { Vector, type Engine } from "@tsparticles/engine";

export async function loadAppPath(engine: Engine): Promise<void> {
  await loadMovePlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addPathGenerator?.("app-sway", () =>
      Promise.resolve({
        generate: (particle) => {
          const wave = Math.sin(particle.position.y * 0.02);

          return Vector.create(wave, 0);
        },
        init: () => {},
        reset: () => {},
        update: () => {},
      }),
    );
  });
}

await loadAppPath(tsParticles);

const options = {
  particles: {
    move: {
      enable: true,
      path: {
        enable: true,
        generator: "app-sway",
      },
    },
  },
};
```

### Plugin

```ts
import type { Container, Engine, IContainerPlugin, IPlugin, ISourceOptions, Options } from "@tsparticles/engine";

class AppPluginInstance implements IContainerPlugin {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  async init(): Promise<void> {
    this.container.retina.pixelRatio = Math.max(this.container.retina.pixelRatio, 1);
  }
}

class AppPlugin implements IPlugin {
  readonly id = "app-plugin";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    return new AppPluginInstance(container);
  }

  loadOptions(_options: Options, source?: ISourceOptions): void {
    if (source?.appPlugin === false) {
      return;
    }
  }

  needsPlugin(source?: ISourceOptions): boolean {
    return source?.appPlugin !== false;
  }
}

export async function loadAppPlugin(engine: Engine): Promise<void> {
  await engine.addPlugin(new AppPlugin());
}

await loadAppPlugin(tsParticles);

const options = {
  appPlugin: true,
};
```

### Preset

```ts
import { tsParticles } from "@tsparticles/engine";

export async function loadAppPreset(): Promise<void> {
  tsParticles.addPreset("app-hero", {
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true, distance: 140 },
    },
  });
}

await loadAppPreset();

const options = {
  preset: "app-hero",
};
```

### Shape

```ts
import type { Engine } from "@tsparticles/engine";
import { loadArrowShape } from "@tsparticles/shape-arrow";
import { loadCardsShape } from "@tsparticles/shape-cards";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadCogShape } from "@tsparticles/shape-cog";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { loadImageShape, type ImageEngine } from "@tsparticles/shape-image";
import { loadInfinityShape } from "@tsparticles/shape-infinity";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadMatrixShape } from "@tsparticles/shape-matrix";
import { loadPathShape } from "@tsparticles/shape-path";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRoundedPolygonShape } from "@tsparticles/shape-rounded-polygon";
import { loadRoundedRectShape } from "@tsparticles/shape-rounded-rect";
import { loadSpiralShape } from "@tsparticles/shape-spiral";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadSquircleShape } from "@tsparticles/shape-squircle";
import { loadStarShape } from "@tsparticles/shape-star";
import { loadTextShape } from "@tsparticles/shape-text";

export async function loadAppShape(engine: Engine): Promise<void> {
  await Promise.all([
    loadArrowShape(engine),
    loadCardsShape(engine),
    loadCircleShape(engine),
    loadCogShape(engine),
    loadEmojiShape(engine),
    loadHeartShape(engine),
    loadImageShape(engine as ImageEngine),
    loadInfinityShape(engine),
    loadLineShape(engine),
    loadMatrixShape(engine),
    loadPathShape(engine),
    loadPolygonShape(engine),
    loadRoundedPolygonShape(engine),
    loadRoundedRectShape(engine),
    loadSpiralShape(engine),
    loadSquareShape(engine),
    loadSquircleShape(engine),
    loadStarShape(engine),
    loadTextShape(engine),
  ]);
}

await loadAppShape(tsParticles);

const options = {
  particles: {
    paint: {
      stroke: {
        width: 2,
      },
    },
    shape: {
      type: [
        "arrow",
        "card",
        "circle",
        "club",
        "cog",
        "diamond",
        "emoji",
        "heart",
        "hearts",
        "image",
        "images",
        "infinity",
        "line",
        "matrix",
        "path",
        "polygon",
        "rounded-polygon",
        "rounded-rect",
        "spade",
        "spades",
        "spiral",
        "edge",
        "square",
        "squircle",
        "star",
        "text",
        "character",
        "char",
        "multiline-text",
        "triangle",
        "clubs",
        "diamonds",
      ],
      options: {
        image: {
          src: "https://particles.js.org/images/hdr/fruits/cherry.png",
          width: 32,
          height: 32,
          replaceColor: false,
        },
        line: {
          close: false,
          fill: false,
        },
        path: {
          close: true,
          d: "M 0,-14 L 10,14 L -10,14 Z",
        },
        polygon: {
          sides: 6,
        },
        "rounded-polygon": {
          sides: 6,
          radius: 0.25,
        },
        "rounded-rect": {
          width: 20,
          height: 14,
          radius: 3,
        },
        spiral: {
          innerRadius: 1,
          lineSpacing: 1,
        },
        star: {
          sides: 5,
          inset: 2,
        },
        text: {
          value: ["TS", "Particles"],
          font: "Verdana",
        },
      },
    },
  },
};
```

Die Shape `line` ist stroke-basiert, daher `fill: false` beibehalten und `particles.paint.stroke` konfigurieren.

Die obige URL in `image.src` wird aus bestehenden Projektkonfigurationen wiederverwendet (`utils/configs`).

### Updater

```ts
import type { Engine, IDelta, Particle } from "@tsparticles/engine";

export async function loadAppUpdater(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addParticleUpdater("app-drift", () =>
      Promise.resolve({
        init: (): void => {},
        isEnabled: (): boolean => true,
        update: (particle: Particle, delta: IDelta): void => {
          particle.position.x += 0.02 * delta.factor;
        },
      }),
    );
  });
}

await loadAppUpdater(tsParticles);

// no extra options required: updater runs when isEnabled(...) is true
```

Das reicht aus, um jeden Erweiterungstyp lokal zu prototypen und spater in eigene Pakete auszulagern.

## Kompositionsstrategie

- Starte mit einem **Bundle** (`slim` ist meist ausreichend).
- Fuge fehlende Funktionen als kleine, fokussierte Module hinzu (interaction/updater/path/effect/shape).
- Nutze **Preset** fur Verhaltens-Wiederverwendung und **Palette** fur visuelle Wiederverwendung.
- Behalte benutzerdefinierte Erweiterungen zunachst app-lokal und veroffentliche sie erst bei projektubergreifender Wiederverwendung.

## Praktische Regeln

- Halte Erweiterungsnamen eindeutig (zum Beispiel `app-*` oder Firmenprefix).
- Starte app-lokal und extrahiere erst dann in ein Paket, wenn die Wiederverwendung in mehreren Projekten erfolgt.
- Nutze beim Entwickeln eine kleine Konfigurations-Fixture (schnellere Regressionsprufungen).
- Wenn eine Funktion fehlt, prufe, ob das benotigte Paket geladen ist (shape, interaction, updater, plugin).

## Quellen

- Plugin-Interface-Dokumentation: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- Erweiterter Markdown-Leitfaden: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
