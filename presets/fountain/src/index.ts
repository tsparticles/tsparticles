import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFountainPreset(tsParticles: Engine): void {
    tsParticles.addPreset("fountain", options);
}
