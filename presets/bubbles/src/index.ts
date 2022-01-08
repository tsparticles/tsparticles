import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadBubblesPreset(tsParticles: Engine): void {
    tsParticles.addPreset("bubbles", options);
}
