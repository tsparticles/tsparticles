import { options } from "./options.js";

export function loadTemplatePreset(engine) {
    engine.addPreset("template", options);
}
