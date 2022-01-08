import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadSnowPreset(tsParticles: Engine): void {
    tsParticles.addPreset("snow", options);
}
