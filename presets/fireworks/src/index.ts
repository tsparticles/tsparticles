import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFireworksPreset(tsParticles: Engine): void {
    tsParticles.addPreset("fireworks", options);
}
