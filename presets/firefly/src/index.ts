import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFireflyPreset(tsParticles: Engine): void {
    tsParticles.addPreset("firefly", options);
}
