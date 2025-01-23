import { type Engine } from "@tsparticles/engine";
import { RollUpdater } from "./RollUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadRollUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "roll",
        () => {
            return Promise.resolve(new RollUpdater(engine));
        },
        refresh,
    );
}
