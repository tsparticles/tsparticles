/* eslint-disable sort-imports */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { camelize, capitalize, dash } from "./string-utils.js";
import {
  type IProjectMetadata,
  copyEmptyTemplateFiles,
  runBuild,
  runInstall,
  updatePackageDistFile,
  updatePackageFile,
} from "./template-utils.js";

export type CreateProjectKind =
  | "bundle"
  | "effect"
  | "interaction"
  | "palette"
  | "path"
  | "plugin"
  | "preset"
  | "shape"
  | "updater";

export type InteractionType = "external" | "generic" | "particles";

export type PluginType = "color-manager" | "easing" | "emitters-shape" | "export" | "generic";

type SubType = InteractionType | PluginType | undefined;

export interface ICreateProjectOptions {
  description: string;
  destination: string;
  kind: CreateProjectKind;
  name: string;
  repositoryUrl: string;
  type?: SubType;
}

interface IProjectConfig {
  description: string;
  fileName: string;
  jsDelivrFileName: string;
  kindLabel: string;
  loadFunction: string;
  moduleName: string;
  packageName: string;
  packageSuffix: string;
  registerName: string;
  rollupFactory: string;
  rollupNameKey: string;
  rollupNameValue: string;
  srcFiles: Record<string, string>;
  withBundleFile: boolean;
}

interface INameData {
  camelName: string;
  dashedName: string;
  folderName: string;
  pascalName: string;
}

/**
 *
 * @param name - The name
 * @param destination - The destination point
 * @returns The result
 */
function getNameData(name: string, destination: string): INameData {
  const pascalName = capitalize(name.trim(), "-", "_", " "),
    camelName = camelize(pascalName),
    dashedName = dash(camelName),
    folderName = path.basename(destination);

  return {
    camelName,
    dashedName,
    folderName,
    pascalName,
  };
}

/**
 *
 * @param loadFunction - The loadFunction
 * @returns The string value
 */
function getNoopLazyIndex(loadFunction: string): string {
  return `import type { Engine } from "@tsparticles/engine/lazy";

/**
 * @param engine - The engine instance
 */
export async function ${loadFunction}(engine: Engine): Promise<void> {
  const { ${loadFunction}: load } = await import("./index.js");

  await load(engine);
}
`;
}

/**
 *
 * @param loadFunction - The loadFunction
 * @returns The string value
 */
function getBrowserFile(loadFunction: string): string {
  return `import { ${loadFunction} } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  ${loadFunction}?: typeof ${loadFunction};
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.${loadFunction} = ${loadFunction};

export * from "./index.js";
`;
}

/**
 *
 * @param loadFunction - The loadFunction
 * @param reexportEngine - The reexportEngine
 * @returns The string value
 */
function getBundleFile(loadFunction: string, reexportEngine: boolean): string {
  return `import { ${loadFunction} } from "./index.js";

${reexportEngine ? 'export { tsParticles } from "@tsparticles/engine";' : ""}
export { ${loadFunction} } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  ${loadFunction}?: typeof ${loadFunction};
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.${loadFunction} = ${loadFunction};
`;
}

/**
 *
 * @param kindLabel - The kindLabel
 * @param description - The description
 * @returns The string value
 */
function getProjectDescription(kindLabel: string, description: string): string {
  return `tsParticles ${description} ${kindLabel}`;
}

/**
 *
 * @param repositoryUrl - The repositoryUrl
 * @param packageSuffix - The packageSuffix
 * @returns The string value
 */
function getRepoUrl(repositoryUrl: string, packageSuffix: string): string {
  if (repositoryUrl) {
    return repositoryUrl;
  }

  return `https://github.com/tsparticles/${packageSuffix}.git`;
}

/**
 *
 * @param config - The configuration
 * @returns The string value
 */
