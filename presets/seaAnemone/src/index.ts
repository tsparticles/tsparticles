import { options, presetName } from "./options";
import type { Engine } from "tsparticles";
import { loadCurvesPath } from "tsparticles-path-curves";

export function loadSeaAnemonePreset(engine: Engine): void {
    engine.addPreset(presetName, options);
    loadCurvesPath(engine);
}
