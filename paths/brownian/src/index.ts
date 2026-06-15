import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { BrownianPathGenerator } from "./BrownianPathGenerator.js";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const brownianPathName = "brownianPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBrownianPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(brownianPathName, container => {
      return Promise.resolve(new BrownianPathGenerator(container));
    });
  });
}
