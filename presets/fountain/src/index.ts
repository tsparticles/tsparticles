import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFountainPreset(engine: Engine): void {
    engine.addPreset("fountain", options);
}
