import type { Engine } from "@tsparticles/engine";
import { SizeUpdater } from "./SizeUpdater.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSizeUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "size",
        () => {
            return Promise.resolve(new SizeUpdater());
        },
        refresh,
    );
}
