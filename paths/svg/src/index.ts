import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const svgPathName = "svgPathGenerator";

/**
 * @param engine -
 */
export function loadSVGPath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SVGPathGenerator } = await import("./SVGPathGenerator.js");

        e.addPathGenerator(svgPathName, new SVGPathGenerator());
    });
}
