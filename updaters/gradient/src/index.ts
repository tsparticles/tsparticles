import type { Engine } from "@tsparticles/engine";
import { GradientUpdater } from "./GradientUpdater";

/**
 *
 * @param engine
 */
export function loadGradientUpdater(engine: Engine): void {
    engine.addParticleUpdater("gradient", () => new GradientUpdater());
}
