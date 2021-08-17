import type { Main } from "tsparticles";
import { GradientUpdater } from "./GradientUpdater";

export function loadGradientUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("gradient", () => new GradientUpdater());
}
