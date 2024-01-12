import type { Engine } from "@tsparticles/engine";

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSVGPath(engine: Engine, refresh = true): Promise<void> {
    const { SVGPathGenerator } = await import("./SVGPathGenerator.js");

    await engine.addPathGenerator(svgPathName, new SVGPathGenerator(), refresh);
}
