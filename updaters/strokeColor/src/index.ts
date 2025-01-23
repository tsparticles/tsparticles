import { type Engine } from "@tsparticles/engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);
    await engine.addParticleUpdater(
        "strokeColor",
        container => {
            return Promise.resolve(new StrokeColorUpdater(container, engine));
        },
        refresh,
    );
}
