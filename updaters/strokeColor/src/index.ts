import type { Engine } from "tsparticles-engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = false): Promise<void> {
    await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container), refresh);
}
