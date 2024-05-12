import type { Engine } from "@tsparticles/engine";
import { LifeUpdater } from "./LifeUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLifeUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "life",
        async container => {
            return Promise.resolve(new LifeUpdater(container));
        },
        refresh,
    );
}
