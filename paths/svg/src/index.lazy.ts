import type { Engine } from "@tsparticles/engine/lazy";
import type { MoveEngine } from "@tsparticles/plugin-move/lazy";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSVGPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: MoveEngine) => {
    const { ensureBaseMoverLoaded } = await import("@tsparticles/plugin-move/lazy");

    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(svgPathName, async container => {
      const { SVGPathGenerator } = await import("./SVGPathGenerator.js");

      return new SVGPathGenerator(container);
    });
  });
}
