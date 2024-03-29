import { BaseMover } from "./BaseMover.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = true): Promise<void> {
    await engine.addMover(
        "base",
        () => {
            return Promise.resolve(new BaseMover());
        },
        refresh,
    );
}
