import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/plugin-move";

declare const __VERSION__: string;

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 */
export async function loadZigZagPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(zigZagPathName, async container => {
      const { ZigZagPathGenerator } = await import("./ZigZagPathGenerator.js");

      return new ZigZagPathGenerator(container);
    });
  });
}
