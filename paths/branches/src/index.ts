import type { Engine } from "@tsparticles/engine";
import type { MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const branchingPathName = "branchesPathGenerator";

/**
 * @param engine -
 */
export async function loadBranchesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(branchingPathName, async container => {
      const { BranchesPathGenerator } = await import("./BranchesPathGenerator.js");

      return new BranchesPathGenerator(container);
    });
  });
}
