import { ColorUpdater } from "./ColorUpdater.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadColorUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addParticleUpdater(
        "color",
        container => {
            return Promise.resolve(new ColorUpdater(container, engine));
        },
        refresh,
    );
}
