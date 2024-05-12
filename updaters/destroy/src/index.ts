import { DestroyUpdater } from "./DestroyUpdater.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "destroy",
        container => {
            return Promise.resolve(new DestroyUpdater(engine, container));
        },
        refresh,
    );
}
