import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadFountainPreset(tsParticles: Main): void {
    tsParticles.addPreset("fountain", options);
}
