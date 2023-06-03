import type { Engine } from "tsparticles-engine";
import { TiltUpdater } from "./TiltUpdater";

/**
 * @param engine - The engine to load the updater for
 */
export async function loadTiltUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
