import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadFirePreset(tsParticles: Main): void {
    tsParticles.addPreset("fire", options);
}
