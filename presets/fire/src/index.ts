import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFirePreset(tsParticles: Engine): void {
    tsParticles.addPreset("fire", options);
}
