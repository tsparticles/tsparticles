import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadBigCirclesPreset(tsParticles: Engine): void {
    tsParticles.addPreset("bigCircles", options);
    tsParticles.addPreset("big-circles", options);
}
