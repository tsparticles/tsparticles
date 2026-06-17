import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { BranchesPathGenerator } from "./BranchesPathGenerator.js";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const branchingPathName = "branchesPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBranchesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(branchingPathName, container => {
      return Promise.resolve(new BranchesPathGenerator(container));
    });
  });
}
