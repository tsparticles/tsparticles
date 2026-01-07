import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const curvesPathName = "curvesPathGenerator";

/**
 * @param engine -
 */
export function loadCurvesPath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { CurvesPathGenerator } = await import("./CurvesPathGenerator.js");

        e.addPathGenerator(curvesPathName, new CurvesPathGenerator());
    });
}
