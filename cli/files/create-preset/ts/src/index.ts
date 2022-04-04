import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadTemplatePreset(engine: Engine): void {
    engine.addPreset("template", options);
}
