# प्लगइन्स और कस्टमाइज़ेशन

tsParticles को रनटाइम पर कस्टम shape, preset और plugin के साथ बढ़ाया जा सकता है।

यह गाइड तेज़ तरीके पर फोकस करती है: पहले पूरा standalone package बनाए बिना, सीधे app के अंदर custom behavior जोड़ना।

## त्वरित निर्णय मानचित्र

- जब आपको केवल नई drawing primitive चाहिए, तो **custom shape** का उपयोग करें।
- जब आप एक पूरा options object दोबारा उपयोग करना चाहते हों, तो **custom preset** का उपयोग करें।
- जब आपको runtime logic चाहिए (container lifecycle, custom behavior, option parsing), तो **plugin** का उपयोग करें।

## सभी extension type एक नज़र में

tsParticles का customization केवल custom plugin तक सीमित नहीं है।

- **Bundle**: grouped loader जो एक साथ कई feature register करता है (`slim`, `basic`, `all`)।
- **Effect**: particle rendering effect (`particles.effect`)।
- **Interaction**: particle और event के बीच behavior; इसे `external` (mouse/touch) और `particles` (particle-particle) में बांटा जाता है।
- **Palette**: दोबारा उपयोग होने वाला style/colors profile (`particles.palette`)।
- **Path**: particle movement के लिए motion path generator (`particles.move.path`)।
- **Plugin**: container/runtime feature module (जैसे emitters, absorbers, polygon mask)।
- **Preset**: दोबारा उपयोग होने वाला पूरा options profile (`preset`)।
- **Shape**: particle drawing primitive (`particles.shape.type`)।
- **Updater**: per-frame particle property updater (tilt, roll, twinkle, opacity, size, आदि)।

अगर आप यूज़र्स को ये categories समझाते हैं, तो वे तुरंत समझ जाते हैं कि customization कितनी गहराई तक जा सकता है।

## सारणी

| Type        | त्वरित निर्माण (app-local)                                                                       | उपयोग कैसे करें                                                             |
| ----------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Bundle      | अपना `loadAppBundle(engine)` बनाएं और internal loader कॉल करें                                   | `tsParticles.load(...)` से पहले `await loadAppBundle(tsParticles)` कॉल करें |
| Effect      | `pluginManager.addEffect("app-*", drawer)` से register करें                                      | `particles.effect.type` को अपने effect id पर सेट करें                       |
| Interaction | `pluginManager.addInteractor("app-*", interactor)` से register करें                              | `interactivity.events` में enable करें / वैकल्पिक custom mode checks        |
| Palette     | `pluginManager.addPalette("app-*", palette)` से register करें                                    | `particles.palette` को अपने palette id पर सेट करें                          |
| Path        | `pluginManager.addPathGenerator("app-*", generator)` से register करें                            | `particles.move.path.generator` को अपने path id पर सेट करें                 |
| Plugin      | `IPlugin` + `IContainerPlugin` बनाएं और `engine.addPlugin(...)` कॉल करें                         | plugin options और lifecycle hooks के साथ enable करें                        |
| Preset      | `tsParticles.addPreset("app-*", options)` से register करें                                       | root `preset` सेट करें                                                      |
| Shape       | `tsParticles.addShape("app-*", drawer)` से register करें या सभी official shape package load करें | `particles.shape.type` और per-shape `particles.shape.options` सेट करें      |
| Updater     | `pluginManager.addParticleUpdater("app-*", updater)` से register करें                            | जहां `isEnabled(...)` `true` लौटाए, वहां particle पर अपने-आप चलेगा          |

## extension type के अनुसार त्वरित app-local creation + usage

सभी snippet इस setup order को मानकर चलते हैं:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

एक छोटा app bundle बनाएं जो ठीक वही हिस्से जोड़े जिनकी आपको जरूरत है।

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

### Interactions (external और particles)

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

`line` shape stroke-driven है, इसलिए `fill: false` रखें और `particles.paint.stroke` configure करें।

ऊपर दिया गया `image.src` URL मौजूदा project configs (`utils/configs`) से reuse किया गया है।

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

यह हर extension type को लोकली prototype करने के लिए काफी है, और बाद में इसे dedicated package में निकाला जा सकता है।

## संयोजन रणनीति

- एक **bundle** से शुरू करें (`slim` आमतौर पर काफी होता है)।
- जो capability कम हो, उन्हें छोटे focused module (interaction/updater/path/effect/shape) के रूप में जोड़ें।
- behavior reuse के लिए **preset** और visual identity reuse के लिए **palette** का उपयोग करें।
- पहले custom extension को app-local रखें, और केवल तभी publish करें जब वे कई project में reuse हों।

## व्यावहारिक नियम

- extension name unique रखें (उदाहरण: `app-*` या company prefix)।
- app-local से शुरुआत करें, और package में तभी निकालें जब multiple project में reuse हो।
- development के दौरान छोटा config fixture रखें (तेज़ regression checks)।
- अगर कोई feature missing हो, तो verify करें कि required package load हुआ है (shape, interaction, updater, plugin)।

## संदर्भ स्रोत

- Plugin interface दस्तावेज: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- विस्तृत markdown गाइड: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
