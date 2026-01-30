import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const branchingPathName = "branchesPathGenerator";

/**
 * @param engine -
 */
export async function loadBranchesPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(branchingPathName, async container => {
      const { BranchesPathGenerator } = await import("./BranchesPathGenerator.js");

      return new BranchesPathGenerator(container);
    });
  });
}
