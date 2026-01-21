import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 */
export async function loadSVGPath(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { SVGPathGenerator } = await import("./SVGPathGenerator.js");

        e.addPathGenerator(svgPathName, new SVGPathGenerator());
    });
}
