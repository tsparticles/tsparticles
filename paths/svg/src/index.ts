import { type Engine } from "@tsparticles/engine";
import { type MoveEngine } from "@tsparticles/move-base";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 */
export async function loadSVGPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/move-base");

    ensureBaseMoverLoaded(e);

    e.addPathGenerator?.(svgPathName, async container => {
      const { SVGPathGenerator } = await import("./SVGPathGenerator.js");

      return new SVGPathGenerator(container);
    });
  });
}
