import type { Main } from "tsparticles";
import { options } from "./options";

export function loadBigCirclesPreset(tsParticles: Main): void {
    tsParticles.addPreset("bigCircles", options);
    tsParticles.addPreset("big-circles", options);
}
