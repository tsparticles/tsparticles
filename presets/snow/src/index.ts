import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadSnowPreset(tsParticles: Main): void {
    tsParticles.addPreset("snow", options);
}
