import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { SVGPathGenerator } from "./SVGPathGenerator.js";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSVGPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(svgPathName, container => {
      return Promise.resolve(new SVGPathGenerator(container));
    });
  });
}
