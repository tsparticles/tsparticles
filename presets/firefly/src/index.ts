import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadFireflyPreset(engine: Engine): void {
    engine.addPreset("firefly", options);
}
