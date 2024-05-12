import type { Engine } from "@tsparticles/engine";
import { TiltUpdater } from "./TiltUpdater.js";

/**
 * @param engine - The engine to load the updater for
 * @param refresh -
 */
export async function loadTiltUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "tilt",
        container => {
            return Promise.resolve(new TiltUpdater(container));
        },
        refresh,
    );
}
