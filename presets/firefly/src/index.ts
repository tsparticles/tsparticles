import type { Main } from "tsparticles";
import { options } from "./options";

export function loadFireflyPreset(tsParticles: Main): void {
    tsParticles.addPreset("firefly", options);
}
