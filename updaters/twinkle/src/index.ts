import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { TwinkleUpdater } from "./TwinkleUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTwinkleUpdater(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addParticleUpdater(
        "twinkle",
        () => {
            return Promise.resolve(new TwinkleUpdater(engine));
        },
        refresh,
    );
}
