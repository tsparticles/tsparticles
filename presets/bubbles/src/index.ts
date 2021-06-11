import type { Main } from "tsparticles";
import { options } from "./options";

export function loadBubblesPreset(tsParticles: Main): void {
    tsParticles.addPreset("bubbles", options);
}
