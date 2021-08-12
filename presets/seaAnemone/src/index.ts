import type { Main } from "tsparticles";
import { options, presetName } from "./options";
import { loadCurvesPath } from "tsparticles-path-curves";

export function loadSeaAnemonePreset(tsParticles: Main): void {
    tsParticles.addPreset(presetName, options);
    loadCurvesPath(tsParticles);
}
