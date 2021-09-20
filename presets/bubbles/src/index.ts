import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadBubblesPreset(tsParticles: Main): void {
    tsParticles.addPreset("bubbles", options);
}
