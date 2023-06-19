import type { Engine } from "tsparticles-engine";
import { SVGPathGenerator } from "./SVGPathGenerator";

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSVGPath(engine: Engine, refresh = true): Promise<void> {
    await engine.addPathGenerator(svgPathName, new SVGPathGenerator(), refresh);
}
