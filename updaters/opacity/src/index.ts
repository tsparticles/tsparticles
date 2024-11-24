import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { OpacityUpdater } from "./OpacityUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance to load the updater for
 * @param refresh -
 */
export async function loadOpacityUpdater(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addParticleUpdater(
        "opacity",
        container => {
            return Promise.resolve(new OpacityUpdater(container));
        },
        refresh,
    );
}
