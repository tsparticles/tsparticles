import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadBubblesPreset(engine: Engine): void {
    engine.addPreset("bubbles", options);
}