function getRollupConfig(config: IProjectConfig): string {
  return `import { ${config.rollupFactory} } from "@tsparticles/rollup-plugin";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  rootPkgPath = path.join(__dirname, "package.json"),
  pkg = JSON.parse(await readFile(rootPkgPath, "utf-8"));

export default ${config.rollupFactory}({
  moduleName: "${config.moduleName}",
  ${config.rollupNameKey}: "${config.rollupNameValue}",
  version: pkg.version,
  dir: __dirname,
});
`;
}

/**
 *
 * @param config - The configuration
 * @returns The string value
 */
function getReadme(config: IProjectConfig): string {
  return `[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# ${config.description}

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/${config.packageSuffix}/badge)](https://www.jsdelivr.com/package/npm/${config.packageSuffix})
[![npmjs](https://badge.fury.io/js/${config.packageSuffix}.svg)](https://www.npmjs.com/package/${config.packageSuffix})

## Installation

\`\`\`bash
npm install ${config.packageSuffix}
\`\`\`

## Usage

\`\`\`ts
import { tsParticles } from "@tsparticles/engine";
import { ${config.loadFunction} } from "${config.packageSuffix}";

await ${config.loadFunction}(tsParticles);
\`\`\`
`;
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createBundleConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}`;

  return {
    description: getProjectDescription("bundle", description),
    fileName: `tsparticles.${nameData.camelName}.bundle.min.js`,
    jsDelivrFileName: `tsparticles.${nameData.camelName}.bundle.min.js`,
    kindLabel: "Bundle",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/${nameData.dashedName}`,
    packageSuffix: `@tsparticles/${nameData.dashedName}`,
    registerName: nameData.pascalName,
    rollupFactory: "loadParticlesBundle",
    rollupNameKey: "bundleName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async () => {
    // TODO: load dependencies for this bundle
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
      "src/bundle.ts": getBundleFile(loadFunction, true),
    },
    withBundleFile: true,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createEffectConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Effect`,
    drawerName = `${nameData.pascalName}EffectDrawer`;

  return {
    description: getProjectDescription("effect", description),
    fileName: `tsparticles.effect.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.effect.${nameData.camelName}.min.js`,
    kindLabel: "Effect",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/effect-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/effect-${nameData.dashedName}`,
    registerName: nameData.camelName,
    rollupFactory: "loadParticlesEffect",
    rollupNameKey: "effectName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/index.ts": `import { type Engine, type IEffectDrawer, type IShapeDrawData, type Particle } from "@tsparticles/engine";

declare const __VERSION__: string;

class ${drawerName} implements IEffectDrawer<Particle> {
  drawAfter(_data: IShapeDrawData<Particle>): void {
    // TODO: implement drawAfter
  }
}

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("${nameData.camelName}", () => {
      return Promise.resolve(new ${drawerName}());
    });
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @param type - The type
 * @returns The result
 */
function createInteractionConfig(nameData: INameData, description: string, type: InteractionType): IProjectConfig {
  const isExternal = type === "external" || type === "generic",
    isParticles = type === "particles" || type === "generic";

  let loadFunction = `load${nameData.pascalName}Interaction`,
    packageName = `@tsparticles/interaction-${nameData.dashedName}`,
    fileName = `tsparticles.interaction.${nameData.camelName}.min.js`,
    rollupFactory = "loadParticlesInteraction";

  if (type === "external") {
    loadFunction = `loadExternal${nameData.pascalName}Interaction`;
    packageName = `@tsparticles/interaction-external-${nameData.dashedName}`;
    fileName = `tsparticles.interaction.external.${nameData.camelName}.min.js`;
    rollupFactory = "loadParticlesInteractionExternal";
  } else if (type === "particles") {
    loadFunction = `loadParticles${nameData.pascalName}Interaction`;
    packageName = `@tsparticles/interaction-particles-${nameData.dashedName}`;
    fileName = `tsparticles.interaction.particles.${nameData.camelName}.min.js`;
    rollupFactory = "loadParticlesInteractionParticles";
  }

  return {
    description: getProjectDescription("interaction", description),
    fileName,
    jsDelivrFileName: fileName,
    kindLabel: "Interaction",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName,
    packageSuffix: packageName,
    registerName: nameData.camelName,
    rollupFactory,
    rollupNameKey: "pluginName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/index.ts": `import { type Engine, type IDelta, type Particle } from "@tsparticles/engine";

