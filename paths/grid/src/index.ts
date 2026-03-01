import type { Engine } from "@tsparticles/engine";
import type { MoveEngine } from "@tsparticles/plugin-move";

declare const __VERSION__: string;

export const gridPathName = "gridPathGenerator";

/**
 * @param engine -
 */
export async function loadGridPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(gridPathName, async container => {
      const { GridPathGenerator } = await import("./GridPathGenerator.js");

      return new GridPathGenerator(container);
    });
  });
}
