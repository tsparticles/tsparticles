import { type Container, type Engine, getItemMapFromInitializer } from "@tsparticles/engine";
import type { MoveEngine, PathGeneratorInitializer } from "./Types.js";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadMovePlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const moveEngine = e as MoveEngine;

    moveEngine.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
    moveEngine.pathGenerators ??= new Map<Container, Map<string, IMovePathGenerator>>();

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     */
    moveEngine.addPathGenerator = (name: string, generator: PathGeneratorInitializer): void => {
      moveEngine.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();

      moveEngine.initializers.pathGenerators.set(name, generator);
    };

    moveEngine.getPathGenerators = async (
      container: Container,
      force = false,
    ): Promise<Map<string, IMovePathGenerator>> => {
      moveEngine.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();
      moveEngine.pathGenerators ??= new Map<Container, Map<string, IMovePathGenerator>>();

      return getItemMapFromInitializer(
        container,
        moveEngine.pathGenerators,
        moveEngine.initializers.pathGenerators,
        force,
      );
    };

    const { MovePlugin } = await import("./MovePlugin.js");

    e.addPlugin(new MovePlugin(e));
  });
}

/**
 * @param e -
 */
export function ensureBaseMoverLoaded(e: MoveEngine): void {
  if (!e.addPathGenerator) {
    throw new Error("tsParticles Base Mover is not loaded");
  }
}

export type * from "./IMovePathGenerator.js";
export type * from "./Types.js";
