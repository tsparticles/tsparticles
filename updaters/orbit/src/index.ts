import type { Engine } from "@tsparticles/engine";
import { OrbitUpdater } from "./OrbitUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadOrbitUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "orbit",
        container => {
            return Promise.resolve(new OrbitUpdater(container));
        },
        refresh,
    );
}
