import type { Engine } from "@tsparticles/engine";
import { WobbleUpdater } from "./WobbleUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadWobbleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "wobble",
        container => {
            return Promise.resolve(new WobbleUpdater(container));
        },
        refresh,
    );
}
