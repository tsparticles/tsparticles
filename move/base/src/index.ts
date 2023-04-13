import { BaseMover } from "./BaseMover";
import type { Engine } from "tsparticles-engine";

/**
 *
 * @param engine -
 */
export async function loadBaseMover(engine: Engine): Promise<void> {
    engine.addMover("base", () => new BaseMover());
}
