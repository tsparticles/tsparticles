import { type Engine } from "@tsparticles/engine";
import { SVGPathGenerator } from "./SVGPathGenerator.js";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSVGPath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(svgPathName, new SVGPathGenerator(), refresh);
}
