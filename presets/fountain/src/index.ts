import type { Main } from "tsparticles";
import { options } from "./options";

export function loadFountainPreset(tsParticles: Main): void {
    tsParticles.addPreset("fountain", options);
}
