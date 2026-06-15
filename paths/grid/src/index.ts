import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import type { Engine } from "@tsparticles/engine";
import { GridPathGenerator } from "./GridPathGenerator.js";

declare const __VERSION__: string;

export const gridPathName = "gridPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadGridPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(gridPathName, container => {
      return Promise.resolve(new GridPathGenerator(container));
    });
  });
}
