import type { Engine } from "tsparticles-engine";
import { OpacityUpdater } from "./OpacityUpdater";

/**
 * @param engine - The engine instance to load the updater for
 */
export async function loadOpacityUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
