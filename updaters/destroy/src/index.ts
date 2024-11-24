import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { DestroyUpdater } from "./DestroyUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addParticleUpdater(
        "destroy",
        container => {
            return Promise.resolve(new DestroyUpdater(engine, container));
        },
        refresh,
    );
}
