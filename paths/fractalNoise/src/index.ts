import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const fractalNoisePathName = "fractalNoise";

/**
 * @param engine -
 */
export function loadFractalNoisePath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { FractalNoiseGenerator } = await import("./FractalNoiseGenerator.js");

        e.addPathGenerator(fractalNoisePathName, new FractalNoiseGenerator());
    });
}
