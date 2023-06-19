import type { Engine } from "tsparticles-engine";
import { OpacityUpdater } from "./OpacityUpdater";

/**
 * @param engine - The engine instance to load the updater for
 * @param refresh -
 */
export async function loadOpacityUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container), refresh);
}
