import { DestroyUpdater } from "./DestroyUpdater.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "destroy",
        container => {
            return Promise.resolve(new DestroyUpdater(engine, container));
        },
        refresh,
    );
}
