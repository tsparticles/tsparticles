import type { Engine } from "tsparticles-engine";
import { GradientUpdater } from "./GradientUpdater";

export function loadGradientUpdater(tsParticles: Engine): void {
    tsParticles.addParticleUpdater("gradient", () => new GradientUpdater());
}
