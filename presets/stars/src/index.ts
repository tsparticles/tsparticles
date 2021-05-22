import type { Main } from "tsparticles";
import { options } from "./options";

export function loadStarsPreset(tsParticles: Main): void {
    tsParticles.addPreset("stars", options);
}
