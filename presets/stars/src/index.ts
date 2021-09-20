import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadStarsPreset(tsParticles: Main): void {
    tsParticles.addPreset("stars", options);
}
