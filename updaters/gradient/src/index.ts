import { type Engine } from "@tsparticles/engine";
import { GradientUpdater } from "./GradientUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGradientUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "gradient",
        () => {
            return Promise.resolve(new GradientUpdater(engine));
        },
        refresh,
    );
}
