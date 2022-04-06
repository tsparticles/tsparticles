import type { Engine } from "tsparticles-engine";
import { GradientUpdater } from "./GradientUpdater";

export function loadGradientUpdater(engine: Engine): void {
    engine.addParticleUpdater("gradient", () => new GradientUpdater());
}
