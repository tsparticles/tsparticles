# Plugin e personalizzazione

tsParticles puo essere esteso a runtime con forme personalizzate, preimpostazioni e plugin.

Questa guida si concentra sul percorso rapido: aggiungere comportamento personalizzato direttamente in un'app, senza creare prima un pacchetto standalone completo.

## Mappa rapida delle decisioni

- Usa una **forma personalizzata** quando ti serve solo una nuova primitiva di disegno.
- Usa un **preset personalizzato** quando vuoi riutilizzare un oggetto opzioni completo.
- Usa un **plugin** quando ti serve logica runtime (lifecycle del container, comportamento personalizzato, parsing delle opzioni).

## Tutti i tipi di estensione in sintesi

La personalizzazione di tsParticles e piu ampia dei soli plugin personalizzati.

- **Bundle**: loader raggruppato che registra molte funzionalita in una volta (`slim`, `basic`, `all`).
- **Effect**: effetto di rendering delle particelle (`particles.effect`).
- **Interaction**: comportamento tra particelle ed eventi; diviso in `external` (mouse/touch) e `particles` (particella-particella).
- **Palette**: profilo riutilizzabile di stile/colori (`particles.palette`).
- **Path**: generatore del percorso di movimento delle particelle (`particles.move.path`).
- **Plugin**: modulo funzionale a livello container/runtime (per esempio emitters, absorbers, polygon mask).
- **Preset**: profilo completo di opzioni riutilizzabile (`preset`).
- **Shape**: primitiva di disegno delle particelle (`particles.shape.type`).
- **Updater**: aggiornamento per-frame delle proprieta delle particelle (tilt, roll, twinkle, opacity, size e altro).

Se spieghi queste categorie agli utenti, capiscono subito quanto puo essere profonda la personalizzazione.

## Tabella riassuntiva

| Tipo        | Creazione rapida (locale all'app)                                                               | Come usarlo                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Bundle      | Componi il tuo `loadAppBundle(engine)` e richiama i loader interni                              | Chiama `await loadAppBundle(tsParticles)` prima di `tsParticles.load(...)`         |
| Effect      | Registra con `pluginManager.addEffect("app-*", drawer)`                                         | Imposta `particles.effect.type` con l'id del tuo effect                            |
| Interaction | Registra con `pluginManager.addInteractor("app-*", interactor)`                                 | Abilita in `interactivity.events` / controlli opzionali su mode custom             |
| Palette     | Registra con `pluginManager.addPalette("app-*", palette)`                                       | Imposta `particles.palette` con l'id della tua palette                             |
| Path        | Registra con `pluginManager.addPathGenerator("app-*", generator)`                               | Imposta `particles.move.path.generator` con l'id del tuo path                      |
| Plugin      | Crea `IPlugin` + `IContainerPlugin` e chiama `engine.addPlugin(...)`                            | Abilita con le opzioni del plugin e gli hook del lifecycle                         |
| Preset      | Registra con `tsParticles.addPreset("app-*", options)`                                          | Imposta `preset` alla radice                                                       |
| Shape       | Registra con `tsParticles.addShape("app-*", drawer)` o carica tutti i pacchetti shape ufficiali | Imposta `particles.shape.type` e le opzioni per-shape in `particles.shape.options` |
| Updater     | Registra con `pluginManager.addParticleUpdater("app-*", updater)`                               | Esegue automaticamente sulle particelle dove `isEnabled(...)` restituisce `true`   |

## Creazione locale rapida + uso per tipo di estensione

Tutti gli snippet assumono questo ordine di setup:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

Crea un piccolo bundle applicativo che collega esattamente i componenti che vuoi.

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

### Interazioni (external e particles)

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

La shape `line` e guidata dallo stroke, quindi mantieni `fill: false` e configura `particles.paint.stroke`.

L'URL `image.src` qui sopra viene riutilizzato dalle configurazioni esistenti del progetto (`utils/configs`).

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

Questo basta per prototipare localmente ogni tipo di estensione, e poi estrarre in pacchetti dedicati in seguito.

## Strategia di composizione

- Parti da un solo **bundle** (`slim` di solito e sufficiente).
- Aggiungi le capacita mancanti come piccoli moduli mirati (interaction/updater/path/effect/shape).
- Usa **preset** per riuso del comportamento e **palette** per riuso dell'identita visiva.
- Mantieni prima le estensioni personalizzate locali all'app, pubblica solo quando vengono riusate in piu progetti.

## Regole pratiche

- Mantieni univoci i nomi delle estensioni (per esempio `app-*` o prefisso aziendale).
- Parti locale all'app, estrai in pacchetto solo quando c'e riuso in piu progetti.
- Tieni un piccolo fixture di configurazione durante lo sviluppo (controlli regressione piu veloci).
- Se manca una funzionalita, verifica che il pacchetto richiesto sia caricato (shape, interaction, updater, plugin).

## Riferimento sorgente

- Documentazione interfaccia plugin: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- Guida markdown estesa: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
