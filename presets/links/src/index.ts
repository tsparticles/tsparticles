import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadLinksPreset(tsParticles: Engine): void {
    tsParticles.addPreset("links", options);
}
