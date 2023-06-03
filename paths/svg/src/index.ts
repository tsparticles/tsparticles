import type { Engine } from "tsparticles-engine";
import { SVGPathGenerator } from "./SVGPathGenerator";

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 */
export async function loadSVGPath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(svgPathName, new SVGPathGenerator());
}
