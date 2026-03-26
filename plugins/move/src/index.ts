import { type Container, type Engine, getItemMapFromInitializer } from "@tsparticles/engine";
import type { MoveEngine, PathGeneratorInitializer } from "./Types.js";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadMovePlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const moveEngine = e as MoveEngine,
      pluginManager = moveEngine.pluginManager;

    pluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
    pluginManager.pathGenerators ??= new Map();

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     */
    pluginManager.addPathGenerator = (name: string, generator: PathGeneratorInitializer): void => {
      pluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();

      pluginManager.initializers.pathGenerators.set(name, generator);
    };

    pluginManager.getPathGenerators = async (
      container: Container,
      force = false,
    ): Promise<Map<string, IMovePathGenerator>> => {
      pluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
      pluginManager.pathGenerators ??= new Map();

      return getItemMapFromInitializer(
        container,
        pluginManager.pathGenerators,
        pluginManager.initializers.pathGenerators,
        force,
      );
    };

    const { MovePlugin } = await import("./MovePlugin.js");

    pluginManager.addPlugin(new MovePlugin(pluginManager));
  });
}

/**
 * @param e -
 */
export function ensureBaseMoverLoaded(e: MoveEngine): void {
  if (!e.pluginManager.addPathGenerator) {
    throw new Error("tsParticles Base Mover is not loaded");
  }
}

export type * from "./IMovePathGenerator.js";
export type * from "./Types.js";