declare const __VERSION__: string;

interface IInteractivityData {
  type?: string;
}

interface IInteractor {
  clear(): void;
  init(): void;
  interact(..._args: unknown[]): void;
  isEnabled(..._args: unknown[]): boolean;
  reset(): void;
}

type InteractorFactory = (container: unknown) => Promise<IInteractor>;

type PluginManagerWithInteractors = Engine["pluginManager"] & {
  addInteractor?: (name: string, interactor: InteractorFactory) => void;
};

${
  isExternal
    ? `class External${nameData.pascalName}Interactor implements IInteractor {
  clear(): void {
    // TODO: implement clear
  }

  init(): void {
    // TODO: implement init
  }

  interact(_data: IInteractivityData, _delta: IDelta): void {
    // TODO: implement interact
  }

  isEnabled(_data: IInteractivityData, _particle?: Particle): boolean {
    return false;
  }

  reset(): void {
    // TODO: implement reset
  }
}

`
    : ""
}${
        isParticles
          ? `class Particles${nameData.pascalName}Interactor implements IInteractor {
  clear(): void {
    // TODO: implement clear
  }

  init(): void {
    // TODO: implement init
  }

  interact(_particle: Particle, _data: IInteractivityData, _delta: IDelta): void {
    // TODO: implement interact
  }

  isEnabled(_particle: Particle, _data: IInteractivityData): boolean {
    return false;
  }

  reset(): void {
    // TODO: implement reset
  }
}

`
          : ""
      }export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    const pluginManager = e.pluginManager as PluginManagerWithInteractors;

