import type { Engine } from "@tsparticles/engine";
import { TwinkleUpdater } from "./TwinkleUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTwinkleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "twinkle",
        () => {
            return Promise.resolve(new TwinkleUpdater());
        },
        refresh,
    );
}
