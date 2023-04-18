import type { Engine } from "tsparticles-engine";
import { GradientUpdater } from "./GradientUpdater";

/**
 *
 * @param engine -
 */
export async function loadGradientUpdater(engine: Engine): Promise<void> {
    engine.addParticleUpdater("gradient", () => new GradientUpdater());
}
