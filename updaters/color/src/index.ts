import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ColorUpdater } from "./ColorUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadColorUpdater(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addParticleUpdater(
        "color",
        container => {
            return Promise.resolve(new ColorUpdater(container, engine));
        },
        refresh,
    );
}
