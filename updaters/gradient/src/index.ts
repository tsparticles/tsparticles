import type { Engine } from "tsparticles-engine";
import { GradientUpdater } from "./GradientUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGradientUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("gradient", () => new GradientUpdater(), refresh);
}
