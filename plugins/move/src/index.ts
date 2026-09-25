import { type Engine, addErrorMessages, getErrorMessage } from "@tsparticles/engine";
import type { MoveEngine, PathGeneratorInitializer } from "./Types.js";
import { ErrorCodes } from "./ErrorCodes.js";
import { ErrorMessages } from "./ErrorMessages.js";
import { MovePlugin } from "./MovePlugin.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadMovePlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register(e => {
    const moveEngine = e as MoveEngine,
      movePluginManager = moveEngine.pluginManager;

    movePluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();

    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name - the path generator name
     * @param generator - the path generator object
     */
    movePluginManager.addPathGenerator = (name: string, generator: PathGeneratorInitializer): void => {
      if (movePluginManager.initialized) {
        return;
      }

      movePluginManager.initializers.pathGenerators ??= new Map<string, PathGeneratorInitializer>();

      movePluginManager.initializers.pathGenerators.set(name, generator);
    };

    e.pluginManager.addPlugin(new MovePlugin(e.pluginManager));
  });
}

/**
 * @param e - The event object
 */
export function ensureBaseMoverLoaded(e: MoveEngine): void {
  if (!e.pluginManager.addPathGenerator) {
    throw new Error(getErrorMessage(ErrorCodes.baseMoverNotLoaded));
  }
}

export type * from "./IMovePathGenerator.js";
export type * from "./Types.js";
