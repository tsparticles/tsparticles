import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import type { Engine } from "@tsparticles/engine";
import { SpiralPathGenerator } from "./SpiralPathGenerator.js";

declare const __VERSION__: string;

export const spiralPathName = "spiralPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSpiralPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(spiralPathName, container => {
      return Promise.resolve(new SpiralPathGenerator(container));
    });
  });
}
