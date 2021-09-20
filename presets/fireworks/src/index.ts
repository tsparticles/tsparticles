import type { Main } from "tsparticles-engine";
import { options } from "./options";

export function loadFireworksPreset(tsParticles: Main): void {
    tsParticles.addPreset("fireworks", options);
}
