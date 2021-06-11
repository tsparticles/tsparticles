import type { Main } from "tsparticles";
import { options } from "./options";

export function loadSnowPreset(tsParticles: Main): void {
    tsParticles.addPreset("snow", options);
}
