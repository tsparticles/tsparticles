# Plugins y personalizacion

tsParticles puede ampliarse en tiempo de ejecucion con formas personalizadas, presets y plugins.

Esta guia se centra en la via rapida: agregar comportamiento personalizado directamente en una app, sin crear primero un paquete standalone completo.

## Mapa rapido de decision

- Usa una **shape personalizada** cuando solo necesites una nueva primitiva de dibujo.
- Usa un **preset personalizado** cuando quieras reutilizar un objeto completo de opciones.
- Usa un **plugin** cuando necesites logica de ejecucion (ciclo de vida del contenedor, comportamiento personalizado, parseo de opciones).

## Todos los tipos de extension de un vistazo

La personalizacion de tsParticles es mas amplia que solo los plugins personalizados.

- **Bundle**: cargador agrupado que registra muchas funciones a la vez (`slim`, `basic`, `all`).
- **Effect**: efecto de renderizado de particulas (`particles.effect`).
- **Interaction**: comportamiento entre particulas y eventos; se divide en `external` (mouse/touch) y `particles` (particula-particula).
- **Palette**: perfil reutilizable de estilo/colores (`particles.palette`).
- **Path**: generador de trayectoria de movimiento para particulas (`particles.move.path`).
- **Plugin**: modulo funcional de contenedor/ejecucion (por ejemplo emitters, absorbers, polygon mask).
- **Preset**: perfil completo de opciones reutilizable (`preset`).
- **Shape**: primitiva de dibujo de particulas (`particles.shape.type`).
- **Updater**: actualizador por frame de propiedades de particulas (tilt, roll, twinkle, opacity, size y mas).

Si explicas estas categorias a los usuarios, entienden de inmediato hasta donde puede llegar la personalizacion.

## Tabla resumen

| Tipo        | Creacion rapida (local en app)                                                                      | Como usar                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Bundle      | Compone tu propio `loadAppBundle(engine)` y llama a cargadores internos                             | Llama a `await loadAppBundle(tsParticles)` antes de `tsParticles.load(...)`            |
| Effect      | Registra con `pluginManager.addEffect("app-*", drawer)`                                             | Establece `particles.effect.type` con el id de tu effect                               |
| Interaction | Registra con `pluginManager.addInteractor("app-*", interactor)`                                     | Activa en `interactivity.events` / comprobaciones opcionales de modo personalizado     |
| Palette     | Registra con `pluginManager.addPalette("app-*", palette)`                                           | Establece `particles.palette` con el id de tu palette                                  |
| Path        | Registra con `pluginManager.addPathGenerator("app-*", generator)`                                   | Establece `particles.move.path.generator` con el id de tu path                         |
| Plugin      | Crea `IPlugin` + `IContainerPlugin` y llama a `engine.addPlugin(...)`                               | Activa con opciones del plugin y hooks del ciclo de vida                               |
| Preset      | Registra con `tsParticles.addPreset("app-*", options)`                                              | Establece `preset` en la raiz                                                          |
| Shape       | Registra con `tsParticles.addShape("app-*", drawer)` o carga todos los paquetes oficiales de shapes | Establece `particles.shape.type` y las opciones por shape en `particles.shape.options` |
| Updater     | Registra con `pluginManager.addParticleUpdater("app-*", updater)`                                   | Se ejecuta automaticamente en particulas donde `isEnabled(...)` devuelve `true`        |

## Creacion local rapida + uso por tipo de extension

Todos los fragmentos asumen este orden de configuracion:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

Crea un pequeno bundle de app que conecte exactamente las piezas que quieres.

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

### Interacciones (external y particles)

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

La shape `line` se basa en stroke, asi que manten `fill: false` y configura `particles.paint.stroke`.

La URL de `image.src` de arriba se reutiliza de las configuraciones existentes del proyecto (`utils/configs`).

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

Esto es suficiente para prototipar localmente cada tipo de extension y despues extraerlo a paquetes dedicados.

## Estrategia de composicion

- Empieza con un solo **bundle** (`slim` suele ser suficiente).
- Agrega las capacidades faltantes como modulos pequenos y enfocados (interaction/updater/path/effect/shape).
- Usa **preset** para reutilizar comportamiento y **palette** para reutilizar identidad visual.
- Manten primero las extensiones personalizadas locales de la app y publicalas solo cuando se reutilicen entre proyectos.

## Reglas practicas

- Manten nombres de extension unicos (por ejemplo `app-*` o prefijo de empresa).
- Empieza en local de app y extrae a paquete solo cuando haya reutilizacion en varios proyectos.
- Manten una fixture de configuracion pequena durante el desarrollo (verificaciones de regresion mas rapidas).
- Si falta una funcion, verifica que el paquete requerido este cargado (shape, interaction, updater, plugin).

## Referencias

- Documentacion de la interfaz de plugin: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- Guia markdown ampliada: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