${
  isExternal
    ? `    pluginManager.addInteractor?.("external${nameData.pascalName}", () => {
      return Promise.resolve(new External${nameData.pascalName}Interactor());
    });
`
    : ""
}${
        isParticles
          ? `    pluginManager.addInteractor?.("particles${nameData.pascalName}", () => {
      return Promise.resolve(new Particles${nameData.pascalName}Interactor());
    });
`
          : ""
      }  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createPaletteConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Palette`;

  return {
    description: getProjectDescription("palette", description),
    fileName: `tsparticles.palette.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.palette.${nameData.camelName}.min.js`,
    kindLabel: "Palette",
    loadFunction,
    moduleName: `palette-${nameData.dashedName}`,
    packageName: `@tsparticles/palette-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/palette-${nameData.dashedName}`,
    registerName: nameData.dashedName,
    rollupFactory: "loadParticlesPalette",
    rollupNameKey: "paletteName",
    rollupNameValue: `${nameData.pascalName} Palette`,
    srcFiles: {
      "src/options.ts": `import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  // TODO: palette options
};
`,
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

export const paletteName = "${nameData.dashedName}";

export async function ${loadFunction}(engine: Engine): Promise<void> {
  await engine.pluginManager.register(e => {
    e.pluginManager.addPalette(paletteName, options);
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createPathConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Path`,
    generatorName = `${nameData.pascalName}PathGenerator`;

  return {
    description: getProjectDescription("path", description),
    fileName: `tsparticles.path.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.path.${nameData.camelName}.min.js`,
    kindLabel: "Path",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/path-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/path-${nameData.dashedName}`,
    registerName: nameData.camelName,
    rollupFactory: "loadParticlesPath",
    rollupNameKey: "pluginName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/index.ts": `import { type Engine, type IDelta, type Particle, Vector } from "@tsparticles/engine";

declare const __VERSION__: string;

interface IPathGenerator {
  generate(particle: Particle, delta: IDelta): Vector;
  init(): void;
  reset(): void;
  update(): void;
}

type PluginManagerWithPath = Engine["pluginManager"] & {
  addPathGenerator?: (name: string, initializer: (container: unknown) => Promise<IPathGenerator>) => void;
};

class ${generatorName} implements IPathGenerator {
  generate(_particle: Particle, _delta: IDelta): Vector {
    return Vector.origin;
  }

  init(): void {
    // TODO: initialize generator
  }

  reset(): void {
    // TODO: reset state
  }

  update(): void {
    // TODO: update state
  }
}

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    const pluginManager = e.pluginManager as PluginManagerWithPath;

    pluginManager.addPathGenerator?.("${nameData.camelName}PathGenerator", () => {
      return Promise.resolve(new ${generatorName}());
    });
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param loadFunction - The loadFunction
 * @param pluginClass - The pluginClass
 * @returns The string value
 */
function createGenericPluginIndex(loadFunction: string, pluginClass: string): string {
  return `import { type Engine } from "@tsparticles/engine";
import { ${pluginClass} } from "./${pluginClass}.js";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new ${pluginClass}());
  });
}
`;
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @param type - The type
 * @returns The result
 */
function createPluginConfig(nameData: INameData, description: string, type: PluginType): IProjectConfig {
  if (type === "generic") {
    const loadFunction = `load${nameData.pascalName}Plugin`,
      pluginClass = `${nameData.pascalName}Plugin`;

    return {
      description: getProjectDescription("plugin", description),
      fileName: `tsparticles.plugin.${nameData.camelName}.min.js`,
      jsDelivrFileName: `tsparticles.plugin.${nameData.camelName}.min.js`,
      kindLabel: "Plugin",
      loadFunction,
      moduleName: nameData.dashedName,
      packageName: `@tsparticles/plugin-${nameData.dashedName}`,
      packageSuffix: `@tsparticles/plugin-${nameData.dashedName}`,
      registerName: nameData.camelName,
      rollupFactory: "loadParticlesPlugin",
      rollupNameKey: "pluginName",
      rollupNameValue: nameData.pascalName,
      srcFiles: {
        "src/PluginInstance.ts": `import { type Container, type IContainerPlugin } from "@tsparticles/engine";

export class PluginInstance implements IContainerPlugin {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  get pluginContainer(): Container {
    return this.#container;
  }

  draw(): void {
    // TODO: draw plugin content
  }

  init(): void {
    // TODO: init plugin instance
  }

  particleBounce(): void {
    // TODO: handle bounce
  }

  reset(): void {
    // TODO: reset plugin instance
  }

  stop(): void {
    // TODO: stop plugin instance
  }
}
`,
        "src/Plugin.ts": `import { type Container, type IPlugin, type ISourceOptions, type Options } from "@tsparticles/engine";
import type { PluginInstance } from "./PluginInstance.js";

export class ${pluginClass} implements IPlugin {
  readonly id = "${nameData.camelName}";

  async getPlugin(container: Container): Promise<PluginInstance> {
    const { PluginInstance } = await import("./PluginInstance.js");

    return new PluginInstance(container);
  }

  loadOptions(_container: Container, _options: Options, _source?: ISourceOptions): void {
    // TODO: load plugin options
  }

  needsPlugin(_options?: ISourceOptions): boolean {
    return true;
  }
}
`,
        "src/index.ts": createGenericPluginIndex(loadFunction, pluginClass),
        "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
        "src/browser.ts": getBrowserFile(loadFunction),
      },
      withBundleFile: false,
    };
  }

  if (type === "emitters-shape") {
    const loadFunction = `loadEmittersShape${nameData.pascalName}`,
      className = `${nameData.pascalName}EmittersShapeGenerator`;

    return {
      description: getProjectDescription("emitters shape plugin", description),
      fileName: `tsparticles.plugin.emitters.shape.${nameData.camelName}.min.js`,
      jsDelivrFileName: `tsparticles.plugin.emitters.shape.${nameData.camelName}.min.js`,
      kindLabel: "Plugin",
      loadFunction,
      moduleName: nameData.dashedName,
      packageName: `@tsparticles/plugin-emitters-shape-${nameData.dashedName}`,
      packageSuffix: `@tsparticles/plugin-emitters-shape-${nameData.dashedName}`,
      registerName: nameData.dashedName,
      rollupFactory: "loadParticlesPluginEmittersShape",
      rollupNameKey: "pluginName",
      rollupNameValue: nameData.pascalName,
      srcFiles: {
        "src/index.ts": `import { type Engine, type ICoordinates, type IDimension } from "@tsparticles/engine";

declare const __VERSION__: string;

interface IEmitterShape {
  init(): Promise<void>;
  randomPosition(): { offset: ICoordinates } | null;
  resize(position: ICoordinates, size: IDimension): void;
}

interface IEmitterShapeGenerator {
  generate(container: unknown, position: ICoordinates, size: IDimension, fill: boolean, options: unknown): IEmitterShape;
}

type PluginManagerWithEmitterShapes = Engine["pluginManager"] & {
  addEmitterShapeGenerator?: (name: string, generator: IEmitterShapeGenerator) => void;
};

class ${className} implements IEmitterShapeGenerator {
  generate(_container: unknown, position: ICoordinates): IEmitterShape {
    return {
      init: () => Promise.resolve(),
      randomPosition: () => ({ offset: position }),
      resize: () => {
        // TODO: resize emitter shape
      },
    };
  }
}

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    const pluginManager = e.pluginManager as PluginManagerWithEmitterShapes;

    pluginManager.addEmitterShapeGenerator?.("${nameData.dashedName}", new ${className}());
  });
}
`,
        "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
        "src/browser.ts": getBrowserFile(loadFunction),
      },
      withBundleFile: false,
    };
  }

  if (type === "easing") {
    const loadFunction = `loadEasing${nameData.pascalName}Plugin`;

    return {
      description: getProjectDescription("easing plugin", description),
      fileName: `tsparticles.plugin.easing.${nameData.camelName}.min.js`,
      jsDelivrFileName: `tsparticles.plugin.easing.${nameData.camelName}.min.js`,
      kindLabel: "Plugin",
      loadFunction,
      moduleName: nameData.dashedName,
      packageName: `@tsparticles/plugin-easing-${nameData.dashedName}`,
      packageSuffix: `@tsparticles/plugin-easing-${nameData.dashedName}`,
      registerName: nameData.dashedName,
      rollupFactory: "loadParticlesPluginEasing",
      rollupNameKey: "pluginName",
      rollupNameValue: nameData.pascalName,
      srcFiles: {
        "src/index.ts": `import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

const easingName = "${nameData.camelName}";

function easing(value: number): number {
  return value;
}

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEasing(easingName, easing);
  });
}
`,
        "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
        "src/browser.ts": getBrowserFile(loadFunction),
      },
      withBundleFile: false,
    };
  }

  if (type === "export") {
    const loadFunction = `loadExport${nameData.pascalName}Plugin`,
      pluginClass = `${nameData.pascalName}ExportPlugin`;

    return {
      description: getProjectDescription("export plugin", description),
      fileName: `tsparticles.plugin.export.${nameData.camelName}.min.js`,
      jsDelivrFileName: `tsparticles.plugin.export.${nameData.camelName}.min.js`,
      kindLabel: "Plugin",
      loadFunction,
      moduleName: nameData.dashedName,
      packageName: `@tsparticles/plugin-export-${nameData.dashedName}`,
      packageSuffix: `@tsparticles/plugin-export-${nameData.dashedName}`,
      registerName: nameData.camelName,
      rollupFactory: "loadParticlesPluginExport",
      rollupNameKey: "pluginName",
      rollupNameValue: nameData.pascalName,
      srcFiles: {
        "src/ExportPlugin.ts": `import { type Container, type IContainerPlugin, type IPlugin, type ISourceOptions, type Options } from "@tsparticles/engine";

class ${nameData.pascalName}ExportPluginInstance implements IContainerPlugin {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  get pluginContainer(): Container {
    return this.#container;
  }

  draw(): void {
    // TODO: export draw
  }

  init(): void {
    // TODO: export init
  }

  particleBounce(): void {
    // TODO: export bounce
  }

  reset(): void {
    // TODO: export reset
  }

  stop(): void {
    // TODO: export stop
  }
}

export class ${pluginClass} implements IPlugin {
  readonly id = "export-${nameData.camelName}";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    return new ${nameData.pascalName}ExportPluginInstance(container);
  }

  loadOptions(_container: Container, _options: Options, _source?: ISourceOptions): void {
    // TODO: load export options
  }

  needsPlugin(_options?: ISourceOptions): boolean {
    return true;
  }
}
`,
        "src/index.ts": createGenericPluginIndex(loadFunction, pluginClass),
        "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
        "src/browser.ts": getBrowserFile(loadFunction),
      },
      withBundleFile: false,
    };
  }

  const loadFunction = `load${nameData.pascalName}ColorPlugin`,
    managerClass = `${nameData.pascalName}ColorManager`;

  return {
    description: getProjectDescription("color manager plugin", description),
    fileName: `tsparticles.plugin.${nameData.camelName}Color.min.js`,
    jsDelivrFileName: `tsparticles.plugin.${nameData.camelName}Color.min.js`,
    kindLabel: "Plugin",
    loadFunction,
    moduleName: `${nameData.camelName}Color`,
    packageName: `@tsparticles/plugin-${nameData.dashedName}-color`,
    packageSuffix: `@tsparticles/plugin-${nameData.dashedName}-color`,
    registerName: nameData.dashedName,
    rollupFactory: "loadParticlesPlugin",
    rollupNameKey: "pluginName",
    rollupNameValue: `${nameData.pascalName} Color`,
    srcFiles: {
      "src/ColorManager.ts": `import { type IColor, type IColorManager, type IRangeColor, type IRgb, type IRgba } from "@tsparticles/engine";

export class ${managerClass} implements IColorManager {
  accepts(input: string): boolean {
    return input.startsWith("${nameData.camelName}(");
  }

  handleColor(_color: IColor): IRgb | undefined {
    return undefined;
  }

  handleRangeColor(_color: IRangeColor): IRgb | undefined {
    return undefined;
  }

  parseString(_input: string): IRgba | undefined {
    return undefined;
  }
}
`,
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";
import { ${managerClass} } from "./ColorManager.js";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("${nameData.camelName}", new ${managerClass}());
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createPresetConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Preset`;

  return {
    description: getProjectDescription("preset", description),
    fileName: `tsparticles.preset.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.preset.${nameData.camelName}.min.js`,
    kindLabel: "Preset",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/preset-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/preset-${nameData.dashedName}`,
    registerName: nameData.camelName,
    rollupFactory: "loadParticlesPreset",
    rollupNameKey: "presetName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/options.ts": `import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  // TODO: preset options
};
`,
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";
import { options } from "./options.js";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPreset("${nameData.camelName}", options);
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
      "src/bundle.ts": getBundleFile(loadFunction, false),
    },
    withBundleFile: true,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createShapeConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Shape`,
    className = `${nameData.pascalName}ShapeDrawer`;

  return {
    description: getProjectDescription("shape", description),
    fileName: `tsparticles.shape.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.shape.${nameData.camelName}.min.js`,
    kindLabel: "Shape",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/shape-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/shape-${nameData.dashedName}`,
    registerName: nameData.camelName,
    rollupFactory: "loadParticlesShape",
    rollupNameKey: "shapeName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/ShapeDrawer.ts": `import { type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";

export class ${className} implements IShapeDrawer {
  readonly validTypes = ["${nameData.camelName}"] as const;

  draw(_data: IShapeDrawData): void {
    // TODO: draw shape
  }
}
`,
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";
import { ${className} } from "./ShapeDrawer.js";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["${nameData.camelName}"], () => {
      return Promise.resolve(new ${className}());
    });
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param nameData - The nameData
 * @param description - The description
 * @returns The result
 */
function createUpdaterConfig(nameData: INameData, description: string): IProjectConfig {
  const loadFunction = `load${nameData.pascalName}Updater`,
    className = `${nameData.pascalName}Updater`;

  return {
    description: getProjectDescription("updater", description),
    fileName: `tsparticles.updater.${nameData.camelName}.min.js`,
    jsDelivrFileName: `tsparticles.updater.${nameData.camelName}.min.js`,
    kindLabel: "Updater",
    loadFunction,
    moduleName: nameData.dashedName,
    packageName: `@tsparticles/updater-${nameData.dashedName}`,
    packageSuffix: `@tsparticles/updater-${nameData.dashedName}`,
    registerName: nameData.camelName,
    rollupFactory: "loadParticlesUpdater",
    rollupNameKey: "updaterName",
    rollupNameValue: nameData.pascalName,
    srcFiles: {
      "src/Updater.ts": `import { type IDelta, type IParticleUpdater, type Particle } from "@tsparticles/engine";

export class ${className} implements IParticleUpdater {
  init(_particle: Particle): void {
    // TODO: init updater
  }

  isEnabled(_particle: Particle): boolean {
    return true;
  }

  update(_particle: Particle, _delta: IDelta): void {
    // TODO: update particle
  }
}
`,
      "src/index.ts": `import { type Engine } from "@tsparticles/engine";
import { ${className} } from "./Updater.js";

declare const __VERSION__: string;

export async function ${loadFunction}(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("${nameData.camelName}", () => {
      return Promise.resolve(new ${className}());
    });
  });
}
`,
      "src/index.lazy.ts": getNoopLazyIndex(loadFunction),
      "src/browser.ts": getBrowserFile(loadFunction),
    },
    withBundleFile: false,
  };
}

/**
 *
 * @param options - The options to handle
 * @param nameData - The nameData
 * @returns The result
 */
function resolveProjectConfig(options: ICreateProjectOptions, nameData: INameData): IProjectConfig {
  switch (options.kind) {
    case "bundle":
      return createBundleConfig(nameData, options.description);
    case "effect":
      return createEffectConfig(nameData, options.description);
    case "interaction":
      return createInteractionConfig(
        nameData,
        options.description,
        (options.type as InteractionType | undefined) ?? "generic",
      );
    case "palette":
      return createPaletteConfig(nameData, options.description);
    case "path":
      return createPathConfig(nameData, options.description);
    case "plugin":
      return createPluginConfig(nameData, options.description, (options.type as PluginType | undefined) ?? "generic");
    case "preset":
      return createPresetConfig(nameData, options.description);
    case "shape":
      return createShapeConfig(nameData, options.description);
    case "updater":
      return createUpdaterConfig(nameData, options.description);
    default:
      throw new Error(`Unsupported kind: ${String(options.kind)}`);
  }
}

/**
 *
 * @param destination - The destination point
 * @param srcFiles - The srcFiles
 */
async function writeSourceFiles(destination: string, srcFiles: Record<string, string>): Promise<void> {
  for (const [filePath, content] of Object.entries(srcFiles)) {
    const targetPath = path.join(destination, filePath),
      folderPath = path.dirname(targetPath);

    await mkdir(folderPath, { recursive: true });
    await writeFile(targetPath, content);
  }
}

/**
 *
 * @param options - The options to handle
 */
export async function createProjectTemplate(options: ICreateProjectOptions): Promise<void> {
  const nameData = getNameData(options.name, options.destination),
    config = resolveProjectConfig(options, nameData),
    repoUrl = getRepoUrl(options.repositoryUrl, config.packageSuffix),
    metadata: IProjectMetadata = {
      description: config.description,
      directory: nameData.folderName,
      packageName: config.packageName,
      repoUrl,
      unpkgFileName: config.jsDelivrFileName,
    };

  await copyEmptyTemplateFiles(options.destination);
  await writeSourceFiles(options.destination, config.srcFiles);
  await writeFile(path.join(options.destination, "rollup.config.js"), getRollupConfig(config));
  await writeFile(path.join(options.destination, "README.md"), getReadme(config));
  await updatePackageFile(options.destination, metadata);
  await updatePackageDistFile(options.destination, metadata);

  await runInstall(options.destination);
  await runBuild(options.destination);
}
