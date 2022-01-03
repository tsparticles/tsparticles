import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadStarsPreset(tsParticles: Engine): void {
    tsParticles.addPreset("stars", options);
}
