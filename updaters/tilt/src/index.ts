import { type Engine } from "@tsparticles/engine";
import { TiltUpdater } from "./TiltUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater for
 * @param refresh -
 */
export async function loadTiltUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "tilt",
        container => {
            return Promise.resolve(new TiltUpdater(container));
        },
        refresh,
    );
}
