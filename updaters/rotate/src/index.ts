import { type Engine } from "@tsparticles/engine";
import { RotateUpdater } from "./RotateUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRotateUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "rotate",
        container => {
            return Promise.resolve(new RotateUpdater(container));
        },
        refresh,
    );
}
