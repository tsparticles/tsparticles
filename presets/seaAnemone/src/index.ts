import type { Engine } from "tsparticles";
import { options, presetName } from "./options";
import { loadCurvesPath } from "tsparticles-path-curves";

export function loadSeaAnemonePreset(tsParticles: Engine): void {
    tsParticles.addPreset(presetName, options);
    loadCurvesPath(tsParticles);
}
