# Plugins e personalizacao

O tsParticles pode ser estendido em tempo de execucao com formas personalizadas, presets e plugins.

Este guia foca no caminho rapido: adicionar comportamento personalizado diretamente dentro de um app, sem criar antes um pacote standalone completo.

## Mapa rapido de decisao

- Use uma **shape personalizada** quando voce so precisar de uma nova primitiva de desenho.
- Use um **preset personalizado** quando quiser reutilizar um objeto completo de opcoes.
- Use um **plugin** quando precisar de logica em tempo de execucao (ciclo de vida do container, comportamento personalizado, parsing de opcoes).

## Todos os tipos de extensao em um relance

A personalizacao do tsParticles e mais ampla do que apenas plugins personalizados.

- **Bundle**: loader agrupado que registra varios recursos de uma vez (`slim`, `basic`, `all`).
- **Effect**: efeito de renderizacao de particulas (`particles.effect`).
- **Interaction**: comportamento entre particulas e eventos; dividido em `external` (mouse/touch) e `particles` (particula-particula).
- **Palette**: perfil reutilizavel de estilo/cores (`particles.palette`).
- **Path**: gerador de trajeto de movimento das particulas (`particles.move.path`).
- **Plugin**: modulo de recurso do container/runtime (por exemplo emitters, absorbers, polygon mask).
- **Preset**: perfil completo de opcoes reutilizavel (`preset`).
- **Shape**: primitiva de desenho de particulas (`particles.shape.type`).
- **Updater**: atualizador por frame das propriedades das particulas (tilt, roll, twinkle, opacity, size e mais).

Se voce explicar essas categorias para os usuarios, eles entendem imediatamente o nivel de personalizacao possivel.

## Tabela de resumo

| Tipo        | Criacao rapida (local ao app)                                                                       | Como usar                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Bundle      | Componha seu proprio `loadAppBundle(engine)` e chame loaders internos                               | Chame `await loadAppBundle(tsParticles)` antes de `tsParticles.load(...)`        |
| Effect      | Registre com `pluginManager.addEffect("app-*", drawer)`                                             | Defina `particles.effect.type` com o id do seu effect                            |
| Interaction | Registre com `pluginManager.addInteractor("app-*", interactor)`                                     | Habilite em `interactivity.events` / verificacoes opcionais de modo customizado  |
| Palette     | Registre com `pluginManager.addPalette("app-*", palette)`                                           | Defina `particles.palette` com o id da sua palette                               |
| Path        | Registre com `pluginManager.addPathGenerator("app-*", generator)`                                   | Defina `particles.move.path.generator` com o id do seu path                      |
| Plugin      | Crie `IPlugin` + `IContainerPlugin` e chame `engine.addPlugin(...)`                                 | Habilite com as opcoes do plugin e hooks de ciclo de vida                        |
| Preset      | Registre com `tsParticles.addPreset("app-*", options)`                                              | Defina `preset` na raiz                                                          |
| Shape       | Registre com `tsParticles.addShape("app-*", drawer)` ou carregue todos os pacotes oficiais de shape | Defina `particles.shape.type` e as opcoes por shape em `particles.shape.options` |
| Updater     | Registre com `pluginManager.addParticleUpdater("app-*", updater)`                                   | Roda automaticamente em particulas onde `isEnabled(...)` retorna `true`          |

## Criacao local rapida no app + uso por tipo de extensao

Todos os snippets assumem esta ordem de setup:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

Crie um pequeno bundle de app que conecte exatamente as partes que voce quer.

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

### Interacoes (external e particles)

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

A shape `line` e orientada por stroke, entao mantenha `fill: false` e configure `particles.paint.stroke`.

A URL de `image.src` acima e reutilizada das configuracoes existentes do projeto (`utils/configs`).

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

Isso e suficiente para prototipar localmente cada tipo de extensao e depois extrair para pacotes dedicados.

## Estrategia de composicao

- Comece com um **bundle** (`slim` geralmente e suficiente).
- Adicione os recursos ausentes como modulos pequenos e focados (interaction/updater/path/effect/shape).
- Use **preset** para reutilizar comportamento e **palette** para reutilizar identidade visual.
- Mantenha primeiro as extensoes customizadas locais ao app e publique so quando houver reutilizacao entre projetos.

## Regras praticas

- Mantenha os nomes de extensao unicos (por exemplo `app-*` ou prefixo da empresa).
- Comece local ao app e extraia para pacote apenas quando houver reutilizacao em varios projetos.
- Mantenha uma fixture de configuracao pequena durante o desenvolvimento (checagens de regressao mais rapidas).
- Se algum recurso estiver faltando, verifique se o pacote necessario foi carregado (shape, interaction, updater, plugin).

## Referencias

- Documentacao da interface de plugin: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- Guia markdown estendido: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
