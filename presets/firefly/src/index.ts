import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadFireflyPreset(tsParticles: Main): void {
    tsParticles.addPreset("firefly", options);
}
