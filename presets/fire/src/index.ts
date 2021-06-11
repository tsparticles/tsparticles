import type { Main } from "tsparticles";
import { options } from "./options";

export function loadFirePreset(tsParticles: Main): void {
    tsParticles.addPreset("fire", options);
}
