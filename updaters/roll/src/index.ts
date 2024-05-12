import type { Engine } from "@tsparticles/engine";
import { RollUpdater } from "./RollUpdater.js";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadRollUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "roll",
        () => {
            return Promise.resolve(new RollUpdater());
        },
        refresh,
    );
}
