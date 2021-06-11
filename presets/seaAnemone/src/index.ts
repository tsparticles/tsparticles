import type { Main } from "tsparticles";
import { seaPathGenerator } from "./pathGen";
import { options, pathGeneratorName, presetName } from "./options";

export function loadSeaAnemonePreset(tsParticles: Main): void {
    tsParticles.addPreset(presetName, options);
    tsParticles.addPathGenerator(pathGeneratorName, seaPathGenerator);
}
