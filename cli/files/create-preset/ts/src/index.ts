import type { Engine } from "tsparticles-engine";
import { options } from "./options";

export function loadTemplatePreset(engine: Engine): void {
    engine.addPreset("template", options);
}
