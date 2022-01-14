import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadSnowPreset(engine: Engine): void {
    engine.addPreset("snow", options);
}
