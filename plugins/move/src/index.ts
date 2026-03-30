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
      movePluginManager = moveEngine.pluginManager;

    movePluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
    movePluginManager.pathGenerators ??= new Map<Container, Map<string, IMovePathGenerator>>();

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     */
    movePluginManager.addPathGenerator = (name: string, generator: PathGeneratorInitializer): void => {
      movePluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();

      movePluginManager.initializers.pathGenerators.set(name, generator);
    };

    movePluginManager.getPathGenerators = async (
      container: Container,
      force = false,
    ): Promise<Map<string, IMovePathGenerator>> => {
      movePluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
      movePluginManager.pathGenerators ??= new Map<Container, Map<string, IMovePathGenerator>>();

      return getItemMapFromInitializer(
        container,
        movePluginManager.pathGenerators,
        movePluginManager.initializers.pathGenerators,
        force,
      );
    };

    const { MovePlugin } = await import("./MovePlugin.js");

    e.pluginManager.addPlugin(new MovePlugin(e.pluginManager));
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
