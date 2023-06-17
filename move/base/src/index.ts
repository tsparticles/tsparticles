import { BaseMover } from "./BaseMover";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = false): Promise<void> {
    await engine.addMover("base", () => new BaseMover(), refresh);
}
