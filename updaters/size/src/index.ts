import type { Engine } from "tsparticles-engine";
import { SizeUpdater } from "./SizeUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSizeUpdater(engine: Engine, refresh = false): Promise<void> {
    await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}
