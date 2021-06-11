import type { Main } from "tsparticles";
import { options } from "./options";

export function loadLinksPreset(tsParticles: Main): void {
    tsParticles.addPreset("links", options);
}
