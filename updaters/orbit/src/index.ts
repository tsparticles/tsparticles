import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { OrbitUpdater } from "./OrbitUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadOrbitUpdater(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addParticleUpdater(
        "orbit",
        container => {
            return Promise.resolve(new OrbitUpdater(container, engine));
        },
        refresh,
    );
}
