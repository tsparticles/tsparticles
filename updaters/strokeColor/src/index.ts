import type { Engine } from "@tsparticles/engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "strokeColor",
        container => {
            return Promise.resolve(new StrokeColorUpdater(container));
        },
        refresh,
    );
}
