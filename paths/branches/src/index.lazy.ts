import type { Engine } from "@tsparticles/engine/lazy";
import type { MoveEngine } from "@tsparticles/plugin-move/lazy";

declare const __VERSION__: string;

export const branchingPathName = "branchesPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBranchesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move/lazy");

    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(branchingPathName, async container => {
      const { BranchesPathGenerator } = await import("./BranchesPathGenerator.js");

      return new BranchesPathGenerator(container);
    });
  });
}
