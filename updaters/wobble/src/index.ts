import { type Engine } from "@tsparticles/engine";
import { WobbleUpdater } from "./WobbleUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadWobbleUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "wobble",
        container => {
            return Promise.resolve(new WobbleUpdater(container));
        },
        refresh,
    );
}
