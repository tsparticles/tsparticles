import type { Engine } from "tsparticles";
import { options } from "./options";

export function loadLinksPreset(engine: Engine): void {
    engine.addPreset("links", options);
}
