import { type Engine } from "@tsparticles/engine";
import { FractalNoiseGenerator } from "./FractalNoiseGenerator.js";

declare const __VERSION__: string;

export const fractalNoisePathName = "fractalNoise";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadFractalNoisePath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(fractalNoisePathName, new FractalNoiseGenerator(), refresh);
}
