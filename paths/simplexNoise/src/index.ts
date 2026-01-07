import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const simplexNoisePathName = "simplexNoise";

/**
 * @param engine -
 */
export function loadSimplexNoisePath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SimplexNoiseGenerator } = await import("./SimplexNoiseGenerator.js");

        e.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator());
    });
}
