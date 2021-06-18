import type { Main } from "tsparticles";
import { options } from "./options";

export function loadFireworksPreset(tsParticles: Main): void {
    tsParticles.addPreset("fireworks", options);
}
