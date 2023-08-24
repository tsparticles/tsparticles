import type { Engine } from "@tsparticles/engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container), refresh);
}
