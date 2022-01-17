import { BaseMover } from "./BaseMover";
import type { Engine } from "tsparticles-engine";

export async function loadBaseMover(engine: Engine) {
    engine.addMover("base", () => new BaseMover());
}
